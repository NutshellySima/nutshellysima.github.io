export const initServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return;
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') return;

  const meta = document.querySelector('meta[name="asset-version"]');
  const version = meta ? meta.content : '';
  const swUrl = version ? `/sw.js?v=${encodeURIComponent(version)}` : '/sw.js';

  navigator.serviceWorker
    .register(swUrl, { scope: '/' })
    .then((registration) => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            installing.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });

      let refreshing = false;
      let hasController = Boolean(navigator.serviceWorker.controller);

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hasController) {
          hasController = true;
          return;
        }
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') registration.update();
      });
    })
    .catch(() => {});
};
