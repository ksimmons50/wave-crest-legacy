'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function UrlTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Only send messages if we're in dev mode AND in an iframe (not in preview mode or standalone)
    if (isDev && typeof window !== 'undefined' && window.parent !== window) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      const fullUrl = `${window.location.origin}${url}`;
      
      window.parent.postMessage({
        type: 'URL_CHANGE',
        payload: { url: fullUrl }
      }, '*');
    }
  }, [pathname, searchParams, isDev]);

  // Also send initial URL on mount
  useEffect(() => {
    if (isDev && typeof window !== 'undefined' && window.parent !== window) {
      const fullUrl = window.location.href;
      
      window.parent.postMessage({
        type: 'URL_CHANGE',
        payload: { url: fullUrl }
      }, '*');
    }
  }, [isDev]);

  return null; // This component doesn't render anything
}

