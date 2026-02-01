/* Minimal service worker for offline caching and repeat visits */
const ASSET_VERSION = new URL(self.location.href).searchParams.get('v') || 'v1';
const CACHE_NAME = `site-cache-${ASSET_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  `/assets/css/site.css?v=${ASSET_VERSION}`,
  `/assets/js/site.js?v=${ASSET_VERSION}`,
  `/avatar.jpg?v=${ASSET_VERSION}`,
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-192-maskable.svg',
  '/icon-512.svg',
  '/icon-512-maskable.svg',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key)))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate';
  const isAsset = ['style', 'script', 'image', 'font'].includes(request.destination);

  const cacheFirstWithUpdate = async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      fetch(request)
        .then((networkResponse) => {
          cache.put(request, networkResponse.clone());
        })
        .catch(() => {});
      return cachedResponse;
    }
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  };

  const networkFirst = async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const networkResponse = await fetch(request);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (error) {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) return cachedResponse;
      return cache.match('/offline.html');
    }
  };

  event.respondWith(
    isNavigation ? networkFirst() : (isAsset ? cacheFirstWithUpdate() : cacheFirstWithUpdate())
  );
});
