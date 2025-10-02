/**
 * Modern configuration management with environment-based settings
 */

// Import configuration from JSON (keeping backward compatibility)
import configJSON from '../editable-stuff/configurations.json';

// Environment variables with fallbacks
const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUBLIC_URL: process.env.PUBLIC_URL || '',
  REACT_APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL || '',
  REACT_APP_GITHUB_TOKEN: process.env.REACT_APP_GITHUB_TOKEN || '',
  REACT_APP_ANALYTICS_ID: process.env.REACT_APP_ANALYTICS_ID || '',
  REACT_APP_SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN || '',
  REACT_APP_CONTACT_EMAIL: process.env.REACT_APP_CONTACT_EMAIL || '',
  REACT_APP_ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  REACT_APP_ENABLE_PWA: process.env.REACT_APP_ENABLE_PWA !== 'false',
  REACT_APP_ENABLE_DARK_MODE: process.env.REACT_APP_ENABLE_DARK_MODE !== 'false',
};

// Feature flags
const features = {
  analytics: env.REACT_APP_ENABLE_ANALYTICS && env.NODE_ENV === 'production',
  pwa: env.REACT_APP_ENABLE_PWA,
  darkMode: env.REACT_APP_ENABLE_DARK_MODE,
  blog: configJSON.showBlog || false,
  navigation: configJSON.showNavigationbar !== false,
  animations: true,
  lazyLoading: true,
  errorBoundary: true,
  performanceMonitoring: env.NODE_ENV === 'production',
  offlineSupport: env.REACT_APP_ENABLE_PWA,
  pushNotifications: false, // Disabled by default
  backgroundSync: false, // Disabled by default
};

// API configuration
const api = {
  baseURL: env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  github: {
    baseURL: 'https://api.github.com',
    username: configJSON.gitHubUsername || '',
    token: env.REACT_APP_GITHUB_TOKEN,
    rateLimit: 60, // requests per hour for unauthenticated
  },
  contact: {
    endpoint: '/api/contact',
    email: env.REACT_APP_CONTACT_EMAIL,
  },
};

// Theme configuration
const theme = {
  default: 'light',
  available: ['light', 'dark', 'auto'],
  customThemes: [],
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
};

// Performance configuration
const performance = {
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
  },
  imageOptimization: {
    quality: 85,
    formats: ['webp', 'jpg', 'png'],
  },
  caching: {
    staticAssets: 31536000, // 1 year
    apiResponses: 300, // 5 minutes
    images: 86400, // 1 day
  },
  bundleAnalysis: env.NODE_ENV === 'production',
};

// SEO configuration
const seo = {
  title: `${configJSON.FirstName} ${configJSON.LastName} - Portfolio`,
  description: configJSON.aboutDescription || 'Personal portfolio website',
  keywords: [
    configJSON.FirstName,
    configJSON.LastName,
    'developer',
    'portfolio',
    'web development',
    'software engineer',
  ],
  author: `${configJSON.FirstName} ${configJSON.LastName}`,
  url: 'https://anuragvaidhya.com',
  image: '/social-image.png',
  twitterHandle: '@anuragvaidhya',
  locale: 'en_US',
  type: 'website',
};

// Analytics configuration
const analytics = {
  enabled: features.analytics,
  googleAnalyticsId: env.REACT_APP_ANALYTICS_ID,
  trackingOptions: {
    anonymizeIp: true,
    respectDoNotTrack: true,
    cookieConsent: true,
  },
  events: {
    pageView: true,
    clicks: true,
    scrollDepth: true,
    timeOnPage: true,
    downloads: true,
    externalLinks: true,
  },
};

// Security configuration
const security = {
  contentSecurityPolicy: {
    enabled: env.NODE_ENV === 'production',
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.google-analytics.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.github.com'],
    },
  },
  headers: {
    xFrameOptions: 'DENY',
    xContentTypeOptions: 'nosniff',
    xXSSProtection: '1; mode=block',
    referrerPolicy: 'strict-origin-when-cross-origin',
  },
};

// PWA configuration
const pwa = {
  enabled: features.pwa,
  name: seo.title,
  shortName: `${configJSON.FirstName}'s Portfolio`,
  description: seo.description,
  themeColor: '#000000',
  backgroundColor: '#ffffff',
  display: 'standalone',
  orientation: 'portrait-primary',
  startUrl: '/',
  scope: '/',
  icons: [
    {
      src: '/logo192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/logo512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  shortcuts: [
    {
      name: 'About',
      url: '/#about',
      description: 'Learn more about me',
    },
    {
      name: 'Projects',
      url: '/#projects',
      description: 'View my projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
      description: 'Get in touch',
    },
  ],
};

// Development configuration
const development = {
  enableDevTools: env.NODE_ENV === 'development',
  showPerformanceMetrics: env.NODE_ENV === 'development',
  enableHotReload: env.NODE_ENV === 'development',
  mockAPI: false,
  debugMode: env.NODE_ENV === 'development',
};

// Error handling configuration
const errorHandling = {
  sentry: {
    enabled: !!env.REACT_APP_SENTRY_DSN && env.NODE_ENV === 'production',
    dsn: env.REACT_APP_SENTRY_DSN,
    environment: env.NODE_ENV,
    tracesSampleRate: 0.1,
  },
  fallbackUI: true,
  reportErrors: env.NODE_ENV === 'production',
  logLevel: env.NODE_ENV === 'development' ? 'debug' : 'error',
};

// Accessibility configuration
const accessibility = {
  enableSkipLinks: true,
  enableFocusManagement: true,
  enableScreenReaderSupport: true,
  enableHighContrast: true,
  enableReducedMotion: true,
  keyboardNavigation: true,
  ariaLabels: true,
};

// Main configuration object
const config = {
  env,
  features,
  api,
  theme,
  performance,
  seo,
  analytics,
  security,
  pwa,
  development,
  errorHandling,
  accessibility,
  
  // Legacy configuration for backward compatibility
  legacy: configJSON,
  
  // Utility functions
  isDevelopment: () => env.NODE_ENV === 'development',
  isProduction: () => env.NODE_ENV === 'production',
  isFeatureEnabled: (feature) => features[feature] === true,
  getApiUrl: (endpoint) => `${api.baseURL}${endpoint}`,
  getAssetUrl: (asset) => `${env.PUBLIC_URL}${asset}`,
};

// Validate configuration
const validateConfig = () => {
  const errors = [];
  
  if (!configJSON.FirstName) {
    errors.push('FirstName is required in configurations.json');
  }
  
  if (!configJSON.LastName) {
    errors.push('LastName is required in configurations.json');
  }
  
  if (features.analytics && !analytics.googleAnalyticsId) {
    console.warn('Analytics is enabled but no Google Analytics ID provided');
  }
  
  if (api.github.username && !api.github.token && env.NODE_ENV === 'production') {
    console.warn('GitHub token not provided, API rate limiting may occur');
  }
  
  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
  }
  
  return errors.length === 0;
};

// Initialize configuration
if (env.NODE_ENV === 'development') {
  console.log('Configuration loaded:', config);
  validateConfig();
}

export default config;

// Named exports for convenience
export {
  env,
  features,
  api,
  theme,
  performance,
  seo,
  analytics,
  security,
  pwa,
  development,
  errorHandling,
  accessibility,
};