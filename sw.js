/* Minimal service worker for offline caching and repeat visits */
const ASSET_VERSION = new URL(self.location.href).searchParams.get('v') || 'v1';
const PRECACHE_NAME = `precache-${ASSET_VERSION}`;
const RUNTIME_NAME = `runtime-${ASSET_VERSION}`;
const FONT_CACHE = `fonts-${ASSET_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/site.css',
  '/assets/site.mjs',
  '/avatar.jpg',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-192-maskable.svg',
  '/icon-512.svg',
  '/icon-512-maskable.svg',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if (self.registration?.navigationPreload) {
        try {
          await self.registration.navigationPreload.enable();
        } catch (error) {
          // Ignore unsupported preload errors
        }
      }

      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) =>
          [PRECACHE_NAME, RUNTIME_NAME, FONT_CACHE].includes(key) ? null : caches.delete(key)
        )
      );
    })()
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;

  const isNavigation = request.mode === 'navigate';
  const isAsset = ['style', 'script', 'image', 'font'].includes(request.destination);

  const cachePut = async (cacheName, response) => {
    if (response && (response.ok || response.type === 'opaque')) {
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
    }
  };

  const staleWhileRevalidate = async (cacheName, fallbackUrl) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    const networkPromise = fetch(request)
      .then((networkResponse) => cachePut(cacheName, networkResponse).then(() => networkResponse))
      .catch(() => null);

    if (cachedResponse) return cachedResponse;
    const networkResponse = await networkPromise;
    if (networkResponse) return networkResponse;
    if (fallbackUrl) return caches.match(fallbackUrl);
    return new Response('', { status: 504, statusText: 'Offline' });
  };

  const networkFirst = async () => {
    const cache = await caches.open(RUNTIME_NAME);
    try {
      const preloadResponse = await event.preloadResponse;
      if (preloadResponse) {
        await cachePut(RUNTIME_NAME, preloadResponse);
        return preloadResponse;
      }
      const networkResponse = await fetch(request);
      await cachePut(RUNTIME_NAME, networkResponse);
      return networkResponse;
    } catch (error) {
      const cachedResponse = await cache.match(request, { ignoreSearch: true });
      if (cachedResponse) return cachedResponse;
      const precachedResponse = await caches.match('/index.html');
      if (precachedResponse) return precachedResponse;
      return caches.match('/offline.html');
    }
  };

  const cacheFirst = async (cacheName, fallbackUrl) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    try {
      const networkResponse = await fetch(request);
      await cachePut(cacheName, networkResponse);
      return networkResponse;
    } catch (error) {
      return fallbackUrl
        ? caches.match(fallbackUrl)
        : new Response('', { status: 504, statusText: 'Offline' });
    }
  };

  event.respondWith(
    isNavigation
      ? networkFirst()
      : isSameOrigin
        ? (isAsset
          ? (request.destination === 'image'
            ? cacheFirst(RUNTIME_NAME, '/avatar.jpg')
            : staleWhileRevalidate(RUNTIME_NAME))
          : staleWhileRevalidate(RUNTIME_NAME))
        : (requestUrl.hostname.includes('fonts.googleapis.com') ||
            requestUrl.hostname.includes('fonts.gstatic.com')
          ? staleWhileRevalidate(FONT_CACHE)
          : fetch(request))
  );
});
