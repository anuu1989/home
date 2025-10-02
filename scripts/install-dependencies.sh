#!/bin/bash

# Portfolio Dependencies Installation Script
echo "🚀 Installing Portfolio Dependencies..."

# Check Node version
NODE_VERSION=$(node --version)
echo "Current Node version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v18.0.0" ]]; then
    echo "❌ Node.js 18+ is required. Please upgrade Node.js"
    echo "Run: nvm install 18.19.1 && nvm use 18.19.1"
    exit 1
fi

# Clean previous installation
echo "🧹 Cleaning previous installation..."
rm -rf node_modules
rm -f package-lock.json

# Clear npm cache
echo "🗑️ Clearing npm cache..."
npm cache clean --force

# Install dependencies with legacy peer deps
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Install ajv specifically to fix build issues
echo "🔧 Installing ajv to fix build issues..."
npm install ajv@^8.12.0 --legacy-peer-deps

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎯 Next steps:"
    echo "  npm start    - Start development server"
    echo "  npm run build - Build for production"
    echo "  npm test     - Run tests"
    echo ""
else
    echo "❌ Installation failed. Trying alternative methods..."
    
    echo "🔄 Trying with --force flag..."
    npm install --force
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed with --force!"
    else
        echo "❌ NPM installation failed. Trying with Yarn..."
        
        # Check if yarn is installed
        if command -v yarn &> /dev/null; then
            yarn install
            if [ $? -eq 0 ]; then
                echo "✅ Dependencies installed with Yarn!"
            else
                echo "❌ All installation methods failed."
                echo "Please check the INSTALLATION.md file for manual troubleshooting."
            fi
        else
            echo "❌ Yarn not found. Please install Yarn or check INSTALLATION.md"
        fi
    fi
fi