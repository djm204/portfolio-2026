import Link from 'next/link';
import { ErrorBoundary } from '@/components/error-boundary';
import { CaseStudySidebar } from '@/components/case-study-sidebar';
import { EditableContent } from '@/components/editable-content';
import { getNextCaseStudy } from '@/lib/case-studies';
import type { CaseStudyData } from '@/lib/types';

interface CaseStudyTemplateProps {
  caseStudy: CaseStudyData;
}

/**
 * Case Study Template Component
 * Industry standard: Reusable template for all case study pages
 * Verification: Test with different case studies, responsive layout, navigation
 * Now uses MDX files for content instead of React components
 */
export function CaseStudyTemplate({
  caseStudy,
}: CaseStudyTemplateProps): React.JSX.Element {
  const { frontmatter, sidebar } = caseStudy;
  const nextCaseStudy = getNextCaseStudy(caseStudy.slug);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 text-sm text-text-muted" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-foreground transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{frontmatter.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <header className="mb-8 pb-6 border-b border-border">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {frontmatter.title}
                </h1>
                {frontmatter.subtitle && (
                  <p className="text-xl text-text-muted mb-6">{frontmatter.subtitle}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm">
                  {frontmatter.status && (
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted">Status:</span>
                      <span className="px-2 py-1 rounded bg-subtle-bg border border-border text-foreground font-medium">
                        {frontmatter.status}
                      </span>
                    </div>
                  )}
                  {frontmatter.timeline && (
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted">Timeline:</span>
                      <span className="text-foreground font-medium">
                        {frontmatter.timeline}
                      </span>
                    </div>
                  )}
                  {frontmatter.impact && (
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted">Impact:</span>
                      <span className="text-foreground font-medium">
                        {frontmatter.impact}
                      </span>
                    </div>
                  )}
                </div>
              </header>

              <EditableContent
                content={caseStudy.mdxContent || ''}
                slug={caseStudy.slug}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <CaseStudySidebar 
                sections={sidebar} 
                frontmatter={frontmatter}
                nextCaseStudy={nextCaseStudy}
              />
            </aside>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
