'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, GitBranch, Wrench, TestTube, Rocket, BarChart3 } from 'lucide-react';

/**
 * CI/CD Pipeline Component
 * Shows the portfolio's build and deployment pipeline
 * Industry standard: Visual pipeline representation
 * Verification: Test step states, animations, responsive layout
 */

interface PipelineStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'in-progress' | 'pending';
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 'source',
    name: 'Source',
    description: 'GitHub repository with Next.js 16, React 19, TypeScript',
    icon: GitBranch,
    status: 'completed',
  },
  {
    id: 'build',
    name: 'Build',
    description: 'Next.js static export, MDX compilation, database export',
    icon: Wrench,
    status: 'completed',
  },
  {
    id: 'test',
    name: 'Test',
    description: 'TypeScript validation, ESLint, type checking',
    icon: TestTube,
    status: 'completed',
  },
  {
    id: 'deploy',
    name: 'Deploy',
    description: 'Cloudflare Pages deployment with KV bindings',
    icon: Rocket,
    status: 'in-progress', // Under development
  },
  {
    id: 'monitor',
    name: 'Monitor',
    description: 'Google Analytics, error tracking, performance metrics',
    icon: BarChart3,
    status: 'pending',
  },
];

export function CicdPipeline(): React.JSX.Element {
  const getStatusIcon = (status: PipelineStep['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'in-progress':
        return Loader2;
      case 'pending':
        return Circle;
    }
  };

  const getStatusColor = (status: PipelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-success border-success/40 bg-success/10';
      case 'in-progress':
        return 'text-accent border-accent/40 bg-accent/10';
      case 'pending':
        return 'text-text-muted border-border bg-subtle-bg';
    }
  };

  const getStatusLabel = (status: PipelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'Under Development';
      case 'pending':
        return 'Pending';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Portfolio CI/CD Pipeline
        </h2>
        <p className="text-text-muted">
          Current build and deployment workflow
        </p>
      </div>

      <div className="relative">
        {/* Pipeline Flow */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-4">
          {pipelineSteps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const StepIcon = step.icon;
            const isLast = index === pipelineSteps.length - 1;

            return (
              <div key={step.id} className="flex flex-col md:flex-row items-center gap-4 flex-1">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative w-full md:w-auto border-2 rounded-lg p-4 transition-all ${
                    step.status === 'in-progress'
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                      : ''
                  } ${getStatusColor(step.status)}`}
                >
                  {/* Status Badge */}
                  <div className="absolute -top-2 -right-2">
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                        step.status === 'completed'
                          ? 'bg-success/20 text-success border-success/40'
                          : step.status === 'in-progress'
                            ? 'bg-accent/20 text-accent border-accent/40'
                            : 'bg-text-muted/20 text-text-muted border-border'
                      }`}
                    >
                      <StatusIcon
                        className={`w-3 h-3 ${
                          step.status === 'in-progress' ? 'animate-spin' : ''
                        }`}
                      />
                      <span>{getStatusLabel(step.status)}</span>
                    </div>
                  </div>

                  {/* Step Icon */}
                  <div className="flex items-center justify-center mb-3">
                    <div
                      className={`p-3 rounded-lg ${
                        step.status === 'completed'
                          ? 'bg-success/20'
                          : step.status === 'in-progress'
                            ? 'bg-accent/20'
                            : 'bg-subtle-bg'
                      }`}
                    >
                      <StepIcon
                        className={`w-6 h-6 ${
                          step.status === 'completed'
                            ? 'text-success'
                            : step.status === 'in-progress'
                              ? 'text-accent'
                              : 'text-text-muted'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step Name */}
                  <h3 className="text-lg font-bold text-foreground mb-1 text-center">
                    {step.name}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs text-text-muted text-center">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector Arrow */}
                {!isLast && (
                  <div className="hidden md:block flex-shrink-0">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className={`h-0.5 w-8 ${
                        step.status === 'completed'
                          ? 'bg-success'
                          : 'bg-border'
                      }`}
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                      className={`mt-[-2px] w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 ${
                        step.status === 'completed'
                          ? 'border-l-success'
                          : 'border-l-border'
                      }`}
                    />
                  </div>
                )}

                {/* Vertical Connector for Mobile */}
                {!isLast && (
                  <div className="md:hidden flex-shrink-0">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className={`w-0.5 h-8 ${
                        step.status === 'completed'
                          ? 'bg-success'
                          : 'bg-border'
                      }`}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                      className={`mt-[-2px] w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 ${
                        step.status === 'completed'
                          ? 'border-t-success'
                          : 'border-t-border'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Status Info */}
      <div className="mt-8 p-4 bg-accent/10 border border-accent/40 rounded-lg">
        <div className="flex items-start gap-3">
          <Loader2 className="w-5 h-5 text-accent animate-spin shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              Currently Under Development: Deploy Step
            </h3>
            <p className="text-sm text-text-muted">
              Working on optimizing Cloudflare Pages deployment, KV bindings configuration, and
              automated deployment workflows. This includes fine-tuning the build process and
              ensuring seamless integration with Cloudflare&apos;s edge network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
