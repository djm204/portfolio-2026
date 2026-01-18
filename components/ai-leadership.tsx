'use client';

import { motion } from 'framer-motion';

/**
 * AI Leadership Showcase Component
 * Verification: Test responsive layout, link accessibility, content readability
 * Should demonstrate the philosophy without being overly technical
 */
export function AILeadership(): JSX.Element {
  return (
    <section
      className="py-12"
      aria-labelledby="ai-leadership-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          id="ai-leadership-heading"
          className="text-2xl font-semibold mb-6 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The AI-Accelerated Engineer
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                The Philosophy
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                AI tools like LLMs and GitHub Copilot aren&apos;t replacements for
                engineering judgment—they&apos;re force-multipliers for velocity and
                code quality. The key is understanding when to leverage AI for
                boilerplate reduction and when to apply human expertise for
                architectural decisions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Internal Advocacy
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                At GlobalVision, I mentored engineering teams on prompt
                engineering and code verification strategies. This included
                establishing best practices for AI-assisted development, focusing
                on verification-first workflows that maintain code quality while
                accelerating delivery.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="gh-box-subtle border-l-4 border-accent">
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Real-World Example: This Portfolio
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4 text-sm">
                This entire portfolio was built using Cursor, demonstrating
                AI-assisted development in practice. Every component includes
                verification comments explaining how to test it, and the
                architecture follows SRE principles with error boundaries and
                loading states built-in from the start.
              </p>
              <p className="text-text-secondary leading-relaxed text-sm">
                <strong className="text-foreground">SRE Mindset in Action:</strong> Rather than accepting
                AI-generated code at face value, each component was verified for
                accessibility, performance, and maintainability. This portfolio
                itself serves as a meta-demonstration of AI fluency combined
                with engineering rigor.
              </p>
            </div>

            <div className="gh-box-subtle">
              <h4 className="text-base font-semibold mb-3 text-foreground">
                Key Principles
              </h4>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li className="flex items-start">
                  <span className="mr-2 text-success">✓</span>
                  <span>
                    Always verify AI output—don&apos;t trust, always verify
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-success">✓</span>
                  <span>
                    Use AI for repetitive tasks, not architectural decisions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-success">✓</span>
                  <span>
                    Document the &quot;why&quot; behind AI-assisted changes (ADRs)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-success">✓</span>
                  <span>
                    Maintain code quality standards regardless of generation
                    method
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
