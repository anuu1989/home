#!/bin/bash

echo "🚀 Direct Build - Bypassing NODE_OPTIONS restrictions..."

# Step 1: Install react-helmet if missing
echo "📦 Ensuring react-helmet is installed..."
if ! npm list react-helmet --depth=0 >/dev/null 2>&1; then
    npm install react-helmet@6.1.0 --save --legacy-peer-deps
fi

# Step 2: Check Node.js version and build accordingly
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" == v18* ]] || [[ "$NODE_VERSION" == v19* ]] || [[ "$NODE_VERSION" == v20* ]]; then
    echo "🔧 Node.js 18+ detected. Using direct node command with OpenSSL fix..."
    
    # Direct build command for Node.js 18+
    echo "🏗️ Building with OpenSSL compatibility..."
    node --legacy-openssl-provider ./node_modules/.bin/react-scripts build
    
    BUILD_EXIT_CODE=$?
    
    if [ $BUILD_EXIT_CODE -eq 0 ]; then
        echo "✅ Build successful with Node.js 18+ compatibility!"
        echo ""
        echo "🎉 Your portfolio is built and ready!"
        echo ""
        echo "📁 Build output in: ./build/"
        echo ""
        echo "🎯 Next steps:"
        echo "1. Test locally: npx serve -s build -l 3000"
        echo "2. Deploy: npm run deploy"
        echo ""
        echo "💡 For development server with Node.js 18+:"
        echo "node --legacy-openssl-provider ./node_modules/.bin/react-scripts start"
    else
        echo "❌ Build failed even with OpenSSL fix."
        echo ""
        echo "💡 Recommended: Switch to Node.js 16"
        echo "nvm install 16.20.2"
        echo "nvm use 16.20.2"
        echo "npm run build"
    fi
    
else
    echo "✅ Node.js 16 or below detected. Using standard build..."
    
    # Standard build for Node.js 16
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful with Node.js 16!"
        echo ""
        echo "🎉 Your portfolio is built and ready!"
        echo ""
        echo "📁 Build output in: ./build/"
        echo ""
        echo "🎯 Commands:"
        echo "  npm start           - Development server"
        echo "  npm run build       - Production build"
        echo "  npm run deploy      - Deploy to GitHub Pages"
        echo "  npx serve -s build  - Test build locally"
    else
        echo "❌ Build failed. Check for source code issues."
    fi
fi

# Step 3: Verify build output
if [ -d "build" ] && [ -f "build/index.html" ]; then
    echo ""
    echo "📊 Build verification:"
    echo "✅ build/ directory exists"
    echo "✅ build/index.html exists"
    echo "Build size: $(du -sh build 2>/dev/null || echo 'Unknown')"
    echo ""
    echo "📁 Build contents:"
    ls -la build/ | head -10
else
    echo ""
    echo "❌ Build directory not found or incomplete"
fi

echo ""
echo "💡 Quick commands for Node.js 18+:"
echo "Development: node --legacy-openssl-provider ./node_modules/.bin/react-scripts start"
echo "Build:       node --legacy-openssl-provider ./node_modules/.bin/react-scripts build"
echo ""
echo "💡 Or switch to Node.js 16 for simpler commands:"
echo "nvm use 16.20.2"