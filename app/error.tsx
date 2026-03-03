'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Loading from './loading';
import { useIsInIframe } from './hooks/useIsInIframe';

const IFRAME_ERROR_DELAY_MS = 30000; // 30 seconds

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorDisplay({ error }: { error: Error & { digest?: string } }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-4">
              <AlertTriangle className="w-16 h-16 text-red-600" />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Oops! Something went wrong
          </h1>

          {/* Error Details (collapsible) */}
          <details className="mb-6 bg-gray-50 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
              Error Details
            </summary>
            <div className="mt-4 space-y-2">
              <div className="bg-white rounded p-3 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Message:</p>
                <p className="text-sm text-red-600 font-mono break-words">
                  {error.message || 'Unknown error'}
                </p>
              </div>
              {error.digest && (
                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Error ID:</p>
                  <p className="text-sm text-gray-600 font-mono break-words">
                    {error.digest}
                  </p>
                </div>
              )}
              {error.stack && process.env.NODE_ENV === 'development' && (
                <div className="bg-white rounded p-3 border border-gray-200 max-h-40 overflow-y-auto">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Stack Trace:</p>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Error({ error }: ErrorProps) {
  const [showError, setShowError] = useState(false);
  const isInIframe = useIsInIframe();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error);

    if (isInIframe) {
      // Inside iframe: delay showing the error to allow for potential recovery
      const timer = setTimeout(() => {
        setShowError(true);
      }, IFRAME_ERROR_DELAY_MS);

      return () => clearTimeout(timer);
    } else {
      // Not in iframe: show error immediately
      setShowError(true);
    }
  }, [error, isInIframe]);

  // If in iframe and still waiting, show loading state
  if (isInIframe && !showError) {
    return <Loading />;
  }

  return <ErrorDisplay error={error} />;
}

