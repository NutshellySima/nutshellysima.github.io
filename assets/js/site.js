/**
 * Chijun Sima Portfolio - Enhanced JavaScript
 * Performance-optimized, accessible, and feature-rich interactions
 * No build required - vanilla JavaScript
 */

(function() {
  'use strict';

  // ===== Configuration =====
  const CONFIG = {
    animation: {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      touchDevice: window.matchMedia('(pointer: coarse)').matches,
      staggerDelay: 50,
      revealThreshold: 0.15,
    },
    performance: {
      throttleDelay: 16, // ~60fps
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
  };

  // ===== Utilities =====
  const utils = {
    /**
     * Safe localStorage access with try-catch
     */
    storage: {
      get: (key) => {
        try { return localStorage.getItem(key); } catch { return null; }
      },
      set: (key, value) => {
        try { localStorage.setItem(key, value); } catch { /* ignore */ }
      },
    },

    /**
     * Throttle function for performance
     */
    throttle: (fn, delay) => {
      let lastTime = 0;
      return (...args) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
          lastTime = now;
          fn.apply(null, args);
        }
      };
    },

    /**
     * Debounce function for performance
     */
    debounce: (fn, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(null, args), delay);
      };
    },

    /**
     * RAF-based scroll handler for smooth performance
     */
    rafScroll: (callback) => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            callback();
            ticking = false;
          });
          ticking = true;
        }
      };
    },
  };

  // ===== Feature Detection =====
  const features = {
    intersectionObserver: 'IntersectionObserver' in window,
    touch: CONFIG.animation.touchDevice,
    reducedMotion: CONFIG.animation.reducedMotion,
  };

  // ===== DOM Ready Handler =====
  const onReady = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  // ===== Initialize Lucide Icons =====
  const initIcons = () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };

  // ===== Set Current Year =====
  const initYear = () => {
    const yearEl = document.querySelector(CONFIG.selectors.year);
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  // ===== Theme Toggle =====
  const initThemeToggle = () => {
    const themeToggle = document.querySelector(CONFIG.selectors.themeToggle);
    const html = document.documentElement;

    if (!themeToggle) return;

    const updateAria = (isDark) => {
      themeToggle.setAttribute('aria-pressed', String(isDark));
    };

    const applyTheme = (isDark) => {
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      updateAria(isDark);
    };

    // Initialize based on saved preference or system
    const savedTheme = utils.storage.get('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    updateAria(isDark);

    themeToggle.addEventListener('click', () => {
      const newIsDark = !html.classList.contains('dark');
      applyTheme(newIsDark);
      utils.storage.set('theme', newIsDark ? 'dark' : 'light');

      // Subtle transition effect
      document.body.style.transition = 'opacity 0.15s ease';
      document.body.style.opacity = '0.9';
      setTimeout(() => {
        document.body.style.opacity = '1';
        setTimeout(() => {
          document.body.style.transition = '';
        }, 150);
      }, 50);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!utils.storage.get('theme')) {
        applyTheme(e.matches);
      }
    });
  };

  // ===== Mobile Menu =====
  const initMobileMenu = () => {
    const mobileMenuBtn = document.querySelector(CONFIG.selectors.mobileMenuBtn);
    const mobileMenu = document.querySelector(CONFIG.selectors.mobileMenu);

    if (!mobileMenuBtn || !mobileMenu) return;

    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');

    const setMenuOpen = (open) => {
      mobileMenuBtn.setAttribute('aria-expanded', String(open));

      if (open) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.removeAttribute('hidden');
        if (menuIcon) menuIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
        mobileMenu.style.animation = 'slideDown 0.3s ease forwards';

        // Focus first link for accessibility
        const firstLink = mobileMenu.querySelector('a[href]');
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

    // Close menu when clicking links
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) {
        setMenuOpen(false);
        mobileMenuBtn.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!isMenuOpen()) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!mobileMenu.contains(target) && !mobileMenuBtn.contains(target)) {
        setMenuOpen(false);
      }
    });

    // Close on hash change
    window.addEventListener('hashchange', () => {
      if (isMenuOpen()) setMenuOpen(false);
    });
  };

  // ===== Scroll Progress =====
  const initScrollProgress = () => {
    const scrollProgress = document.querySelector(CONFIG.selectors.scrollProgress);
    if (!scrollProgress) return;

    const updateProgress = utils.rafScroll(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      scrollProgress.style.transform = `scaleX(${progress})`;

      // Update ARIA value
      scrollProgress.setAttribute('aria-valuenow', Math.round(progress * 100));
    });

    window.addEventListener('scroll', updateProgress, { passive: true });
  };

  // ===== Navbar Scroll Effect =====
  const initNavbarScroll = () => {
    const navbar = document.querySelector(CONFIG.selectors.navbar);
    const navContainer = document.querySelector(CONFIG.selectors.navContainer);

    if (!navbar || !navContainer) return;

    let lastScroll = 0;

    const updateNavbar = utils.rafScroll(() => {
      const currentScroll = window.scrollY;

      // Add shadow and scale effect when scrolled
      if (currentScroll > 50) {
        navContainer.classList.add('shadow-xl');
        navContainer.style.transform = 'scale(0.98)';
      } else {
        navContainer.classList.remove('shadow-xl');
        navContainer.style.transform = 'scale(1)';
      }

      // Hide/show navbar based on scroll direction
      if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-120%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });

    window.addEventListener('scroll', updateNavbar, { passive: true });
  };

  // ===== Section Reveal on Scroll =====
  const initRevealAnimations = () => {
    const revealElements = document.querySelectorAll(CONFIG.selectors.reveal);

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

  // ===== Active Nav Link Highlighting =====
  const initActiveNavLinks = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const setActiveNav = (id) => {
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

    const visibility = new Map();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.getAttribute('id') || '';
          if (!id) return;
          visibility.set(id, e.isIntersecting ? e.intersectionRatio || 0 : 0);
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

    // Set initial active state
    const initialHash = (window.location.hash || '').replace('#', '');
    if (initialHash) {
      setActiveNav(initialHash);
    } else {
      const firstId = sections[0]?.getAttribute('id');
      if (firstId) setActiveNav(firstId);
    }

    // Update on hash change
    window.addEventListener('hashchange', () => {
      const id = (window.location.hash || '').replace('#', '');
      if (id) setActiveNav(id);
    });
  };

  // ===== Magnetic Button Effect =====
  const initMagneticButtons = () => {
    if (features.reducedMotion || features.touch) return;

    document.querySelectorAll(CONFIG.selectors.magneticBtn).forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  };

  // ===== Card Tilt Effect =====
  const initCardTilt = () => {
    if (features.reducedMotion || features.touch) return;

    document.querySelectorAll(CONFIG.selectors.cardGlow).forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  // ===== Floating Particles =====
  const initParticles = () => {
    if (features.reducedMotion || features.touch) return;

    const container = document.createElement('div');
    container.className = 'particles-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    const particleCount = 20; // Reduced for performance
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${15 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.width = `${2 + Math.random() * 3}px`;
      particle.style.height = particle.style.width;
      particle.style.opacity = 0.3 + Math.random() * 0.3;
      fragment.appendChild(particle);
    }

    container.appendChild(fragment);
  };

  // ===== Smooth Scroll for Anchor Links =====
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || !href) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: features.reducedMotion ? 'auto' : 'smooth',
            block: 'start',
          });

          // Update URL without jumping
          history.pushState(null, '', href);
        }
      });
    });
  };

  // ===== Preload Animation =====
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
      // Fallback if load event doesn't fire
      setTimeout(showContent, 1000);
    }
  };

  // ===== Console Easter Egg =====
  const initConsoleEasterEgg = () => {
    const styles = [
      'background: linear-gradient(135deg, #f59e0b, #14b8a6); color: white; font-size: 24px; font-weight: bold; padding: 12px 24px; border-radius: 12px;',
      'color: #f59e0b; font-size: 14px;',
      'color: #14b8a6; font-size: 12px; text-decoration: underline;',
    ];

    console.log('%c Chijun Sima ', styles[0]);
    console.log('%c ML Systems Engineer | OSDI \'22 | LLVM Developer ', styles[1]);
    console.log('%c https://www.chijunsima.com ', styles[2]);
  };

  // ===== Add Mobile Menu Animations =====
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

  // ===== Initialize Everything =====
  onReady(() => {
    initIcons();
    initYear();
    initThemeToggle();
    initMobileMenu();
    initScrollProgress();
    initNavbarScroll();
    initRevealAnimations();
    initActiveNavLinks();
    initMagneticButtons();
    initCardTilt();
    initParticles();
    initSmoothScroll();
    addMobileMenuStyles();
    initPreload();
    initConsoleEasterEgg();
  });

})();
