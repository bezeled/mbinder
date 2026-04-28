#!/bin/bash

# Clean script for preparing theme for distribution
# Run with: pnpm clean

echo "🧹 Cleaning project for distribution..."

# Remove node_modules (using find to handle stubborn directories)
find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null || true
echo "   ✓ Removed node_modules"

# Remove .env files (keep .env.example)
rm -f apps/web/.env
rm -f apps/studio/.env
echo "   ✓ Removed .env files"

# Remove build outputs and caches
rm -rf dist
rm -rf .astro
rm -rf .sanity
rm -rf apps/web/dist
rm -rf apps/web/.astro
rm -rf apps/studio/dist
echo "   ✓ Removed build outputs and caches"

# Remove lock file (optional - comment out if you want to keep it)
# rm -f pnpm-lock.yaml
# echo "   ✓ Removed lock file"

echo ""
echo "✅ Clean complete! Ready to zip."
echo ""
echo "📦 To zip (from parent folder):"
echo "   zip -r theme-name.zip your-folder-name -x '*.git*'"
