# ADR-002: Cloudflare Pages Deployment

## Status
Accepted

## Context
The portfolio needs a cost-effective deployment platform that supports edge-first architecture while maintaining excellent performance and global distribution. The choice of deployment platform directly impacts:
- Hosting costs
- Global latency
- Build and deployment workflow
- Scalability
- Developer experience

## Decision
Deploy to Cloudflare Pages using static export (SSG) for maximum cost-efficiency.

## Rationale

### Cost Efficiency (80% Rule)
- **Free tier:** Cloudflare Pages offers generous free tier with unlimited bandwidth
- **Static export:** Eliminates server costs entirely - pure static hosting
- **Edge network:** 300+ data centers globally, reducing latency at no extra cost
- **No cold starts:** Static sites have zero cold start latency

### Performance
- **Global CDN:** Automatic distribution across Cloudflare's edge network
- **Fast builds:** Static export builds faster than full-stack deployments
- **Zero runtime overhead:** No server-side processing means maximum performance

### Developer Experience
- **Git integration:** Automatic deployments on push
- **Preview deployments:** Automatic preview URLs for pull requests
- **Simple workflow:** Standard Next.js build process, no special adapters needed for static export

## Consequences

### Positive
- ✅ Zero hosting costs (within free tier limits)
- ✅ Excellent global performance via edge network
- ✅ Simple deployment workflow
- ✅ Fast build times
- ✅ No server maintenance required

### Negative
- ⚠️ No server-side rendering (SSR) - but not needed for portfolio
- ⚠️ No API routes - but can use Cloudflare Workers if needed later
- ⚠️ Image optimization disabled - but can use Cloudflare Images if needed

### Mitigation
- Static export is perfect for portfolio use case (mostly static content)
- If dynamic features are needed later, can migrate to `@cloudflare/next-on-pages` adapter
- Cloudflare Images can be integrated for image optimization if needed

## Alternatives Considered

### Vercel
- **Rejected:** Higher costs at scale, vendor lock-in concerns

### Netlify
- **Rejected:** Similar to Vercel, Cloudflare's edge network is more extensive

### AWS S3 + CloudFront
- **Rejected:** More complex setup, higher operational overhead

### Self-hosted
- **Rejected:** Higher operational costs, violates "80% Rule"

## Verification
- Monitor deployment times and success rates
- Track Core Web Vitals (LCP, FID, CLS) from various global locations
- Compare hosting costs vs. alternatives (should be $0 for this use case)
- Review developer feedback on deployment workflow

## Migration Path (If Needed)

If full-stack capabilities are required in the future:

1. Install `@cloudflare/next-on-pages` adapter
2. Remove `output: 'export'` from `next.config.mjs`
3. Update build scripts to use adapter
4. Deploy to Cloudflare Pages with Workers runtime

This maintains the same deployment platform while adding server-side capabilities.
