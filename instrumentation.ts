// Only initialise Sentry server-side in development.
// Production sites skip this entirely for reduced overhead.

export async function register() {
  if (process.env.NODE_ENV !== 'development') return;

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
