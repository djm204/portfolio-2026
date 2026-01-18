import { ErrorBoundary } from '@/components/error-boundary';

/**
 * ADRs (Architecture Decision Records) Page
 * Verification: Test MDX rendering, navigation, responsive layout
 * This page will display MDX files from the content/adrs directory
 */
export default function ADRsPage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            Architecture Decision Records
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Documenting the &quot;Why&quot; behind the &quot;How&quot; for this portfolio.
          </p>
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                ADR-001: Next.js 15 App Router
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Coming soon: Detailed decision record for choosing Next.js 15
                with App Router and React Server Components.
              </p>
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
