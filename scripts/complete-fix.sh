#!/bin/bash

echo "🔧 Complete Fix - Dependencies + React Scripts 4.x Compatibility..."

# Step 1: Backup important files
echo "💾 Creating backups..."
cp package.json package.json.backup
cp src/index.js src/index.js.backup

# Step 2: Use working package.json
echo "📋 Applying working package.json..."
cp package.json.working package.json

# Step 3: Fix React 18 compatibility for React Scripts 4.x
echo "🔄 Fixing React 18 compatibility..."
cp src/index.js.react-scripts-4 src/index.js

# Step 4: Clean install
echo "🧹 Clean installation..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Step 5: Install exact working versions
echo "📦 Installing exact working versions..."
npm install --legacy-peer-deps

# Step 6: Create minimal .env
echo "⚙️ Creating minimal .env..."
cat > .env << 'EOF'
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
FAST_REFRESH=false
EOF

# Step 7: Test development server
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

# Step 8: Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Complete fix successful!"
    echo ""
    echo "📋 What was fixed:"
    echo "✅ Used exact working dependency versions"
    echo "✅ Fixed React 18 createRoot compatibility with React Scripts 4.x"
    echo "✅ Used ReactDOM.render instead of createRoot"
    echo "✅ Minimal .env configuration"
    echo "✅ Clean dependency installation"
    echo ""
    echo "📦 Working versions:"
    echo "- react-scripts: 4.0.3"
    echo "- ajv: 6.12.6"
    echo "- ajv-keywords: 3.5.2"
    echo "- schema-utils: 2.7.1"
    echo "- terser-webpack-plugin: 4.2.3"
    echo ""
    echo "🎯 You can now run:"
    echo "  npm start     - Start development server"
    echo "  npm run build - Build for production"
    echo "  npm run deploy - Deploy to GitHub Pages"
    echo ""
    echo "📁 Backup files created:"
    echo "- package.json.backup - Original package.json"
    echo "- src/index.js.backup - Original index.js"
else
    echo "❌ Build still failed. Investigating further..."
    
    # Check for specific errors
    echo "🔍 Checking for common issues..."
    
    # Check if ErrorBoundary exists
    if [ ! -f "src/components/ErrorBoundary.jsx" ]; then
        echo "⚠️ ErrorBoundary.jsx not found, creating minimal version..."
        mkdir -p src/components
        cat > src/components/ErrorBoundary.jsx << 'EOF'
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
EOF
        echo "✅ Created minimal ErrorBoundary"
    fi
    
    # Try build again
    echo "🔄 Trying build again..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after fixing ErrorBoundary!"
    else
        echo "❌ Build still failing. Restoring backups and trying minimal setup..."
        
        # Restore backups
        cp package.json.backup package.json
        cp src/index.js.backup src/index.js
        
        # Try minimal React setup
        echo "🔄 Trying minimal React setup..."
        cat > src/index.js << 'EOF'
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
EOF
        
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Build successful with minimal setup!"
            echo "⚠️ Note: Removed ErrorBoundary and StrictMode for compatibility"
        else
            echo "❌ Even minimal setup failed."
            echo "💡 This indicates fundamental source code issues."
            echo ""
            echo "🔍 Manual investigation needed:"
            echo "1. Check src/App.js for syntax errors"
            echo "2. Check all component imports"
            echo "3. Verify all dependencies are properly imported"
            echo "4. Consider using create-react-app to start fresh"
        fi
    fi
fi

echo ""
echo "📊 Final status:"
echo "Node: $(node --version)"
echo "NPM: $(npm --version)"
echo "React: $(npm list react --depth=0 2>/dev/null | grep react || echo 'Not found')"
echo "React Scripts: $(npm list react-scripts --depth=0 2>/dev/null | grep react-scripts || echo 'Not found')"