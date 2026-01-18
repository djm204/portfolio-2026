import Link from 'next/link';

/**
 * Footer Component
 * Industry standard: Footer with contact links and site info
 * Verification: Test responsive layout, link accessibility
 * Should be minimal and accessible
 */
export function Footer(): JSX.Element {
  return (
    <footer
      className="border-t border-border bg-subtle-bg py-8 px-4 mt-12"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Contact Links */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="https://www.linkedin.com/in/davidmendez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2"
            >
              <span>💼</span>
              <span>LinkedIn</span>
            </Link>
            <Link
              href="mailto:me@davidmendez.dev"
              className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2"
            >
              <span>✉️</span>
              <span>me@davidmendez.dev</span>
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-text-muted">
          <p>
            Built with Next.js 15, Tailwind CSS, and Framer Motion. Deployed on
            Cloudflare Pages.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} David Mendez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
