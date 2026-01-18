import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Verification: Test by passing various className combinations
// Should merge Tailwind classes correctly without conflicts
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Calculate cost savings percentage
 * Verification: Test with various before/after values, edge cases (0, negative)
 */
export function calculateCostReduction(
  before: number,
  after: number,
): number {
  if (before <= 0) return 0;
  return Math.round(((before - after) / before) * 100);
}

/**
 * Format large numbers for display
 * Verification: Test with various number sizes (1000, 1000000, etc.)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
