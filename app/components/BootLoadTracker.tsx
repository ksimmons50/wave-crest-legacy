'use client';

import { useEffect } from 'react';

/**
 * Sends a postMessage to the parent frame (breezy-fe) when the site first loads
 * in the user's browser. breezy-fe then records `frontend_loaded_at` on the boot
 * metric so we can measure end-to-end time from request to first render.
 *
 * Only runs in dev mode (sandbox) and only when embedded in an iframe.
 */
export default function BootLoadTracker() {
  useEffect(() => {
    // Only run in dev (sandbox) environments
    if (process.env.NODE_ENV !== 'development') return;

    // Only send if we're inside an iframe (embedded in breezy-fe)
    if (typeof window === 'undefined' || window.parent === window) return;

    window.parent.postMessage({
      type: 'FRONTEND_LOADED',
    }, '*');
  }, []);

  return null;
}
