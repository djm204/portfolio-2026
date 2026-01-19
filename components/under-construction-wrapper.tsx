'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './auth-provider';
import { CicdPipeline } from './cicd-pipeline';
import { ErrorBoundary } from './error-boundary';

/**
 * Under Construction Wrapper Component
 * Checks KV for UNDER_CONSTRUCTION flag and shows page only if:
 * 1. Flag is enabled in KV, AND
 * 2. User is NOT an admin
 * 
 * Industry standard: Feature flag-based page gating
 * Verification: Test KV flag check, admin bypass, loading states
 */
export function UnderConstructionWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const [isUnderConstruction, setIsUnderConstruction] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUnderConstruction = async (): Promise<void> => {
      try {
        const response = await fetch('/api/under-construction/read');
        if (response.ok) {
          const data = await response.json() as { enabled: boolean };
          setIsUnderConstruction(data.enabled);
        } else {
          // On error, default to false
          setIsUnderConstruction(false);
        }
      } catch (error) {
        console.error('Failed to check under construction flag:', error);
        // On error, default to false
        setIsUnderConstruction(false);
      } finally {
        setIsLoading(false);
      }
    };

    void checkUnderConstruction();
  }, []);

  // Show loading state while checking
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  // If user is admin, always show normal content (bypass under construction)
  if (isAdmin) {
    return <>{children}</>;
  }

  // If under construction is enabled, show the construction page
  if (isUnderConstruction === true) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <ErrorBoundary>
            <CicdPipeline />
          </ErrorBoundary>
        </div>
      </main>
    );
  }

  // Otherwise, show normal content
  return <>{children}</>;
}
