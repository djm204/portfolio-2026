import Link from 'next/link';
import { ErrorBoundary } from '@/components/error-boundary';
import { getAllCaseStudies } from '@/lib/case-studies';

/**
 * Case Studies Index Page
 * Industry standard: Data-driven page generation
 * Verification: Test link navigation, responsive grid layout, accessibility
 */
export default function CaseStudiesPage(): JSX.Element {
  const caseStudies = getAllCaseStudies();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Case Studies
            </h1>
            <p className="text-xl text-text-muted max-w-3xl">
              Technical case studies documenting architectural decisions, problem-solving
              approaches, and measurable outcomes from real-world projects.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="gh-box hover:border-accent transition-all duration-200 hover:shadow-lg group"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {study.frontmatter.title}
                    </h2>
                  </div>
                  <p className="text-sm text-text-muted mb-3">
                    {study.frontmatter.subtitle}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {study.sidebar.problem.substring(0, 150)}...
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-3 text-xs text-text-muted mb-3">
                    {study.frontmatter.status && (
                      <span className="px-2 py-1 rounded bg-subtle-bg border border-border">
                        {study.frontmatter.status}
                      </span>
                    )}
                    {study.frontmatter.timeline && (
                      <span className="px-2 py-1 rounded bg-subtle-bg border border-border">
                        {study.frontmatter.timeline}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-accent group-hover:text-accent-hover">
                    Read Case Study →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {caseStudies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-muted">No case studies available yet.</p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
