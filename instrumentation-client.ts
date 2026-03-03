// Only initialise Sentry client-side in development.
// Production sites skip this entirely for faster page loads.

if (process.env.NODE_ENV === 'development') {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: "https://3e30231889d43e78ebd91787aec191be@o4504595109445632.ingest.us.sentry.io/4510105298534400",
      tracesSampleRate: 1,
      debug: false,
    });
  });
}
