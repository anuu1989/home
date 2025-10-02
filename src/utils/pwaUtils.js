/**
 * Modern PWA utilities for enhanced app-like experience
 */

/**
 * Check if app is running as PWA
 */
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true ||
         document.referrer.includes('android-app://');
};

/**
 * Check if PWA installation is available
 */
export const canInstallPWA = () => {
  return 'serviceWorker' in navigator && 
         'PushManager' in window &&
         'Notification' in window;
};

/**
 * PWA installation prompt handler
 */
class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = isPWA();
    this.isInstallable = false;
    this.listeners = new Set();

    this.init();
  }

  init() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable = true;
      this.notifyListeners('installable', true);
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.isInstallable = false;
      this.deferredPrompt = null;
      this.notifyListeners('installed', true);
    });

    // Check if already installed
    if (isPWA()) {
      this.isInstalled = true;
      this.notifyListeners('installed', true);
    }
  }

  async install() {
    if (!this.deferredPrompt) {
      throw new Error('PWA installation not available');
    }

    const result = await this.deferredPrompt.prompt();
    const outcome = await result.userChoice;

    if (outcome === 'accepted') {
      this.notifyListeners('install-accepted');
    } else {
      this.notifyListeners('install-dismissed');
    }

    this.deferredPrompt = null;
    this.isInstallable = false;

    return outcome === 'accepted';
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach(callback => callback(event, data));
  }

  getInstallationStatus() {
    return {
      isInstalled: this.isInstalled,
      isInstallable: this.isInstallable,
      canInstall: !!this.deferredPrompt,
    };
  }
}

export const pwaInstaller = new PWAInstaller();

/**
 * Generate dynamic manifest based on configuration
 */
export const generateManifest = (config) => {
  const {
    name = 'Portfolio App',
    shortName = 'Portfolio',
    description = 'Personal portfolio website',
    themeColor = '#000000',
    backgroundColor = '#ffffff',
    startUrl = '/',
    display = 'standalone',
    orientation = 'portrait-primary',
    icons = [],
  } = config;

  return {
    name,
    short_name: shortName,
    description,
    start_url: startUrl,
    display,
    orientation,
    theme_color: themeColor,
    background_color: backgroundColor,
    icons: [
      {
        src: '/logo192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: '/logo512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any',
      },
      ...icons,
    ],
    categories: ['productivity', 'business', 'portfolio'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
    prefer_related_applications: false,
    shortcuts: [
      {
        name: 'About',
        short_name: 'About',
        description: 'Learn more about me',
        url: '/#about',
        icons: [{ src: '/logo192.png', sizes: '192x192' }],
      },
      {
        name: 'Projects',
        short_name: 'Projects',
        description: 'View my projects',
        url: '/#projects',
        icons: [{ src: '/logo192.png', sizes: '192x192' }],
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Get in touch',
        url: '/#contact',
        icons: [{ src: '/logo192.png', sizes: '192x192' }],
      },
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
  };
};

/**
 * Update manifest dynamically
 */
export const updateManifest = (config) => {
  const manifest = generateManifest(config);
  const manifestBlob = new Blob([JSON.stringify(manifest)], {
    type: 'application/json',
  });
  const manifestURL = URL.createObjectURL(manifestBlob);

  // Remove existing manifest link
  const existingLink = document.querySelector('link[rel="manifest"]');
  if (existingLink) {
    existingLink.remove();
  }

  // Add new manifest link
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = manifestURL;
  document.head.appendChild(link);
};

/**
 * PWA update checker
 */
export class PWAUpdateChecker {
  constructor(options = {}) {
    this.checkInterval = options.checkInterval || 60000; // 1 minute
    this.onUpdateAvailable = options.onUpdateAvailable || (() => {});
    this.onUpdateInstalled = options.onUpdateInstalled || (() => {});
    
    this.registration = null;
    this.intervalId = null;

    this.init();
  }

  async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.ready;
        this.startUpdateCheck();
        this.listenForUpdates();
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }
  }

  startUpdateCheck() {
    this.intervalId = setInterval(() => {
      this.checkForUpdates();
    }, this.checkInterval);
  }

  stopUpdateCheck() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async checkForUpdates() {
    if (!this.registration) return;

    try {
      await this.registration.update();
    } catch (error) {
      console.error('Update check failed:', error);
    }
  }

  listenForUpdates() {
    if (!this.registration) return;

    this.registration.addEventListener('updatefound', () => {
      const newWorker = this.registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available
            this.onUpdateAvailable(newWorker);
          } else {
            // First install
            this.onUpdateInstalled(newWorker);
          }
        }
      });
    });
  }

  async applyUpdate() {
    if (!this.registration || !this.registration.waiting) {
      throw new Error('No update available');
    }

    // Tell the waiting service worker to skip waiting
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Reload the page to activate the new service worker
    window.location.reload();
  }

  destroy() {
    this.stopUpdateCheck();
  }
}

/**
 * PWA capabilities detector
 */
export const getPWACapabilities = () => {
  const capabilities = {
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
    notifications: 'Notification' in window,
    backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
    webShare: 'share' in navigator,
    webShareTarget: 'serviceWorker' in navigator,
    badging: 'setAppBadge' in navigator,
    shortcuts: 'getInstalledRelatedApps' in navigator,
    fileHandling: 'launchQueue' in window,
    urlHandling: 'registerProtocolHandler' in navigator,
    fullscreen: 'requestFullscreen' in document.documentElement,
    screenOrientation: 'orientation' in screen,
    wakeLock: 'wakeLock' in navigator,
    deviceMotion: 'DeviceMotionEvent' in window,
    geolocation: 'geolocation' in navigator,
    camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    bluetooth: 'bluetooth' in navigator,
    usb: 'usb' in navigator,
    webgl: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    })(),
  };

  return capabilities;
};

/**
 * PWA performance metrics
 */
export const getPWAMetrics = () => {
  const metrics = {};

  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      metrics.firstByte = navigation.responseStart - navigation.requestStart;
    }

    const paint = performance.getEntriesByType('paint');
    metrics.firstPaint = paint.find(p => p.name === 'first-paint')?.startTime;
    metrics.firstContentfulPaint = paint.find(p => p.name === 'first-contentful-paint')?.startTime;

    if ('memory' in performance) {
      metrics.memoryUsage = {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
      };
    }
  }

  return metrics;
};