import { CicdPipeline } from '@/components/cicd-pipeline';
import { ErrorBoundary } from '@/components/error-boundary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Construction - Portfolio CI/CD Pipeline',
  description: 'View the current build and deployment pipeline for this portfolio',
};

/**
 * Under Construction Page
 * Direct access to the CI/CD pipeline visualization
 * Note: The UnderConstructionWrapper handles showing this page based on KV flag
 * This page is for direct access to the pipeline diagram
 * Industry standard: Transparent development process
 * Verification: Test pipeline visualization, responsive layout
 */
export default function UnderConstructionPage() {
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
