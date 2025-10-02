#!/bin/bash

echo "🔄 Using known working package.json configuration..."

# Step 1: Backup current package.json
echo "💾 Backing up current package.json..."
cp package.json package.json.backup

# Step 2: Use the working configuration
echo "📋 Applying working package.json..."
cp package.json.working package.json

# Step 3: Clean install
echo "🧹 Clean installation..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Step 4: Install with exact versions
echo "📦 Installing exact working versions..."
npm install --legacy-peer-deps

# Step 5: Create minimal .env
echo "⚙️ Creating minimal .env..."
cat > .env << 'EOF'
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
EOF

# Step 6: Test the setup
echo "🧪 Testing working configuration..."

# Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful with working configuration!"
    echo ""
    echo "🎉 Working package.json applied successfully!"
    echo ""
    echo "📋 Configuration used:"
    echo "- react-scripts: 4.0.3"
    echo "- ajv: 6.12.6 (exact)"
    echo "- ajv-keywords: 3.5.2 (exact)"
    echo "- schema-utils: 2.7.1 (exact)"
    echo "- terser-webpack-plugin: 4.2.3 (exact)"
    echo ""
    echo "🎯 You can now run:"
    echo "  npm start     - Start development server"
    echo "  npm run build - Build for production"
    echo ""
    echo "📁 Files:"
    echo "- package.json.backup - Your original package.json"
    echo "- package.json.working - The working configuration"
else
    echo "❌ Build failed even with working configuration."
    echo "This indicates source code issues, not dependency issues."
    echo ""
    echo "🔄 Restoring original package.json..."
    cp package.json.backup package.json
    echo ""
    echo "💡 Possible source code issues:"
    echo "- Import/export syntax errors"
    echo "- Missing React imports in components"
    echo "- Deprecated React patterns"
    echo "- TypeScript errors"
    echo ""
    echo "🔍 Check these files for issues:"
    echo "- src/index.js"
    echo "- src/App.js"
    echo "- src/components/**/*.jsx"
fi

echo ""
echo "📊 Package versions:"
npm list react react-scripts ajv schema-utils --depth=0 2>/dev/null || echo "Some packages not found"