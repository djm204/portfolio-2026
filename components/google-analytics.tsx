'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-65X2S7VYFS';
const UNDER_CONSTRUCTION_FLAG = process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION || '';
const DISABLE_GA_UNDER_CONSTRUCTION =
  process.env.NEXT_PUBLIC_DISABLE_ANALYTICS_ON_UNDER_CONSTRUCTION || '';

/**
 * Google Analytics Component
 * Handles page view tracking for Next.js static export
 * Industry standard: Privacy-compliant analytics tracking
 * Verification: Test page navigation, verify events in GA dashboard
 */
export function GoogleAnalytics(): React.JSX.Element {
  const pathname = usePathname();

  const isUnderConstruction =
    UNDER_CONSTRUCTION_FLAG === 'true' ||
    UNDER_CONSTRUCTION_FLAG === '1' ||
    UNDER_CONSTRUCTION_FLAG === 'enabled';

  const shouldDisableAnalytics =
    isUnderConstruction &&
    (DISABLE_GA_UNDER_CONSTRUCTION === 'true' || DISABLE_GA_UNDER_CONSTRUCTION === '1');

  if (shouldDisableAnalytics) {
    // Skip loading GA entirely when under construction and disabled by flag
    return <></>;
  }

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
