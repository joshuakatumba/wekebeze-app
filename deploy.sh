#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Copy backend files to root (optional for single deployment)
echo "Preparing for deployment..."
cp -r backend/* .

echo "Ready for deployment! Upload the entire project to your hosting platform."