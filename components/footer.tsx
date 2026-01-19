'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './theme-provider';

/**
 * Footer Component
 * Industry standard: Footer with contact links and site info
 * Verification: Test responsive layout, link accessibility
 * Should be minimal and accessible
 */
export function Footer(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <footer
      className="border-t border-border bg-subtle-bg py-8 px-4 mt-0"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
          {/* Contact Links */}
          <div className="flex flex-wrap gap-6 items-center">
            <Link
              href="https://www.linkedin.com/in/djm204"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2"
            >
              <Image
                src={theme === 'dark' ? '/assets/linkedin-white.png' : '/assets/linkedin-black.png'}
                alt="LinkedIn"
                width={20}
                height={20}
                className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
                unoptimized
              />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="mailto:me@davidmendez.dev"
              className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>me@davidmendez.dev</span>
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-text-muted">
          <p>
            Built with Next.js 16, React 19, Tailwind CSS 4, and TypeScript.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} David Mendez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
