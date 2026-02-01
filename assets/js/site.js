/* Site JS extracted from index.html.
   Keep behavior stable; keep changes minimal. */

// ===== Initialize Lucide Icons =====
if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
  lucide.createIcons();
}

// ===== Set Current Year =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Copy Email =====
const copyEmailBtn = document.getElementById('copy-email');
const copyFeedback = document.getElementById('copy-feedback');
if (copyEmailBtn && copyFeedback) {
  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('simachijun@gmail.com');
      copyFeedback.textContent = 'Email copied to clipboard.';
    } catch (err) {
      copyFeedback.textContent = 'Copy failed. Please select and copy manually.';
    }
    setTimeout(() => {
      copyFeedback.textContent = '';
    }, 2500);
  });
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  html.classList.add('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
}

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('.menu-icon') : null;
const closeIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('.close-icon') : null;

if (mobileMenuBtn && mobileMenu && menuIcon && closeIcon) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Scroll Progress =====
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener(
    'scroll',
    () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
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
if (revealElements.length > 0 && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
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
  window.addEventListener(
    'scroll',
    () => {
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('text-primary-600', 'dark:text-primary-400', 'bg-primary-50', 'dark:bg-primary-900/20');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('text-primary-600', 'dark:text-primary-400', 'bg-primary-50', 'dark:bg-primary-900/20');
        }
      });
    },
    { passive: true },
  );
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') {
      return;
    }
    e.preventDefault();
    const target = href ? document.querySelector(href) : null;
    if (target) {
      const offset = 100;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  });
});

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

