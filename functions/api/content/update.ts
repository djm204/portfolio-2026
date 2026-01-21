/**
 * Cloudflare Pages Function: Update Content (Generic)
 * Industry standard: Serverless API endpoint for content updates
 * Verification: Test authentication, content updates, error handling
 * 
 * This function handles updates for any content type (about page, etc.)
 * Uses different KV key prefix than case studies to prevent conflicts
 */

export async function onRequestPost(context: {
  request: Request;
  env: {
    ADMIN_EMAIL?: string;
    GOOGLE_CLIENT_ID?: string;
    CONTENT_KV?: KVNamespace; // Cloudflare KV namespace for content overrides
  };
}): Promise<Response> {
  try {
    // Verify authentication
    const authHeader = context.request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const token = authHeader.substring(7);

    // Verify token with Google
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const userInfo = await userInfoResponse.json() as { email: string };
    const adminEmail = context.env.ADMIN_EMAIL || 'me@davidmendez.dev';

    if (userInfo.email !== adminEmail) {
      return new Response(JSON.stringify({ error: 'Access denied' }), {
        status: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Parse request body
    const body = await context.request.json() as { slug: string; content: string };
    const { slug, content } = body;

    if (!slug || !content) {
      return new Response(
        JSON.stringify({ error: 'Missing slug or content' }),
        {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Save content to Cloudflare KV with content: prefix (different from case-study:)
    // This prevents conflicts with case study content
    const kv = context.env.CONTENT_KV;
    
    if (kv) {
      const key = `content:${slug}`;
      await kv.put(key, content, {
        metadata: {
          updatedAt: new Date().toISOString(),
          updatedBy: userInfo.email,
        },
      });
    } else {
      // Fallback: Log warning if KV is not configured
      console.warn('CONTENT_KV namespace not configured. Content update not persisted.');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Content updated',
        slug,
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {
    console.error('Error updating content:', error);
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
