'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './auth-provider';
import { MDXContent } from './mdx-content';
import { getSession } from '@/lib/auth-client';

interface EditableContentProps {
  content: string;
  slug: string;
}

/**
 * Editable Content Component
 * Industry standard: Inline editing with authentication and KV overrides
 * Verification: Test edit mode, save functionality, authentication checks, KV content loading
 * 
 * Allows authenticated admin users to edit MDX content inline
 * Fetches content overrides from Cloudflare KV if available
 */
export function EditableContent({
  content: staticContent,
  slug,
}: EditableContentProps): React.JSX.Element {
  const { isAdmin, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(staticContent);
  const [editedContent, setEditedContent] = useState(staticContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch content override from KV on mount (for admins)
  useEffect(() => {
    if (!isAdmin || !user) return;

    const controller = new AbortController();
    let isMounted = true;

    const fetchOverride = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/case-studies/read?slug=${encodeURIComponent(slug)}`, {
          signal: controller.signal,
        });
        if (!isMounted) return;
        if (response.ok) {
          const data = await response.json() as { content: string | null };
          if (data.content) {
            // Use override content if available
            setContent(data.content);
            setEditedContent(data.content);
          }
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        console.error('Failed to fetch content override:', error as Error);
        // Fall back to static content
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchOverride();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [isAdmin, user, slug]);

  // For non-admins, always show static content
  if (!isAdmin || !user) {
    return <MDXContent content={staticContent} />;
  }

  const handleSave = async (): Promise<void> => {
    setIsSaving(true);
    try {
      // Get session for auth token
      const session = getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      // Save content via API
      const response = await fetch('/api/case-studies/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          slug,
          content: editedContent,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(error.error || 'Failed to save content');
      }

      // Update displayed content after successful save
      setContent(editedContent);
      setIsEditing(false);
      
      // Optionally reload to fetch updated content from KV
      // window.location.reload();
    } catch (error: unknown) {
      console.error('Failed to save content:', error);
      alert((error instanceof Error ? error.message : 'Failed to save content. Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (): void => {
    setEditedContent(content);
    setIsEditing(false);
  };

  // Show loading state while fetching override
  if (isLoading && isAdmin) {
    return (
      <div className="relative">
        <div className="mb-4 flex items-center justify-between bg-accent/10 border border-accent rounded p-3">
          <span className="text-sm text-foreground font-medium">
            Loading content...
          </span>
        </div>
        <MDXContent content={staticContent} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="relative">
        <div className="mb-4 flex items-center justify-between bg-accent/10 border border-accent rounded p-3">
          <span className="text-sm text-foreground font-medium">
            Editing: {slug}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-3 py-1 text-sm bg-subtle-bg border border-border rounded hover:bg-background transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-3 py-1 text-sm bg-accent text-white rounded hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full min-h-[600px] p-4 font-mono text-sm bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
          spellCheck={false}
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 text-xs bg-accent text-white rounded hover:bg-accent-hover transition-colors shadow-lg"
          title="Edit content"
        >
          ✏️ Edit
        </button>
      </div>
      <MDXContent content={content} />
    </div>
  );
}
