import type { APIRoute } from 'astro';
import { absoluteUrl } from '../data/profile';

const contentSignal = 'Content-Signal: ai-train=yes, search=yes, ai-input=yes';

const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-Web',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'Applebot-Extended',
  'PerplexityBot',
  'cohere-ai',
] as const;

const searchCrawlers = ['Googlebot', 'Bingbot'] as const;

const allowRecord = (userAgent: string, includeContentSignal = false) =>
  [`User-agent: ${userAgent}`, 'Allow: /', ...(includeContentSignal ? [contentSignal] : [])].join('\n');

const body = [
  '# Robots.txt for chijunsima.com',
  '',
  '# As a condition of accessing this website, you agree to',
  '# abide by the following content signals:',
  '#',
  '# (a) If a content-signal = yes, you may collect content',
  '# for the corresponding use.',
  '# (b) If a content-signal = no, you may not collect content',
  '# for the corresponding use.',
  '# (c) If the website operator does not include a content',
  '# signal for a corresponding use, the website operator',
  '# neither grants nor restricts permission via content signal',
  '# with respect to the corresponding use.',
  '#',
  '# The content signals and their meanings are:',
  '#',
  '# search: building a search index and providing search',
  '# results, such as returning hyperlinks and short excerpts',
  '# from this website. Search does not include providing',
  '# AI-generated search summaries.',
  '# ai-input: inputting content into one or more AI models,',
  '# such as retrieval augmented generation, grounding, or other',
  '# real-time taking of content for generative AI search answers.',
  '# ai-train: training or fine-tuning AI models.',
  '#',
  '# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS',
  '# RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN',
  '# UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS',
  '# IN THE DIGITAL SINGLE MARKET.',
  '',
  '# Default: allow everything',
  'User-agent: *',
  'Allow: /',
  contentSignal,
  'Crawl-delay: 1',
  '',
  '# AI crawlers and agent fetchers',
  aiCrawlers.map((crawler) => allowRecord(crawler, true)).join('\n\n'),
  '',
  '# Search crawlers',
  searchCrawlers.map((crawler) => allowRecord(crawler)).join('\n\n'),
  '',
  '# Discovery',
  `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
  '# LLM context: /llms.txt and /llms-full.txt',
  '# Machine-readable JSON: /profile.json, /publications.json, and /openapi.json',
  '# Agent Skills: /.well-known/agent-skills/index.json',
].join('\n');

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
