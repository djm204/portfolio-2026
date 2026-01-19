# Cloudflare Pages Environment Variables Setup

## ⚠️ Important: Environment Variables vs KV

**Environment variables** (like `NEXT_PUBLIC_GOOGLE_CLIENT_ID`) are different from **KV storage**:
- **Environment Variables**: Can be set in `wrangler.toml` OR Cloudflare Pages dashboard → Settings → Environment variables
- **KV Storage**: Used for runtime data (like content overrides, feature flags)

## ⚠️ Build-Time vs Runtime Variables

For Next.js static exports:
- **Build-time variables** (`NEXT_PUBLIC_*`): Must be set in Cloudflare Pages dashboard → Settings → Environment variables (they're embedded into the JS bundle during build)
- **Runtime variables**: Can be set in `wrangler.toml` and are available to Pages Functions at runtime

**Best Practice:** Set `NEXT_PUBLIC_*` variables in BOTH places:
1. `wrangler.toml` (for documentation and consistency)
2. Cloudflare Pages dashboard (for actual build-time embedding)

## Setting Up Environment Variables

You can set environment variables in two ways:

### Option 1: Using `wrangler.toml` (Recommended for Documentation)

Add variables to your `wrangler.toml` file:

```toml
[vars]
NEXT_PUBLIC_GOOGLE_CLIENT_ID = "your-google-client-id-here"
ADMIN_EMAIL = "me@davidmendez.dev"
```

**Note:** For `NEXT_PUBLIC_*` variables, you still need to set them in the Cloudflare Pages dashboard for build-time embedding (see Option 2).

### Option 2: Using Cloudflare Pages Dashboard (Required for Build-Time)

### Step 1: Go to Your Pages Project Settings

1. Navigate to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Pages**
3. Click on your project: `portfolio-2026`
4. Click on **Settings** tab

### Step 2: Add Environment Variables

1. Scroll down to **Environment variables** section
2. Click **Add variable** or **Edit variables**

3. **Add these variables:**

   **Variable 1:**
   - **Variable name:** `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - **Value:** Your Google OAuth Client ID (from Google Cloud Console)
   - **Environment:** Production (and Preview if you want it in preview deployments too)

   **Variable 2:**
   - **Variable name:** `ADMIN_EMAIL`
   - **Value:** `me@davidmendez.dev`
   - **Environment:** Production (and Preview if needed)

### Step 3: Save and Redeploy

1. Click **Save** or **Save variable**
2. **Important:** After adding environment variables, you need to trigger a new deployment:
   - Either push a new commit to your repository, OR
   - Go to **Deployments** tab and click **Retry deployment** on the latest deployment

## Why This Is Needed

For Next.js static exports, `NEXT_PUBLIC_*` environment variables are:
- Embedded into the JavaScript bundle **at build time**
- Available in the browser (they're public)
- Required for client-side code (like Google OAuth)

## Troubleshooting

### "Missing required parameter client_id" Error

**Problem:** The `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is not set or not available at build time.

**Solutions:**
1. ✅ Verify the variable is set in Cloudflare Pages → Settings → Environment variables
2. ✅ Check that the variable name is exactly `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (case-sensitive)
3. ✅ Make sure you've triggered a new deployment after adding the variable
4. ✅ Check that the variable is set for the correct environment (Production/Preview)

### Variable Not Available After Setting

**Problem:** You set the variable but it's still not working.

**Solutions:**
1. **Trigger a new build:** Environment variables are only available during the build process
   - Push a new commit, OR
   - Retry the latest deployment
2. **Check the build logs:** Look for any errors related to environment variables
3. **Verify the variable name:** Must be exactly `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (no typos)

### Difference Between Environment Variables and KV

| Feature | Environment Variables | KV Storage |
|---------|---------------------|------------|
| **Purpose** | Build-time configuration | Runtime data storage |
| **Set in** | Pages Settings → Environment variables | KV namespace |
| **When available** | During build | At runtime via API |
| **Use case** | API keys, public config | Content overrides, feature flags |
| **Example** | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `UNDER_CONSTRUCTION` flag |

## Quick Checklist

- [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in Cloudflare Pages → Settings → Environment variables
- [ ] `ADMIN_EMAIL` is set in Cloudflare Pages → Settings → Environment variables
- [ ] Variables are set for the correct environment (Production)
- [ ] A new deployment has been triggered after setting variables
- [ ] Build logs show no errors related to environment variables

## Related Documentation

- [Authentication Setup](./README-AUTH.md) - Google OAuth configuration
- [KV Setup](./KV-SETUP.md) - Cloudflare KV configuration for content editing
