export class Publications {
  static render(): string {
    return `
      <!-- ===== Publications ===== -->
      <section id="publications" class="py-24 lg:py-32 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div class="absolute inset-0 mesh-gradient opacity-50"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="reveal">
            <!-- Section Header -->
            <div class="text-center mb-16">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-4">
                <i data-lucide="book-open" class="w-4 h-4"></i>
                Publications
              </span>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">Selected Publications</h2>
              <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">If you prefer a full list, see my Google Scholar.</p>
            </div>

            <!-- Publications List -->
            <div class="space-y-6 max-w-4xl mx-auto stagger" id="publications-list">
              <!-- OSDI Paper -->
              <div class="card-glow group bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 dark:from-red-900/10 dark:via-orange-900/10 dark:to-amber-900/10 rounded-2xl p-6 lg:p-8 border border-red-100/50 dark:border-red-800/30 relative overflow-hidden">
                <!-- Highlight Badge -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>

                <div class="flex flex-wrap items-start gap-3 mb-4">
                  <span class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold shadow-lg shadow-red-500/25">
                    OSDI '22
                  </span>
                  <span class="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium border border-amber-200/50 dark:border-amber-700/30">
                    ⭐ Co-first Author
                  </span>
                </div>

                <h3 class="text-xl font-display font-bold mb-3">
                  <a href="https://www.usenix.org/conference/osdi22/presentation/sima" target="_blank" rel="noopener noreferrer" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2 group/link">
                    Ekko: A Large-Scale Deep Learning Recommender System with Low-Latency Model Update
                    <i data-lucide="external-link" class="w-5 h-5 opacity-0 group-hover/link:opacity-100 transition-opacity"></i>
                  </a>
                </h3>

                <p class="text-slate-600 dark:text-slate-400 mb-4">
                  <strong class="text-slate-800 dark:text-slate-200">Chijun Sima*</strong>, Yao Fu*, Man-Kit Sit, Liyi Guo, Xuri Gong, Feng Lin, Junyu Wu, Yongsheng Li, Haidong Rong, Pierre-Louis Aublin, Luo Mai
                </p>

                <div class="flex flex-wrap items-center gap-4">
                  <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <i data-lucide="user" class="w-4 h-4"></i>
                    Supervised by <a href="https://luomai.github.io/" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">Luo Mai</a>
                  </p>
                  <a href="https://www.usenix.org/conference/osdi22/presentation/sima" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                    Read Paper
                  </a>
                </div>
              </div>

              <!-- IEEE Paper -->
              <div class="card-glow group bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl p-6 lg:p-8 border border-blue-100/50 dark:border-blue-800/30">
                <div class="flex flex-wrap items-start gap-3 mb-4">
                  <span class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/25">
                    IEEE Access
                  </span>
                  <span class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium">
                    2019
                  </span>
                </div>

                <h3 class="text-xl font-display font-bold mb-3">
                  Dynamic Barycenter Averaging Kernel in RBF Networks for Time Series Classification
                </h3>

                <p class="text-slate-600 dark:text-slate-400">
                  Kejian Shi, Hongyang Qin, <strong class="text-slate-800 dark:text-slate-200">Chijun Sima</strong>, Sen Li, Lifeng Shen, Qianli Ma
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
