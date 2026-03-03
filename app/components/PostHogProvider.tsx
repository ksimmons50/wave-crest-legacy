"use client"

import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialise PostHog in development
    if (process.env.NODE_ENV !== 'development') return;

    const init = async () => {
      const posthog = (await import("posthog-js")).default;

      posthog.init("phc_AxCyUDne4sR75tw2N27Y3wQXkBUZ90mdx4oU6FeG82X", {
        api_host: "/ingest", // Use reverse proxy to avoid ad blockers
        ui_host: "https://us.posthog.com", // No proxy needed - this is just for UI links
        capture_pageview: true,
        capture_pageleave: true,
        capture_exceptions: true,
        debug: false, // Disabled to reduce console noise
        session_recording: {
          recordCrossOriginIframes: true,
          maskAllInputs: false, // Unmask all inputs
          maskInputOptions: {
            password: true, // Keep passwords masked
          },
        },
      });

      // Identify this as the iframe/child app
      posthog.register({
        app_context: "iframe_child",
        app_name: "breezy_sites_base",
      });
    };

    init().catch(console.error);
  }, []);

  // Just render children directly — no PostHogProvider wrapper needed since we
  // only use posthog imperatively in dev and don't need the React context.
  return <>{children}</>;
}
