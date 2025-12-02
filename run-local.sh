#!/bin/bash

# Portfolio Local Development Script
# This script sets up and runs the portfolio website locally

echo "🚀 Starting Portfolio Development Server..."
echo ""

# Function to install nvm
install_nvm() {
    echo "📦 Installing nvm (Node Version Manager)..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    
    echo "✅ nvm installed successfully"
    echo ""
}

# Function to install Node.js using nvm
install_node() {
    local node_version="16.20.2"
    
    if [ -f ".nvmrc" ]; then
        node_version=$(cat .nvmrc)
    elif [ -f ".node-version" ]; then
        node_version=$(cat .node-version)
    fi
    
    echo "📦 Installing Node.js version $node_version..."
    nvm install "$node_version"
    nvm use "$node_version"
    echo "✅ Node.js $node_version installed successfully"
    echo ""
}

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    # Try to load nvm if it exists but not in PATH
    export NVM_DIR="$HOME/.nvm"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        echo "📌 Loading nvm..."
        \. "$NVM_DIR/nvm.sh"
        \. "$NVM_DIR/bash_completion" 2>/dev/null || true
    else
        echo "⚠️  nvm is not installed"
        read -p "Would you like to install nvm? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            install_nvm
        else
            echo "❌ nvm is required to manage Node.js versions"
            echo "   Please install it manually from: https://github.com/nvm-sh/nvm"
            exit 1
        fi
    fi
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js is not installed"
    read -p "Would you like to install Node.js using nvm? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_node
    else
        echo "❌ Node.js is required to run this project"
        echo "   Install it manually from: https://nodejs.org/"
        exit 1
    fi
else
    echo "✅ Node.js version: $(node --version)"
fi

# Check if npm is installed (comes with Node.js)
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. This is unusual as it comes with Node.js."
    echo "   Please reinstall Node.js from: https://nodejs.org/"
    exit 1
else
    echo "✅ npm version: $(npm --version)"
fi

echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

echo "🌐 Starting development server..."
echo "   The app will open in your browser at http://localhost:3000"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm start
