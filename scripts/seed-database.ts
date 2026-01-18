import initSqlJs, { type Database } from 'sql.js';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Database Seeding Script
 * Industry standard: Data migration and seeding pattern
 * Run with: npm run db:seed
 */
async function seedDatabase(): Promise<void> {
  try {
    const path = require('path');
    const sqlJs = await initSqlJs({
      locateFile: (file: string) =>
        path.join(__dirname, '../node_modules/sql.js/dist/', file),
    });

    const dbPath = join(process.cwd(), 'data', 'case-studies.db');
    const dataDir = join(process.cwd(), 'data');

    // Ensure data directory exists
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    // Create new database or load existing
    let db: Database;
    if (existsSync(dbPath)) {
      const buffer = readFileSync(dbPath);
      db = new sqlJs.Database(buffer);
      // Clear existing data
      db.run('DELETE FROM case_studies');
    } else {
      db = new sqlJs.Database();
      // Create schema
      db.run(`
        CREATE TABLE case_studies (
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
    }

    // Insert case studies
    const insert = db.prepare(`
      INSERT INTO case_studies (
        slug, title, subtitle, status, timeline, impact,
        problem, solution, outcome, mdx_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const caseStudies = [
      {
        slug: 'globalvision-modernization',
        title: 'ADR-001: Migration from Legacy Windows/C++ to Edge-First Vercel Architecture',
        subtitle: 'Legacy Windows/C++ to Edge-First Architecture Migration',
        status: 'Completed',
        timeline: '6 months',
        impact: '80% cost reduction, instant deployments, improved reliability',
        problem: `The legacy infrastructure relied on a Windows/C++ stack that was becoming increasingly expensive to maintain, slow to scale, and difficult to deploy. Key challenges included high operational costs, manual deployment cycles, limited scalability, technical debt, and deployment risk.`,
        solution: `We migrated to an Edge-first architecture on Vercel, backed by AWS services. This included strategic teardown of legacy infrastructure, incremental migration approach, and infrastructure as code.`,
        outcome: `Achieved 80% reduction in infrastructure costs, shifted from multi-hour deployments to near-instant Edge deployments, improved reliability, and scaled from 10K to 1M+ concurrent users.`,
        mdx_path: 'adr-001-legacy-migration',
      },
      {
        slug: 'release-track-system',
        title: 'ADR-002: Implementation of Multi-Tiered Release Tracks',
        subtitle: 'Multi-tiered release pipeline for enterprise stability',
        status: 'Completed',
        timeline: '6 months',
        impact: 'Customer retention, feature parity, risk mitigation',
        problem: `GlobalVision served high-value enterprise clients with varying risk tolerances. While some clients wanted the latest features immediately, others required extreme stability and "pinned" versions to satisfy their own internal compliance and QA cycles.`,
        solution: `I designed and implemented a three-track release system: Latest (for early adopters), Pinned N-1 (standard stable), and Pinned N-2 (high-compliance clients). This included release pipeline automation, feature flags, and automated testing.`,
        outcome: `High-value enterprise clients remained on the platform because we respected their need for stability. The engineering team could continue shipping to the "Latest" track without breaking production for "Pinned" users.`,
        mdx_path: 'adr-002-release-tracks',
      },
      {
        slug: 'observability-standardization',
        title: 'ADR-003: Standardizing Observability with Axiom and Sentry',
        subtitle: 'Centralized logging and error tracking for Edge-first architecture',
        status: 'Completed',
        timeline: '3 months',
        impact: '90%+ MTTR reduction, proactive monitoring',
        problem: `Post-migration, the decentralized nature of Edge functions and AWS Lambdas made debugging difficult. We lacked a "single pane of glass" for logs and real-time error reporting, leading to increased Mean Time to Recovery (MTTR) during incidents.`,
        solution: `We standardized our observability stack on Axiom for log aggregation and Sentry for error tracking. Axiom was chosen for high-performance querying and cost-effective ingestion. Sentry was chosen for deep React/Next.js integration and comprehensive stack traces.`,
        outcome: `The "Verify" application team could identify and resolve production regressions in minutes rather than hours. Established automated alerts that allowed the team to fix errors before they were reported by enterprise clients.`,
        mdx_path: 'adr-003-observability',
      },
    ];

    // Insert all case studies
    for (const study of caseStudies) {
      insert.run([
        study.slug,
        study.title,
        study.subtitle,
        study.status,
        study.timeline,
        study.impact,
        study.problem,
        study.solution,
        study.outcome,
        study.mdx_path,
      ]);
    }

    insert.free();

    // Save database to file
    const data = db.export();
    writeFileSync(dbPath, Buffer.from(data));
    db.close();

    console.log(`✅ Seeded ${caseStudies.length} case studies into database`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { seedDatabase };
