import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // Only ignore errors during S3 export builds, enforce strict checking for Docker builds
    ignoreBuildErrors: process.env.EXPORT_BUILD === 'true',
  },
  // Enable standalone output for Docker deployments (but not for S3 export)
  ...(process.env.NODE_ENV === 'production' && !process.env.EXPORT_BUILD && {
    output: 'standalone',
  }),
  // Enable static export for S3 deployment
  ...(process.env.EXPORT_BUILD && {
    output: 'export',
  }),
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  // Enable React strict mode for better development warnings
  reactStrictMode: false,
  // Disable Next.js development indicators (the "N" menu in dev mode)
  devIndicators: false,
  // Turbopack configuration for JSX source injection in dev mode
  turbopack: {
    rules: {
      '*.tsx': {
        loaders: ['./loaders/jsx-source-loader.js'],
      },
      '*.jsx': {
        loaders: ['./loaders/jsx-source-loader.js'],
      },
    },
  },
  images: {
    unoptimized: process.env.EXPORT_BUILD === 'true',  // Disable optimization for static export
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',                                                                                                                                                                                 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'facebook.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // Security and embedding headers
  async headers() {
    // In dev, allow PostHog and Sentry domains in CSP
    const devScriptSrc = isDev
      ? ' https://us-assets.i.posthog.com https://us.i.posthog.com'
      : '';
    const devConnectSrc = isDev
      ? ' https://us.i.posthog.com https://us-assets.i.posthog.com'
      : '';

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://app.getbreezy.app${devScriptSrc}`,
              `connect-src 'self' https: wss: https://app.getbreezy.app${devConnectSrc}`,
              "style-src 'self' 'unsafe-inline' https://app.getbreezy.app",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://app.getbreezy.app",
              "media-src 'self' blob: https:",
              "frame-src 'self' https://app.getbreezy.app https://*.sandbox.getbreezy.app https://*.devsandbox.getbreezy.app",
              "frame-ancestors *",
              "worker-src 'self' blob:",
            ].join('; '),
          },
          // Allow embedding in iframes from any origin (important for Breezy sites)
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  // PostHog rewrites only needed in dev
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: '/ingest/static/:path*',
          destination: 'https://us-assets.i.posthog.com/static/:path*',
        },
        {
          source: '/ingest/:path*',
          destination: 'https://us.i.posthog.com/:path*',
        },
      ];
    },
  }),
  skipTrailingSlashRedirect: true,
};

// Only wrap with Sentry build plugin in development
let exportedConfig: NextConfig = nextConfig;

if (isDev) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { withSentryConfig } = require('@sentry/nextjs');
    exportedConfig = withSentryConfig(nextConfig, {
      org: "socratic-systems",
      project: "breezy_sites",
      silent: !process.env.CI,
      widenClientFileUpload: true,
      tunnelRoute: "/monitoring",
      webpack: {
        treeshake: { removeDebugLogging: true },
        automaticVercelMonitors: true,
      },
    });
  } catch {
    // @sentry/nextjs not installed (production build with --omit=dev) — skip
  }
}

export default exportedConfig;
