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
        {/* Pipeline Flow - GitHub Actions style with wrapping */}
        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-12">
          {pipelineSteps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const StepIcon = step.icon;
            const isLast = index === pipelineSteps.length - 1;
            const connectorColor = step.status === 'completed' ? 'success' : step.status === 'pending' ? 'warning' : 'border';

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative w-[240px] border-2 rounded-lg p-6 transition-all ${
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
                            : 'bg-[#9a6700] text-white border-[#9a6700]'
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
                            : 'bg-warning/30'
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
                  <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                    {step.name}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-text-muted text-center leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector Arrow - Horizontal for all screen sizes */}
                {!isLast && (
                  <div className="flex items-center justify-center flex-shrink-0 mx-2">
                    <motion.svg
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      width="80"
                      height="20"
                      viewBox="0 0 80 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="overflow-visible"
                    >
                      {/* Arrow Line */}
                      <motion.line
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        x1="0"
                        y1="10"
                        x2="60"
                        y2="10"
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke={
                          connectorColor === 'success'
                            ? 'var(--success)'
                            : connectorColor === 'warning'
                              ? 'var(--warning)'
                              : 'var(--border)'
                        }
                      />
                      {/* Arrow Head */}
                      <motion.polygon
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                        points="60,5 75,10 60,15"
                        fill={
                          connectorColor === 'success'
                            ? 'var(--success)'
                            : connectorColor === 'warning'
                              ? 'var(--warning)'
                              : 'var(--border)'
                        }
                      />
                    </motion.svg>
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
