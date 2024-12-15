"use strict";

// Define cache name and resources to cache
const CACHE_NAME = "site-version-number";
const urlsToCache = ["/", "/index.html", "/manifest.json", "/App.css"];

// Install service worker and add resources to cache
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache and adding resources");
      return cache.addAll(urlsToCache);
    })
  );
});

// Handle fetch events and serve resources from cache or fetch
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Return response from cache if found, else fetch from network
      return (
        response ||
        fetch(event.request)
          .then(function (fetchResponse) {
            // Cache the new response if it's not already cached
            return caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(function () {
            console.error("Fetch failed, and no cached resource found.");
          })
      );
    })
  );
});

// Activate service worker and delete old caches
self.addEventListener("activate", function (event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("Deleting old cache: ", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
