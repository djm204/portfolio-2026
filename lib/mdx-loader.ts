import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

/**
 * MDX Loader Utility
 * Industry standard: Content management pattern for MDX files
 * Verification: Test with different MDX files, ensure frontmatter parsing works
 * 
 * This utility loads MDX files from the content directory and parses frontmatter.
 * For static export, we read files synchronously at build time.
 */

export interface MDXFile {
  slug: string;
  frontmatter: {
    title: string;
    subtitle: string;
    status: string;
    timeline: string;
    impact: string;
  };
  content: string;
  filePath: string;
}

/**
 * Load an MDX file and parse its frontmatter
 */
export function loadMDXFile(slug: string): MDXFile | null {
  try {
    const filePath = join(
      process.cwd(),
      'content',
      'case-studies',
      `${slug}.mdx`
    );

    const fileContents = readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: {
        title: data.title || '',
        subtitle: data.subtitle || '',
        status: data.status || '',
        timeline: data.timeline || '',
        impact: data.impact || '',
      },
      content,
      filePath,
    };
  } catch (error) {
    console.error(`Error loading MDX file for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Load all MDX files from the case studies directory
 */
export function loadAllMDXFiles(): MDXFile[] {
  const slugs = [
    'adr-001-legacy-migration',
    'adr-002-release-tracks',
    'adr-003-observability',
  ];

  return slugs
    .map((slug) => loadMDXFile(slug))
    .filter((file): file is MDXFile => file !== null);
}
