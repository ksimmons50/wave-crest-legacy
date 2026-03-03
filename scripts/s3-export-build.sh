#!/bin/bash

# S3 export build script that temporarily removes incompatible API routes

set -e

# Define the routes to temporarily remove
ROUTES=(
  "app/api/health/route.ts"
  "app/api/source-edit/route.ts"
  "app/api/comments/route.ts"
  "app/api/sections/route.ts"
  "app/api/pages/route.ts"
  "app/api/gallery-add-image/route.ts"
  "app/api/stats/route.ts"
)

# Backup directory
BACKUP_DIR=".s3-export-backup"

echo "🔧 Preparing for S3 export build..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup and remove routes
for route in "${ROUTES[@]}"; do
  if [ -f "$route" ]; then
    echo "  📦 Backing up $route"
    mkdir -p "$BACKUP_DIR/$(dirname "$route")"
    cp "$route" "$BACKUP_DIR/$route"
    rm "$route"
  fi
done

echo "🚀 Running static export build..."

# Run the static export build
if EXPORT_BUILD=true next build; then
  BUILD_SUCCESS=true
  echo "✅ Static export build completed successfully"
else
  BUILD_SUCCESS=false
  echo "❌ Static export build failed"
fi

echo "🔄 Restoring API routes..."

# Restore backed up routes
for route in "${ROUTES[@]}"; do
  if [ -f "$BACKUP_DIR/$route" ]; then
    echo "  📥 Restoring $route"
    mkdir -p "$(dirname "$route")"
    cp "$BACKUP_DIR/$route" "$route"
  fi
done

# Clean up backup directory
rm -rf "$BACKUP_DIR"

if [ "$BUILD_SUCCESS" = true ]; then
  echo "✨ Build process completed successfully!"
  exit 0
else
  echo "⚠️  Build failed but routes have been restored"
  exit 1
fi

