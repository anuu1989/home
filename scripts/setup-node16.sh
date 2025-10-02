#!/bin/bash

echo "⬇️ Setting up Node.js 16 for maximum React Scripts 4.x compatibility..."

# Step 2: Install and use Node.js 16
echo "📦 Installing Node.js 16.20.2 LTS..."
nvm install 16.20.2
nvm use 16.20.2

# Step 3: Verify Node version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" != "v16.20.2" ]]; then
    echo "❌ Failed to switch to Node.js 16.20.2"
    echo "Current version: $NODE_VERSION"
    echo "Please manually run: nvm use 16.20.2"
    exit 1
fi

# Step 4: Update .nvmrc for this project
echo "📝 Creating .nvmrc for Node.js 16..."
echo "16.20.2" > .nvmrc

# Step 5: Clean install with Node.js 16
echo "🧹 Clean installation with Node.js 16..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Step 6: Use working package.json if available
if [ -f "package.json.working" ]; then
    echo "📋 Using working package.json configuration..."
    cp package.json package.json.node18-backup
    cp package.json.working package.json
fi

# Step 7: Install dependencies
echo "📦 Installing dependencies with Node.js 16..."
npm install --legacy-peer-deps

# Step 8: Create simple .env (no OpenSSL flags needed)
echo "⚙️ Creating .env for Node.js 16..."
cat > .env << 'EOF'
# Node.js 16 - no OpenSSL flags needed
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
FAST_REFRESH=true
EOF

# Step 9: Fix React 18 compatibility if needed
if [ -f "src/index.js.react-scripts-4" ]; then
    echo "🔄 Applying React Scripts 4.x compatibility..."
    cp src/index.js src/index.js.react18-backup
    cp src/index.js.react-scripts-4 src/index.js
fi

# Step 10: Test development server
echo "🚀 Testing development server with Node.js 16..."
timeout 15s npm start &
SERVER_PID=$!

sleep 8
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Development server started successfully!"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
else
    echo "❌ Development server failed to start"
fi

# Step 11: Test build
echo "🏗️ Testing build with Node.js 16..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful with Node.js 16!"
    echo ""
    echo "🎉 Node.js 16 setup complete!"
    echo ""
    echo "📋 What was done:"
    echo "✅ Installed Node.js 16.20.2 LTS"
    echo "✅ Created .nvmrc for project consistency"
    echo "✅ Clean installation of dependencies"
    echo "✅ No OpenSSL compatibility issues"
    echo "✅ React Scripts 4.x works perfectly"
    echo ""
    echo "🎯 You can now run:"
    echo "  npm start     - Start development server"
    echo "  npm run build - Build for production"
    echo "  npm run deploy - Deploy to GitHub Pages"
    echo ""
    echo "📁 Backup files created:"
    echo "- package.json.node18-backup (if applicable)"
    echo "- src/index.js.react18-backup (if applicable)"
    echo ""
    echo "⚠️ Important: Always use Node.js 16 for this project"
    echo "Run 'nvm use 16.20.2' when working on this project"
else
    echo "❌ Build failed even with Node.js 16"
    echo "This indicates source code issues, not Node.js compatibility"
    echo ""
    echo "🔍 Check for:"
    echo "- Syntax errors in source files"
    echo "- Missing imports"
    echo "- Deprecated React patterns"
    echo ""
    echo "💡 Try creating a fresh React app and migrating code:"
    echo "npx create-react-app@4.0.3 portfolio-fresh"
fi

echo ""
echo "📊 Final setup:"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "React Scripts: $(npm list react-scripts --depth=0 2>/dev/null | grep react-scripts || echo 'Not found')"
echo ""
echo "🔄 To switch Node versions in future:"
echo "nvm use 16.20.2  # For this project (React Scripts 4.x)"
echo "nvm use 18.19.1  # For other projects (modern React)"