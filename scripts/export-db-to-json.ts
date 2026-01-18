import { seedDatabase } from './seed-database';
import { getAllCaseStudiesFromDB } from '../lib/db';
import { loadMDXFile } from '../lib/mdx-loader';
import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Export Database to JSON
 * Industry standard: Build-time data export for static generation
 * This script reads from SQLite and generates JSON for static export compatibility
 * Now includes MDX content for client-side rendering
 */
async function exportDbToJson(): Promise<void> {
  try {
    // Ensure database is seeded
    await seedDatabase();

    // Read all case studies from database
    const caseStudies = await getAllCaseStudiesFromDB();

    // Enrich with MDX content
    const enrichedCaseStudies = caseStudies.map((study) => {
      const mdxFile = loadMDXFile(study.mdxPath);
      return {
        ...study,
        mdxContent: mdxFile?.content || '',
      };
    });

    // Write to JSON file for static import
    const jsonPath = join(process.cwd(), 'lib', 'case-studies.json');
    writeFileSync(jsonPath, JSON.stringify(enrichedCaseStudies, null, 2));

    console.log(`✅ Exported ${enrichedCaseStudies.length} case studies to JSON`);
  } catch (error) {
    console.error('Error exporting database to JSON:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  exportDbToJson().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { exportDbToJson };
