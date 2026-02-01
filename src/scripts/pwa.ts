type ToastPayload = {
  titleText: string;
  descText: string;
  actionText: string;
  onAction?: () => void;
};

export type PwaToast = {
  show: (payload: ToastPayload) => void;
  hide: () => void;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export const initPwaToast = (): PwaToast | null => {
  const toast = document.getElementById('pwa-toast');
  const title = document.getElementById('pwa-toast-title');
  const desc = document.getElementById('pwa-toast-desc');
  const actionBtn = document.getElementById('pwa-toast-action');
  const dismissBtn = document.getElementById('pwa-toast-dismiss');

  if (!toast || !title || !desc || !actionBtn || !dismissBtn) return null;

  let currentAction: (() => void) | null = null;
  let hideTimeout: number | null = null;

  const clearAction = () => {
    if (currentAction) {
      actionBtn.removeEventListener('click', currentAction);
      currentAction = null;
    }
  };

  const hide = () => {
    clearAction();
    toast.classList.remove('is-visible');
    if (hideTimeout) window.clearTimeout(hideTimeout);
    hideTimeout = window.setTimeout(() => {
      toast.hidden = true;
    }, 250);
  };

  dismissBtn.addEventListener('click', hide);

  const show = ({ titleText, descText, actionText, onAction }: ToastPayload) => {
    if (hideTimeout) window.clearTimeout(hideTimeout);
    clearAction();
    title.textContent = titleText;
    desc.textContent = descText;
    actionBtn.textContent = actionText;
    if (onAction) {
      currentAction = () => {
        onAction();
      };
      actionBtn.addEventListener('click', currentAction);
    }
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  };

  return { show, hide };
};

export const initServiceWorker = (toast: PwaToast | null) => {
  if (!('serviceWorker' in navigator)) return;
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') return;

  const meta = document.querySelector('meta[name="asset-version"]');
  const version = meta ? meta.content : '';
  const swUrl = version ? `/sw.js?v=${encodeURIComponent(version)}` : '/sw.js';

  navigator.serviceWorker
    .register(swUrl, { scope: '/' })
    .then((registration) => {
      const showUpdateToast = () => {
        if (!toast) return;
        toast.show({
          titleText: 'Update available',
          descText: 'Refresh to load the latest version.',
          actionText: 'Update',
          onAction: () => {
            if (registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          },
        });
      };

      if (registration.waiting && navigator.serviceWorker.controller) {
        showUpdateToast();
      }

      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        if (!installing) return;

        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateToast();
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
        if (document.visibilityState === 'visible') {
          registration.update();
        }
      });
    })
    .catch(() => {
      // Ignore registration errors (offline, unsupported)
    });
};

export const initInstallPrompt = (toast: PwaToast | null) => {
  if (!toast) return;
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
    toast.show({
      titleText: 'Install this app',
      descText: 'Get offline access and an app-like experience.',
      actionText: 'Install',
      onAction: async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        try {
          await deferredPrompt.userChoice;
        } catch {
          // Ignore prompt errors
        }
        deferredPrompt = null;
        toast.hide();
      },
    });
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    toast.show({
      titleText: 'App installed',
      descText: 'Thanks for installing! You can launch it from your home screen.',
      actionText: 'Done',
      onAction: () => toast.hide(),
    });
  });
};
