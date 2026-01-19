/**
 * Client-side Authentication Utilities
 * Industry standard: Secure client-side auth with Google OAuth
 * Verification: Test login flow, token validation, session management
 * 
 * Uses Google OAuth 2.0 for authentication
 * Only allows me@davidmendez.dev to access admin features
 */

const ADMIN_EMAIL = 'me@davidmendez.dev';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
  isAdmin: boolean;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const session = getSession();
  if (!session) return false;
  
  // Check if session is expired
  if (Date.now() > session.expiresAt) {
    clearSession();
    return false;
  }
  
  return true;
}

/**
 * Check if current user is admin
 */
export function isAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  
  const session = getSession();
  return session?.user.isAdmin || false;
}

/**
 * Get current session
 */
export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionStr = localStorage.getItem('auth_session');
    if (!sessionStr) return null;
    
    return JSON.parse(sessionStr) as AuthSession;
  } catch {
    return null;
  }
}

/**
 * Save session to localStorage
 */
export function saveSession(session: AuthSession): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('auth_session', JSON.stringify(session));
}

/**
 * Clear session
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('auth_session');
}

/**
 * Track script load to prevent duplicates
 */
let googleScriptLoading: Promise<void> | null = null;

/**
 * Initialize Google OAuth (idempotent)
 */
export function initGoogleAuth(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not available'));
  }

  // Already loaded
  if (window.google) {
    return Promise.resolve();
  }

  // Already loading
  if (googleScriptLoading) {
    return googleScriptLoading;
  }

  // Existing script tag (avoid duplicates)
  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[src="https://accounts.google.com/gsi/client"]',
  );

  if (existingScript) {
    googleScriptLoading = new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => {
        googleScriptLoading = null;
        resolve();
      }, { once: true });
      existingScript.addEventListener(
        'error',
        () => {
          googleScriptLoading = null;
          reject(new Error('Failed to load Google Identity Services'));
        },
        { once: true },
      );
    });
    return googleScriptLoading;
  }

  googleScriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleScriptLoading = null;
      resolve();
    };
    script.onerror = () => {
      googleScriptLoading = null;
      reject(new Error('Failed to load Google Identity Services'));
    };
    document.head.appendChild(script);
  });

  return googleScriptLoading;
}

// Extend Window interface for Google OAuth
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: {
              access_token: string;
              expires_in: number;
            }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<AuthSession> {
  await initGoogleAuth();

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.google) {
      reject(new Error('Google Identity Services not loaded'));
      return;
    }

    window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      callback: async (response) => {
        try {
          // Verify token and get user info
          const userInfo = await fetchUserInfo(response.access_token);
          
          // Check if user is allowed
          if (userInfo.email !== ADMIN_EMAIL) {
            reject(new Error('Access denied. Only me@davidmendez.dev is allowed.'));
            return;
          }

          const session: AuthSession = {
            user: {
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              isAdmin: true,
            },
            token: response.access_token,
            expiresAt: Date.now() + (response.expires_in * 1000),
          };

          saveSession(session);
          resolve(session);
        } catch (error) {
          reject(error);
        }
      },
    }).requestAccessToken();
  });
}

/**
 * Fetch user info from Google
 */
async function fetchUserInfo(accessToken: string): Promise<{
  email: string;
  name: string;
  picture?: string;
}> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
}

/**
 * Sign out
 */
export function signOut(): void {
  clearSession();
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}
