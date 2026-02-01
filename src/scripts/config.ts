export const CONFIG = {
  animation: {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    reducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches,
    touchDevice: window.matchMedia('(pointer: coarse)').matches,
    staggerDelay: 50,
    revealThreshold: 0.15,
  },
  performance: {
    throttleDelay: 16,
    debounceDelay: 100,
  },
  selectors: {
    scrollProgress: '#scroll-progress',
    navbar: '#navbar',
    navContainer: '#nav-container',
    mobileMenu: '#mobile-menu',
    mobileMenuBtn: '#mobile-menu-btn',
    themeToggle: '#theme-toggle',
    year: '#year',
    reveal: '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger',
    magneticBtn: '.magnetic-btn',
    cardGlow: '.card-glow',
  },
} as const;

const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

export const features = {
  intersectionObserver: 'IntersectionObserver' in window,
  touch: CONFIG.animation.touchDevice,
  reducedMotion: CONFIG.animation.reducedMotion,
  reducedData: CONFIG.animation.reducedData || Boolean(connection?.saveData),
};
