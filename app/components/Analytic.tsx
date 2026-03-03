"use client";

import { useEffect, useRef } from "react";
import { BREEZY_SITE_SETTINGS_TOKEN } from "../../professionalConstants";

export default function Analytic() {
  const fingerprintRef = useRef<string | null>(null);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const debugEnabled = new URLSearchParams(window.location.search).get('debug') === 'true';
    if (isDev && !debugEnabled) return;

    const endpoint = 'https://app.socratic.systems/breezy/breezy_sites/public/track';

    const sendTrack = (fingerprint: string) => {
      const payload = {
        site_settings_token: BREEZY_SITE_SETTINGS_TOKEN,
        fingerprint,
        page_visited: window.location.pathname,
        metadata: {},
      };

      if (debugEnabled) console.log(`[Analytic] ${fingerprint.slice(0, 8)}... ${payload.page_visited}`);

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        keepalive: true,
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then((data) => { if (debugEnabled) console.log('[Analytic]', data); })
        .catch(() => {});
    };

    const init = async () => {
      // Dynamically import FingerprintJS so it doesn't block initial page render
      const FingerprintJS = (await import('@fingerprintjs/fingerprintjs')).default;
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      fingerprintRef.current = result.visitorId;
      sendTrack(result.visitorId);
    };

    const handleLeave = () => {
      if (fingerprintRef.current) sendTrack(fingerprintRef.current);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') handleLeave();
    };

    init().catch(console.error);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('beforeunload', handleLeave);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('beforeunload', handleLeave);
    };
  }, []);

  return null;
}
