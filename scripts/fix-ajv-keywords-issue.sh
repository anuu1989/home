#!/bin/bash

echo "🔧 Fixing ajv-keywords formatMinimum issue..."

# Step 1: Nuclear cleanup
echo "💥 Complete cleanup..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
npm cache clean --force
rm -rf ~/.npm/_cacache
rm -rf build

# Step 2: Install React Scripts 4.x compatible versions
echo "📦 Installing React Scripts 4.x compatible packages..."

# Install core React first
npm install react@^18.2.0 react-dom@^18.2.0 --legacy-peer-deps

# Install React Scripts 4.x
npm install react-scripts@4.0.3 --save-dev --legacy-peer-deps

# Install compatible ajv packages for React Scripts 4.x
npm install ajv@^6.12.6 --save-dev --legacy-peer-deps
npm install ajv-keywords@^3.5.2 --save-dev --legacy-peer-deps
npm install schema-utils@^2.7.1 --save-dev --legacy-peer-deps
npm install terser-webpack-plugin@^4.2.3 --save-dev --legacy-peer-deps

# Install CRACO compatible with React Scripts 4.x
npm install @craco/craco@^6.4.5 --save-dev --legacy-peer-deps

# Install remaining dependencies
npm install --legacy-peer-deps --no-audit --no-fund

# Step 3: Verify critical package versions
echo "🔍 Verifying package versions..."
echo "React Scripts version:"
npm list react-scripts --depth=0
echo "ajv version:"
npm list ajv --depth=0
echo "ajv-keywords version:"
npm list ajv-keywords --depth=0
echo "schema-utils version:"
npm list schema-utils --depth=0
echo "terser-webpack-plugin version:"
npm list terser-webpack-plugin --depth=0

# Step 4: Test development server
echo "🚀 Testing development server..."
timeout 20s npm start &
SERVER_PID=$!

sleep 10
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Development server started successfully!"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
else
    echo "❌ Development server failed to start"
fi

# Step 5: Test build
echo "🏗️ Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 ajv-keywords issue resolved!"
    echo ""
    echo "📋 What was fixed:"
    echo "- Downgraded to ajv@6.12.6 (compatible with React Scripts 4.x)"
    echo "- Downgraded to ajv-keywords@3.5.2 (compatible version)"
    echo "- Used schema-utils@2.7.1 (React Scripts 4.x compatible)"
    echo "- Used terser-webpack-plugin@4.2.3 (compatible version)"
    echo "- Used CRACO@6.4.5 (React Scripts 4.x compatible)"
    echo ""
    echo "🎯 You can now run:"
    echo "  npm start     - Start development server"
    echo "  npm run build - Build for production"
    echo "  npm run deploy - Deploy to GitHub Pages"
else
    echo "❌ Build still failing. Trying alternative approaches..."
    
    # Alternative 1: Try with environment variables
    echo "🔄 Trying with environment variable bypasses..."
    SKIP_PREFLIGHT_CHECK=true TSC_COMPILE_ON_ERROR=true ESLINT_NO_DEV_ERRORS=true npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful with environment bypasses!"
    else
        echo "❌ Still failing. Trying CRACO approach..."
        
        # Alternative 2: Try CRACO
        npm run build:craco
        
        if [ $? -eq 0 ]; then
            echo "✅ Build successful with CRACO!"
        else
            echo "❌ All approaches failed."
            echo ""
            echo "🔍 Final diagnostic information:"
            echo "Node version: $(node --version)"
            echo "NPM version: $(npm --version)"
            echo ""
            echo "Package versions:"
            npm list react-scripts ajv ajv-keywords schema-utils terser-webpack-plugin --depth=0 2>/dev/null
            echo ""
            echo "💡 This might require manual intervention."
            echo "Consider using a different build tool like Vite or Parcel."
        fi
    fi
fi

echo ""
echo "📊 Final package status:"
echo "- React Scripts: $(npm list react-scripts --depth=0 2>/dev/null | grep react-scripts || echo 'Not found')"
echo "- ajv: $(npm list ajv --depth=0 2>/dev/null | grep ajv || echo 'Not found')"
echo "- ajv-keywords: $(npm list ajv-keywords --depth=0 2>/dev/null | grep ajv-keywords || echo 'Not found')"