import { notFound } from 'next/navigation';
import { CaseStudyTemplate } from '@/components/case-study-template';
import { getCaseStudyBySlug } from '@/lib/case-studies';

/**
 * Case Study Page - ADR-002
 * Industry standard: Static page generation with data lookup
 * Verification: Test 404 handling, data loading, template rendering
 */
export default function CaseStudyPage(): JSX.Element {
  const caseStudy = getCaseStudyBySlug('release-track-system');

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
