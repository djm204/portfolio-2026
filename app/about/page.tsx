import { EditableContent } from '@/components/editable-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - David Mendez',
  description: 'Learn about David Mendez - hobbies, interests, family, and life outside of engineering',
};

/**
 * About Page
 * Personal information about David Mendez
 * Industry standard: Editable content with live editing capabilities
 * Verification: Test content display, edit functionality, responsive layout
 */
export default function AboutPage(): React.JSX.Element {
  // Default templated content - can be edited live via KV
  const defaultContent = `# About David

## Life Outside of Engineering

When I'm not architecting systems or optimizing infrastructure, I enjoy spending time with my family and pursuing various hobbies and interests.

### Family

I'm fortunate to have a wonderful family that keeps me grounded and reminds me of what truly matters. Family time is precious, and I make it a priority to be present and engaged with my loved ones.

### Hobbies & Interests

I have a diverse range of interests that help me maintain balance and perspective:

- **Technology Exploration**: Beyond work, I enjoy exploring new technologies, frameworks, and tools. This curiosity drives continuous learning and keeps me current with industry trends.

- **Reading**: I'm an avid reader, particularly interested in technical books, architecture patterns, and leadership literature. I also enjoy science fiction and non-fiction that challenges my thinking.

- **Fitness & Health**: Maintaining physical health is important to me. I enjoy regular exercise and outdoor activities that help me stay energized and focused.

- **Cooking**: I find cooking to be a creative outlet and a way to unwind. Experimenting with new recipes and techniques is both relaxing and rewarding.

- **Gaming**: I enjoy strategic games and puzzles that challenge problem-solving skills. This hobby complements my engineering mindset and provides mental stimulation.

### Personal Philosophy

I believe in continuous growth, both professionally and personally. The same principles I apply to engineering—systematic thinking, attention to detail, and focus on long-term value—also guide my approach to life outside of work.

### Community & Giving Back

I value contributing to the engineering community through knowledge sharing, mentoring, and open-source contributions when possible. Giving back helps strengthen the ecosystem we all depend on.

---

*This page can be edited live when signed in as an admin. Feel free to update it with more personal details!*`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          About Me
        </h1>
        <p className="text-text-muted text-base sm:text-lg">
          A glimpse into my life beyond engineering
        </p>
      </div>

      <div className="prose prose-sm sm:prose-base max-w-none">
        <EditableContent content={defaultContent} slug="about" />
      </div>
    </div>
  );
}
