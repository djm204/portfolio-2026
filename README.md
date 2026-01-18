# Portfolio 2026 - Staff Engineer Portfolio

A portfolio website demonstrating **Engineering as Business Value** through cost-optimized, edge-first architecture.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React Server Components
- **Styling:** Tailwind CSS + Framer Motion
- **Deployment:** Cloudflare Pages
- **Content:** MDX for ADRs and case studies

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check
```

## Project Structure

```
/app
  /adrs          # Architecture Decision Records page
  layout.tsx     # Root layout with Analytics
  page.tsx       # Home page
/components
  /hero          # Metric-driven hero section
  /case-study    # GlobalVision migration case study
  /system-health # Public status monitoring
  /ai-leadership # AI fluency showcase
/lib
  /types         # Zod schemas and TypeScript types
  /utils         # Utility functions
/content
  /adrs          # MDX files for Architecture Decision Records
```

## Core Principles

- **80% Rule:** Every technical choice considers cost impact
- **SRE Mindset:** Observability built-in from day one
- **Growth Mindset:** ADRs document the "Why" behind decisions
- **Verification First:** All components include testing guidance

## Features

- ✅ Metric-driven hero with cost savings calculator
- ✅ Case study section with lessons learned
- ✅ System health monitoring component
- ✅ AI leadership showcase
- ✅ Error boundaries and loading states
- ✅ Full accessibility (ARIA, keyboard navigation)
- 🔄 ADR section (in progress)
- 🔄 MDX blog integration (in progress)

## Deployment

This project is optimized for Cloudflare Pages deployment using **static export** (SSG). This approach aligns with the "80% Rule" by minimizing infrastructure costs while maintaining excellent performance.

### Cloudflare Pages Setup (Static Export)

1. **Build the project:**
   ```bash
   npm run build
   ```
   This generates a static site in the `out` directory.

2. **Deploy via Cloudflare Dashboard:**
   - Connect your GitHub repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set output directory: `out`
   - Cloudflare Pages will automatically deploy on every push

3. **Deploy via Wrangler CLI (Alternative):**
   ```bash
   # Install Wrangler globally (if not already installed)
   npm install -g wrangler

   # Login to Cloudflare
   wrangler login

   # Deploy
   wrangler pages deploy out
   ```

### Full-Stack Deployment (If Needed)

If you need SSR, API routes, or dynamic features in the future:

1. **Install adapter:**
   ```bash
   npm install --save-dev @cloudflare/next-on-pages
   ```

2. **Update `next.config.mjs`:**
   - Remove `output: 'export'`
   - Add adapter configuration

3. **Update build scripts:**
   ```json
   "build": "@cloudflare/next-on-pages",
   "deploy": "npm run build && wrangler pages deploy .vercel/output/static"
   ```

**Note:** The current setup uses static export for maximum cost-efficiency. Switch to full-stack only if you need server-side features.

## License

Private - Portfolio project
