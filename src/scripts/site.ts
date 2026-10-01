import { onReady, utils } from './utils';
import { initServiceWorker } from './pwa';
import { absoluteUrl, machineReadableResources, profile, publications, siteMetadata, stripHtml } from '../data/profile';

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: () => unknown | Promise<unknown>;
};

type WebMcpModelContext = {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => void | Promise<void>;
};

declare global {
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

const emptyInputSchema = {
  type: 'object',
  properties: {},
  additionalProperties: false,
};

const initWebMcp = () => {
  const modelContext = navigator.modelContext;
  const registerTool = modelContext?.registerTool;
  if (typeof registerTool !== 'function') return;

  const controller = new AbortController();
  const tools: WebMcpTool[] = [
    {
      name: 'get_chijun_sima_profile',
      description: 'Return the public profile summary and machine-readable endpoints for Chijun Sima.',
      inputSchema: emptyInputSchema,
      execute: () => ({
        name: profile.fullName,
        jobTitle: profile.jobTitle,
        employer: profile.employer,
        department: profile.department,
        location: profile.location,
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
      description: 'Return selected public publication metadata for Chijun Sima.',
      inputSchema: emptyInputSchema,
      execute: () =>
        publications.map((publication) => ({
          id: publication.id,
          title: publication.title,
          venue: publication.venueFull,
          year: publication.year,
          authors: stripHtml(publication.authors),
          url: publication.link || null,
          note: publication.note || null,
          summary: publication.summary,
        })),
    },
    {
      name: 'get_chijun_sima_agent_resources',
      description: 'Return discovery URLs for LLM, JSON, feed, and Agent Skills resources on chijunsima.com.',
      inputSchema: emptyInputSchema,
      execute: () => ({
        homepage: absoluteUrl('/'),
        llms: absoluteUrl('/llms.txt'),
        llmsFull: absoluteUrl('/llms-full.txt'),
        profileJson: absoluteUrl('/profile.json'),
        publicationsJson: absoluteUrl('/publications.json'),
        feedJson: absoluteUrl('/feed.json'),
        agentSkills: absoluteUrl('/.well-known/agent-skills/index.json'),
      }),
    },
  ];

  for (const tool of tools) {
    void registerTool.call(modelContext, tool, { signal: controller.signal });
  }

  window.addEventListener('pagehide', () => controller.abort(), { once: true });
};

onReady(() => {
  initYear();
  initThemeToggle();
  initWebMcp();
  initServiceWorker();
});
