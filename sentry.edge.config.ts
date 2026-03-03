// This file configures the initialization of Sentry for edge features.
// Only loaded in development (gated by instrumentation.ts).

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3e30231889d43e78ebd91787aec191be@o4504595109445632.ingest.us.sentry.io/4510105298534400",
  tracesSampleRate: 1,
  debug: false,

  beforeSend(event, hint) {
    if (hint.originalException instanceof Error) {
      const message = hint.originalException.message;
      if (message === 'NEXT_REDIRECT' || message === 'NEXT_NOT_FOUND') {
        return null;
      }
    }

    const errorDetails: any = {
      message: event.message,
      level: event.level,
      timestamp: event.timestamp,
    };

    if (event.exception?.values) {
      errorDetails.exceptions = event.exception.values.map((ex) => ({
        type: ex.type,
        value: ex.value,
        stacktrace: ex.stacktrace?.frames?.map((frame) => ({
          filename: frame.filename,
          function: frame.function,
          lineno: frame.lineno,
          colno: frame.colno,
          context_line: frame.context_line,
        })),
        mechanism: ex.mechanism,
      }));
    }

    if (hint.originalException) {
      if (hint.originalException instanceof Error) {
        errorDetails.originalError = {
          name: hint.originalException.name,
          message: hint.originalException.message,
          stack: hint.originalException.stack,
          ...Object.getOwnPropertyNames(hint.originalException).reduce((acc, key) => {
            if (!['name', 'message', 'stack'].includes(key)) {
              acc[key] = (hint.originalException as any)[key];
            }
            return acc;
          }, {} as any),
        };
      } else {
        errorDetails.originalError = hint.originalException;
      }
    }

    if (event.contexts) {
      errorDetails.contexts = {
        nextjs: event.contexts.nextjs,
        trace: event.contexts.trace,
      };
    }

    if (event.tags) errorDetails.tags = event.tags;
    if (event.extra) errorDetails.extra = event.extra;
    if (event.user) errorDetails.user = event.user;

    console.error('=== Sentry Error ===');
    console.error(JSON.stringify(errorDetails, null, 2));
    console.error('===================');
    
    return event;
  },
});
