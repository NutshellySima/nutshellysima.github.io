import { CONFIG, features } from './config';
import { initInstallPrompt, initPwaToast, initServiceWorker } from './pwa';
import { onReady, utils } from './utils';

const initIcons = () => {
  const lucideApi = (window as Window & { lucide?: { createIcons?: () => void } }).lucide;
  if (lucideApi?.createIcons) {
    lucideApi.createIcons();
  }
};

const initYear = () => {
  const yearEl = document.querySelector(CONFIG.selectors.year);
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
};

const initThemeToggle = () => {
  const themeToggle = document.querySelector<HTMLButtonElement>(CONFIG.selectors.themeToggle);
  const html = document.documentElement;

  if (!themeToggle) return;

  const updateAria = (isDark: boolean) => {
    themeToggle.setAttribute('aria-pressed', String(isDark));
  };

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    updateAria(isDark);
  };

  const savedTheme = utils.storage.get('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  updateAria(isDark);

  themeToggle.addEventListener('click', () => {
    const newIsDark = !html.classList.contains('dark');
    applyTheme(newIsDark);
    utils.storage.set('theme', newIsDark ? 'dark' : 'light');

    document.body.style.transition = 'opacity 0.15s ease';
    document.body.style.opacity = '0.9';
    setTimeout(() => {
      document.body.style.opacity = '1';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 150);
    }, 50);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!utils.storage.get('theme')) {
      applyTheme(e.matches);
    }
  });
};

const initMobileMenu = () => {
  const mobileMenuBtn = document.querySelector<HTMLButtonElement>(CONFIG.selectors.mobileMenuBtn);
  const mobileMenu = document.querySelector<HTMLElement>(CONFIG.selectors.mobileMenu);

  if (!mobileMenuBtn || !mobileMenu) return;

  const menuIcon = mobileMenuBtn.querySelector<HTMLElement>('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector<HTMLElement>('.close-icon');

  const setMenuOpen = (open: boolean) => {
    mobileMenuBtn.setAttribute('aria-expanded', String(open));

    if (open) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.removeAttribute('hidden');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      mobileMenu.style.animation = 'slideDown 0.3s ease forwards';

      const firstLink = mobileMenu.querySelector<HTMLAnchorElement>('a[href]');
      if (firstLink) firstLink.focus();
    } else {
      mobileMenu.style.animation = 'slideUp 0.2s ease forwards';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.setAttribute('hidden', '');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }, 200);
    }
  };

  const isMenuOpen = () => !mobileMenu.classList.contains('hidden');

  mobileMenuBtn.addEventListener('click', () => setMenuOpen(!isMenuOpen()));

  mobileMenu.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
      setMenuOpen(false);
      mobileMenuBtn.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!isMenuOpen()) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!mobileMenu.contains(target) && !mobileMenuBtn.contains(target)) {
      setMenuOpen(false);
    }
  });

  window.addEventListener('hashchange', () => {
    if (isMenuOpen()) setMenuOpen(false);
  });
};

const initScrollProgress = () => {
  const scrollProgress = document.querySelector<HTMLElement>(CONFIG.selectors.scrollProgress);
  if (!scrollProgress) return;

  const updateProgress = utils.rafScroll(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
    scrollProgress.setAttribute('aria-valuenow', Math.round(progress * 100).toString());
  });

  window.addEventListener('scroll', updateProgress, { passive: true });
};

const initNavbarScroll = () => {
  const navbar = document.querySelector<HTMLElement>(CONFIG.selectors.navbar);
  const navContainer = document.querySelector<HTMLElement>(CONFIG.selectors.navContainer);

  if (!navbar || !navContainer) return;

  let lastScroll = 0;

  const updateNavbar = utils.rafScroll(() => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navContainer.classList.add('shadow-xl');
      navContainer.style.transform = 'scale(0.98)';
    } else {
      navContainer.classList.remove('shadow-xl');
      navContainer.style.transform = 'scale(1)';
    }

    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-120%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  window.addEventListener('scroll', updateNavbar, { passive: true });
};

const initRevealAnimations = () => {
  const revealElements = document.querySelectorAll<HTMLElement>(CONFIG.selectors.reveal);

  if (features.reducedMotion) {
    revealElements.forEach((el) => el.classList.add('active'));
    return;
  }

  if (!features.intersectionObserver || revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: CONFIG.animation.revealThreshold,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
};

const initActiveNavLinks = () => {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const setActiveNav = (id: string) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('text-primary-600', isActive);
      link.classList.toggle('dark:text-primary-400', isActive);
      link.classList.toggle('bg-primary-50', isActive);
      link.classList.toggle('dark:bg-primary-900/20', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if (!features.intersectionObserver) return;

  const visibility = new Map<string, number>();
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id') || '';
        if (!id) return;
        visibility.set(id, entry.isIntersecting ? entry.intersectionRatio || 0 : 0);
      });

      let bestId = '';
      let bestRatio = 0;
      visibility.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) setActiveNav(bestId);
    },
    {
      threshold: [0.2, 0.4, 0.6],
      rootMargin: '-100px 0px -55% 0px',
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const initialHash = (window.location.hash || '').replace('#', '');
  if (initialHash) {
    setActiveNav(initialHash);
  } else {
    const firstId = sections[0]?.getAttribute('id');
    if (firstId) setActiveNav(firstId);
  }

  window.addEventListener('hashchange', () => {
    const id = (window.location.hash || '').replace('#', '');
    if (id) setActiveNav(id);
  });
};

const initMagneticButtons = () => {
  if (features.reducedMotion || features.reducedData || features.touch) return;

  document.querySelectorAll<HTMLElement>(CONFIG.selectors.magneticBtn).forEach((btn) => {
    btn.addEventListener('mousemove', (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
};

const initCardTilt = () => {
  if (features.reducedMotion || features.reducedData || features.touch) return;

  document.querySelectorAll<HTMLElement>(CONFIG.selectors.cardGlow).forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(245, 158, 11, 0.06), transparent 40%)`;
      card.style.transform = 'translateY(-8px) scale(1.01)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
      card.style.transform = '';
    });
  });
};

const initParticles = () => {
  if (features.reducedMotion || features.reducedData || features.touch) return;

  const container = document.createElement('div');
  container.className = 'particles-container';
  container.setAttribute('aria-hidden', 'true');
  document.body.appendChild(container);

  const particleCount = 20;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${15 + Math.random() * 20}s`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.width = `${2 + Math.random() * 3}px`;
    particle.style.height = particle.style.width;
    particle.style.opacity = String(0.3 + Math.random() * 0.3);
    fragment.appendChild(particle);
  }

  container.appendChild(fragment);
};

const initSmoothScroll = () => {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || !href) return;

      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: features.reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });

        history.pushState(null, '', href);
      }
    });
  });
};

const initPreload = () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';

  const showContent = () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  };

  if (document.readyState === 'complete') {
    showContent();
  } else {
    window.addEventListener('load', showContent);
    setTimeout(showContent, 1000);
  }
};

const initConsoleEasterEgg = () => {
  const styles = [
    'background: linear-gradient(135deg, #f59e0b, #14b8a6); color: white; font-size: 24px; font-weight: bold; padding: 12px 24px; border-radius: 12px;',
    'color: #f59e0b; font-size: 14px;',
    'color: #14b8a6; font-size: 12px; text-decoration: underline;',
  ];

  // eslint-disable-next-line no-console
  console.log('%c Chijun Sima ', styles[0]);
  // eslint-disable-next-line no-console
  console.log("%c ML Systems Engineer | OSDI '22 | LLVM Developer ", styles[1]);
  // eslint-disable-next-line no-console
  console.log('%c https://www.chijunsima.com ', styles[2]);
};

const addMobileMenuStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);
};

onReady(() => {
  const pwaToast = initPwaToast();
  initIcons();
  initYear();
  initThemeToggle();
  initMobileMenu();
  initScrollProgress();
  initNavbarScroll();
  initRevealAnimations();
  initActiveNavLinks();
  utils.requestIdle(initMagneticButtons);
  utils.requestIdle(initCardTilt);
  utils.requestIdle(initParticles);
  initSmoothScroll();
  addMobileMenuStyles();
  initPreload();
  utils.requestIdle(initConsoleEasterEgg);
  utils.requestIdle(() => initServiceWorker(pwaToast));
  initInstallPrompt(pwaToast);
});
