/**
 * Footer Component
 * Verification: Test responsive layout, link accessibility
 * Should be minimal and accessible
 */
export function Footer(): JSX.Element {
  return (
    <footer
      className="border-t border-border bg-subtle-bg py-8 px-4 mt-12"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto text-center text-sm text-text-muted">
        <p>
          Built with Next.js 15, Tailwind CSS, and Framer Motion. Deployed on
          Cloudflare Pages.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} David Mendez. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
