# Build Troubleshooting Guide

## Common Build Errors and Solutions

### Error: "Cannot find module 'ajv/dist/compile/codegen'"

This is a common issue with React Scripts 5.x and dependency conflicts.

#### Quick Fix:
```bash
# Run the automated fix script
./fix-build-issues.sh
```

#### Manual Fix:
```bash
# Step 1: Clean installation
rm -rf node_modules package-lock.json
npm cache clean --force

# Step 2: Install with legacy peer deps
npm install --legacy-peer-deps

# Step 3: Install ajv specifically
npm install ajv@^8.12.0 --legacy-peer-deps

# Step 4: Try building
npm run build
```

### Error: TypeScript version conflicts

```bash
# Fix TypeScript version
npm install typescript@^4.9.5 --save-dev --legacy-peer-deps
```

### Error: React types conflicts

```bash
# Fix React types
npm install @types/react@^18.2.0 @types/react-dom@^18.2.0 --save-dev --legacy-peer-deps
```

## Alternative Solutions

### Option 1: Use Yarn (Often handles peer deps better)
```bash
# Remove npm files
rm -rf node_modules package-lock.json

# Install with yarn
yarn install
yarn build
```

### Option 2: Downgrade React Scripts (If all else fails)
```bash
# Downgrade to React Scripts 4.x
npm install react-scripts@4.0.3 --save-dev --legacy-peer-deps
```

### Option 3: Use CRACO for custom webpack config
```bash
# Install CRACO
npm install @craco/craco --save-dev

# Create craco.config.js
cat > craco.config.js << 'EOF'
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fix for ajv issues
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "ajv": require.resolve("ajv"),
      };
      return webpackConfig;
    },
  },
};
EOF

# Update package.json scripts to use craco
# "start": "craco start",
# "build": "craco build",
```

## Environment-Specific Fixes

### For macOS:
```bash
# Clear npm cache completely
sudo npm cache clean --force
rm -rf ~/.npm

# Reinstall npm
brew uninstall node
brew install node@18
```

### For Windows:
```bash
# Clear npm cache
npm cache clean --force
rmdir /s node_modules
del package-lock.json

# Reinstall
npm install --legacy-peer-deps
```

### For Linux:
```bash
# Clear cache
sudo npm cache clean --force
rm -rf node_modules package-lock.json

# Fix permissions if needed
sudo chown -R $(whoami) ~/.npm
npm install --legacy-peer-deps
```

## Docker Solution (If local fixes don't work)

```dockerfile
FROM node:18.19.1-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Serve the app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run with Docker
docker build -t portfolio .
docker run -p 3000:80 portfolio
```

## Verification Steps

After fixing, verify everything works:

```bash
# 1. Check Node version
node --version  # Should be 18.x

# 2. Check npm version  
npm --version   # Should be 8.x+

# 3. Verify dependencies
npm ls ajv      # Should show ajv@8.x.x

# 4. Test build
npm run build   # Should complete without errors

# 5. Test development server
npm start       # Should start without errors
```

## Success Indicators

✅ Build completes without errors
✅ `build/` folder is created
✅ `build/static/` contains JS and CSS files
✅ Development server starts on http://localhost:3000
✅ No console errors in browser

## Still Having Issues?

1. Check Node.js version: `node --version` (must be 18+)
2. Update npm: `npm install -g npm@latest`
3. Try with a fresh terminal/command prompt
4. Check for antivirus software blocking npm
5. Try running as administrator (Windows) or with sudo (Mac/Linux)

## Last Resort: Fresh Start

```bash
# Complete reset
rm -rf node_modules package-lock.json
npm cache clean --force
git clean -fdx  # WARNING: This removes all untracked files
npm install --legacy-peer-deps
npm run build
```