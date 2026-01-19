'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProjectMetrics } from '@/lib/types';

/**
 * Project Monitoring Dashboard Component
 * Verification: Test loading states, metric calculations, responsive layout
 * Should display key SRE/engineering metrics that demonstrate value
 */
export function ProjectMonitor(): React.JSX.Element {
  const [projects, setProjects] = useState<ProjectMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - in production, fetch from monitoring service
    let isMounted = true;
    const timer = setTimeout(() => {
      if (!isMounted) return;

      // Projects with contribution-focused metrics
      const mockProjects: ProjectMetrics[] = [
        {
          name: 'GlobalVision Infrastructure',
          description: 'Legacy Windows/C++ → Vercel/AWS Edge-first migration',
          status: 'operational',
          role: 'Lead Architect',
          timeline: '6 months',
          costReduction: 80,
          costSavings: 14000, // $14k/month savings
          technologiesMigrated: 5, // Windows → Linux, C++ → Node.js, etc.
          architectureDecisions: 12, // Key architectural decisions
          lastDeployed: new Date('2024-04-22').toISOString(),
          techStack: ['Next.js', 'Vercel', 'AWS', 'Node.js', 'TypeScript'],
        },
        {
          name: 'Release Track System',
          description: 'Multi-tiered release pipeline (Latest, N-1, N-2) for enterprise stability',
          status: 'operational',
          role: 'Tech Lead',
          timeline: '3 months',
          teamSize: 4,
          architectureDecisions: 8, // Release strategy, deployment architecture
          lastDeployed: new Date('2024-05-30').toISOString(),
          techStack: ['Vercel', 'RDS', 'NestJS', 'React', 'GitHub Actions'],
        },
        {
          name: 'Observability Standardization',
          description: 'Axiom + Sentry integration for unified logging, monitoring, and error tracking',
          status: 'operational',
          role: 'Staff Engineer',
          timeline: '2 months',
          teamSize: 6,
          technologiesMigrated: 2, // Multiple tools → Axiom + Sentry
          architectureDecisions: 6, // Observability patterns, error tracking strategy
          lastDeployed: new Date('2024-08-15').toISOString(),
          techStack: ['Axiom', 'Sentry', 'Next.js', 'TypeScript', 'Observability'],
        },
        {
          name: 'Internal Tooling & Security',
          description: 'Custom Retool admin portal for Auth0 user/org management, enabling Customer Service autonomy while enforcing Principle of Least Privilege',
          status: 'operational',
          role: 'Staff Engineer',
          timeline: '3 months',
          teamSize: 3,
          architectureDecisions: 5, // Security patterns, PoLP implementation, API design
          lastDeployed: new Date('2024-06-15').toISOString(),
          techStack: ['Retool', 'Auth0', 'REST API', 'Security'],
        },
        {
          name: 'Staples Enterprise',
          description: 'Lead Frontend - Multi-million dollar React-based e-commerce platform (2020-2021)',
          status: 'maintenance',
          role: 'Lead Frontend Engineer',
          timeline: '18 months',
          teamSize: 12,
          architectureDecisions: 15, // Component architecture, state management, performance
          lastDeployed: new Date('2020-07-31').toISOString(),
          techStack: ['React', 'TypeScript', 'REST API'],
        },
      ];

      setProjects(mockProjects);
      setLoading(false);
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-6 sm:py-8 px-4" aria-label="Project monitoring">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="gh-box animate-pulse"
              >
                <div className="h-6 w-32 bg-border rounded mb-4" />
                <div className="h-4 w-full bg-border rounded mb-2" />
                <div className="h-4 w-3/4 bg-border rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getStatusColor = (status: ProjectMetrics['status']): string => {
    switch (status) {
      case 'operational':
        return 'bg-success/20 text-success border-success/40';
      case 'degraded':
        return 'bg-warning/20 text-warning border-warning/40';
      case 'maintenance':
        return 'bg-text-muted/20 text-text-muted border-text-muted/40';
      default:
        return 'bg-text-muted/20 text-text-muted border-text-muted/40';
    }
  };

  const getStatusIndicator = (status: ProjectMetrics['status']): string => {
    switch (status) {
      case 'operational':
        return 'bg-success';
      case 'degraded':
        return 'bg-warning';
      case 'maintenance':
        return 'bg-text-muted';
      default:
        return 'bg-text-muted';
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="pt-6 sm:pt-8 pb-0 px-4" aria-label="Project monitoring">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            Project Contributions
          </h2>
          <p className="text-text-muted text-xs sm:text-sm">
            Key projects I&apos;ve led, architected, and delivered
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {projects.map((project, index) => {
            const isHighlighted = project.name === 'Observability Standardization';
            return (
            <motion.div
              key={project.name}
              className={`gh-box hover:border-accent transition-all duration-200 hover:shadow-lg relative overflow-hidden h-full flex flex-col p-4 sm:p-6 ${
                isHighlighted ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Background image commented out - can be restored if needed
              style={{
                backgroundImage: 'url(/assets/panelbg-matrix.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              */}
              {/* Overlay removed - no background image */}
              <div className="relative z-10 flex flex-col h-full">
              {/* Header with Status */}
              <div className="mb-5 pb-4 border-b border-border">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusIndicator(project.status)} animate-pulse`}
                      aria-label={`Status: ${project.status}`}
                    />
                  </div>
                </div>
                <p className="text-xs text-text-muted leading-relaxed mb-3">
                  {project.description}
                </p>
                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(project.status)}`}
                >
                  <span className="capitalize">{project.status}</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4 flex-1">
                {/* Role & Timeline */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-subtle-bg rounded p-2.5 border border-border">
                    <div className="text-xs text-text-muted mb-1 uppercase tracking-wide">
                      Role
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {project.role}
                    </div>
                  </div>
                  <div className="bg-subtle-bg rounded p-2.5 border border-border">
                    <div className="text-xs text-text-muted mb-1 uppercase tracking-wide">
                      Timeline
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {project.timeline}
                    </div>
                  </div>
                </div>

                {/* Cost Savings - The "80% Rule" in action */}
                {project.costReduction && project.costReduction > 0 && (
                  <div className="bg-subtle-bg rounded p-2.5 border border-success/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-muted uppercase tracking-wide">
                        Cost Savings
                      </span>
                      <span className="text-xs font-bold text-success px-1.5 py-0.5 rounded bg-success/20">
                        -{project.costReduction}%
                      </span>
                    </div>
                    <div className="text-base font-bold text-foreground">
                      {project.costSavings ? formatCurrency(project.costSavings) : 'N/A'}
                      <span className="text-xs font-normal text-text-muted ml-1">
                        /month
                      </span>
                    </div>
                  </div>
                )}

                {/* Team Size */}
                {project.teamSize && (
                  <div className="bg-subtle-bg rounded p-2.5 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted uppercase tracking-wide">
                        Team Size
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {project.teamSize}
                      </span>
                    </div>
                  </div>
                )}

                {/* Technologies Migrated */}
                {project.technologiesMigrated && (
                  <div className="bg-subtle-bg rounded p-2.5 border border-border">
                    <div className="text-xs text-text-muted mb-1 uppercase tracking-wide">
                      Technologies Migrated
                    </div>
                    <div className="text-base font-bold text-foreground">
                      {project.technologiesMigrated}
                    </div>
                  </div>
                )}

                {/* Architecture Decisions */}
                {project.architectureDecisions && (
                  <div className="bg-subtle-bg rounded p-2.5 border border-border">
                    <div className="text-xs text-text-muted mb-1 uppercase tracking-wide">
                      Architecture Decisions
                    </div>
                    <div className="text-base font-bold text-foreground">
                      {project.architectureDecisions}
                    </div>
                  </div>
                )}
              </div>

              {/* Tech Stack with Terminal Colors - Pinned to bottom */}
              <div className="pt-2 border-t border-border mt-auto">
                <div className="text-xs text-text-muted mb-2 uppercase tracking-wide">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-1.5 py-1">
                  {project.techStack.map((tech, techIndex) => {
                    // Terminal color rotation for visual variety
                    const colorClasses = [
                      'tag-terminal-green',
                      'tag-terminal-blue',
                      'tag-terminal-cyan',
                      'tag-terminal-yellow',
                      'tag-terminal-magenta',
                      'tag-terminal-orange',
                      'tag-terminal-purple',
                    ];
                    const colorClass =
                      colorClasses[techIndex % colorClasses.length];
                    return (
                      <span
                        key={tech}
                        className={`text-xs px-2 py-1 rounded font-medium ${colorClass}`}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Deployed - Pinned to bottom */}
              <div className="pt-2 border-t border-border flex items-center justify-between mt-auto">
                <span className="text-xs text-text-muted uppercase tracking-wide">
                  Deployed
                </span>
                <span className="text-xs font-medium text-foreground">
                  {new Date(project.lastDeployed).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
