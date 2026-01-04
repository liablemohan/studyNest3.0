#!/bin/bash
set -e

echo "Starting CI process..."

echo "Installing dependencies..."
npm ci

echo "Running lint..."
npm run lint

echo "Running type-check..."
npm run type-check

echo "Building project..."
npm run build

echo "CI process completed successfully!"
