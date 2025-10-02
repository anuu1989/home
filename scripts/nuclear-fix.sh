#!/bin/bash

echo "💥 Nuclear Fix - Complete React Scripts Reset..."

# Step 1: Complete nuclear cleanup
echo "🧹 Nuclear cleanup - removing everything..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -rf ~/.npm/_cacache
rm -rf ~/.npm/_logs
rm -rf build
rm -rf .next
npm cache clean --force

# Step 2: Reset to absolute minimal working setup
echo "📦 Installing absolute minimal working versions..."

# Install React 18 first
npm install react@18.2.0 react-dom@18.2.0 --save --legacy-peer-deps

# Install the EXACT versions that work together for React Scripts 4.0.3
npm install react-scripts@4.0.3 --save-dev --exact --legacy-peer-deps

# Install exact compatible versions
npm install ajv@6.12.6 --save-dev --exact --legacy-peer-deps
npm install ajv-keywords@3.5.2 --save-dev --exact --legacy-peer-deps  
npm install schema-utils@2.7.1 --save-dev --exact --legacy-peer-deps
npm install terser-webpack-plugin@4.2.3 --save-dev --exact --legacy-peer-deps

# Install other essential dependencies with exact versions
npm install typescript@4.4.4 --save-dev --exact --legacy-peer-deps
npm install @types/react@18.0.0 --save-dev --exact --legacy-peer-deps
npm install @types/react-dom@18.0.0 --save-dev --exact --legacy-peer-deps

# Install remaining production dependencies
npm install bootstrap@5.3.3 --save --legacy-peer-deps
npm install react-bootstrap@2.10.2 --save --legacy-peer-deps
npm install react-router-dom@6.22.3 --save --legacy-peer-deps
npm install axios@1.6.8 --save --legacy-peer-deps
npm install react-typist@2.0.5 --save --legacy-peer-deps

echo "🔍 Verifying exact versions..."
echo "React Scripts:"
npm list react-scripts --depth=0
echo "ajv:"
npm list ajv --depth=0
echo "schema-utils:"
npm list schema-utils --depth=0
echo "terser-webpack-plugin:"
npm list terser-webpack-plugin --depth=0

# Step 3: Create minimal package.json scripts
echo "📝 Creating minimal scripts..."
cat > temp_update.js << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Minimal scripts that work
pkg.scripts = {
  "start": "react-scripts start",
  "build": "react-scripts build", 
  "test": "react-scripts test",
  "eject": "react-scripts eject"
};

// Remove problematic configurations
delete pkg.eslintConfig;
delete pkg.overrides;
delete pkg.resolutions;

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
EOF

node temp_update.js
rm temp_update.js

# Step 4: Create minimal .env
echo "⚙️ Creating minimal .env..."
cat > .env << 'EOF'
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
EOF

# Step 5: Test the minimal setup
echo "🧪 Testing minimal setup..."

# Test development server
echo "🚀 Testing development server..."
timeout 15s npm start &
SERVER_PID=$!

sleep 8
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
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Nuclear fix successful!"
    echo ""
    echo "📋 What was done:"
    echo "- Complete cleanup of all caches and node_modules"
    echo "- Installed exact versions that work together:"
    echo "  * react-scripts@4.0.3"
    echo "  * ajv@6.12.6"
    echo "  * ajv-keywords@3.5.2"
    echo "  * schema-utils@2.7.1"
    echo "  * terser-webpack-plugin@4.2.3"
    echo "- Removed all problematic configurations"
    echo "- Created minimal working setup"
    echo ""
    echo "🎯 You can now run:"
    echo "  npm start     - Start development server"
    echo "  npm run build - Build for production"
    echo ""
    echo "⚠️ Note: This is a minimal setup. You can gradually add back"
    echo "other dependencies and configurations as needed."
else
    echo "❌ Build still failed with minimal setup."
    echo ""
    echo "🔍 This indicates a fundamental issue. Let's try Vite instead..."
    
    # Fallback to Vite
    echo "🚀 Setting up Vite as alternative..."
    
    # Install Vite
    npm install vite@latest @vitejs/plugin-react@latest --save-dev --legacy-peer-deps
    
    # Create Vite config
    cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000
  }
})
EOF

    # Create index.html for Vite
    cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anurag Vaidhya - Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
EOF

    # Update package.json for Vite
    cat > temp_vite_update.js << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = {
  ...pkg.scripts,
  "dev": "vite",
  "build:vite": "vite build",
  "preview": "vite preview"
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
EOF

    node temp_vite_update.js
    rm temp_vite_update.js
    
    # Test Vite
    echo "🧪 Testing Vite build..."
    npm run build:vite
    
    if [ $? -eq 0 ]; then
        echo "✅ Vite build successful!"
        echo ""
        echo "🎉 Vite setup complete as fallback!"
        echo ""
        echo "🎯 Vite commands:"
        echo "  npm run dev         - Start Vite dev server"
        echo "  npm run build:vite  - Build with Vite"
        echo "  npm run preview     - Preview build"
    else
        echo "❌ Even Vite failed. This indicates source code issues."
        echo ""
        echo "💡 Possible issues:"
        echo "- Syntax errors in source code"
        echo "- Missing dependencies in source files"
        echo "- Incompatible React patterns"
        echo ""
        echo "🔍 Check your source code for:"
        echo "- Import/export syntax errors"
        echo "- Missing React imports"
        echo "- Deprecated React patterns"
    fi
fi

echo ""
echo "📊 Final status:"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "React version: $(npm list react --depth=0 2>/dev/null | grep react || echo 'Not found')"
echo "React Scripts version: $(npm list react-scripts --depth=0 2>/dev/null | grep react-scripts || echo 'Not found')"