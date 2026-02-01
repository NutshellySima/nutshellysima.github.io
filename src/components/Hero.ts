export class Hero {
  static render(): string {
    return `
      <!-- ===== Hero / About ===== -->
      <section id="about" class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 gradient-bg mesh-gradient noise overflow-hidden">
        <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div class="reveal">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
              <div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05]">
                  Chijun Sima
                </h1>
                <p class="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  I build <span class="font-semibold text-slate-800 dark:text-slate-200">efficient ML systems</span> for large-scale production: keeping models fresh under tight latency/cost constraints, and turning research ideas into deployable systems.
                </p>
                <div class="mt-6 flex flex-wrap gap-2 text-sm">
                  <span class="px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">Senior SDE · Tencent (WeChat)</span>
                  <span class="px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">OSDI '22 (co-first author)</span>
                  <span class="px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">LLVM developer (commit access)</span>
                  <span class="px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">B.Eng. CS · SCUT (Rank 1/28)</span>
                </div>

                <div class="mt-8 flex flex-wrap gap-3">
                  <a href="#research" class="magnetic-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all focus-ring">
                    <i data-lucide="flask-conical" class="w-5 h-5"></i>
                    Research focus
                  </a>
                  <a href="#ekko" class="magnetic-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 font-medium shadow-lg hover:shadow-xl transition-all border border-slate-200/70 dark:border-slate-700/60 focus-ring">
                    <i data-lucide="activity" class="w-5 h-5"></i>
                    Ekko explained
                  </a>
                  <a href="/cv.pdf" class="magnetic-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 font-medium shadow-lg hover:shadow-xl transition-all border border-slate-200/70 dark:border-slate-700/60 focus-ring">
                    <i data-lucide="file-text" class="w-5 h-5"></i>
                    CV (PDF)
                  </a>
                </div>

                <div class="mt-6 flex flex-wrap items-center gap-3 text-sm">
                  <a href="mailto:simachijun@gmail.com" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-900 transition-colors focus-ring">
                    <i data-lucide="mail" class="w-4 h-4 text-primary-600"></i>
                    Email
                  </a>
                  <a href="https://github.com/NutshellySima" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-900 transition-colors focus-ring">
                    <i data-lucide="github" class="w-4 h-4"></i>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/chijun-sima/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-900 transition-colors focus-ring">
                    <i data-lucide="linkedin" class="w-4 h-4 text-[#0077b5]"></i>
                    LinkedIn
                  </a>
                  <a href="https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-900 transition-colors focus-ring">
                    <i data-lucide="graduation-cap" class="w-4 h-4 text-[#4285f4]"></i>
                    Scholar
                  </a>
                </div>
              </div>

              <div class="flex-shrink-0 w-full sm:w-auto">
                <div class="relative">
                  <img src="avatar.jpg" alt="Chijun Sima" width="208" height="208" decoding="async" fetchpriority="high" class="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-3xl shadow-2xl ring-4 ring-white dark:ring-slate-800 mx-auto sm:mx-0" loading="eager">
                  <div class="mt-4 flex justify-center sm:justify-start">
                    <div class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-sm">
                      <i data-lucide="map-pin" class="w-4 h-4 text-primary-600"></i>
                      Guangzhou, China
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
