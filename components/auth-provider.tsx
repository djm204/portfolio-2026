'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { AuthUser } from '@/lib/auth-client';
import {
  getSession,
  isAuthenticated,
  isAdmin as checkIsAdmin,
  signInWithGoogle,
  signOut as signOutUser,
} from '@/lib/auth-client';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Industry standard: Context-based authentication state management
 * Verification: Test login/logout flows, session persistence, admin checks
 */
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const session = getSession();
    if (session && Date.now() < session.expiresAt) {
      setUser(session.user);
    }
    setIsLoading(false);
  }, []);

  const signIn = async (): Promise<void> => {
    try {
      const session = await signInWithGoogle();
      setUser(session.user);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = (): void => {
    signOutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: isAuthenticated(),
        isAdmin: checkIsAdmin(),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
