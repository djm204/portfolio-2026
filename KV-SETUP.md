# Cloudflare KV Setup for Content Editing

This guide walks you through setting up Cloudflare KV to enable live content editing on your portfolio site.

## Overview

Cloudflare KV stores content overrides that allow you to edit case study content directly on the live site. The system works as follows:

1. **Static Content (Default):** Case studies are built from MDX files at build time
2. **Content Overrides:** When you edit content, it's stored in Cloudflare KV
3. **Content Resolution:** The site checks KV first, then falls back to static content
4. **Persistence:** KV content persists across deployments until you update it

## Step-by-Step Setup

### Step 1: Create a KV Namespace

1. **Go to Cloudflare Dashboard**
   - Navigate to [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

2. **Navigate to Workers & Pages → KV**
   - Click on "Workers & Pages" in the left sidebar
   - Click on "KV" in the submenu

3. **Create a New Namespace**
   - Click "Create a namespace"
   - Name it: `CONTENT_KV` (or any name you prefer, but `CONTENT_KV` matches the code)
   - Click "Add"

4. **Copy the Namespace ID**
   - After creation, you'll see your namespace listed
   - **Copy the Namespace ID** - you'll need this in the next step
   - It will look something like: `abc123def456ghi789jkl012mno345`

### Step 2: Bind KV Namespace to Your Pages Project

**Important:** For this project, bindings are managed through `wrangler.toml` (as indicated in the Cloudflare Dashboard).

1. **Get Your Namespace ID**
   - Go to Cloudflare Dashboard → Workers & Pages → KV
   - Find your `CONTENT_KV` namespace
   - **Copy the Namespace ID** (it looks like: `abc123def456ghi789jkl012mno345`)

2. **Update `wrangler.toml`**
   - Open `wrangler.toml` in your project root
   - Find the `[[kv_namespaces]]` section (or add it if it doesn't exist)
   - Replace `YOUR_NAMESPACE_ID` with your actual namespace ID:
     ```toml
     [[kv_namespaces]]
     binding = "CONTENT_KV"
     id = "your-actual-namespace-id-here"
     ```
   - Save the file

3. **Commit and Deploy**
   - Commit the updated `wrangler.toml` to your repository
   - Push to trigger a new deployment
   - Cloudflare Pages will automatically use the bindings from `wrangler.toml`

**Alternative (if dashboard allows):** If the Cloudflare Dashboard shows an "Add binding" button (not all projects use `wrangler.toml`), you can add it there instead. Check the tooltip in the Bindings section - if it says bindings are managed through `wrangler.toml`, use the method above.

### Step 3: Verify the Setup

1. **Check Your Bindings**
   - In the Functions section, you should now see:
     ```
     CONTENT_KV → [Your namespace name]
     ```

2. **Test the Setup**
   - Deploy your site (or wait for the next automatic deployment)
   - Sign in to your site with `me@davidmendez.dev`
   - Navigate to any case study page
   - Try editing and saving content
   - The content should persist after saving

## Troubleshooting

### Content Updates Don't Persist

**Problem:** You can edit content, but changes don't save.

**Solutions:**
1. **Check KV Binding:**
   - Go to Pages project → Settings → Functions
   - Verify `CONTENT_KV` binding exists and is connected to your namespace
   - The variable name must be exactly `CONTENT_KV` (case-sensitive)

2. **Check Namespace:**
   - Go to Workers & Pages → KV
   - Verify your namespace exists and is active
   - Check that you're using the correct namespace ID

3. **Check Authentication:**
   - Make sure you're signed in as `me@davidmendez.dev`
   - Check browser console for authentication errors
   - Verify `ADMIN_EMAIL` environment variable is set correctly

4. **Check Functions:**
   - Verify that `/functions/api/case-studies/update.ts` and `/functions/api/case-studies/read.ts` are deployed
   - Check Cloudflare Pages Functions logs for errors

### KV Namespace Not Found

**Problem:** Error message about KV namespace not being found.

**Solutions:**
1. **Verify Namespace Exists:**
   - Go to Workers & Pages → KV
   - Confirm the namespace is created and active

2. **Check Binding:**
   - Go to Pages project → Settings → Functions
   - Verify the binding variable name is exactly `CONTENT_KV`
   - Verify the namespace is selected correctly

3. **Redeploy:**
   - After adding/updating bindings, you may need to trigger a new deployment
   - Push a new commit or manually trigger a deployment

### Content Not Loading from KV

**Problem:** Content always shows static content, never KV overrides.

**Solutions:**
1. **Check Read Function:**
   - Verify `/functions/api/case-studies/read.ts` is deployed
   - Check browser Network tab - is the API call to `/api/case-studies/read?slug=...` working?
   - Check Cloudflare Pages Functions logs

2. **Check KV Data:**
   - Go to Workers & Pages → KV
   - Click on your namespace
   - Check if keys exist (they should be named like `case-study:globalvision-modernization`)
   - If no keys exist, try saving content again

3. **Check Authentication:**
   - The read function doesn't require auth, but verify it's being called correctly
   - Check browser console for errors

## Manual KV Management (Optional)

You can manually manage KV data using Wrangler CLI:

```bash
# List all keys in your namespace
npx wrangler kv:key list --namespace-id=YOUR_NAMESPACE_ID

# Get a specific key
npx wrangler kv:key get "case-study:globalvision-modernization" --namespace-id=YOUR_NAMESPACE_ID

# Delete a key (to reset to static content)
npx wrangler kv:key delete "case-study:globalvision-modernization" --namespace-id=YOUR_NAMESPACE_ID

# Put a key manually (for testing)
npx wrangler kv:key put "case-study:globalvision-modernization" --value="Your content here" --namespace-id=YOUR_NAMESPACE_ID
```

**Note:** Replace `YOUR_NAMESPACE_ID` with your actual namespace ID from Step 1.

## How Content Keys Work

Content is stored in KV with keys in this format:
```
case-study:{slug}
```

For example:
- `case-study:globalvision-modernization`
- `case-study:release-track-system`
- `case-study:observability-standardization`

When you edit content on a case study page, it's saved to KV with the corresponding slug.

## Cost Considerations

Cloudflare KV is included in the free tier with generous limits:
- **Free tier:** 100,000 reads/day, 1,000 writes/day
- **Paid tier:** Starts at $0.50 per million reads, $5.00 per million writes

For a personal portfolio with occasional edits, the free tier is more than sufficient.

## Next Steps

Once KV is set up:
1. ✅ Content editing will work on your live site
2. ✅ Changes persist across deployments
3. ✅ You can edit content without pushing code changes
4. ✅ Static content remains as fallback if KV is unavailable

## Related Documentation

- [Authentication Setup](./README-AUTH.md) - Google OAuth configuration
- [Deployment Guide](./DEPLOYMENT.md) - Cloudflare Pages deployment
- [Local Setup](./LOCAL-SETUP.md) - Local development setup
