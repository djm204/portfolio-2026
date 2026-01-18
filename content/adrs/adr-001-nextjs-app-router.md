# ADR-001: Next.js 15 App Router

## Status
Accepted

## Context
This portfolio needs to demonstrate modern web development practices while maintaining cost-efficiency and performance. The choice of framework directly impacts:
- SEO capabilities
- Initial load performance
- Development velocity
- Hosting costs
- Developer experience

## Decision
Use Next.js 15 with the App Router, leveraging React Server Components (RSCs) by default.

## Rationale

### Performance & Cost
- **Server Components by default:** Reduces client-side JavaScript bundle size, improving initial load times
- **Edge Runtime support:** Enables deployment closer to users, reducing latency and costs
- **Built-in optimizations:** Image optimization, font optimization, and code splitting out of the box

### SEO & Accessibility
- **Server-side rendering:** Ensures content is crawlable by search engines
- **Metadata API:** Built-in support for Open Graph, Twitter Cards, and structured data

### Developer Experience
- **TypeScript support:** First-class TypeScript support aligns with strict typing requirements
- **File-based routing:** Intuitive routing structure that scales well
- **Static export support:** Can generate static sites for cost-effective deployment on Cloudflare Pages

## Consequences

### Positive
- ✅ Reduced client bundle size (80%+ reduction in shipped JavaScript)
- ✅ Better SEO performance
- ✅ Faster initial page loads
- ✅ Lower hosting costs (Edge Runtime is more cost-effective)
- ✅ Modern development patterns

### Negative
- ⚠️ Learning curve for developers unfamiliar with RSCs
- ⚠️ Some client-side libraries may not work with Server Components (requires "use client" directive)

### Mitigation
- Clear documentation of when to use Client vs Server Components
- Error boundaries to handle edge cases
- Comprehensive testing strategy

## Alternatives Considered

### Remix
- **Rejected:** Less mature ecosystem, higher learning curve for team

### Astro
- **Rejected:** Primarily static, less suitable for dynamic content needs

### SvelteKit
- **Rejected:** Smaller ecosystem, team familiarity with React

## Verification
- Monitor bundle size in production builds
- Track Core Web Vitals (LCP, FID, CLS)
- Measure hosting costs vs. previous solutions
- Review developer feedback on DX
