export class Research {
  static render(): string {
    return `
      <!-- ===== Research Focus ===== -->
      <section id="research" class="py-20 lg:py-28 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div class="absolute inset-0 grid-pattern"></div>
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="reveal">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                <i data-lucide="flask-conical" class="w-4 h-4"></i>
                Research
              </span>
              <h2 class="text-3xl sm:text-4xl font-display font-bold mb-3">Research focus</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                I'm interested in system–algorithm co-design that makes large-scale learning <span class="font-semibold text-slate-800 dark:text-slate-200">technically and economically feasible</span> in production.
              </p>
            </div>

            <div class="grid lg:grid-cols-3 gap-6 stagger">
              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 class="text-lg font-display font-bold mb-2">Model freshness at scale</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  When scaling improves offline accuracy but harms online metrics, I look for "systems bottlenecks that become ML failure modes" (e.g., stale models from slow update pipelines).
                </p>
              </div>
              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 class="text-lg font-display font-bold mb-2">Low-cost data / feature pipelines</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Safe and scalable data engineering for training: isolation without heavyweight process boundaries, and locality-aware execution near data to reduce data movement. Modern feature pipelines are long and increasingly multimodal. The shift toward <span class="font-semibold text-slate-800 dark:text-slate-200">multimodal</span> inputs pushes pipeline design toward safe, expressive composition.
                </p>
              </div>
              <div class="card-glow bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 class="text-lg font-display font-bold mb-2">Efficient serving</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Cost-effective serving mechanisms (including LLM serving), where latency SLOs, memory bandwidth, and infrastructure costs interact with model behavior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
