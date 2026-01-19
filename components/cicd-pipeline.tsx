'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, GitBranch, Wrench, Rocket, BarChart3 } from 'lucide-react';

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
    id: 'build-test',
    name: 'Build & Test',
    description: 'Next.js static export, MDX compilation, TypeScript validation, ESLint',
    icon: Wrench,
    status: 'in-progress', // Under development
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
        return 'text-warning border-warning/40 bg-warning/10';
    }
  };

  const getStatusLabel = (status: PipelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
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
        {/* Desktop pipeline: horizontal row with connectors */}
        <div className="hidden md:flex items-center justify-center gap-0">
          {pipelineSteps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const StepIcon = step.icon;
            const isLast = index === pipelineSteps.length - 1;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative w-[240px] border rounded-lg p-5 bg-subtle-bg ${
                    step.status === 'in-progress'
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-background shadow-lg'
                      : 'shadow-sm'
                  } ${getStatusColor(step.status)}`}
                >
                  {/* Status Badge */}
                  <div className="absolute -top-2.5 left-4 z-10">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                        step.status === 'completed'
                          ? 'bg-[#1a7f37] text-white border-[#1a7f37]'
                          : step.status === 'in-progress'
                            ? 'bg-[#0969da] text-white border-[#0969da]'
                            : 'bg-[#9a6700] text-white border-[#9a6700]'
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
                  <div className="flex items-center justify-center mb-4 mt-4">
                    <div
                      className={`p-4 rounded-xl ${
                        step.status === 'completed'
                          ? 'bg-success/20'
                          : step.status === 'in-progress'
                            ? 'bg-accent/20'
                            : 'bg-warning/20'
                      }`}
                    >
                      <StepIcon
                        className={`w-7 h-7 ${
                          step.status === 'completed'
                            ? 'text-success'
                            : step.status === 'in-progress'
                              ? 'text-accent'
                              : 'text-warning'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step Name */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                    {step.name}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs text-text-muted text-center leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Horizontal Connector - dot • line • dot (GitHub Actions-like) */}
                {!isLast && (
                  <div className="flex items-center justify-center flex-shrink-0 mx-0">
                    <div className="flex items-center gap-0.5 text-border">
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <div className="w-12 h-2 rounded-full bg-border" />
                      <div className="w-2 h-2 rounded-full bg-border" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile pipeline: stacked cards with vertical connectors */}
        <div className="flex flex-col md:hidden items-stretch gap-4">
          {pipelineSteps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const StepIcon = step.icon;
            const isLast = index === pipelineSteps.length - 1;

            return (
              <div key={step.id} className="flex flex-col items-stretch">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative w-full border rounded-lg p-5 bg-subtle-bg ${
                    step.status === 'in-progress'
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-background shadow-lg'
                      : 'shadow-sm'
                  } ${getStatusColor(step.status)}`}
                >
                  {/* Status Badge */}
                  <div className="absolute -top-2.5 left-4 z-10">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                        step.status === 'completed'
                          ? 'bg-[#1a7f37] text-white border-[#1a7f37]'
                          : step.status === 'in-progress'
                            ? 'bg-[#0969da] text-white border-[#0969da]'
                            : 'bg-[#9a6700] text-white border-[#9a6700]'
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
                  <div className="flex items-center justify-center mb-4 mt-4">
                    <div
                      className={`p-4 rounded-xl ${
                        step.status === 'completed'
                          ? 'bg-success/20'
                          : step.status === 'in-progress'
                            ? 'bg-accent/20'
                            : 'bg-warning/20'
                      }`}
                    >
                      <StepIcon
                        className={`w-7 h-7 ${
                          step.status === 'completed'
                            ? 'text-success'
                            : step.status === 'in-progress'
                              ? 'text-accent'
                              : 'text-warning'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step Name */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                    {step.name}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs text-text-muted text-center leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Vertical Connector - dot • line • dot (GitHub Actions-like) */}
                {!isLast && (
                  <div className="flex flex-col items-center justify-center py-3 text-border">
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-[2px] h-6 rounded-full bg-border mt-1 mb-1" />
                    <div className="w-2 h-2 rounded-full bg-border" />
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
              Currently In Progress: Build & Test Step
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Working on optimizing the build process, MDX compilation, database export workflows,
              TypeScript validation, and ESLint configuration. This includes fine-tuning Next.js build
              configuration and ensuring efficient content compilation and code quality checks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
