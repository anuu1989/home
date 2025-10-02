#!/bin/bash

echo "🔧 Fixing React Build Issues..."

# Step 1: Clean everything
echo "🧹 Cleaning node_modules and cache..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
npm cache clean --force

# Step 2: Clear React Scripts cache
echo "🗑️ Clearing React Scripts cache..."
rm -rf node_modules/.cache
rm -rf build

# Step 3: Install with specific flags
echo "📦 Installing dependencies with fixes..."
npm install --legacy-peer-deps --no-audit --no-fund

# Step 4: Check if ajv is properly installed
echo "🔍 Checking ajv installation..."
if [ -d "node_modules/ajv" ]; then
    echo "✅ ajv found in node_modules"
    ls -la node_modules/ajv/dist/ | head -5
else
    echo "❌ ajv not found, installing manually..."
    npm install ajv@^8.12.0 --legacy-peer-deps
fi

# Step 5: Try building
echo "🏗️ Attempting build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🎉 Your portfolio is ready for deployment!"
else
    echo "❌ Build failed. Trying alternative fixes..."
    
    # Alternative fix: Install specific versions
    echo "🔄 Installing specific compatible versions..."
    npm install @types/react@^18.0.0 @types/react-dom@^18.0.0 --legacy-peer-deps
    npm install ajv@^8.12.0 --legacy-peer-deps
    
    # Try build again
    echo "🏗️ Attempting build again..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after fixes!"
    else
        echo "❌ Build still failing. Check the error log above."
        echo "💡 Try running: npm run build --verbose for more details"
    fi
fi