#!/bin/bash

echo "🔧 Fixing Babel Loader and Schema Utils Issues..."

# Step 1: Complete nuclear cleanup
echo "💥 Nuclear cleanup - removing all traces..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -rf ~/.npm/_cacache
rm -rf build
rm -rf .next
npm cache clean --force

# Step 2: Clear React Scripts cache
echo "🗑️ Clearing React Scripts and Webpack cache..."
rm -rf node_modules/.cache
rm -rf ~/.cache/webpack

# Step 3: Install with very specific strategy
echo "📦 Installing with babel-loader compatibility fixes..."

# Install core dependencies first
npm install react@^18.2.0 react-dom@^18.2.0 --legacy-peer-deps

# Install babel and webpack related packages with specific versions
npm install babel-loader@^8.3.0 --save-dev --legacy-peer-deps
npm install schema-utils@^3.3.0 --save-dev --legacy-peer-deps
npm install webpack@^5.88.0 --save-dev --legacy-peer-deps

# Install remaining dependencies
npm install --legacy-peer-deps --no-audit --no-fund

# Step 4: Verify critical packages
echo "🔍 Verifying babel-loader installation..."
if [ -f "node_modules/babel-loader/lib/index.js" ]; then
    echo "✅ babel-loader found"
    echo "babel-loader version:"
    npm list babel-loader --depth=0
else
    echo "❌ babel-loader missing, installing again..."
    npm install babel-loader@^8.3.0 --save-dev --force
fi

echo "🔍 Verifying schema-utils..."
if [ -d "node_modules/schema-utils" ]; then
    echo "✅ schema-utils found"
    echo "schema-utils version:"
    npm list schema-utils --depth=0
else
    echo "❌ schema-utils missing, installing..."
    npm install schema-utils@^3.3.0 --save-dev --force
fi

# Step 5: Try starting development server
echo "🚀 Testing development server..."
timeout 30s npm start &
SERVER_PID=$!

sleep 10
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Development server started successfully!"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
else
    echo "❌ Development server failed to start"
fi

# Step 6: Try building
echo "🏗️ Testing build process..."
npm run build:safe

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🎉 All babel-loader issues resolved!"
else
    echo "❌ Build failed. Trying alternative approaches..."
    
    # Alternative 1: Downgrade React Scripts
    echo "🔄 Trying React Scripts 4.x..."
    npm install react-scripts@4.0.3 --save-dev --legacy-peer-deps
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful with React Scripts 4.x!"
    else
        echo "❌ Still failing. Trying CRACO approach..."
        
        # Alternative 2: Use CRACO
        npm run build:craco
        
        if [ $? -eq 0 ]; then
            echo "✅ Build successful with CRACO!"
        else
            echo "❌ All approaches failed."
            echo "💡 Manual intervention required."
            echo ""
            echo "🔍 Diagnostic information:"
            echo "Node version: $(node --version)"
            echo "NPM version: $(npm --version)"
            echo "React Scripts version:"
            npm list react-scripts --depth=0 2>/dev/null || echo "Not found"
            echo "Babel Loader version:"
            npm list babel-loader --depth=0 2>/dev/null || echo "Not found"
            echo "Schema Utils version:"
            npm list schema-utils --depth=0 2>/dev/null || echo "Not found"
        fi
    fi
fi

echo ""
echo "📋 Final Status:"
echo "- babel-loader: $(npm list babel-loader --depth=0 2>/dev/null | grep babel-loader || echo 'Not found')"
echo "- schema-utils: $(npm list schema-utils --depth=0 2>/dev/null | grep schema-utils || echo 'Not found')"
echo "- react-scripts: $(npm list react-scripts --depth=0 2>/dev/null | grep react-scripts || echo 'Not found')"
echo ""
echo "🎯 If successful, you can now run:"
echo "  npm start           - Start development server"
echo "  npm run build:safe  - Build for production"
echo "  npm run deploy      - Deploy to GitHub Pages"