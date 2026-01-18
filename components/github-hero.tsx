'use client';

import { motion } from 'framer-motion';

/**
 * GitHub-Style Hero/Profile Section
 * Verification: Test responsive layout, avatar display, stat calculations
 * Should look like a GitHub profile page header
 */
export function GitHubHero(): React.JSX.Element {
  const stats = [
    { label: 'Years Experience', value: '11+' },
    { label: 'Cost Reduction', value: '80%' },
    { label: 'Systems Deployed', value: '15+' },
    { label: 'Uptime SLA', value: '99.9%' },
  ];

  return (
    <section className="border-b border-border bg-subtle-bg" aria-label="Profile">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-accent to-accent-hover border-4 border-background shadow-lg" />
            </motion.div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                David Josef Mendez
              </h1>
              <p className="text-xl text-text-muted mb-4">
                Staff/Senior Software Engineer | Full-Stack & Infrastructure Pragmatist
              </p>
              <p className="text-text-secondary mb-6 max-w-2xl">
                Staff/Senior-level Software Engineer with 11 years of experience building
                resilient, high-availability systems. Specialist in infrastructure
                modernization, enterprise-grade release management, and cost optimization.
                Proven track record of contributing to ~80% infrastructure cost reductions
                and delivering multi-million dollar enterprise contracts.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-sm text-text-muted">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Key Highlights with Terminal Colors */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 rounded-full tag-terminal-green">
                  Legacy Modernization
                </span>
                <span className="text-sm px-3 py-1 rounded-full tag-terminal-blue">
                  Cost Optimization
                </span>
                <span className="text-sm px-3 py-1 rounded-full tag-terminal-cyan">
                  SRE
                </span>
                <span className="text-sm px-3 py-1 rounded-full tag-terminal-yellow">
                  Enterprise Release
                </span>
                <span className="text-sm px-3 py-1 rounded-full tag-terminal-magenta">
                  Full-Stack
                </span>
                <span className="text-sm px-3 py-1 rounded-full tag-terminal-orange">
                  Production Support
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
