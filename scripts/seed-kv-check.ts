/**
 * Check and Seed KV (Build-time wrapper)
 * Industry standard: Conditional build step that doesn't fail if KV not configured
 * 
 * This script checks if KV_NAMESPACE_ID is set and seeds KV if available.
 * If not set, it exits gracefully (build continues without KV seeding).
 */

async function checkAndSeed(): Promise<void> {
  if (!process.env.KV_NAMESPACE_ID) {
    console.log('⚠️  KV_NAMESPACE_ID not set, skipping KV seed');
    console.log('   Set KV_NAMESPACE_ID in your environment to enable KV seeding');
    process.exit(0);
  }

  try {
    const { seedKV } = await import('./seed-kv');
    await seedKV();
  } catch (error) {
    console.error('Error seeding KV:', error);
    // Don't fail build if KV seeding fails
    console.log('⚠️  Continuing build despite KV seed error');
    process.exit(0);
  }
}

checkAndSeed();
