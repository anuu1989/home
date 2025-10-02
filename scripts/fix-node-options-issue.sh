#!/bin/bash

echo "🔧 Fixing NODE_OPTIONS legacy-openssl-provider issue..."

# Step 1: Remove problematic NODE_OPTIONS from .env
echo "📝 Updating .env to remove NODE_OPTIONS..."
cat > .env << 'EOF'
# React Scripts configuration (no NODE_OPTIONS)
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
FAST_REFRESH=true
INLINE_RUNTIME_CHUNK=false

# Development settings
ESLINT_NO_DEV_ERRORS=true
TSC_COMPILE_ON_ERROR=true
EOF

# Step 2: Update package.json scripts to use direct node flags
echo "📝 Updating package.json scripts with proper Node.js flags..."
cat > update_scripts_proper.js << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Check Node.js version to determine if we need OpenSSL flags
const nodeVersion = process.version;
const needsOpenSSLFix = nodeVersion.startsWith('v18.') || nodeVersion.startsWith('v19.') || nodeVersion.startsWith('v20.');

if (needsOpenSSLFix) {
  // For Node.js 18+, use direct node command with flags
  packageJson.scripts = {
    ...packageJson.scripts,
    "start": "node --legacy-openssl-provider ./node_modules/.bin/react-scripts start",
    "build": "node --legacy-openssl-provider ./node_modules/.bin/react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  };
  console.log('✅ Applied Node.js 18+ OpenSSL compatibility scripts');
} else {
  // For Node.js 16 and below, use normal scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    "start": "react-scripts start",
    "build": "react-scripts build", 
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  };
  console.log('✅ Applied standard scripts for Node.js 16');
}

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
EOF

node update_scripts_proper.js
rm update_scripts_proper.js

# Step 3: Test the fix
NODE_VERSION=$(node --version)
echo "Current Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" == v18* ]] || [[ "$NODE_VERSION" == v19* ]] || [[ "$NODE_VERSION" == v20* ]]; then
    echo "⚠️ Node.js 18+ detected. Testing OpenSSL compatibility fix..."
    
    # Test development server
    echo "🚀 Testing development server..."
    timeout 10s npm start &
    SERVER_PID=$!
    
    sleep 5
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ Development server started successfully!"
        kill $SERVER_PID
        wait $SERVER_PID 2>/dev/null
    else
        echo "❌ Development server failed"
    fi
    
    # Test build
    echo "🏗️ Testing build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful with Node.js 18+ compatibility!"
    else
        echo "❌ Build failed. Recommending Node.js 16..."
        echo ""
        echo "💡 Recommended solution: Switch to Node.js 16"
        echo "nvm install 16.20.2"
        echo "nvm use 16.20.2"
        echo "npm install"
        echo "npm run build"
    fi
else
    echo "✅ Node.js 16 detected. No OpenSSL fixes needed."
    
    # Test with Node.js 16
    echo "🚀 Testing with Node.js 16..."
    npm start &
    SERVER_PID=$!
    
    sleep 5
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ Development server works perfectly with Node.js 16!"
        kill $SERVER_PID
        wait $SERVER_PID 2>/dev/null
    fi
    
    npm run build
    if [ $? -eq 0 ]; then
        echo "✅ Build successful with Node.js 16!"
    fi
fi

echo ""
echo "📋 Summary:"
echo "- Removed NODE_OPTIONS from .env"
echo "- Updated package.json scripts for proper Node.js compatibility"
echo "- Node.js version: $(node --version)"
echo ""
echo "🎯 You can now run:"
echo "  npm start     - Start development server"
echo "  npm run build - Build for production"