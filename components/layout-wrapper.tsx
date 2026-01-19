'use client';

import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { GoogleAnalytics } from './google-analytics';
import { UnderConstructionWrapper } from './under-construction-wrapper';

/**
 * Layout Wrapper Component
 * Wraps layout with client-side providers
 * Required because AuthProvider and ThemeProvider need to be client-side
 */
export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GoogleAnalytics />
        <Navigation />
        <UnderConstructionWrapper>
          {children}
        </UnderConstructionWrapper>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}
