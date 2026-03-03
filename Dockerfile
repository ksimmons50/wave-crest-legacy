# Next.js Dockerfile

FROM node:22-slim AS base

# Install common system dependencies and build tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    bash \
    python3 \
    make \
    g++ \
    wget \
    ca-certificates \
    gnupg \
    jq \
    procps \
    psmisc \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install global npm packages commonly used in Next.js projects
RUN npm install -g \
    npm@latest \
    turbo@latest \
    pnpm@latest

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --home /home/nextjs --shell /bin/bash nextjs

# Set up common directories with proper permissions
RUN mkdir -p /app/.next /app/public /app/src && \
    chown -R nextjs:nodejs /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY eslint.config.mjs ./

# Install all dependencies for development
RUN npm ci && npm cache clean --force

# Copy application code
COPY --chown=nextjs:nodejs . .


# Switch to non-root user
USER nextjs

# Expose ports
EXPOSE 3007

# Set environment variables for development
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3007
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3007/api/health || exit 1

# Copy startup script
COPY --chown=nextjs:nodejs scripts/start-dev.sh /app/scripts/start-dev.sh
RUN chmod +x /app/scripts/start-dev.sh

# Start Next.js
CMD ["/app/scripts/start-dev.sh"]
