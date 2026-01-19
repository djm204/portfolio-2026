'use client';

import { useAuth } from './auth-provider';
import { CicdPipeline } from './cicd-pipeline';
import { ErrorBoundary } from './error-boundary';

/**
 * Under Construction Wrapper Component
 * Checks environment variable for UNDER_CONSTRUCTION flag and shows page only if:
 * 1. Flag is enabled via NEXT_PUBLIC_UNDER_CONSTRUCTION env var, AND
 * 2. User is NOT an admin
 * 
 * Industry standard: Feature flag-based page gating using environment variables
 * Verification: Test env var check, admin bypass
 */
export function UnderConstructionWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { isAdmin, isLoading: authLoading } = useAuth();

  // Check environment variable (embedded at build time)
  // Value should be "true", "1", or "enabled" to enable under construction mode
  const underConstructionEnv = process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION || '';
  const isUnderConstruction = 
    underConstructionEnv === 'true' || 
    underConstructionEnv === '1' || 
    underConstructionEnv === 'enabled';

  // Show loading state while auth is loading
  if (authLoading) {
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
  // Navigation and Footer remain visible (they're outside this wrapper)
  if (isUnderConstruction) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <ErrorBoundary>
            <CicdPipeline />
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  // Otherwise, show normal content
  return <>{children}</>;
}
