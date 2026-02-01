/* Enhanced Site JS - No build required */

// ===== Utilities =====
const safeGetLocalStorage = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};

const safeSetLocalStorage = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
};

const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

// ===== Set Current Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Initialize Lucide Icons =====
const initIcons = () => {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIcons);
} else {
  initIcons();
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
  themeToggle.setAttribute('aria-pressed', String(html.classList.contains('dark')));

  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    safeSetLocalStorage('theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', String(isDark));

    // Trigger a subtle flash effect
    document.body.style.transition = 'opacity 0.15s ease';
    document.body.style.opacity = '0.8';
    setTimeout(() => {
      document.body.style.opacity = '1';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 150);
    }, 50);
  });
}

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn?.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn?.querySelector('.close-icon');

if (mobileMenuBtn && mobileMenu && menuIcon && closeIcon) {
  const setMenuOpen = (open) => {
    mobileMenuBtn.setAttribute('aria-expanded', String(open));

    if (open) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.removeAttribute('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenu.style.animation = 'slideDown 0.3s ease forwards';
      const firstLink = mobileMenu.querySelector('a[href]');
      if (firstLink) firstLink.focus();
    } else {
      mobileMenu.style.animation = 'slideUp 0.2s ease forwards';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.setAttribute('hidden', '');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }, 200);
    }
  };

  const isMenuOpen = () => !mobileMenu.classList.contains('hidden');

  mobileMenuBtn.addEventListener('click', () => setMenuOpen(!isMenuOpen()));

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      setMenuOpen(false);
      mobileMenuBtn.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!isMenuOpen()) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (!mobileMenu.contains(target) && !mobileMenuBtn.contains(target)) {
      setMenuOpen(false);
    }
  });

  window.addEventListener('hashchange', () => {
    if (isMenuOpen()) setMenuOpen(false);
  });
}

// Add mobile menu animations
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

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navContainer = document.getElementById('nav-container');

if (navbar && navContainer) {
  let lastScroll = 0;
  let ticking = false;

  const updateNavbar = () => {
    ticking = false;
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navContainer.classList.add('shadow-xl');
      navContainer.style.transform = 'scale(0.98)';
    } else {
      navContainer.classList.remove('shadow-xl');
      navContainer.style.transform = 'scale(1)';
    }

    // Hide/show navbar on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-120%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateNavbar);
  }, { passive: true });
}

// ===== Section Reveal on Scroll =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');

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
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
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
        rootMargin: '-100px 0px -55% 0px',
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

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
  }
}

// ===== Magnetic Button Effect =====
if (!prefersReducedMotion && !isTouchDevice) {
  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ===== Parallax Effect for Hero =====
if (!prefersReducedMotion && !isTouchDevice) {
  const heroSection = document.getElementById('about');
  if (heroSection) {
    let ticking = false;
    const updateParallax = () => {
      ticking = false;
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroSection.style.backgroundPositionY = `${rate}px`;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    }, { passive: true });
  }
}

// ===== Floating Particles =====
if (!prefersReducedMotion && !isTouchDevice) {
  const createParticles = () => {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${15 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.width = `${2 + Math.random() * 4}px`;
      particle.style.height = particle.style.width;
      particle.style.opacity = 0.3 + Math.random() * 0.4;
      container.appendChild(particle);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createParticles);
  } else {
    createParticles();
  }
}

// ===== Card Tilt Effect =====
if (!prefersReducedMotion && !isTouchDevice) {
  document.querySelectorAll('.card-glow').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  });
});

// ===== Typing Effect for Hero (Optional Enhancement) =====
const initTypingEffect = () => {
  const typingElements = document.querySelectorAll('[data-typing]');
  typingElements.forEach((el) => {
    const text = el.getAttribute('data-typing');
    if (!text) return;

    let i = 0;
    el.textContent = '';
    el.style.borderRight = '2px solid currentColor';

    const type = () => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50 + Math.random() * 50);
      } else {
        el.style.borderRight = 'none';
        el.style.animation = 'blink 1s step-end infinite';
      }
    };

    // Start typing when element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
  });
};

if (!prefersReducedMotion) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypingEffect);
  } else {
    initTypingEffect();
  }
}

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');

if (!prefersReducedMotion && counters.length > 0 && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

// ===== Spotlight Effect =====
if (!prefersReducedMotion && !isTouchDevice) {
  const addSpotlightEffect = () => {
    const cards = document.querySelectorAll('.card-glow, .glass-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), var(--bg, inherit)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSpotlightEffect);
  } else {
    addSpotlightEffect();
  }
}

// ===== Preload Animation =====
const initPreload = () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
};

initPreload();

// ===== Console Easter Egg =====
console.log('%c Chijun Sima ', 'background: linear-gradient(135deg, #6366f1, #a855f7); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c ML Systems Engineer | OSDI \'22 | LLVM Developer ', 'color: #6366f1; font-size: 14px;');
console.log('%c https://www.chijunsima.com ', 'color: #a855f7; font-size: 12px; text-decoration: underline;');
