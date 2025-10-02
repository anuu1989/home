#!/bin/bash

echo "🚀 Setting up Vite as an alternative to React Scripts..."

# Step 1: Install Vite and related packages
echo "📦 Installing Vite..."
npm install --save-dev vite @vitejs/plugin-react

# Step 2: Create Vite configuration
echo "⚙️ Creating Vite configuration..."
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'build',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
EOF

# Step 3: Create index.html for Vite
echo "📄 Creating Vite-compatible index.html..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo192.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anurag Vaidhya - Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
EOF

# Step 4: Update package.json scripts for Vite
echo "📝 Adding Vite scripts to package.json..."

# Create a temporary script to update package.json
cat > update_scripts.js << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add Vite scripts
packageJson.scripts = {
  ...packageJson.scripts,
  'dev': 'vite',
  'build:vite': 'vite build',
  'preview': 'vite preview',
  'start:vite': 'vite'
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Added Vite scripts to package.json');
EOF

node update_scripts.js
rm update_scripts.js

# Step 5: Test Vite setup
echo "🧪 Testing Vite setup..."
echo "Starting Vite development server for 10 seconds..."

timeout 10s npm run dev &
VITE_PID=$!

sleep 5
if ps -p $VITE_PID > /dev/null; then
    echo "✅ Vite development server started successfully!"
    kill $VITE_PID
    wait $VITE_PID 2>/dev/null
else
    echo "❌ Vite development server failed to start"
fi

# Step 6: Test Vite build
echo "🏗️ Testing Vite build..."
npm run build:vite

if [ $? -eq 0 ]; then
    echo "✅ Vite build successful!"
    echo ""
    echo "🎉 Vite setup complete!"
    echo ""
    echo "📋 Vite advantages:"
    echo "- ⚡ Much faster development server"
    echo "- 🔧 No webpack configuration issues"
    echo "- 📦 Modern build tool with better defaults"
    echo "- 🚀 Hot Module Replacement (HMR)"
    echo "- 🎯 No ajv/babel-loader conflicts"
    echo ""
    echo "🎯 Vite commands:"
    echo "  npm run dev         - Start Vite dev server"
    echo "  npm run build:vite  - Build with Vite"
    echo "  npm run preview     - Preview Vite build"
    echo ""
    echo "📁 Files created:"
    echo "- vite.config.js     - Vite configuration"
    echo "- index.html         - Vite entry point"
    echo ""
    echo "⚠️ Note: You can use either React Scripts or Vite"
    echo "Vite is recommended for better performance and fewer issues."
else
    echo "❌ Vite build failed"
    echo "This might indicate issues with the source code itself."
fi

echo ""
echo "🔄 To switch between build tools:"
echo "React Scripts: npm start, npm run build"
echo "Vite:         npm run dev, npm run build:vite"