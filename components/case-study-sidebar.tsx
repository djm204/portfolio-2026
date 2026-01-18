'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CaseStudySidebarProps {
  sections: {
    problem: string;
    solution: string;
    outcome: string;
  };
}

/**
 * Case Study Sidebar Component
 * Verification: Test navigation, content extraction, responsive behavior
 * Should provide quick access to Problem/Solution/Outcome sections
 */
export function CaseStudySidebar({
  sections,
}: CaseStudySidebarProps): JSX.Element {
  const [activeSection, setActiveSection] = useState<
    'problem' | 'solution' | 'outcome'
  >('problem');

  const extractText = (markdown: string): string => {
    // Remove markdown headers and formatting
    return markdown
      .replace(/^##+ .+$/gm, '')
      .replace(/\*\*/g, '')
      .replace(/^[-*] /gm, '')
      .trim()
      .substring(0, 200);
  };

  const sectionsData = [
    {
      id: 'problem' as const,
      title: 'Problem',
      icon: '⚠️',
      content: sections.problem ? extractText(sections.problem) : '',
    },
    {
      id: 'solution' as const,
      title: 'Solution',
      icon: '🔧',
      content: sections.solution ? extractText(sections.solution) : '',
    },
    {
      id: 'outcome' as const,
      title: 'Outcome',
      icon: '✅',
      content: sections.outcome ? extractText(sections.outcome) : '',
    },
  ];

  return (
    <div className="sticky top-24">
      <div className="gh-box">
        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
          Quick Reference
        </h3>
        <nav className="space-y-2" aria-label="Case study sections">
          {sectionsData.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-accent/10 text-accent border border-accent/30'
                  : 'text-text-muted hover:text-foreground hover:bg-subtle-bg'
              }`}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              <div className="flex items-center gap-2">
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </div>
            </button>
          ))}
        </nav>

        {/* Active Section Preview */}
        {sectionsData.find((s) => s.id === activeSection)?.content && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 pt-6 border-t border-border"
          >
            <h4 className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wide">
              {sectionsData.find((s) => s.id === activeSection)?.title} Summary
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              {sectionsData.find((s) => s.id === activeSection)?.content}...
            </p>
          </motion.div>
        )}

        {/* Scroll to Section Links */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-xs font-semibold text-text-muted mb-3 uppercase tracking-wide">
            Jump to Section
          </h4>
          <div className="space-y-1.5">
            {sectionsData.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-xs text-accent hover:text-accent-hover transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(
                    `[data-section="${section.id}"]`,
                  );
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {section.icon} {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
