import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import type { CaseStudyData } from '../lib/types';

/**
 * Seed Cloudflare KV with Case Studies
 * Industry standard: Build-time data seeding with idempotency
 * Verification: Test KV seeding, check existing keys, handle errors gracefully
 * 
 * This script seeds KV with case study content from JSON export.
 * Only writes if keys don't exist (preserves live edits).
 * 
 * Usage:
 *   KV_NAMESPACE_ID=your_namespace_id npm run seed:kv
 *   or set KV_NAMESPACE_ID in environment
 */

interface SeedResult {
  slug: string;
  status: 'skipped' | 'seeded' | 'error';
  message: string;
}

/**
 * Check if a KV key exists
 * Returns true if key exists, false otherwise
 */
function kvKeyExists(namespaceId: string, key: string): boolean {
  try {
    // Use wrangler CLI to check if key exists
    // Exit code 1 means key doesn't exist, 0 means it exists
    execSync(
      `npx wrangler kv:key get "${key}" --namespace-id=${namespaceId}`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    return true;
  } catch (error) {
    // Key doesn't exist (exit code 1) or other error
    return false;
  }
}

/**
 * Write content to KV
 * Uses temporary file to avoid shell escaping issues
 */
function writeToKV(namespaceId: string, key: string, content: string): void {
  const { writeFileSync, unlinkSync } = require('fs');
  const { tmpdir } = require('os');
  const tmpFile = join(tmpdir(), `kv-seed-${Date.now()}-${Math.random().toString(36).substring(7)}.txt`);
  
  try {
    // Write content to temp file
    writeFileSync(tmpFile, content, 'utf-8');
    
    // Use wrangler CLI to write from file
    execSync(
      `npx wrangler kv:key put "${key}" --namespace-id=${namespaceId} --path="${tmpFile}"`,
      { encoding: 'utf-8', stdio: 'inherit' }
    );
  } finally {
    // Clean up temp file
    if (existsSync(tmpFile)) {
      unlinkSync(tmpFile);
    }
  }
}

/**
 * Seed KV with case studies from JSON
 */
async function seedKV(): Promise<void> {
  const namespaceId = process.env.KV_NAMESPACE_ID;
  
  if (!namespaceId) {
    console.error('❌ KV_NAMESPACE_ID environment variable is required');
    console.error('   Set it in your environment or .env file');
    console.error('   Example: KV_NAMESPACE_ID=abc123 npm run seed:kv');
    process.exit(1);
  }

  const jsonPath = join(process.cwd(), 'lib', 'case-studies.json');

  if (!existsSync(jsonPath)) {
    console.error('❌ case-studies.json not found');
    console.error('   Run "npm run db:export" first to generate it');
    process.exit(1);
  }

  try {
    const jsonData = readFileSync(jsonPath, 'utf-8');
    const caseStudies = JSON.parse(jsonData) as CaseStudyData[];

    if (caseStudies.length === 0) {
      console.warn('⚠️  No case studies found in JSON file');
      return;
    }

    console.log(`📦 Found ${caseStudies.length} case studies`);
    console.log(`🔍 Checking KV namespace: ${namespaceId}\n`);

    const results: SeedResult[] = [];

    for (const study of caseStudies) {
      const key = `case-study:${study.slug}`;
      
      // Check if key already exists
      if (kvKeyExists(namespaceId, key)) {
        console.log(`⏭️  Skipping ${study.slug} (already exists in KV)`);
        results.push({
          slug: study.slug,
          status: 'skipped',
          message: 'Key already exists',
        });
        continue;
      }

      // Get MDX content
      if (!study.mdxContent) {
        console.warn(`⚠️  No MDX content for ${study.slug}, skipping`);
        results.push({
          slug: study.slug,
          status: 'error',
          message: 'No MDX content',
        });
        continue;
      }

      try {
        // Write to KV
        writeToKV(namespaceId, key, study.mdxContent);
        console.log(`✅ Seeded ${study.slug} to KV`);
        results.push({
          slug: study.slug,
          status: 'seeded',
          message: 'Successfully seeded',
        });
      } catch (error) {
        console.error(`❌ Error seeding ${study.slug}:`, error);
        results.push({
          slug: study.slug,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Summary
    console.log('\n📊 Summary:');
    const seeded = results.filter((r) => r.status === 'seeded').length;
    const skipped = results.filter((r) => r.status === 'skipped').length;
    const errors = results.filter((r) => r.status === 'error').length;

    console.log(`   ✅ Seeded: ${seeded}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    if (errors > 0) {
      console.log(`   ❌ Errors: ${errors}`);
    }

    if (errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error seeding KV:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  seedKV().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { seedKV };
