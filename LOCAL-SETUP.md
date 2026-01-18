# Local Development Setup with OAuth

This guide will help you set up Google OAuth authentication for local development.

## Prerequisites

- Node.js installed
- A Google account (must be `me@davidmendez.dev` for admin access)
- Google Cloud Console access

## Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)

2. **Create or Select a Project**
   - Create a new project or select an existing one
   - Note the project name for reference

3. **Enable Google Identity Services**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Identity Services API" or "Google+ API"
   - Click "Enable" if not already enabled

4. **Create OAuth 2.0 Client ID**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
     - Choose "External" (unless you have a Google Workspace)
     - Fill in required fields (App name, User support email, Developer contact)
     - Add your email to test users if needed
     - Save and continue through the scopes (defaults are fine)
     - Save and continue through test users
     - Back to dashboard

5. **Configure OAuth Client**
   - Application type: **Web application**
   - Name: `Portfolio Local Dev` (or any name you prefer)
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:3000
     ```
   - Click "Create"
   - **Copy the Client ID** (you'll need this in the next step)

## Step 2: Configure Environment Variables

1. **Create `.env.local` file** in the project root:
   ```bash
   touch .env.local
   ```

2. **Add your credentials** to `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
   ADMIN_EMAIL=me@davidmendez.dev
   ```

   Replace `your_client_id_here` with the Client ID you copied from Google Cloud Console.

3. **Verify `.env.local` is in `.gitignore`** (it should be):
   ```bash
   grep .env.local .gitignore
   ```
   If not, add it to prevent committing secrets.

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Step 5: Test Authentication

1. **Open the site** in your browser: `http://localhost:3000`
2. **Click "Sign In with Google"** in the navigation
3. **Sign in** with your Google account
4. **Verify access:**
   - If you're signed in as `me@davidmendez.dev`, you should see your name in the navigation
   - Navigate to any case study page
   - Hover over the content to see the "Edit" button (admin only)

## Important Notes for Local Development

### ⚠️ API Endpoints Limitation

The content editing API endpoints (`/api/case-studies/update` and `/api/case-studies/read`) are **Cloudflare Pages Functions** and will **not work in local development** with `next dev`.

**What works locally:**
- ✅ Google OAuth sign-in
- ✅ Authentication state management
- ✅ UI for editing (Edit button, textarea)
- ✅ Client-side validation

**What doesn't work locally:**
- ❌ Saving content (API endpoint not available)
- ❌ Reading content overrides from KV (API endpoint not available)

### Workarounds for Local Testing

**Option 1: Test on Cloudflare Pages (Recommended)**
- Deploy to Cloudflare Pages
- Set up environment variables in Cloudflare dashboard
- Test the full editing flow there

**Option 2: Mock API Endpoints (Advanced)**
- Create Next.js API routes in `app/api/` for local development
- These will be ignored in static export but work with `next dev`
- See "Local API Routes" section below

## Local API Routes (Optional)

If you want to test the full editing flow locally, you can create mock API routes that work with `next dev`:

### Create `app/api/case-studies/update/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // Verify token with Google
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!userInfoResponse.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userInfo = await userInfoResponse.json();
    const adminEmail = process.env.ADMIN_EMAIL || 'me@davidmendez.dev';

    if (userInfo.email !== adminEmail) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { slug, content } = body;

    if (!slug || !content) {
      return NextResponse.json(
        { error: 'Missing slug or content' },
        { status: 400 }
      );
    }

    // In local dev, just log the content (or save to a local file)
    console.log(`[LOCAL DEV] Content update for ${slug}:`, content.substring(0, 100) + '...');

    return NextResponse.json({
      success: true,
      message: 'Content updated (local dev - not persisted)',
      slug,
    });
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Create `app/api/case-studies/read/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    // In local dev, return null (no overrides)
    return NextResponse.json(
      { content: null },
      {
        headers: {
          'Cache-Control': 'public, max-age=60',
        },
      }
    );
  } catch (error) {
    console.error('Error reading case study content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Note:** These routes will be ignored during static export (`npm run build`), so they won't interfere with Cloudflare Pages deployment.

## Troubleshooting

### "Failed to load Google Identity Services"
- Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Verify the Client ID in Google Cloud Console
- Check browser console for detailed errors

### "Access denied" after signing in
- Verify you're signed in with `me@davidmendez.dev`
- Check that `ADMIN_EMAIL` in `.env.local` matches your Google account email
- Restart the dev server after changing `.env.local`

### "Invalid token" error
- The OAuth token may have expired
- Try signing out and signing in again
- Check that authorized origins include `http://localhost:3000`

### Edit button not showing
- Verify you're signed in (check navigation for your name)
- Check that `isAdmin` is true in the auth context
- Open browser DevTools → Console to check for errors

### API endpoints return 404
- This is expected in local development (they're Cloudflare Pages Functions)
- Use the mock API routes above if you need to test the full flow locally

## Next Steps

Once local OAuth is working:
1. Test the authentication flow
2. Verify admin access works
3. Deploy to Cloudflare Pages for full functionality
4. Set up Cloudflare KV for content persistence

## Security Reminders

- ✅ Never commit `.env.local` to Git
- ✅ Keep your Client ID secret (though it's less sensitive than Client Secret)
- ✅ Use different OAuth credentials for production
- ✅ Regularly rotate credentials if exposed
