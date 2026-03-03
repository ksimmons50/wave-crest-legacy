'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Comment, SourceMeta } from './types';
import { generateId } from './utils';

export function useComments() {
  const pathname = usePathname();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from API on mount
  useEffect(() => {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  // Save to API (debounced)
  const saveComments = useCallback((commentsToSave: Comment[]) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: commentsToSave }),
      }).catch(console.error);
    }, 500);
  }, []);

  // Filter comments for current page
  const pageComments = comments.filter((c) => c.pagePath === pathname);

  const addComment = (data: {
    selector: string;
    offsetX: number;
    offsetY: number;
    body: string;
    source?: SourceMeta;
  }) => {
    const newComment: Comment = {
      id: generateId(),
      pagePath: pathname,
      elementSelector: data.selector,
      offsetX: data.offsetX,
      offsetY: data.offsetY,
      body: data.body,
      createdAt: new Date().toISOString(),
      resolved: false,
      source: data.source,
    };

    const updated = [...comments, newComment];
    setComments(updated);
    saveComments(updated);
    return newComment;
  };

  const toggleResolved = (commentId: string) => {
    const updated = comments.map((c) =>
      c.id === commentId ? { ...c, resolved: !c.resolved } : c
    );
    setComments(updated);
    saveComments(updated);
  };

  const deleteComment = (commentId: string) => {
    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);
    saveComments(updated);
  };

  return {
    comments: pageComments,
    addComment,
    toggleResolved,
    deleteComment,
    loaded,
  };
}
