/**
 * Modern Service Worker for PWA capabilities
 * Provides offline functionality and faster loading through caching
 * 
 * This service worker enables:
 * - Offline functionality
 * - Faster subsequent page loads
 * - Background updates
 * - Push notifications (if implemented)
 */

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config = {}) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      console.warn('Service worker not registered: PUBLIC_URL is on a different origin');
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "✅ This web app is being served cache-first by a service worker.\n" +
            "📖 Learn more: https://bit.ly/CRA-PWA"
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  } else if (process.env.NODE_ENV === "development") {
    console.log("🔧 Service worker not registered in development mode");
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      console.log("✅ Service worker registered successfully");
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                "🔄 New content is available and will be used when all " +
                "tabs for this page are closed."
              );

              // Show update notification to user
              if (config.onUpdate) {
                config.onUpdate(registration);
              } else {
                // Default update notification
                showUpdateNotification();
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log("📦 Content is cached for offline use.");

              // Execute callback
              if (config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("❌ Error during service worker registration:", error);
      
      // Execute error callback if provided
      if (config.onError) {
        config.onError(error);
      }
    });
}

// Default update notification
function showUpdateNotification() {
  // Create a simple notification for updates
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Portfolio Updated', {
      body: 'New content is available. Refresh to see the latest version.',
      icon: '/logo192.png',
      badge: '/logo192.png',
    });
  }
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, { cache: 'no-cache' })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        console.warn("⚠️ Service worker not found. Unregistering existing worker.");
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            console.log("🔄 Reloading page after service worker cleanup");
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "🌐 No internet connection found. App is running in offline mode."
      );
      
      // Execute offline callback if provided
      if (config.onOffline) {
        config.onOffline();
      }
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        console.log("🗑️ Unregistering service worker");
        return registration.unregister();
      })
      .then(success => {
        if (success) {
          console.log("✅ Service worker unregistered successfully");
        } else {
          console.warn("⚠️ Service worker unregistration failed");
        }
      })
      .catch(error => {
        console.error("❌ Error unregistering service worker:", error);
      });
  }
}

// Additional utility functions for PWA features
export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    return Notification.requestPermission();
  }
  return Promise.resolve(Notification.permission);
}

export function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}
