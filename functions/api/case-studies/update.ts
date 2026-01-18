/**
 * Cloudflare Pages Function: Update Case Study Content
 * Industry standard: Serverless API endpoint for content updates
 * Verification: Test authentication, content updates, error handling
 * 
 * This function will be deployed as a Cloudflare Pages Function
 * and handles authenticated content updates
 */

export async function onRequestPost(context: {
  request: Request;
  env: {
    ADMIN_EMAIL?: string;
    GOOGLE_CLIENT_ID?: string;
  };
}): Promise<Response> {
  try {
    // Verify authentication
    const authHeader = context.request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userInfo = await userInfoResponse.json();
    const adminEmail = context.env.ADMIN_EMAIL || 'me@davidmendez.dev';

    if (userInfo.email !== adminEmail) {
      return new Response(JSON.stringify({ error: 'Access denied' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse request body
    const body = await context.request.json();
    const { slug, content } = body;

    if (!slug || !content) {
      return new Response(
        JSON.stringify({ error: 'Missing slug or content' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // TODO: Save content to database or file system
    // For now, return success
    // In production, you'd update the database or trigger a rebuild

    return new Response(
      JSON.stringify({ success: true, message: 'Content updated' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating case study:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
