// Animation utilities for scroll-triggered reveals

export function initAnimations(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Add animate class to reveal elements for JS-enabled animation
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach((el) => {
    el.classList.add('animate');
  });

  if (prefersReducedMotion) {
    // Show all elements immediately if user prefers reduced motion
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach((el) => {
      el.classList.add('active');
    });
    return;
  }

  // Initialize reveal animations with IntersectionObserver
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

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
        rootMargin: '0px 0px 200px 0px', // Trigger animations 200px before element enters viewport
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all elements if IntersectionObserver is not supported
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach((el) => {
      el.classList.add('active');
    });
  }

  // Initialize magnetic button effect
  initMagneticButtons();
}

function initMagneticButtons(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    const button = btn as HTMLElement;

    button.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// Counter animation for statistics
export function animateCounter(element: HTMLElement, target: number, duration: number = 2000): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    element.textContent = String(target);
    return;
  }

  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = String(Math.floor(current));
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = String(target);
    }
  };

  updateCounter();
}
