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
    status: 'in-progress', // Under development
  },
  {
    id: 'test',
    name: 'Test',
    description: 'TypeScript validation, ESLint, type checking',
    icon: TestTube,
    status: 'pending',
  },
  {
    id: 'deploy',
    name: 'Deploy',
    description: 'Cloudflare Pages deployment with KV bindings',
    icon: Rocket,
    status: 'pending',
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
        <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-4">
          {pipelineSteps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const StepIcon = step.icon;
            const isLast = index === pipelineSteps.length - 1;
            const connectorColor = step.status === 'completed' ? 'success' : 'border';

            return (
              <div key={step.id} className="flex flex-col md:flex-row items-center gap-4 md:gap-4 flex-1 min-w-[200px]">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative w-full md:min-w-[220px] border-2 rounded-lg p-6 transition-all ${
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
                          ? 'bg-[#1a7f37] text-white border-[#1a7f37]'
                          : step.status === 'in-progress'
                            ? 'bg-[#0969da] text-white border-[#0969da]'
                            : 'bg-[#57606a] text-white border-[#57606a]'
                      }`}
                      style={{ opacity: 1 }}
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
                          ? 'bg-success/30'
                          : step.status === 'in-progress'
                            ? 'bg-accent/30'
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
                  <div className="hidden md:flex items-center justify-center flex-shrink-0 px-4">
                    <div className="flex items-center relative">
                      {/* Line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className={`h-2 w-20 ${
                          connectorColor === 'success'
                            ? 'bg-success'
                            : 'bg-border'
                        }`}
                      />
                      {/* Arrow Head */}
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                        className={`absolute right-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] ${
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
                  <div className="md:hidden flex flex-col items-center justify-center flex-shrink-0 py-4">
                    <div className="flex flex-col items-center relative">
                      {/* Line */}
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className={`w-2 h-20 ${
                          connectorColor === 'success'
                            ? 'bg-success'
                            : 'bg-border'
                        }`}
                      />
                      {/* Arrow Head */}
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                        className={`absolute bottom-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] ${
                          connectorColor === 'success'
                            ? 'border-t-success'
                            : 'border-t-border'
                        }`}
                      />
                    </div>
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
              Currently Under Development: Build Step
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Working on optimizing the build process, MDX compilation, database export workflows,
              and static site generation. This includes fine-tuning Next.js build configuration and
              ensuring efficient content compilation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
