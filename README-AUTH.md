# Authentication Setup

This portfolio includes Google OAuth authentication for live content editing.

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

### 3. Access Control

Only the email address specified in `ADMIN_EMAIL` (default: `me@davidmendez.dev`) can:
- Sign in to the site
- Edit case study content inline
- Save changes to content

### 4. Cloudflare Pages Functions

The API endpoint for saving content is deployed as a Cloudflare Pages Function at:
- `/functions/api/case-studies/update.ts`

This function:
- Verifies the Google OAuth token
- Checks that the user's email matches `ADMIN_EMAIL`
- Updates the case study content (TODO: implement actual database/file update)

### 5. Usage

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

## Future Enhancements

- Implement actual database/file system updates
- Add content versioning/history
- Add draft/publish workflow
- Support editing frontmatter
- Add image upload capabilities
