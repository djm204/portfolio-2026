import type { Metadata } from 'next';
import { LayoutWrapper } from '@/components/layout-wrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'David Mendez - Staff Engineer | Engineering as Business Value',
  description:
    '11 years of experience transforming legacy platforms into high-availability, cost-optimized engines. Building resilient systems. Driving operational efficiency.',
  keywords: [
    'Staff Engineer',
    'Senior Engineer',
    'Legacy Modernization',
    'Cost Optimization',
    'SRE',
    'Infrastructure',
  ],
  authors: [{ name: 'David Mendez' }],
  icons: {
    icon: '/favicon.gif',
  },
  openGraph: {
    title: 'David Mendez - Staff Engineer',
    description:
      'Building resilient systems. Driving operational efficiency.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Explicit favicon link - animated GIF works in Firefox, static in Chrome/Edge */}
        <link rel="icon" type="image/gif" href="/favicon.gif" />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
