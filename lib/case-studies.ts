import type { CaseStudyData } from './types';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Case Studies Data Access Layer
 * Industry standard: Database abstraction layer with JSON fallback
 * For static export: Reads from JSON file generated at build time from SQLite
 * Verification: Type-safe, handles missing data gracefully
 */

let cachedCaseStudies: CaseStudyData[] | null = null;

/**
 * Load case studies from JSON (generated from SQLite at build time)
 * Industry standard: Build-time data export pattern
 */
function loadCaseStudiesFromJson(): CaseStudyData[] {
  if (cachedCaseStudies) {
    return cachedCaseStudies;
  }

  const jsonPath = join(process.cwd(), 'lib', 'case-studies.json');

  if (!existsSync(jsonPath)) {
    console.warn(
      'case-studies.json not found. Run "npm run db:seed" and "npm run db:export" to generate it.',
    );
    return [];
  }

  try {
    const jsonData = readFileSync(jsonPath, 'utf-8');
    cachedCaseStudies = JSON.parse(jsonData) as CaseStudyData[];
    return cachedCaseStudies;
  } catch (error) {
    console.error('Error loading case studies from JSON:', error);
    return [];
  }
}

/**
 * Get case study by slug
 * Industry standard: Helper function for type-safe lookups
 * Reads from JSON file generated from SQLite at build time
 */
export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  const caseStudies = loadCaseStudiesFromJson();
  return caseStudies.find((study) => study.slug === slug);
}

/**
 * Get all case studies for index page
 * Industry standard: Exported data for static generation
 * Reads from JSON file generated from SQLite at build time
 */
export function getAllCaseStudies(): CaseStudyData[] {
  return loadCaseStudiesFromJson();
}

/**
 * Get the next case study after the current one
 * Industry standard: Navigation helper for sequential case studies
 * Returns undefined if there's no next case study (current is last)
 */
export function getNextCaseStudy(currentSlug: string): CaseStudyData | undefined {
  const caseStudies = loadCaseStudiesFromJson();
  const currentIndex = caseStudies.findIndex((study) => study.slug === currentSlug);
  
  if (currentIndex === -1 || currentIndex === caseStudies.length - 1) {
    return undefined;
  }
  
  return caseStudies[currentIndex + 1];
}
