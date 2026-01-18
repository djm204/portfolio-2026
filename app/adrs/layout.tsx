import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architecture Decision Records | David Mendez',
  description:
    'Documenting the "Why" behind the "How" for technical decisions in this portfolio.',
};

export default function ADRsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
