import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS 4 Configuration
 * Note: Theme is now defined in CSS using @theme block
 * This config is kept for content paths only
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;
