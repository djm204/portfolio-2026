'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthButton } from './auth-button';

/**
 * Navigation Component
 * Verification: Test active state highlighting, keyboard navigation, responsive menu
 * Should be fully accessible and indicate current page
 */
export function Navigation(): JSX.Element {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/case-studies', label: 'Case Studies' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-semibold text-foreground hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
          >
            davidmendez
          </Link>
          <div className="flex items-center gap-4">
            <ul className="flex gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
                        isActive
                          ? 'bg-subtle-bg text-foreground border border-border'
                          : 'text-text-muted hover:text-foreground hover:bg-subtle-bg'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
