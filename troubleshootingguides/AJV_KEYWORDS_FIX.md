# AJV Keywords formatMinimum Fix Guide

## The Problem
```
Error: Unknown keyword formatMinimum
at ajv-keywords/dist/index.js:25:15
```

This error occurs because:
1. React Scripts 4.x uses `terser-webpack-plugin` which depends on `ajv`
2. Newer versions of `ajv-keywords` (5.x) don't support the `formatMinimum` keyword
3. There's a version mismatch between `ajv`, `ajv-keywords`, and `schema-utils`

## Root Cause Analysis

### Version Compatibility Matrix

| React Scripts | ajv | ajv-keywords | schema-utils | terser-webpack-plugin |
|---------------|-----|--------------|--------------|----------------------|
| 4.0.3 | ^6.12.6 | ^3.5.2 | ^2.7.1 | ^4.2.3 |
| 5.0.1 | ^8.12.0 | ^5.1.0 | ^4.2.0 | ^5.3.9 |

**The Issue:** We were using React Scripts 4.x with ajv 8.x packages, causing incompatibility.

## Solutions (Try in Order)

### Solution 1: Automated Fix (Recommended)
```bash
./fix-ajv-keywords-issue.sh
```

### Solution 2: Manual Downgrade to Compatible Versions
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force

# Install React Scripts 4.x compatible versions
npm install react-scripts@4.0.3 --save-dev --legacy-peer-deps
npm install ajv@^6.12.6 --save-dev --legacy-peer-deps
npm install ajv-keywords@^3.5.2 --save-dev --legacy-peer-deps
npm install schema-utils@^2.7.1 --save-dev --legacy-peer-deps
npm install terser-webpack-plugin@^4.2.3 --save-dev --legacy-peer-deps

# Install remaining dependencies
npm install --legacy-peer-deps

# Test build
npm run build
```

### Solution 3: Use Vite (Modern Alternative)
```bash
./setup-vite-alternative.sh
```

### Solution 4: Upgrade to React Scripts 5.x (Advanced)
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force

# Upgrade to React Scripts 5.x with compatible packages
npm install react-scripts@5.0.1 --save-dev --legacy-peer-deps
npm install ajv@^8.12.0 --save-dev --legacy-peer-deps
npm install ajv-keywords@^5.1.0 --save-dev --legacy-peer-deps
npm install schema-utils@^4.2.0 --save-dev --legacy-peer-deps

# Install dependencies
npm install --legacy-peer-deps

# Test build
npm run build:safe
```

## Quick Commands Reference

```bash
# Method 1: Automated fix for React Scripts 4.x
./fix-ajv-keywords-issue.sh

# Method 2: Switch to Vite (recommended for new projects)
./setup-vite-alternative.sh

# Method 3: Manual React Scripts 4.x fix
npm install ajv@^6.12.6 ajv-keywords@^3.5.2 --save-dev --legacy-peer-deps

# Method 4: CRACO build (if React Scripts fails)
npm run build:craco

# Method 5: Environment variable bypass
SKIP_PREFLIGHT_CHECK=true npm run build
```

## Understanding the Fix

### Why ajv@6.12.6 Works with React Scripts 4.x
- React Scripts 4.x was built and tested with ajv 6.x
- ajv-keywords@3.5.2 is compatible with ajv 6.x
- terser-webpack-plugin@4.2.3 expects ajv 6.x validation format

### Why ajv@8.x Causes Issues with React Scripts 4.x
- ajv 8.x has breaking changes in validation API
- ajv-keywords@5.x uses different keyword definitions
- React Scripts 4.x webpack configuration expects old ajv format

## Verification Steps

After applying any fix:

1. **Check package versions:**
   ```bash
   npm list ajv ajv-keywords schema-utils terser-webpack-plugin react-scripts --depth=0
   ```

2. **Expected versions for React Scripts 4.x:**
   ```
   ├── ajv@6.12.6
   ├── ajv-keywords@3.5.2
   ├── schema-utils@2.7.1
   ├── terser-webpack-plugin@4.2.3
   └── react-scripts@4.0.3
   ```

3. **Test development server:**
   ```bash
   npm start
   # Should start without ajv-keywords errors
   ```

4. **Test build:**
   ```bash
   npm run build
   # Should complete without formatMinimum errors
   ```

## Alternative: Vite Setup

If React Scripts continues to cause issues, Vite is a modern alternative:

### Advantages of Vite:
✅ **No webpack configuration issues**
✅ **Much faster development server**
✅ **Modern build tool with better defaults**
✅ **No ajv/babel-loader conflicts**
✅ **Hot Module Replacement (HMR)**
✅ **Better TypeScript support**

### Vite Commands:
```bash
npm run dev         # Start Vite dev server
npm run build:vite  # Build with Vite
npm run preview     # Preview Vite build
```

## Troubleshooting Tips

### If you still get ajv errors:
```bash
# Force remove all ajv packages and reinstall
npm uninstall ajv ajv-keywords schema-utils terser-webpack-plugin
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### If terser-webpack-plugin fails:
```bash
# Disable minification temporarily
GENERATE_SOURCEMAP=false npm run build
```

### If TypeScript errors persist:
```bash
# Build with TypeScript errors allowed
TSC_COMPILE_ON_ERROR=true npm run build
```

## Prevention for Future

1. **Always check compatibility** before updating packages
2. **Use exact versions** for critical dependencies
3. **Test builds** after any dependency changes
4. **Consider using Vite** for new projects
5. **Keep React Scripts updated** when stable versions are available

## Success Indicators

✅ **No "Unknown keyword formatMinimum" errors**
✅ **Development server starts without ajv errors**
✅ **Build completes successfully**
✅ **Build folder contains optimized files**
✅ **Website loads without console errors**

## Emergency Fallback

If all else fails, use this nuclear reset:

```bash
# Complete project reset
git stash  # Save changes
rm -rf node_modules package-lock.json build
git checkout HEAD -- package.json  # Reset to working version
npm install --legacy-peer-deps
git stash pop  # Restore changes

# Or switch to Vite completely
./setup-vite-alternative.sh
```

## Recommended Approach

For **maximum stability**: Use the automated fix script
```bash
./fix-ajv-keywords-issue.sh
```

For **modern development**: Switch to Vite
```bash
./setup-vite-alternative.sh
```

Both approaches will resolve the ajv-keywords formatMinimum issue effectively.