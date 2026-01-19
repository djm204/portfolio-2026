# Authentication Setup

This portfolio includes Google OAuth authentication for live content editing.

## Quick Start

**For local development:** See [LOCAL-SETUP.md](./LOCAL-SETUP.md) for detailed local setup instructions.

**For production:** Follow the instructions below.

## Setup Instructions

### 1. Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://your-domain.com` (for production)
7. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://your-domain.com` (for production)
8. Copy the Client ID

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
ADMIN_EMAIL=me@davidmendez.dev
```

For Cloudflare Pages, add these as environment variables in the Cloudflare dashboard:
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `ADMIN_EMAIL`

**📖 For detailed Cloudflare Pages environment variable setup, see [CLOUDFLARE-ENV-SETUP.md](./CLOUDFLARE-ENV-SETUP.md)**

**⚠️ Important:** Environment variables must be set in **Cloudflare Pages Settings → Environment variables**, NOT in KV storage. KV is for runtime data, environment variables are for build-time configuration.

### 3. Access Control

Only the email address specified in `ADMIN_EMAIL` (default: `me@davidmendez.dev`) can:
- Sign in to the site
- Edit case study content inline
- Save changes to content

### 4. Cloudflare KV Setup

Content overrides are stored in Cloudflare KV for fast, edge-accessible storage.

**📖 For detailed step-by-step instructions, see [KV-SETUP.md](./KV-SETUP.md)**

**Quick Setup:**

1. **Create a KV Namespace:**
   - Go to Cloudflare Dashboard → Workers & Pages → KV
   - Click "Create a namespace"
   - Name it: `CONTENT_KV`
   - Copy the Namespace ID

2. **Bind to Pages Project:**
   - Go to your Pages project → Settings → Functions
   - Scroll to "KV namespace bindings"
   - Click "Add binding"
   - Variable name: `CONTENT_KV` (must match exactly, case-sensitive)
   - KV namespace: Select your namespace
   - Save

**Note:** If KV is not configured, the editing functionality will still work, but content updates won't persist. The system will gracefully fall back to static content.

### 5. Cloudflare Pages Functions

The API endpoints for content management are deployed as Cloudflare Pages Functions:
- `/functions/api/case-studies/update.ts` - Saves content to KV
- `/functions/api/case-studies/read.ts` - Reads content from KV

These functions:
- Verify the Google OAuth token
- Check that the user's email matches `ADMIN_EMAIL`
- Store/retrieve content overrides in Cloudflare KV
- Fall back gracefully if KV is not configured

### 6. Usage

1. Click "Sign In with Google" in the navigation
2. Authenticate with your Google account (must be `me@davidmendez.dev`)
3. Navigate to any case study page
4. Hover over the content to see the "Edit" button
5. Click "Edit" to enter edit mode
6. Make your changes in the textarea
7. Click "Save" to persist changes

## Security Notes

- Authentication is enforced both client-side and server-side
- Only the specified admin email can access editing features
- OAuth tokens are validated on every API request
- Content updates require valid authentication

## How It Works

1. **Static Content (Default):** Case studies are built from MDX files at build time
2. **Content Overrides:** When you edit content, it's stored in Cloudflare KV
3. **Content Resolution:** The site checks KV first, then falls back to static content
4. **Persistence:** KV content persists across deployments until you update it

## Future Enhancements

- Add content versioning/history in KV metadata
- Add draft/publish workflow
- Support editing frontmatter
- Add image upload capabilities
- Sync KV overrides back to Git repository (optional)
