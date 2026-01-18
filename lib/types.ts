// Verification: These types ensure type safety across the application
// Test by importing and using in components, ensuring TypeScript catches mismatches

export interface ProjectMetrics {
  name: string;
  description: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime: number;
  responseTime: number; // ms
  errorRate: number; // percentage
  costPerMonth: number;
  costReduction: number; // percentage
  requestsPerDay: number;
  p95Latency: number; // ms
  lastDeployed: string;
  techStack: string[];
}

/**
 * Case Study Frontmatter Schema
 * Industry standard: Type-safe frontmatter definition
 */
export interface CaseStudyFrontmatter {
  title: string;
  subtitle: string;
  status: string;
  timeline: string;
  impact: string;
}

/**
 * Case Study Sidebar Data
 * Industry standard: Structured sidebar content
 */
export interface CaseStudySidebar {
  problem: string;
  solution: string;
  outcome: string;
}

/**
 * Case Study Data Structure
 * Industry standard: Complete case study definition
 * Now uses MDX file paths instead of React component names
 * mdxContent is included for client-side rendering in static export
 */
export interface CaseStudyData {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  sidebar: CaseStudySidebar;
  mdxPath: string; // Path to MDX file (e.g., 'adr-001-legacy-migration')
  mdxContent?: string; // MDX content (included in JSON export for static generation)
}
