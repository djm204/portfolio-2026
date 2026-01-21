/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  // Enable React Server Components by default
  reactStrictMode: true,
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: true, // Required for static export
  },
  // Static export for Cloudflare Pages
  output: 'export',
  // Disable features that require server
  trailingSlash: true,
};

export default nextConfig;
