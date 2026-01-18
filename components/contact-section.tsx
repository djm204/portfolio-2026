'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Contact Section Component
 * Industry standard: Contact information display with social links
 * Verification: Test link accessibility, responsive layout, hover effects
 */
export function ContactSection(): JSX.Element {
  const contactLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/davidmendez',
      icon: '💼',
      description: 'Connect on LinkedIn',
    },
    {
      label: 'Email',
      href: 'mailto:me@davidmendez.dev',
      icon: '✉️',
      description: 'me@davidmendez.dev',
    },
  ];

  return (
    <section className="py-12 border-t border-border" aria-label="Contact">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Interested in discussing engineering challenges, infrastructure modernization,
            or potential opportunities? Let&apos;s connect.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 px-6 py-4 bg-subtle-bg border border-border rounded-lg hover:border-accent hover:bg-background transition-all duration-200 min-w-[200px]"
              >
                <span className="text-2xl">{link.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs text-text-muted">{link.description}</span>
                </div>
                {link.href.startsWith('http') && (
                  <span className="ml-auto text-text-muted group-hover:text-accent transition-colors">
                    →
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
