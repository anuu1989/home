# Installation Guide

## Quick Fix for Missing Dependencies

The build error occurs because some components use react-bootstrap, axios, and react-typist. Here's how to fix it:

### Step 1: Clean Installation
```bash
# Remove existing node_modules and lock files
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force
```

### Step 2: Install Dependencies
```bash
# Install with the correct Node version
nvm use 18.19.1

# Install dependencies (recommended method)
npm install --legacy-peer-deps

# OR use the automated script
./install-dependencies.sh
```

### Step 3: Alternative Installation Methods

If you still get errors, try one of these approaches:

#### Option A: Use --legacy-peer-deps (Recommended)
```bash
npm install --legacy-peer-deps
```

#### Option B: Use --force (Use with caution)
```bash
npm install --force
```

#### Option C: Use Yarn instead of NPM
```bash
# Install Yarn if you don't have it
npm install -g yarn

# Install dependencies with Yarn
yarn install
```

## Dependency Compatibility

The project uses these compatible versions:

- **React**: 18.2.0
- **TypeScript**: 4.9.5 (compatible with React Scripts 5.x)
- **React Scripts**: 5.0.1
- **Node.js**: 18.19.1 LTS

## Troubleshooting

### Common Issues:

1. **ERESOLVE errors**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **TypeScript version conflicts**
   - The project uses TypeScript 4.9.5 for React Scripts compatibility
   - Don't upgrade to TypeScript 5.x until React Scripts supports it

3. **Node version issues**
   ```bash
   nvm install 18.19.1
   nvm use 18.19.1
   ```

4. **Cache issues**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

## Docker Alternative

If you continue having issues, use Docker:

```dockerfile
FROM node:18.19.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run with Docker
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Success Verification

After successful installation, you should see:
```bash
npm start
# Should start the development server on http://localhost:3000
```

If you see the React development server running without errors, the installation was successful!