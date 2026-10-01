import { onReady, utils } from './utils';
import { initServiceWorker } from './pwa';
import { absoluteUrl, advisors, machineReadableResources, profile, publications, siteMetadata, stripHtml } from '../data/profile';

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: () => string | Promise<string>;
};

type WebMcpModelContext = {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown;
};

// The current WebMCP draft exposes the API on `document.modelContext`; earlier
// implementations used `navigator.modelContext`. Support both.
declare global {
  interface Document {
    modelContext?: WebMcpModelContext;
  }
  interface Navigator {
    modelContext?: WebMcpModelContext;
  }
}

const initYear = () => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear().toString();
};

const initThemeToggle = () => {
  const btn = document.getElementById('theme-toggle') as HTMLButtonElement | null;
  if (!btn) return;

  const html = document.documentElement;

  const apply = (dark: boolean) => {
    html.classList.toggle('dark', dark);
    btn.setAttribute('aria-pressed', String(dark));
    btn.textContent = dark ? '☀' : '☾';
  };

  const saved = utils.storage.get('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  apply(isDark);

  btn.addEventListener('click', () => {
    const next = !html.classList.contains('dark');
    apply(next);
    utils.storage.set('theme', next ? 'dark' : 'light');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!utils.storage.get('theme')) apply(e.matches);
  });
};

const initScrollSpy = () => {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((link) => [link.dataset.nav ?? '', link]));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => link.classList.remove('is-active'));
        byId.get(entry.target.id)?.classList.add('is-active');
      }
    },
    { rootMargin: '-20% 0px -65% 0px' }
  );

  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
};

const emptyInputSchema = {
  type: 'object',
  properties: {},
  additionalProperties: false,
};

const asText = (value: unknown) => JSON.stringify(value, null, 2);

const readOnly = { readOnlyHint: true } as const;

const initWebMcp = () => {
  const modelContext = document.modelContext ?? navigator.modelContext;
  if (typeof modelContext?.registerTool !== 'function') return;

  const controller = new AbortController();
  const tools: WebMcpTool[] = [
    {
      name: 'get_chijun_sima_profile',
      description: 'Return the public profile summary and machine-readable endpoints for Chijun Sima.',
      inputSchema: emptyInputSchema,
      annotations: readOnly,
      execute: () =>
        asText({
          name: profile.fullName,
          jobTitle: profile.jobTitle,
          affiliation: profile.affiliation,
          department: profile.department,
          location: profile.location,
          advisors: advisors.map((advisor) => ({ name: advisor.name, title: advisor.title, url: advisor.url })),
          description: siteMetadata.description,
          website: absoluteUrl('/'),
          machineReadableResources: machineReadableResources.map((resource) => ({
            label: resource.label,
            url: absoluteUrl(resource.href),
            type: resource.type,
            description: resource.description,
          })),
        }),
    },
    {
      name: 'get_chijun_sima_publications',
      description: 'Return public publication metadata for Chijun Sima.',
      inputSchema: emptyInputSchema,
      annotations: readOnly,
      execute: () =>
        asText(
          publications.map((publication) => ({
            id: publication.id,
            title: publication.title,
            venue: publication.venueFull,
            year: publication.year,
            authors: stripHtml(publication.authors),
            url: publication.link || null,
            note: publication.note || null,
            summary: publication.summary,
          }))
        ),
    },
    {
      name: 'get_chijun_sima_agent_resources',
      description: 'Return discovery URLs for LLM, JSON, feed, OpenAPI, and Agent Skills resources on chijunsima.com.',
      inputSchema: emptyInputSchema,
      annotations: readOnly,
      execute: () =>
        asText({
          homepage: absoluteUrl('/'),
          llms: absoluteUrl('/llms.txt'),
          llmsFull: absoluteUrl('/llms-full.txt'),
          profileJson: absoluteUrl('/profile.json'),
          publicationsJson: absoluteUrl('/publications.json'),
          feedJson: absoluteUrl('/feed.json'),
          openapi: absoluteUrl('/openapi.json'),
          apiCatalog: absoluteUrl('/.well-known/api-catalog'),
          agentSkills: absoluteUrl('/.well-known/agent-skills/index.json'),
        }),
    },
  ];

  for (const tool of tools) {
    try {
      // May return a promise; a failed registration must never break the page.
      void Promise.resolve(modelContext.registerTool(tool, { signal: controller.signal })).catch(() => {});
    } catch {
      /* unsupported or duplicate registration */
    }
  }

  window.addEventListener('pagehide', () => controller.abort(), { once: true });
};

onReady(() => {
  initYear();
  initThemeToggle();
  initScrollSpy();
  initWebMcp();
  initServiceWorker();
});
