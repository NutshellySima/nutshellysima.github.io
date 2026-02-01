export class Service {
  static render(): string {
    return `
      <!-- ===== Service ===== -->
      <section id="service" class="py-20 lg:py-28 bg-slate-50 dark:bg-slate-800/30 relative overflow-hidden">
        <div class="absolute inset-0 dot-pattern opacity-50"></div>
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="reveal">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
                <i data-lucide="users" class="w-4 h-4"></i>
                Service
              </span>
              <h2 class="text-3xl sm:text-4xl font-display font-bold mb-3">Service & recognition</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Selected service, talks, and recognition.</p>
            </div>

            <div class="grid lg:grid-cols-3 gap-6 stagger" id="service-cards">
              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <i data-lucide="eye" class="w-6 h-6 text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-display font-bold">Reviewer</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Conference & workshop peer review</p>
                  </div>
                </div>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>CVPR 2025</li>
                  <li>ICLR 2025 Workshop (FM-Wild)</li>
                  <li>NeurIPS 2025 Workshop (Efficient Reasoning)</li>
                </ul>
              </div>

              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
                    <i data-lucide="mic" class="w-6 h-6 text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-display font-bold">Talks</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Invited presentations (Ekko)</p>
                  </div>
                </div>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>Tencent WeChat AI (Shenzhen, Jun 2022)</li>
                  <li>DataFun (Virtual, Aug 2022)</li>
                  <li>TechBeat (Virtual, Sep 2022)</li>
                </ul>
              </div>

              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                    <i data-lucide="trophy" class="w-6 h-6 text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-display font-bold">Awards</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Selected recognition</p>
                  </div>
                </div>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><span class="font-medium text-slate-800 dark:text-slate-200">Tencent Technology Breakthrough Award (Gold)</span>, 2022H2 — Project Lead (Ekko)</li>
                  <li>ACM-ICPC Asia Xi'an Regional — Bronze (2017)</li>
                  <li>CCPC Guangdong Division — Second Prize (out of 177 teams)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
