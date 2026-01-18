/**
 * Cloudflare Pages Function: Read Case Study Content Override
 * Industry standard: Serverless API endpoint for content retrieval
 * Verification: Test content retrieval, fallback handling, caching
 * 
 * This function reads content overrides from Cloudflare KV
 * Falls back to empty if no override exists (static content will be used)
 */

export async function onRequestGet(context: {
  request: Request;
  env: {
    CONTENT_KV?: KVNamespace;
  };
}): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Missing slug parameter' }),
        {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const kv = context.env.CONTENT_KV;
    
    if (!kv) {
      // No KV configured, return empty (will use static content)
      return new Response(
        JSON.stringify({ content: null }),
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

    const key = `case-study:${slug}`;
    const content = await kv.get(key);

    if (!content) {
      // No override exists, return null (will use static content)
      return new Response(
        JSON.stringify({ content: null }),
        {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
          },
        }
      );
    }

    // Return override content
    return new Response(
      JSON.stringify({ content }),
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
    console.error('Error reading case study content:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
