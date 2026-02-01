export class Ekko {
  static render(): string {
    return `
      <!-- ===== Ekko Explained ===== -->
      <section id="ekko" class="py-24 lg:py-32 bg-slate-50 dark:bg-slate-800/30 relative overflow-hidden">
        <div class="absolute inset-0 dot-pattern opacity-50"></div>
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="reveal">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-4">
                <i data-lucide="activity" class="w-4 h-4"></i>
                Ekko
              </span>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">Ekko, explained</h2>
              <p class="text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                Ekko is a production system for <span class="font-semibold text-slate-800 dark:text-slate-200">low-latency model updates</span> in large-scale deep learning recommender systems. It's motivated by a common scaling failure: bigger models can improve offline metrics yet degrade online outcomes when update pipelines can't keep up.
              </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-6 stagger">
              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 class="text-lg font-display font-bold mb-3">Problem → research question</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  When we scaled DLRMs, offline accuracy improved, but online engagement regressed. The root cause was <span class="font-semibold text-slate-800 dark:text-slate-200">stale models</span>: pre-scaling infrastructure couldn't propagate updates quickly enough.
                </p>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The question became: <span class="font-semibold text-slate-800 dark:text-slate-200">how can we keep update latency low as models scale to extreme size?</span>
                </p>
              </div>

              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 class="text-lg font-display font-bold mb-3">Design highlights</h3>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li class="flex items-start gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>
                    <span><span class="font-semibold text-slate-800 dark:text-slate-200">Update dissemination + scheduling:</span> compress updates and prioritize synchronization using model/gradient signals (WAN bandwidth −92%).</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>
                    <span><span class="font-semibold text-slate-800 dark:text-slate-200">SLO-aware placement:</span> optimization-based shard management to co-locate models without overloading inference engines (machine cost −49%).</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0"></i>
                    <span><span class="font-semibold text-slate-800 dark:text-slate-200">Safe rollout:</span> model-state management to roll back harmful updates in seconds.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6 card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h3 class="text-lg font-display font-bold mb-2">Production outcomes (selected)</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    In production iterations, Ekko-style mechanisms supported very large-scale deployment while maintaining <span class="font-semibold text-slate-800 dark:text-slate-200">second-level freshness</span> (reported 2.4s model-update latency) and serving over a billion users daily.
                  </p>
                </div>
                <div class="flex flex-wrap gap-2 text-sm">
                  <span class="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium">2.4s update latency</span>
                  <span class="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium">10,000× model-size scaling</span>
                  <span class="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium">WAN −92%</span>
                  <span class="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium">cost −49%</span>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <span class="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium">OSDI '22 (co-first)</span>
                <a href="https://www.usenix.org/conference/osdi22/presentation/sima" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Paper <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
                <a href="https://mp.weixin.qq.com/s/gBD3mdoRRlGI8bmXp2OBMA" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  WeChat engineering write-up <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
                <a href="https://mp.weixin.qq.com/s/hS5ZebOC7oQz_Itud0A_Rg" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Tencent engineering write-up <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
              </div>

              <div class="mt-6">
                <details class="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 p-6">
                  <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                      <i data-lucide="quote" class="w-5 h-5 text-primary-600"></i>
                      <span class="font-display font-semibold">Industry impact</span>
                    </div>
                    <i data-lucide="chevron-down" class="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div class="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      After rollout of Ekko-based recommendation infrastructure, a public WeChat engineering blog reports growth metrics (e.g., "+40% DAU" and "+87% total VV" over six months) alongside product iteration and operations.
                    </p>
                    <p>
                      What I consider the core research contribution is showing that <span class="font-semibold text-slate-800 dark:text-slate-200">model-aware mechanisms</span> can make second-level freshness feasible even at multi-terabyte scale.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
