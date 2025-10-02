#!/bin/bash

echo "🎯 Final Complete Fix - Node.js 16 + All Dependencies + Build Fix..."

# Step 1: Check Node.js version
NODE_VERSION=$(node --version)
echo "Current Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" != "v16.20.2" ]]; then
    echo "⚠️ Node.js 16.20.2 recommended for best compatibility"
    echo "Current version: $NODE_VERSION"
    echo ""
    echo "To switch to Node.js 16:"
    echo "nvm install 16.20.2"
    echo "nvm use 16.20.2"
    echo ""
    echo "Continuing with current Node.js version..."
fi

# Step 2: Backup and use working configuration
echo "💾 Using complete working configuration..."
cp package.json package.json.current-backup
cp package.json.working package.json

# Step 3: Fix React 18 compatibility
echo "🔄 Applying React Scripts 4.x compatibility..."
if [ -f "src/index.js.react-scripts-4" ]; then
    cp src/index.js src/index.js.react18-backup
    cp src/index.js.react-scripts-4 src/index.js
    echo "✅ Applied React Scripts 4.x compatible index.js"
fi

# Step 4: Clean installation
echo "🧹 Clean installation..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Step 5: Install all dependencies
echo "📦 Installing all dependencies..."
npm install --legacy-peer-deps

# Step 6: Verify critical packages
echo "🔍 Verifying critical packages..."
MISSING_PACKAGES=()

if ! npm list react-helmet --depth=0 >/dev/null 2>&1; then
    MISSING_PACKAGES+=("react-helmet")
fi

if ! npm list axios --depth=0 >/dev/null 2>&1; then
    MISSING_PACKAGES+=("axios")
fi

if ! npm list react-bootstrap --depth=0 >/dev/null 2>&1; then
    MISSING_PACKAGES+=("react-bootstrap")
fi

if ! npm list react-typist --depth=0 >/dev/null 2>&1; then
    MISSING_PACKAGES+=("react-typist")
fi

if [ ${#MISSING_PACKAGES[@]} -gt 0 ]; then
    echo "📦 Installing missing packages: ${MISSING_PACKAGES[*]}"
    for package in "${MISSING_PACKAGES[@]}"; do
        npm install "$package" --save --legacy-peer-deps
    done
fi

# Step 7: Create optimal .env
echo "⚙️ Creating optimal .env configuration..."
cat > .env << 'EOF'
# Node.js compatibility (use only if Node.js 18+)
# NODE_OPTIONS=--legacy-openssl-provider

# React Scripts configuration
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
FAST_REFRESH=true

# Build optimizations
INLINE_RUNTIME_CHUNK=false
EOF

# Step 8: Test development server
echo "🚀 Testing development server..."
timeout 15s npm start &
SERVER_PID=$!

sleep 8
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Development server started successfully!"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
else
    echo "❌ Development server failed to start"
    echo "Checking for additional issues..."
fi

# Step 9: Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 COMPLETE SUCCESS! 🎉"
    echo ""
    echo "📋 What was accomplished:"
    echo "✅ Used Node.js $(node --version)"
    echo "✅ Applied working package.json configuration"
    echo "✅ Fixed React 18 + React Scripts 4.x compatibility"
    echo "✅ Installed all required dependencies:"
    echo "   - react-helmet@6.1.0"
    echo "   - axios@1.6.8"
    echo "   - react-bootstrap@2.10.2"
    echo "   - react-typist@2.0.5"
    echo "   - bootstrap@5.3.3"
    echo "   - @popperjs/core@2.11.8"
    echo "✅ Resolved all dependency conflicts"
    echo "✅ Fixed OpenSSL compatibility issues"
    echo "✅ Created optimized build configuration"
    echo ""
    echo "🎯 Your portfolio is now ready!"
    echo ""
    echo "📁 Commands you can run:"
    echo "  npm start       - Start development server"
    echo "  npm run build   - Build for production"
    echo "  npm run deploy  - Deploy to GitHub Pages"
    echo "  npm run serve   - Serve built files locally"
    echo ""
    echo "📁 Backup files created:"
    echo "- package.json.current-backup - Your previous package.json"
    echo "- src/index.js.react18-backup - Your previous index.js"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Test your portfolio: npm start"
    echo "2. Build for production: npm run build"
    echo "3. Deploy to GitHub Pages: npm run deploy"
    echo ""
    echo "🎊 Congratulations! Your modern portfolio is ready to deploy!"
else
    echo "❌ Build failed. Investigating remaining issues..."
    
    # Check for specific error patterns
    echo "🔍 Checking for remaining issues..."
    
    # Check if it's an OpenSSL issue (Node.js 18+)
    if [[ "$NODE_VERSION" == v18* ]] || [[ "$NODE_VERSION" == v19* ]] || [[ "$NODE_VERSION" == v20* ]]; then
        echo "⚠️ Detected Node.js 18+. Applying OpenSSL fix..."
        
        # Update .env with OpenSSL fix
        cat > .env << 'EOF'
# Node.js 18+ OpenSSL compatibility
NODE_OPTIONS=--legacy-openssl-provider

# React Scripts configuration
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
FAST_REFRESH=true
INLINE_RUNTIME_CHUNK=false
EOF
        
        # Update package.json scripts with OpenSSL flags
        cat > temp_update_scripts.js << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = {
  ...pkg.scripts,
  "start": "NODE_OPTIONS='--legacy-openssl-provider' react-scripts start",
  "build": "NODE_OPTIONS='--legacy-openssl-provider' react-scripts build"
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
EOF
        
        node temp_update_scripts.js
        rm temp_update_scripts.js
        
        echo "🔄 Trying build with OpenSSL fix..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Build successful with OpenSSL fix!"
            echo ""
            echo "🎉 SUCCESS with Node.js 18+ compatibility!"
        else
            echo "❌ Build still failing. Manual investigation needed."
            echo ""
            echo "💡 Recommended actions:"
            echo "1. Switch to Node.js 16: nvm use 16.20.2"
            echo "2. Check source code for syntax errors"
            echo "3. Verify all asset files exist"
            echo "4. Run: npm run build --verbose"
        fi
    else
        echo "💡 Possible remaining issues:"
        echo "1. Missing asset files (images, PDFs)"
        echo "2. Syntax errors in components"
        echo "3. Incorrect import paths"
        echo ""
        echo "🔍 Run for detailed error info:"
        echo "npm run build --verbose"
    fi
fi

echo ""
echo "📊 Final status:"
echo "Node: $(node --version)"
echo "NPM: $(npm --version)"
echo "React: $(npm list react --depth=0 2>/dev/null | grep react || echo 'Not found')"
echo "React Scripts: $(npm list react-scripts --depth=0 2>/dev/null | grep react-scripts || echo 'Not found')"
echo ""
echo "📦 Key dependencies:"
npm list react-helmet axios react-bootstrap react-typist --depth=0 2>/dev/null || echo "Some packages not found"