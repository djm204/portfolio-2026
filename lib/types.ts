// Verification: These types ensure type safety across the application
// Test by importing and using in components, ensuring TypeScript catches mismatches

export interface ProjectMetrics {
  name: string;
  description: string;
  status: 'operational' | 'degraded' | 'maintenance';
  // Contribution-focused metrics
  role: string; // e.g., "Lead Engineer", "Architect", "Tech Lead"
  timeline: string; // e.g., "6 months", "Q2 2024"
  costReduction?: number; // percentage (if applicable)
  costSavings?: number; // dollar amount saved per month/year
  teamSize?: number; // team size worked with
  technologiesMigrated?: number; // number of technologies/platforms migrated
  architectureDecisions?: number; // key architectural decisions made
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
