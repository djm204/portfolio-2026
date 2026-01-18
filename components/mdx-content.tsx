'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * MDX Content Component
 * Industry standard: MDX rendering component for static export
 * Verification: Test with different MDX files, ensure proper rendering
 * 
 * Uses react-markdown for static export compatibility
 * Content is provided via props (from JSON export at build time)
 */

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps): JSX.Element {
  if (!content) {
    return (
      <div className="text-text-secondary">
        <p>Content not available</p>
      </div>
    );
  }

  return (
    <div className="prose prose-invert max-w-none text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mb-4 text-foreground mt-8 first:mt-0" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mb-3 text-foreground mt-6" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold mb-2 text-foreground mt-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-text-secondary mb-4 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-text-secondary" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="text-foreground font-semibold" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-accent pl-4 italic text-text-secondary my-4" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="bg-subtle-bg px-1 py-0.5 rounded text-sm font-mono" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
