export class Work {
  static render(): string {
    return `
      <!-- ===== Selected Work ===== -->
      <section id="work" class="py-20 lg:py-28 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div class="absolute inset-0 grid-pattern"></div>
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="reveal">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                <i data-lucide="briefcase" class="w-4 h-4"></i>
                Selected work
              </span>
              <h2 class="text-3xl sm:text-4xl font-display font-bold mb-3">Selected work</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Systems I've built to make large models practical in production: freshness, cost, reliability, and performance.
              </p>
            </div>

            <div class="grid lg:grid-cols-3 gap-6 stagger" id="work-cards">
              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                    <i data-lucide="activity" class="w-6 h-6 text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-display font-bold">Ekko (WeChat recsys)</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Low-latency model updates at extreme scale</p>
                  </div>
                </div>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>Compressed dissemination + model-aware scheduling (WAN −92%)</li>
                  <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>SLO-aware placement (machine cost −49%) + safe rollback</li>
                  <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>Second-level freshness (2.4s) for multi-terabyte models</li>
                </ul>
                <div class="mt-5 flex flex-wrap items-center gap-3 text-sm">
                  <span class="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium">OSDI '22</span>
                  <a href="#ekko" class="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:underline font-medium">
                    Explainer <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </a>
                  <a href="https://www.usenix.org/conference/osdi22/presentation/sima" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:underline font-medium">
                    Paper <i data-lucide="external-link" class="w-4 h-4"></i>
                  </a>
                </div>
              </div>

              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <i data-lucide="shield" class="w-6 h-6 text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-display font-bold">Data / feature platform</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Safe, scalable pipelines for training data</p>
                  </div>
                </div>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>WebAssembly runtime for in-process isolation</li>
                  <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>Locality-aware operator placement near data sources</li>
                  <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>Reduced data movement up to 1,200× on representative workloads</li>
                </ul>
                <div class="mt-5 flex flex-wrap gap-2 text-xs">
                  <span class="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium">WASM</span>
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">Data systems</span>
                </div>
              </div>

              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
                    <i data-lucide="code-2" class="w-6 h-6 text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-display font-bold">LLVM</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Compiler infrastructure contributions</p>
                  </div>
                </div>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li class="flex items-start gap-2"><i data-lucide="git-commit" class="w-4 h-4 text-primary-500 mt-0.5 shrink-0"></i>Improved Semi-NCA & optimization pipeline (LLVM 9.0), speedups up to 1980×</li>
                  <li class="flex items-start gap-2"><i data-lucide="git-commit" class="w-4 h-4 text-primary-500 mt-0.5 shrink-0"></i>Unified dominator-tree update APIs (LLVM 7.0)</li>
                  <li class="flex items-start gap-2"><i data-lucide="award" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i>Google Summer of Code 2018 (LLVM)</li>
                </ul>
                <div class="mt-5 flex flex-wrap gap-2 text-xs">
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">C++</span>
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">Compilers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
