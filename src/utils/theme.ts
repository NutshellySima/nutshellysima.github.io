import { safeGetLocalStorage, safeSetLocalStorage } from './storage';

export function initTheme(): void {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (!themeToggle) return;

  // Set initial aria-pressed state
  themeToggle.setAttribute('aria-pressed', String(html.classList.contains('dark')));

  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    safeSetLocalStorage('theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', String(isDark));

    // Re-render icons after theme change
    import('lucide').then(({ createIcons }) => {
      createIcons();
    });
  });
}

export function getCurrentTheme(): 'light' | 'dark' {
  const savedTheme = safeGetLocalStorage('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    return 'dark';
  }
  return 'light';
}
