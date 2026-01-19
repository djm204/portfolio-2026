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
Deploy command: echo "Deployment handled automatically by Cloudflare Pages"
```

**OR if the field can be left empty, leave it empty!**

**Note:** Cloudflare Pages automatically deploys the `out` directory after the build completes. The deploy command is typically not needed for static exports.

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

### Authentication Error (code: 10000)

If you see this error:
```
✘ [ERROR] A request to the Cloudflare API failed.
  Authentication error [code: 10000]
```

**Solution:** This happens because Wrangler isn't authenticated in the Cloudflare Pages build environment. For static exports, you don't need a deploy command. Use one of these:

1. **Best:** Leave the deploy command field empty (if possible)
2. **Alternative:** Use a no-op command: `echo "Deployment handled automatically by Cloudflare Pages"`
3. **Not recommended:** Don't use `npx wrangler pages deploy out` - it requires authentication that isn't available in the build environment

### Wrong Command Error

If you see this error:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
  For Pages, please run `wrangler pages deploy` instead.
```

**Solution:** Change `npx wrangler deploy` to use a no-op command or leave empty.
