#!/bin/bash

echo "🔧 Quick fix for missing react-helmet dependency..."

# Step 1: Install react-helmet specifically
echo "📦 Installing react-helmet..."
npm install react-helmet@^6.1.0 --save --legacy-peer-deps

# Step 2: Verify installation
echo "🔍 Verifying react-helmet installation..."
if npm list react-helmet --depth=0 >/dev/null 2>&1; then
    echo "✅ react-helmet installed successfully"
else
    echo "❌ react-helmet installation failed"
    exit 1
fi

# Step 3: Test development server
echo "🚀 Testing development server..."
timeout 10s npm start &
SERVER_PID=$!

sleep 5
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Development server started successfully!"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
else
    echo "❌ Development server failed - checking for more missing dependencies..."
    
    # Install other potentially missing dependencies
    echo "📦 Installing additional dependencies..."
    npm install @popperjs/core@^2.11.8 --save --legacy-peer-deps
    npm install web-vitals@^3.5.2 --save --legacy-peer-deps
    
    # Try again
    timeout 10s npm start &
    SERVER_PID=$!
    sleep 5
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ Development server started after installing additional deps!"
        kill $SERVER_PID
        wait $SERVER_PID 2>/dev/null
    fi
fi

# Step 4: Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Missing dependencies fixed!"
    echo ""
    echo "📦 Installed:"
    echo "✅ react-helmet@6.1.0"
    echo ""
    echo "🎯 You can now run:"
    echo "  npm start     - Start development server"
    echo "  npm run build - Build for production"
else
    echo "❌ Build failed. Running comprehensive dependency installer..."
    ./install-missing-dependencies.sh
fi

echo ""
echo "📊 Current dependencies:"
npm list react-helmet axios react-bootstrap react-typist --depth=0 2>/dev/null || echo "Some packages may still be missing"