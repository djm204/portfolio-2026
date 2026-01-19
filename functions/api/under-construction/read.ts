/**
 * Cloudflare Pages Function: Read Under Construction Flag
 * Industry standard: Serverless API endpoint for feature flags
 * Verification: Test flag retrieval, fallback handling
 * 
 * This function reads the UNDER_CONSTRUCTION flag from Cloudflare KV
 * Falls back to false if no flag exists
 */

export async function onRequestGet(context: {
  request: Request;
  env: {
    CONTENT_KV?: KVNamespace;
  };
}): Promise<Response> {
  try {
    const kv = context.env.CONTENT_KV;
    
    if (!kv) {
      // No KV configured, return false (don't show under construction)
      return new Response(
        JSON.stringify({ enabled: false }),
        {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60', // Cache for 1 minute
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const key = 'UNDER_CONSTRUCTION';
    const value = await kv.get(key);

    // If the key exists and is truthy, under construction is enabled
    const enabled = value === 'true' || value === '1' || value === 'enabled';

    return new Response(
      JSON.stringify({ enabled }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error reading under construction flag:', error);
    // On error, default to false (don't show under construction)
    return new Response(
      JSON.stringify({ enabled: false }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
