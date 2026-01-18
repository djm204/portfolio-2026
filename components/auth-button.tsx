'use client';

import { useAuth } from './auth-provider';
import { useState } from 'react';

/**
 * Auth Button Component
 * Industry standard: Authentication UI component
 * Verification: Test login/logout flows, error handling
 */
export function AuthButton(): React.JSX.Element {
  const { user, isLoading, signIn, signOut } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async (): Promise<void> => {
    setIsSigningIn(true);
    try {
      await signIn();
    } catch (error: any) {
      alert(error.message || 'Failed to sign in');
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isLoading) {
    return (
      <button
        className="px-4 py-2 text-sm text-text-muted cursor-not-allowed"
        disabled
      >
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-muted">
          {user.name} ({user.email})
        </span>
        <button
          onClick={signOut}
          className="px-4 py-2 text-sm bg-subtle-bg border border-border rounded hover:bg-accent hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isSigningIn}
      className="px-4 py-2 text-sm bg-accent text-white rounded hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSigningIn ? 'Signing in...' : 'Sign In with Google'}
    </button>
  );
}
