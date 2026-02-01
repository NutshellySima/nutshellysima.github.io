export class Header {
  static render(): string {
    return `
      <!-- Skip Link -->
      <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <!-- Navigation -->
      <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 no-print transition-all duration-300" aria-label="Primary">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="nav-container" class="glass rounded-2xl mt-4 px-4 sm:px-6 py-3 shadow-lg transition-all duration-300 relative">
            <div class="flex items-center justify-between">
              <!-- Logo -->
              <a href="#top" class="flex items-center gap-3 group">
                <div class="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform overflow-hidden">
                  <span class="relative z-10">CS</span>
                  <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="hidden sm:block">
                  <span class="font-display font-semibold text-lg block leading-tight">Chijun Sima</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">Efficient ML Systems</span>
                </div>
              </a>

              <!-- Desktop Nav -->
              <div class="hidden lg:flex items-center gap-1">
                <a href="#about" class="nav-link px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">Overview</a>
                <a href="#research" class="nav-link px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">Research</a>
                <a href="#ekko" class="nav-link px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">Ekko</a>
                <a href="#work" class="nav-link px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">Work</a>
                <a href="#publications" class="nav-link px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">Publications</a>
                <a href="#service" class="nav-link px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">Service</a>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2">
                <!-- Theme Toggle -->
                <button id="theme-toggle" class="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring overflow-hidden" aria-label="Toggle theme">
                  <i data-lucide="sun" class="w-5 h-5 absolute inset-0 m-auto transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"></i>
                  <i data-lucide="moon" class="w-5 h-5 absolute inset-0 m-auto transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100"></i>
                  <span class="w-5 h-5 block opacity-0">.</span>
                </button>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring" aria-label="Toggle menu" aria-controls="mobile-menu" aria-expanded="false">
                  <i data-lucide="menu" class="w-5 h-5 menu-icon"></i>
                  <i data-lucide="x" class="w-5 h-5 close-icon hidden"></i>
                </button>
              </div>
            </div>

            <!-- Mobile Nav -->
            <div id="mobile-menu" class="hidden lg:hidden absolute left-0 right-0 top-full mt-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-2xl p-4" hidden>
              <div class="grid grid-cols-2 gap-2">
                <a href="#about" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center gap-2">
                  <i data-lucide="user" class="w-4 h-4 text-primary-500"></i> Overview
                </a>
                <a href="#research" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center gap-2">
                  <i data-lucide="flask-conical" class="w-4 h-4 text-purple-500"></i> Research
                </a>
                <a href="#ekko" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center gap-2">
                  <i data-lucide="activity" class="w-4 h-4 text-rose-500"></i> Ekko
                </a>
                <a href="#work" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center gap-2">
                  <i data-lucide="briefcase" class="w-4 h-4 text-amber-500"></i> Work
                </a>
                <a href="#publications" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center gap-2">
                  <i data-lucide="book-open" class="w-4 h-4 text-red-500"></i> Publications
                </a>
                <a href="#service" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center gap-2">
                  <i data-lucide="users" class="w-4 h-4 text-green-500"></i> Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  static init(): void {
    Header.initMobileMenu();
    Header.initNavbarScroll();
    Header.initActiveNavHighlighting();
  }

  private static initMobileMenu(): void {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuBtn || !mobileMenu) return;

    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    if (!menuIcon || !closeIcon) return;

    const setMenuOpen = (open: boolean) => {
      mobileMenuBtn.setAttribute('aria-expanded', String(open));

      if (open) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.removeAttribute('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        const firstLink = mobileMenu.querySelector('a[href]') as HTMLElement;
        if (firstLink) firstLink.focus();
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.setAttribute('hidden', '');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    };

    const isMenuOpen = () => !mobileMenu.classList.contains('hidden') && !mobileMenu.hasAttribute('hidden');

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
      const target = e.target as Node;
      if (!mobileMenu.contains(target) && !mobileMenuBtn.contains(target)) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('hashchange', () => {
      if (isMenuOpen()) setMenuOpen(false);
    });
  }

  private static initNavbarScroll(): void {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 100) {
          navContainer.classList.add('shadow-xl');
        } else {
          navContainer.classList.remove('shadow-xl');
        }
      },
      { passive: true }
    );
  }

  private static initActiveNavHighlighting(): void {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

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

    if ('IntersectionObserver' in window) {
      const visibility = new Map<string, number>();

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
          rootMargin: '-120px 0px -55% 0px',
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
}
