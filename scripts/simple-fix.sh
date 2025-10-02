#!/bin/bash

echo "🎯 Simple Fix - Install missing dependencies and use Node.js 16 approach..."

# Step 1: Check Node.js version
NODE_VERSION=$(node --version)
echo "Current Node.js version: $NODE_VERSION"

# Step 2: Install missing react-helmet
echo "📦 Installing react-helmet..."
npm install react-helmet@6.1.0 --save --legacy-peer-deps

# Step 3: Create simple .env without NODE_OPTIONS
echo "⚙️ Creating simple .env..."
cat > .env << 'EOF'
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
EOF

# Step 4: Ensure package.json has simple scripts
echo "📝 Ensuring simple package.json scripts..."
cat > update_simple_scripts.js << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Simple scripts without NODE_OPTIONS
packageJson.scripts = {
  ...packageJson.scripts,
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Updated to simple scripts');
EOF

node update_simple_scripts.js
rm update_simple_scripts.js

# Step 5: Test development server
echo "🚀 Testing development server..."
timeout 10s npm start &
SERVER_PID=$!

sleep 5
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Development server started successfully!"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
else
    echo "❌ Development server failed to start"
fi

# Step 6: Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Simple fix completed successfully!"
    echo ""
    echo "📋 What was done:"
    echo "✅ Installed react-helmet@6.1.0"
    echo "✅ Created simple .env configuration"
    echo "✅ Used standard React Scripts commands"
    echo "✅ No NODE_OPTIONS complications"
    echo ""
    echo "🎯 Your portfolio is ready!"
    echo ""
    echo "Commands:"
    echo "  npm start       - Start development server"
    echo "  npm run build   - Build for production"
    echo "  npm run deploy  - Deploy to GitHub Pages"
else
    echo "❌ Build failed."
    
    if [[ "$NODE_VERSION" == v18* ]] || [[ "$NODE_VERSION" == v19* ]] || [[ "$NODE_VERSION" == v20* ]]; then
        echo ""
        echo "💡 Node.js 18+ detected. For best compatibility, consider:"
        echo ""
        echo "Option 1: Switch to Node.js 16 (Recommended)"
        echo "nvm install 16.20.2"
        echo "nvm use 16.20.2"
        echo "npm install"
        echo "npm run build"
        echo ""
        echo "Option 2: Use direct node command for build"
        echo "node --legacy-openssl-provider ./node_modules/.bin/react-scripts build"
    else
        echo ""
        echo "💡 Check for other issues:"
        echo "- Missing asset files"
        echo "- Syntax errors in components"
        echo "- Import path issues"
        echo ""
        echo "Run for detailed error:"
        echo "npm run build --verbose"
    fi
fi

echo ""
echo "📊 Status:"
echo "Node: $(node --version)"
echo "react-helmet: $(npm list react-helmet --depth=0 2>/dev/null | grep react-helmet || echo 'Not found')"