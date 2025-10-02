# Node.js Requirements

## Required Node.js Version

**Minimum Required:** Node.js 18.0.0 or higher
**Recommended:** Node.js 18.19.1 (LTS)
**NPM Version:** 8.0.0 or higher

## Why Node.js 18+?

This project uses modern React 18 features and dependencies that require Node.js 18+:

### React 18 Features Used:
- `createRoot` API (requires Node 18+)
- Concurrent features and Suspense
- Automatic batching
- New hooks like `useId`, `useDeferredValue`

### Modern JavaScript Features:
- ES2022 features (top-level await, private fields)
- Optional chaining and nullish coalescing
- Dynamic imports with better support
- AbortController and AbortSignal (native support)

### Build Tool Requirements:
- React Scripts 5.x requires Node 18+
- Modern webpack and babel configurations
- ESLint and Prettier with latest rules
- TypeScript 4.9.x support (compatible with React Scripts 5.x)

## Installation Instructions

### Using NVM (Recommended)

```bash
# Install and use the correct Node version
nvm install 18.19.1
nvm use 18.19.1

# Verify installation
node --version  # Should show v18.19.1
npm --version   # Should show 8.x or higher
```

### Using Node Version Manager (Windows)

```bash
# Install Node 18.19.1
nvm install 18.19.1
nvm use 18.19.1
```

### Direct Installation

Download Node.js 18.19.1 LTS from [nodejs.org](https://nodejs.org/)

## Project Setup

```bash
# Clone the repository
git clone <repository-url>
cd developers-portfolio

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Compatibility Matrix

| Node Version | Status | Notes |
|-------------|--------|-------|
| 16.x | ❌ Not Supported | Missing React 18 features |
| 17.x | ❌ Not Supported | Missing required APIs |
| 18.0-18.18 | ⚠️ Minimum | May have compatibility issues |
| 18.19+ | ✅ Recommended | Full feature support |
| 19.x | ✅ Supported | Latest features |
| 20.x | ✅ Supported | Future-ready |

## Troubleshooting

### Common Issues:

1. **"Module not found" errors**
   - Ensure Node.js 18+ is installed
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

2. **Build failures**
   - Check Node version: `node --version`
   - Update npm: `npm install -g npm@latest`

3. **Development server issues**
   - Clear React Scripts cache: `rm -rf node_modules/.cache`
   - Restart development server

### Performance Optimization:

```bash
# Use npm ci for faster, reliable installs
npm ci

# Enable npm cache for faster subsequent installs
npm config set cache ~/.npm-cache

# Use latest npm for better performance
npm install -g npm@latest
```

## Docker Support

If using Docker, ensure your Dockerfile uses Node 18+:

```dockerfile
FROM node:18.19.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## CI/CD Configuration

### GitHub Actions:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '18.19.1'
    cache: 'npm'
```

### Netlify:
```toml
[build.environment]
  NODE_VERSION = "18.19.1"
```

### Vercel:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

## Additional Notes

- This project is optimized for Node.js 18 LTS
- All modern features are tested on Node 18.19.1
- Older Node versions are not supported and may cause build failures
- Regular updates ensure compatibility with latest Node.js releases