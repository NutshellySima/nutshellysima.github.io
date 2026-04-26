import type { APIRoute } from 'astro';
import { absoluteUrl, lastUpdatedISO } from '../data/profile';

const entries = [
  {
    loc: absoluteUrl('/'),
    changefreq: 'monthly',
    priority: '1.0',
    image: {
      loc: absoluteUrl('/avatar.jpg'),
      title: 'Chijun Sima',
    },
  },
  { loc: absoluteUrl('/llms.txt'), changefreq: 'monthly', priority: '0.5' },
  { loc: absoluteUrl('/llms-full.txt'), changefreq: 'monthly', priority: '0.5' },
  { loc: absoluteUrl('/profile.json'), changefreq: 'monthly', priority: '0.5' },
  { loc: absoluteUrl('/publications.json'), changefreq: 'monthly', priority: '0.4' },
  { loc: absoluteUrl('/feed.json'), changefreq: 'weekly', priority: '0.3' },
  { loc: absoluteUrl('/openapi.json'), changefreq: 'monthly', priority: '0.3' },
  { loc: absoluteUrl('/.well-known/ai-plugin.json'), changefreq: 'yearly', priority: '0.2' },
  { loc: absoluteUrl('/.well-known/agent-skills/index.json'), changefreq: 'monthly', priority: '0.2' },
  {
    loc: absoluteUrl('/.well-known/agent-skills/chijun-sima-profile/SKILL.md'),
    changefreq: 'monthly',
    priority: '0.2',
  },
] as const;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries
  .map((entry) => {
    const imageBlock = entry.image
      ? `
  <image:image>
    <image:loc>${entry.image.loc}</image:loc>
    <image:title>${entry.image.title}</image:title>
  </image:image>`
      : '';

    return `
<url>
  <loc>${entry.loc}</loc>
  <lastmod>${lastUpdatedISO}</lastmod>
  <changefreq>${entry.changefreq}</changefreq>
  <priority>${entry.priority}</priority>${imageBlock}
</url>`;
  })
  .join('')}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
