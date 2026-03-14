import { onReady, utils } from './utils';
import { initServiceWorker } from './pwa';

const initYear = () => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear().toString();
};

const initThemeToggle = () => {
  const btn = document.getElementById('theme-toggle') as HTMLButtonElement | null;
  if (!btn) return;

  const html = document.documentElement;

  const apply = (dark: boolean) => {
    html.classList.toggle('dark', dark);
    btn.setAttribute('aria-pressed', String(dark));
    btn.textContent = dark ? '☀' : '☾';
  };

  const saved = utils.storage.get('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  apply(isDark);

  btn.addEventListener('click', () => {
    const next = !html.classList.contains('dark');
    apply(next);
    utils.storage.set('theme', next ? 'dark' : 'light');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!utils.storage.get('theme')) apply(e.matches);
  });
};

onReady(() => {
  initYear();
  initThemeToggle();
  initServiceWorker(null);
});
