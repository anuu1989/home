#!/bin/bash

echo "📦 Installing missing dependencies for the portfolio..."

# Step 1: Install react-helmet (used by AboutMe component)
echo "🔧 Installing react-helmet..."
npm install react-helmet@^6.1.0 --save --legacy-peer-deps

# Step 2: Install other potentially missing dependencies
echo "📦 Installing other missing dependencies..."

# Check if we need @popperjs/core for bootstrap
npm install @popperjs/core@^2.11.8 --save --legacy-peer-deps

# Install web-vitals for performance monitoring
npm install web-vitals@^3.5.2 --save --legacy-peer-deps

# Install gh-pages for deployment
npm install gh-pages@^6.1.1 --save-dev --legacy-peer-deps

# Step 3: Install testing libraries that might be needed
echo "🧪 Installing testing dependencies..."
npm install @testing-library/jest-dom@^5.17.0 --save-dev --legacy-peer-deps
npm install @testing-library/react@^13.4.0 --save-dev --legacy-peer-deps
npm install @testing-library/user-event@^13.5.0 --save-dev --legacy-peer-deps

# Step 4: Update package.json scripts for deployment
echo "📝 Updating package.json scripts..."
cat > update_package_scripts.js << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add deployment and other useful scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "serve": "npx serve -s build -l 3000"
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json scripts');
EOF

node update_package_scripts.js
rm update_package_scripts.js

# Step 5: Verify installations
echo "🔍 Verifying installed packages..."
echo "react-helmet:"
npm list react-helmet --depth=0 2>/dev/null || echo "❌ Not found"
echo "axios:"
npm list axios --depth=0 2>/dev/null || echo "❌ Not found"
echo "react-bootstrap:"
npm list react-bootstrap --depth=0 2>/dev/null || echo "❌ Not found"
echo "react-typist:"
npm list react-typist --depth=0 2>/dev/null || echo "❌ Not found"

# Step 6: Test development server
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
    echo "Checking for more missing dependencies..."
fi

# Step 7: Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 All missing dependencies installed successfully!"
    echo ""
    echo "📦 Installed packages:"
    echo "✅ react-helmet@6.1.0"
    echo "✅ @popperjs/core@2.11.8"
    echo "✅ web-vitals@3.5.2"
    echo "✅ gh-pages@6.1.1"
    echo "✅ Testing libraries"
    echo ""
    echo "🎯 You can now run:"
    echo "  npm start     - Start development server"
    echo "  npm run build - Build for production"
    echo "  npm run deploy - Deploy to GitHub Pages"
    echo "  npm run serve - Serve built files locally"
else
    echo "❌ Build failed. Checking for additional missing dependencies..."
    
    # Check for more specific missing imports
    echo "🔍 Scanning for more missing dependencies..."
    
    # Check if there are more missing packages by looking at common imports
    if grep -r "from ['\"]react-photo-gallery['\"]" src/ 2>/dev/null; then
        echo "📦 Installing react-photo-gallery..."
        npm install react-photo-gallery@^8.0.0 --save --legacy-peer-deps
    fi
    
    if grep -r "from ['\"]react-bootstrap-validation['\"]" src/ 2>/dev/null; then
        echo "📦 Installing react-bootstrap-validation..."
        npm install react-bootstrap-validation@^0.1.11 --save --legacy-peer-deps
    fi
    
    if grep -r "from ['\"]react-bootstrap-buttons['\"]" src/ 2>/dev/null; then
        echo "📦 Installing react-bootstrap-buttons..."
        npm install react-bootstrap-buttons@^1.0.0 --save --legacy-peer-deps
    fi
    
    # Try build again
    echo "🔄 Trying build again after installing additional dependencies..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after installing additional dependencies!"
    else
        echo "❌ Build still failing. Manual investigation needed."
        echo ""
        echo "💡 Common issues to check:"
        echo "1. Import statements in components"
        echo "2. Missing asset files (images, PDFs, etc.)"
        echo "3. Syntax errors in JSX files"
        echo "4. Incorrect file paths"
        echo ""
        echo "🔍 Run with verbose output:"
        echo "npm run build --verbose"
    fi
fi

echo ""
echo "📊 Final package status:"
npm list --depth=0 2>/dev/null | head -20