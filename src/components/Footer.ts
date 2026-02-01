export class Footer {
  static render(): string {
    return `
      <!-- ===== Footer ===== -->
      <footer class="bg-slate-900 text-white py-16 lg:py-20 no-print relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="grid md:grid-cols-3 gap-12 mb-12">
            <!-- Brand -->
            <div>
              <div class="flex items-center gap-3 mb-5">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                  CS
                </div>
                <div>
                  <span class="font-display font-semibold text-lg block">Chijun Sima</span>
                  <span class="text-slate-400 text-sm">Efficient ML Systems</span>
                </div>
              </div>
              <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
                Building efficient ML systems at scale (freshness, cost, reliability) and contributing to LLVM.
              </p>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="font-display font-semibold mb-5">Quick Links</h4>
              <div class="flex flex-wrap gap-2">
                <a href="#about" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm transition-colors hover:scale-105">Overview</a>
                <a href="#work" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm transition-colors hover:scale-105">Work</a>
                <a href="#publications" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm transition-colors hover:scale-105">Publications</a>
                <a href="#service" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm transition-colors hover:scale-105">Service</a>
                <a href="/cv.pdf" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm transition-colors hover:scale-105">CV</a>
              </div>
            </div>

            <!-- Connect -->
            <div>
              <h4 class="font-display font-semibold mb-5">Connect</h4>
              <div class="flex gap-3">
                <a href="mailto:simachijun@gmail.com" class="group p-3 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-primary-600 hover:to-purple-600 transition-all hover:scale-110" aria-label="Email">
                  <i data-lucide="mail" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                </a>
                <a href="https://www.linkedin.com/in/chijun-sima/" target="_blank" rel="noopener noreferrer" class="group p-3 rounded-xl bg-slate-800 hover:bg-[#0077b5] transition-all hover:scale-110" aria-label="LinkedIn">
                  <i data-lucide="linkedin" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                </a>
                <a href="https://github.com/NutshellySima" target="_blank" rel="noopener noreferrer" class="group p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all hover:scale-110" aria-label="GitHub">
                  <i data-lucide="github" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                </a>
                <a href="https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" class="group p-3 rounded-xl bg-slate-800 hover:bg-[#4285f4] transition-all hover:scale-110" aria-label="Google Scholar">
                  <i data-lucide="graduation-cap" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-slate-400 text-sm">
              © <span id="year">${new Date().getFullYear()}</span> Chijun Sima.
            </p>
            <a href="#top" class="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-primary-600 hover:to-purple-600 text-sm transition-all hover:scale-105">
              <i data-lucide="arrow-up" class="w-4 h-4 group-hover:-translate-y-1 transition-transform"></i>
              Back to top
            </a>
          </div>
        </div>
      </footer>
    `;
  }
}
