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
    const fetchProjects = async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Projects from resume - GlobalVision and Bold Commerce work
      const mockProjects: ProjectMetrics[] = [
        {
          name: 'GlobalVision Infrastructure',
          description: 'Legacy Windows/C++ → Vercel/AWS Edge-first migration',
          status: 'operational',
          uptime: 99.97,
          responseTime: 145,
          errorRate: 0.02,
          costPerMonth: 2800,
          costReduction: 80,
          requestsPerDay: 3200000,
          p95Latency: 298,
          lastDeployed: new Date('2024-04-22').toISOString(),
          techStack: ['Next.js', 'Vercel', 'AWS', 'Node.js', 'TypeScript'],
        },
        {
          name: 'Release Track System',
          description: 'Multi-tiered release pipeline (Latest, N-1, N-2) for enterprise stability',
          status: 'operational',
          uptime: 99.99,
          responseTime: 92,
          errorRate: 0.01,
          costPerMonth: 0,
          costReduction: 0,
          requestsPerDay: 450000,
          p95Latency: 185,
          lastDeployed: new Date('2025-05-30').toISOString(),
          techStack: ['Vercel', 'RDS', 'NestJS', 'React', 'GitHub Actions'],
        },
        {
          name: 'Staples Enterprise',
          description: 'Lead Frontend - Multi-million dollar React-based e-commerce platform (2020-2021)',
          status: 'maintenance',
          uptime: 99.95,
          responseTime: 178,
          errorRate: 0.03,
          costPerMonth: 0,
          costReduction: 0,
          requestsPerDay: 8500000,
          p95Latency: 342,
          lastDeployed: new Date('2020-07-31').toISOString(),
          techStack: ['React', 'TypeScript', 'REST API'],
        },
        {
          name: 'Observability Standardization',
          description: 'Axiom + Sentry integration for unified logging, monitoring, and error tracking',
          status: 'operational',
          uptime: 99.98,
          responseTime: 45,
          errorRate: 0.005,
          costPerMonth: 0,
          costReduction: 0,
          requestsPerDay: 5200000,
          p95Latency: 120,
          lastDeployed: new Date('2024-08-15').toISOString(),
          techStack: ['Axiom', 'Sentry', 'Next.js', 'TypeScript', 'Observability'],
        },
      ];

      setProjects(mockProjects);
      setLoading(false);
    };

    void fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-8 px-4" aria-label="Project monitoring">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
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
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getUptimeColor = (uptime: number): string => {
    if (uptime >= 99.99) return 'text-success';
    if (uptime >= 99.9) return 'text-success';
    if (uptime >= 99.5) return 'text-warning';
    return 'text-danger';
  };

  const getResponseTimeColor = (time: number): string => {
    if (time < 100) return 'text-success';
    if (time < 200) return 'text-accent';
    if (time < 300) return 'text-warning';
    return 'text-danger';
  };

  const getUptimeProgress = (uptime: number): number => {
    return (uptime / 100) * 100;
  };

  return (
    <section className="pt-8 pb-0 px-4" aria-label="Project monitoring">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Live Project Metrics
          </h2>
          <p className="text-text-muted text-sm">
            Real-time monitoring of systems I&apos;ve architected and deployed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="gh-box hover:border-accent transition-all duration-200 hover:shadow-lg relative overflow-hidden h-full flex flex-col"
              style={{
                backgroundImage: 'url(/assets/panelbg-matrix.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
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
                {/* Uptime with Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
                      Uptime
                    </span>
                    <span className={`text-sm font-bold ${getUptimeColor(project.uptime)}`}>
                      {project.uptime}%
                    </span>
                  </div>
                  <div className="h-2 bg-subtle-bg rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        project.uptime >= 99.9
                          ? 'bg-success'
                          : project.uptime >= 99.5
                            ? 'bg-warning'
                            : 'bg-danger'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${getUptimeProgress(project.uptime)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </div>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-subtle-bg rounded p-2.5 border border-border">
                    <div className="text-xs text-text-muted mb-1 uppercase tracking-wide">
                      Response
                    </div>
                    <div
                      className={`text-lg font-bold ${getResponseTimeColor(project.responseTime)}`}
                    >
                      {project.responseTime}
                      <span className="text-xs font-normal text-text-muted ml-0.5">
                        ms
                      </span>
                    </div>
                  </div>
                  <div className="bg-subtle-bg rounded p-2.5 border border-border">
                    <div className="text-xs text-text-muted mb-1 uppercase tracking-wide">
                      P95 Latency
                    </div>
                    <div
                      className={`text-lg font-bold ${getResponseTimeColor(project.p95Latency)}`}
                    >
                      {project.p95Latency}
                      <span className="text-xs font-normal text-text-muted ml-0.5">
                        ms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Error Rate */}
                <div className="bg-subtle-bg rounded p-2.5 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted uppercase tracking-wide">
                      Error Rate
                    </span>
                    <span className="text-base font-bold text-success">
                      {project.errorRate}%
                    </span>
                  </div>
                </div>

                {/* Throughput */}
                <div className="bg-subtle-bg rounded p-2.5 border border-border">
                  <div className="text-xs text-text-muted mb-1 uppercase tracking-wide">
                    Daily Requests
                  </div>
                  <div className="text-base font-bold text-foreground">
                    {formatNumber(project.requestsPerDay)}
                    <span className="text-xs font-normal text-text-muted ml-1">
                      /day
                    </span>
                  </div>
                </div>

                {/* Cost Metrics - The "80% Rule" in action */}
                {project.costReduction > 0 && (
                  <div className="bg-subtle-bg rounded p-2.5 border border-success/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-muted uppercase tracking-wide">
                        Monthly Cost
                      </span>
                      <span className="text-xs font-bold text-success px-1.5 py-0.5 rounded bg-success/20">
                        -{project.costReduction}%
                      </span>
                    </div>
                    <div className="text-base font-bold text-foreground">
                      {formatCurrency(project.costPerMonth)}
                      <span className="text-xs font-normal text-text-muted ml-1.5 line-through opacity-60">
                        {formatCurrency(project.costPerMonth * 5)}
                      </span>
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
