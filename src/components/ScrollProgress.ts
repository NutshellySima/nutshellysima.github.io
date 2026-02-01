export class ScrollProgress {
  static render(): string {
    return `
      <div id="scroll-progress" class="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 z-[60] no-print" style="transform: scaleX(0);"></div>
    `;
  }

  static init(): void {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

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
      { passive: true }
    );
  }
}
