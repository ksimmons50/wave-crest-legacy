'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current page is running inside an iframe.
 * Returns false during SSR and updates on mount.
 */
export function useIsInIframe(): boolean {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(typeof window !== 'undefined' && window.parent !== window);
  }, []);

  return isInIframe;
}
