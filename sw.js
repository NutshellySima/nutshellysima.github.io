/*
 * Self-destructing service worker.
 *
 * The site used to register a caching service worker. It no longer does, but
 * returning visitors still have the old one installed, and browsers keep
 * re-checking this exact URL. This version replaces it, deletes its caches,
 * and unregisters itself. Keep this file published.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();

      const windows = await self.clients.matchAll({ type: 'window' });
      windows.forEach((client) => client.navigate(client.url));
    })()
  );
});
