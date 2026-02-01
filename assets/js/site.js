/* Site JS extracted from index.html.
   Keep behavior stable; keep changes minimal.

   Goals:
   - Accessible navigation (keyboard, aria-*)
   - No URL-breaking smooth-scroll overrides (keep hash links working)
   - Respect reduced motion
 */

// ===== Utilities =====
function safeGetLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

// ===== Set Current Year =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Initialize Lucide Icons =====
if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
  lucide.createIcons();
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = safeGetLocalStorage('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initial theme is set as early as possible in <head> to prevent flash.
// Here we only keep the toggle and keep state/aria in sync.

if (themeToggle) {
  themeToggle.setAttribute('aria-pressed', String(html.classList.contains('dark')));
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const next = html.classList.contains('dark') ? 'dark' : 'light';
    safeSetLocalStorage('theme', next);
    themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
  });
}

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('.menu-icon') : null;
const closeIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('.close-icon') : null;

if (mobileMenuBtn && mobileMenu && menuIcon && closeIcon) {
  const setMenuOpen = (open) => {
    mobileMenuBtn.setAttribute('aria-expanded', String(open));

    if (open) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.removeAttribute('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');

      // Move focus to first link for keyboard users
      const firstLink = mobileMenu.querySelector('a[href]');
      if (firstLink) {
        firstLink.focus();
      }
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.setAttribute('hidden', '');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  };

  const isMenuOpen = () => !mobileMenu.classList.contains('hidden') && !mobileMenu.hasAttribute('hidden');

  mobileMenuBtn.addEventListener('click', () => {
    setMenuOpen(!isMenuOpen());
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      setMenuOpen(false);
      mobileMenuBtn.focus();
    }
  });

  // Close on outside click/tap
  document.addEventListener('click', (e) => {
    if (!isMenuOpen()) return;
    const target = e.target;
    if (!(target instanceof Node)) return;

    const clickedInsideMenu = mobileMenu.contains(target);
    const clickedButton = mobileMenuBtn.contains(target);
    if (!clickedInsideMenu && !clickedButton) {
      setMenuOpen(false);
    }
  });

  // Close menu when navigating via hash (back/forward, manual edits)
  window.addEventListener('hashchange', () => {
    if (isMenuOpen()) setMenuOpen(false);
  });
}

// ===== Scroll Progress =====
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true },
  );
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navContainer = document.getElementById('nav-container');
if (navbar && navContainer) {
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 100) {
        navContainer.classList.add('shadow-xl');
      } else {
        navContainer.classList.remove('shadow-xl');
      }
    },
    { passive: true },
  );
}

// ===== Section Reveal on Scroll =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add('active'));
} else if (revealElements.length > 0 && 'IntersectionObserver' in window) {
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
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
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

  // Prefer IntersectionObserver (better than scroll polling)
  if ('IntersectionObserver' in window) {
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
        // account for fixed navbar height
        rootMargin: '-120px 0px -55% 0px',
      },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    // Initial state (e.g., when loading with a hash)
    const initialHash = (window.location.hash || '').replace('#', '');
    if (initialHash) {
      setActiveNav(initialHash);
    } else {
      setActiveNav(sections[0].getAttribute('id') || '');
    }

    window.addEventListener('hashchange', () => {
      const id = (window.location.hash || '').replace('#', '');
      if (id) setActiveNav(id);
    });
  } else {
    // Fallback: minimal scroll handler
    window.addEventListener(
      'scroll',
      () => {
        let current = '';
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id') || '';
          }
        });
        if (current) setActiveNav(current);
      },
      { passive: true },
    );
  }
}

// ===== Magnetic Button Effect =====
if (!prefersReducedMotion) {
  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
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
}

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');

if (!prefersReducedMotion && counters.length > 0 && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = Number.parseInt(counter.getAttribute('data-target') || '0', 10);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = String(Math.floor(current));
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = String(target);
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

