'use client';

import { useTheme } from './theme-provider';

/**
 * Theme Toggle Component
 * Industry standard: Theme switcher button
 * Verification: Test theme switching, icon display, accessibility
 */
export function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md text-sm font-medium text-text-muted hover:text-foreground hover:bg-subtle-bg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
