const CACHE_NAME = "botflix-cache-v1";
const urlsToCache = [
  "/", // The root URL
  "/index.html", // Main HTML file
  "/App.css", // CSS styles
  "/App.js", // JavaScript file
  "/icon-192x192.png", // App icon
  "/icon-512x512.png", // App icon
];

// Install event - caching the specified resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serving cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the resource is found in the cache, return it
      if (response) {
        return response;
      }
      // If the resource is not in the cache, fetch it from the network
      return fetch(event.request).catch(() => {
        // Optional: Fallback for specific types of requests
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
