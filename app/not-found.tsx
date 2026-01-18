import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-text-muted mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium px-6 py-3 rounded-md hover:bg-subtle-bg transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
