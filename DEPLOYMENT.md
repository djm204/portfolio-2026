# Cloudflare Pages Deployment Configuration

## ⚠️ CRITICAL: Deploy Command Settings

**For static exports, you MUST remove the deploy command from Cloudflare Pages dashboard settings.**

### Cloudflare Pages Dashboard Settings

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** → **Builds & deployments**
3. Configure these settings:

```
Build command: npm run build
Output directory: out
Deploy command: npx wrangler pages deploy out
```

### ❌ WRONG Deploy Command

If you see this in your deploy command field, **CHANGE IT**:
```
npx wrangler deploy
```

This is for Cloudflare Workers, NOT Pages!

### ✅ Correct Deploy Command

**You MUST use this exact command:**
```
npx wrangler pages deploy out
```

**Note:** The `pages` keyword is required! Without it, you'll get an error about Workers vs Pages.

## Why No Deploy Command?

For static exports, Cloudflare Pages automatically:
1. Runs the build command (`npm run build`)
2. Detects the output directory (`out`)
3. Automatically deploys the static files

Setting a deploy command is unnecessary and can cause errors if it uses the wrong command.

## Troubleshooting

If you see this error:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
  For Pages, please run `wrangler pages deploy` instead.
```

**Solution:** Remove the deploy command from your Cloudflare Pages dashboard settings.
