'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CaseStudyFrontmatter, CaseStudyData } from '@/lib/types';

interface CaseStudySidebarProps {
  sections: {
    problem: string;
    solution: string;
    outcome: string;
  };
  frontmatter: CaseStudyFrontmatter;
  nextCaseStudy?: CaseStudyData;
}

/**
 * Case Study Sidebar Component
 * Industry standard: TLDR section with statistical highlights
 * Verification: Test metric extraction, statistical display, responsive behavior
 * 
 * Displays key takeaways and statistics from the case study
 */
export function CaseStudySidebar({
  sections,
  frontmatter,
  nextCaseStudy,
}: CaseStudySidebarProps): React.JSX.Element {
  /**
   * Extract key statistics from outcome text
   * Industry standard: Pattern matching for metrics extraction
   */
  const extractStatistics = (text: string): Array<{
    label: string;
    value: string;
    icon: string;
  }> => {
    const stats: Array<{ label: string; value: string; icon: string }> = [];
    
    // Extract percentages (e.g., "80%", "90%+")
    const percentageMatches = text.match(/(\d+\.?\d*)\s*%\+?/gi);
    if (percentageMatches) {
      percentageMatches.forEach((match) => {
        const value = match.replace(/\s/g, '');
        // Try to infer label from context
        const context = text.substring(
          Math.max(0, text.indexOf(match) - 50),
          text.indexOf(match) + match.length + 50
        ).toLowerCase();
        
        let label = 'Improvement';
        if (context.includes('cost') || context.includes('reduction')) {
          label = 'Cost Reduction';
        } else if (context.includes('mttr') || context.includes('time')) {
          label = 'MTTR Reduction';
        } else if (context.includes('efficiency') || context.includes('performance')) {
          label = 'Efficiency Gain';
        }
        
        stats.push({ label, value, icon: '📊' });
      });
    }
    
    // Extract timeline
    if (frontmatter.timeline) {
      stats.push({
        label: 'Timeline',
        value: frontmatter.timeline,
        icon: '⏱️',
      });
    }
    
    // Extract scale improvements (e.g., "10K to 1M+")
    const scaleMatch = text.match(/(\d+[KMB]?)\s*(?:to|→)\s*(\d+[KMB]?\+?)/i);
    if (scaleMatch) {
      stats.push({
        label: 'Scale',
        value: `${scaleMatch[1]} → ${scaleMatch[2]}`,
        icon: '📈',
      });
    }
    
    // Extract time improvements (e.g., "minutes rather than hours")
    const timeMatch = text.match(/(minutes?|hours?|days?)\s+(?:rather than|instead of|vs\.?)\s+(minutes?|hours?|days?)/i);
    if (timeMatch) {
      stats.push({
        label: 'Time Improvement',
        value: `${timeMatch[1]} vs ${timeMatch[2]}`,
        icon: '⚡',
      });
    }
    
    return stats.slice(0, 4); // Limit to top 4 stats
  };

  const statistics = extractStatistics(sections.outcome || '');
  
  // Also extract key metrics from impact field
  const impactStats: Array<{ label: string; value: string; icon: string }> = [];
  if (frontmatter.impact) {
    // Extract percentages from impact
    const impactPercentages = frontmatter.impact.match(/(\d+\.?\d*)\s*%\+?/gi);
    if (impactPercentages) {
      impactPercentages.forEach((match) => {
        const value = match.replace(/\s/g, '');
        const context = frontmatter.impact.toLowerCase();
        let label = 'Impact';
        if (context.includes('cost')) label = 'Cost Savings';
        if (context.includes('mttr') || context.includes('time')) label = 'Time Saved';
        
        if (!statistics.some(s => s.value === value)) {
          impactStats.push({ label, value, icon: '🎯' });
        }
      });
    }
  }
  
  const allStats = [...statistics, ...impactStats].slice(0, 4);

  return (
    <div className="sticky top-24">
      <div className="gh-box">
        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
          TLDR
        </h3>
        
        {/* Key Statistics */}
        {allStats.length > 0 && (
          <div className="space-y-3 mb-6">
            {allStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="p-3 bg-subtle-bg border border-border rounded-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-lg">{stat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Status Badge */}
        {frontmatter.status && (
          <div className="mb-6 pb-6 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted uppercase tracking-wide">
                Status
              </span>
              <span className="px-2 py-1 text-xs font-semibold rounded bg-accent/10 text-accent border border-accent/30">
                {frontmatter.status}
              </span>
            </div>
          </div>
        )}

        {/* Next Case Study Preview */}
        {nextCaseStudy ? (
          <div>
            <h4 className="text-xs font-semibold text-text-muted mb-3 uppercase tracking-wide">
              Next Case Study
            </h4>
            <Link
              href={`/case-studies/${nextCaseStudy.slug}`}
              className="block p-4 bg-subtle-bg border border-border rounded-md hover:border-accent transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-2">
                    {nextCaseStudy.frontmatter.title}
                  </h5>
                  {nextCaseStudy.frontmatter.subtitle && (
                    <p className="text-xs text-text-muted mb-2 line-clamp-1">
                      {nextCaseStudy.frontmatter.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-3">
                    {nextCaseStudy.sidebar.problem.substring(0, 120)}...
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-accent group-hover:text-accent-hover">
                    Read Next →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <h4 className="text-xs font-semibold text-text-muted mb-3 uppercase tracking-wide">
              More Case Studies
            </h4>
            <Link
              href="/case-studies"
              className="block p-4 bg-subtle-bg border border-border rounded-md hover:border-accent transition-all duration-200 group text-center"
            >
              <div className="text-sm font-medium text-accent group-hover:text-accent-hover">
                View All Case Studies →
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
