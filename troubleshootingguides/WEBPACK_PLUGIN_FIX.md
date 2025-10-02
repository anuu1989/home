# Fork-TS-Checker-Webpack-Plugin Fix Guide

## The Problem
Error: `Cannot read properties of undefined (reading 'date')` in `ajv-keywords/_formatLimit.js`

This occurs due to version conflicts between:
- `fork-ts-checker-webpack-plugin` 
- `ajv-keywords`
- `ajv`
- `schema-utils`

## Solutions (Try in Order)

### Solution 1: Automated Fix Script (Recommended)
```bash
./fix-webpack-plugin-issue.sh
```

### Solution 2: Manual Dependency Resolution
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force

# Install with fixed versions
npm install --legacy-peer-deps
npm install ajv@^8.12.0 ajv-keywords@^5.1.0 --save-dev --legacy-peer-deps

# Build with environment variables
npm run build:safe
```

### Solution 3: Use CRACO (Custom Webpack Config)
```bash
# Install CRACO
npm install @craco/craco --save-dev --legacy-peer-deps

# Use CRACO scripts
npm run start:craco
npm run build:craco
```

### Solution 4: Environment Variable Bypass
```bash
# Set environment variables and build
SKIP_PREFLIGHT_CHECK=true TSC_COMPILE_ON_ERROR=true npm run build
```

### Solution 5: Downgrade React Scripts
```bash
# Downgrade to React Scripts 4.x (more stable)
npm install react-scripts@4.0.3 --save-dev --legacy-peer-deps
npm run build
```

## Quick Commands Reference

```bash
# Method 1: Safe build with error tolerance
npm run build:safe

# Method 2: CRACO build (custom webpack)
npm run build:craco

# Method 3: Environment variable build
SKIP_PREFLIGHT_CHECK=true npm run build

# Method 4: Force build ignoring TypeScript errors
TSC_COMPILE_ON_ERROR=true npm run build
```

## Verification Steps

After applying any fix:

1. **Check if build succeeds:**
   ```bash
   npm run build
   ```

2. **Verify build output:**
   ```bash
   ls -la build/
   # Should see: index.html, static/ folder with JS/CSS files
   ```

3. **Test development server:**
   ```bash
   npm start
   # Should start without errors on http://localhost:3000
   ```

## Understanding the Fixes

### Package.json Resolutions
```json
{
  "overrides": {
    "ajv": "^8.12.0",
    "ajv-keywords": "^5.1.0",
    "fork-ts-checker-webpack-plugin": "^6.5.3"
  }
}
```
Forces all packages to use compatible versions.

### Environment Variables
```bash
SKIP_PREFLIGHT_CHECK=true     # Skip React Scripts version checks
TSC_COMPILE_ON_ERROR=true     # Continue build despite TypeScript errors
ESLINT_NO_DEV_ERRORS=true     # Treat ESLint errors as warnings
```

### CRACO Configuration
- Disables problematic TypeScript checker
- Adds webpack aliases for consistent package resolution
- Provides custom webpack configuration

## If All Else Fails

### Nuclear Option: Complete Reset
```bash
# Remove everything
rm -rf node_modules package-lock.json build
git clean -fdx  # WARNING: Removes all untracked files

# Fresh install
npm install --legacy-peer-deps
npm run build:safe
```

### Alternative: Use Yarn
```bash
# Remove npm files
rm -rf node_modules package-lock.json

# Install with Yarn (often handles peer deps better)
yarn install
yarn build
```

### Docker Build (Isolated Environment)
```dockerfile
FROM node:18.19.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build:safe
```

## Success Indicators

✅ **Build completes without errors**
✅ **`build/` folder is created with files**
✅ **No ajv-keywords errors in console**
✅ **Development server starts successfully**
✅ **Website loads in browser without console errors**

## Prevention for Future

1. **Pin exact versions** in package.json
2. **Use .nvmrc** for consistent Node versions
3. **Regular dependency updates** with testing
4. **Consider using Yarn** for better dependency resolution
5. **Keep React Scripts updated** (when stable versions are available)

## Still Having Issues?

1. Check Node.js version: `node --version` (must be 18+)
2. Clear all caches: `npm cache clean --force`
3. Try different terminal/command prompt
4. Check for antivirus blocking npm operations
5. Try running with administrator privileges
6. Consider using GitHub Codespaces or similar cloud environment