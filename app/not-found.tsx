'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Frown, Check, Copy } from 'lucide-react';
import { PROFESSIONAL_NAME } from '../professionalConstants';

export default function NotFound() {
  const [copied, setCopied] = useState(false);

  const copyDetails = async () => {
    const details = `404 Error Details:
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
Referrer: ${document.referrer || 'Direct access'}
User Agent: ${navigator.userAgent}`;

    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* 404 Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <Frown className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          {/* 404 Title */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            {"Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go Back
            </button>
            <button
              onClick={copyDetails}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Details
                </>
              )}
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
                Contact {PROFESSIONAL_NAME}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

