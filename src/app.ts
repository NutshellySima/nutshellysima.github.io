import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Research } from './components/Research';
import { Work } from './components/Work';
import { Ekko } from './components/Ekko';
import { Publications } from './components/Publications';
import { Service } from './components/Service';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { initAnimations } from './utils/animations';
import { initTheme } from './utils/theme';

export class App {
  private container: HTMLElement | null = null;

  mount(element: HTMLElement): void {
    this.container = element;
    this.render();
    this.init();
  }

  private render(): void {
    if (!this.container) return;

    this.container.innerHTML = `
      ${ScrollProgress.render()}
      ${Header.render()}
      <main id="main" tabindex="-1">
        ${Hero.render()}
        ${Research.render()}
        ${Work.render()}
        ${Ekko.render()}
        ${Publications.render()}
        ${Service.render()}
      </main>
      ${Footer.render()}
    `;
  }

  private init(): void {
    // Initialize Lucide icons
    import('lucide').then(({ createIcons }) => {
      createIcons();
    });

    // Initialize theme
    initTheme();

    // Initialize scroll animations
    initAnimations();

    // Initialize all components
    Header.init();
    ScrollProgress.init();
  }
}
