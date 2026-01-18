import initSqlJs, { type Database } from 'sql.js';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { CaseStudyData } from './types';

/**
 * Database Connection
 * Industry standard: Singleton pattern for database connections
 * Uses sql.js (WASM) for cross-platform SQLite without native compilation
 * Verification: Test database initialization, query execution, error handling
 */
let db: Database | null = null;
let sqlJs: any = null;

async function getDatabase(): Promise<Database | null> {
  if (db) {
    return db;
  }

  try {
    // Initialize sql.js
    if (!sqlJs) {
      const path = require('path');
      sqlJs = await initSqlJs({
        locateFile: (file: string) =>
          path.join(__dirname, '../node_modules/sql.js/dist/', file),
      });
    }

    // For static export, database is read at build time
    const dbPath = join(process.cwd(), 'data', 'case-studies.db');

    if (!existsSync(dbPath)) {
      console.warn(`Database not found at ${dbPath}. Run 'npm run db:seed' to create it.`);
      return null;
    }

    const buffer = readFileSync(dbPath);
    db = new sqlJs.Database(buffer);
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    return null;
  }
}

/**
 * Initialize Database Schema
 * Industry standard: Schema definition and migration pattern
 */
export async function initializeDatabase(): Promise<void> {
  try {
    if (!sqlJs) {
      const path = require('path');
      sqlJs = await initSqlJs({
        locateFile: (file: string) =>
          path.join(__dirname, '../node_modules/sql.js/dist/', file),
      });
    }

    const dbPath = join(process.cwd(), 'data', 'case-studies.db');
    const dataDir = join(process.cwd(), 'data');

    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    // Create new database or load existing
    let database: Database;
    if (existsSync(dbPath)) {
      const buffer = readFileSync(dbPath);
      database = new sqlJs.Database(buffer);
    } else {
      database = new sqlJs.Database();
    }

    // Create case_studies table
    database.run(`
      CREATE TABLE IF NOT EXISTS case_studies (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        status TEXT NOT NULL,
        timeline TEXT NOT NULL,
        impact TEXT NOT NULL,
        problem TEXT NOT NULL,
        solution TEXT NOT NULL,
        outcome TEXT NOT NULL,
        mdx_path TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Save database to file
    const data = database.export();
    const fs = require('fs');
    fs.writeFileSync(dbPath, Buffer.from(data));

    database.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

/**
 * Get all case studies from database
 * Industry standard: Data access layer pattern
 */
export async function getAllCaseStudiesFromDB(): Promise<CaseStudyData[]> {
  const database = await getDatabase();

  if (!database) {
    console.warn('Database not available, returning empty array. Run "npm run db:seed" to populate.');
    return [];
  }

  try {
    const result = database.exec(`
      SELECT 
        slug,
        title,
        subtitle,
        status,
        timeline,
        impact,
        problem,
        solution,
        outcome,
        mdx_path
      FROM case_studies
      ORDER BY created_at DESC
    `);

    if (!result || result.length === 0 || !result[0]) {
      return [];
    }

    const rows = result[0].values;

    return rows.map((row: any[]) => ({
      slug: row[0] as string,
      frontmatter: {
        title: row[1] as string,
        subtitle: row[2] as string,
        status: row[3] as string,
        timeline: row[4] as string,
        impact: row[5] as string,
      },
      sidebar: {
        problem: row[6] as string,
        solution: row[7] as string,
        outcome: row[8] as string,
      },
      mdxPath: row[9] as string,
    }));
  } catch (error) {
    console.error('Error fetching case studies from database:', error);
    return [];
  }
}

/**
 * Get case study by slug from database
 * Industry standard: Single record lookup pattern
 */
export async function getCaseStudyBySlugFromDB(
  slug: string,
): Promise<CaseStudyData | undefined> {
  const database = await getDatabase();

  if (!database) {
    return undefined;
  }

  try {
    const stmt = database.prepare(`
      SELECT 
        slug,
        title,
        subtitle,
        status,
        timeline,
        impact,
        problem,
        solution,
        outcome,
        mdx_path
      FROM case_studies
      WHERE slug = ?
    `);

    stmt.bind([slug]);
    const result = stmt.getAsObject() as {
      slug?: string;
      title?: string;
      subtitle?: string;
      status?: string;
      timeline?: string;
      impact?: string;
      problem?: string;
      solution?: string;
      outcome?: string;
      mdx_path?: string;
    };

    stmt.free();

    if (!result.slug) {
      return undefined;
    }

    return {
      slug: result.slug,
      frontmatter: {
        title: result.title || '',
        subtitle: result.subtitle || '',
        status: result.status || '',
        timeline: result.timeline || '',
        impact: result.impact || '',
      },
      sidebar: {
        problem: result.problem || '',
        solution: result.solution || '',
        outcome: result.outcome || '',
      },
      mdxPath: result.mdx_path || '',
    };
  } catch (error) {
    console.error('Error fetching case study from database:', error);
    return undefined;
  }
}

/**
 * Close database connection
 * Industry standard: Resource cleanup
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
