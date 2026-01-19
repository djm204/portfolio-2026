# Cloudflare Pages Environment Variables Setup

## ⚠️ Important: Environment Variables vs KV

**Environment variables** (like `NEXT_PUBLIC_GOOGLE_CLIENT_ID`) are different from **KV storage**:
- **Environment Variables**: Set in Cloudflare Pages dashboard → Settings → Environment variables
- **KV Storage**: Used for runtime data (like content overrides, feature flags)

## Setting Up Environment Variables in Cloudflare Pages

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
