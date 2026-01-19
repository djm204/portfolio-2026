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
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Portfolio CI/CD Pipeline
        </h2>
        <p className="text-text-muted">
          Current build and deployment workflow
        </p>
      </div>

      <div className="relative">
        {/* Pipeline Flow */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-3">
          {pipelineSteps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const StepIcon = step.icon;
            const isLast = index === pipelineSteps.length - 1;
            const connectorColor = step.status === 'completed' ? 'success' : 'border';

            return (
              <div key={step.id} className="flex flex-col md:flex-row items-center gap-4 md:gap-3 flex-1">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative w-full md:flex-1 min-w-0 border-2 rounded-lg p-5 transition-all ${
                    step.status === 'in-progress'
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-background shadow-lg'
                      : ''
                  } ${getStatusColor(step.status)}`}
                >
                  {/* Status Badge */}
                  <div className="absolute -top-2.5 -right-2.5 z-10">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                        step.status === 'completed'
                          ? 'bg-success/20 text-success border-success/40'
                          : step.status === 'in-progress'
                            ? 'bg-accent/20 text-accent border-accent/40'
                            : 'bg-text-muted/20 text-text-muted border-border'
                      }`}
                    >
                      <StatusIcon
                        className={`w-3.5 h-3.5 ${
                          step.status === 'in-progress' ? 'animate-spin' : ''
                        }`}
                      />
                      <span>{getStatusLabel(step.status)}</span>
                    </div>
                  </div>

                  {/* Step Icon */}
                  <div className="flex items-center justify-center mb-4 mt-2">
                    <div
                      className={`p-4 rounded-xl ${
                        step.status === 'completed'
                          ? 'bg-success/20'
                          : step.status === 'in-progress'
                            ? 'bg-accent/20'
                            : 'bg-subtle-bg'
                      }`}
                    >
                      <StepIcon
                        className={`w-7 h-7 ${
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
                  <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                    {step.name}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-text-muted text-center leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector Arrow - Desktop */}
                {!isLast && (
                  <div className="hidden md:flex items-center flex-shrink-0 px-2">
                    <div className="flex items-center">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                        className={`h-1 w-12 ${
                          connectorColor === 'success'
                            ? 'bg-success'
                            : 'bg-border'
                        }`}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                        className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] ${
                          connectorColor === 'success'
                            ? 'border-l-success'
                            : 'border-l-border'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Vertical Connector for Mobile */}
                {!isLast && (
                  <div className="md:hidden flex flex-col items-center flex-shrink-0 py-2">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                      className={`w-1 h-12 ${
                        connectorColor === 'success'
                          ? 'bg-success'
                          : 'bg-border'
                      }`}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                      className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${
                        connectorColor === 'success'
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
      <div className="mt-10 p-5 bg-accent/10 border border-accent/40 rounded-lg">
        <div className="flex items-start gap-4">
          <Loader2 className="w-6 h-6 text-accent animate-spin shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-2 text-lg">
              Currently Under Development: Deploy Step
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
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
