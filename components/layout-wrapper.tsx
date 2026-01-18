'use client';

import { AuthProvider } from './auth-provider';
import { Navigation } from './navigation';
import { Footer } from './footer';

/**
 * Layout Wrapper Component
 * Wraps layout with client-side providers
 * Required because AuthProvider needs to be client-side
 */
export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <AuthProvider>
      <Navigation />
      {children}
      <Footer />
    </AuthProvider>
  );
}
