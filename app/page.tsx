import { GitHubHero } from '@/components/github-hero';
import { ProjectMonitor } from '@/components/project-monitor';
import { AILeadership } from '@/components/ai-leadership';
import { ErrorBoundary } from '@/components/error-boundary';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ErrorBoundary>
        <GitHubHero />
      </ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorBoundary>
          <ProjectMonitor />
        </ErrorBoundary>
        <ErrorBoundary>
          <div className="mb-12 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium px-6 py-3 rounded-md hover:bg-subtle-bg transition-colors text-lg"
            >
              View All Case Studies →
            </Link>
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <AILeadership />
        </ErrorBoundary>
      </div>
    </main>
  );
}
