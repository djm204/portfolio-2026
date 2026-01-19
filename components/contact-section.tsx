'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './theme-provider';

/**
 * Contact Section Component
 * Industry standard: Contact information display with social links
 * Verification: Test link accessibility, responsive layout, hover effects
 */
export function ContactSection(): React.JSX.Element {
  const { theme } = useTheme();
  
  const contactLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/djm204',
      icon: 'image',
      description: 'Connect on LinkedIn',
    },
    {
      label: 'Email',
      href: 'mailto:me@davidmendez.dev',
      icon: 'svg',
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
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
                className="group flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-subtle-bg border border-border rounded-lg hover:border-accent hover:bg-background transition-all duration-200 w-full sm:min-w-[200px]"
              >
                {link.icon === 'image' ? (
                  <Image
                    src={theme === 'dark' ? '/assets/linkedin-white.png' : '/assets/linkedin-black.png'}
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-text-muted group-hover:text-accent transition-colors"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )}
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
