import type { APIRoute } from 'astro';
import { absoluteUrl, lastUpdatedISO } from '../data/profile';

const entries = [
  {
    loc: absoluteUrl('/'),
    changefreq: 'monthly',
    priority: '1.0',
  },
] as const;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries
  .map((entry) => {
    return `
<url>
  <loc>${entry.loc}</loc>
  <lastmod>${lastUpdatedISO}</lastmod>
  <changefreq>${entry.changefreq}</changefreq>
  <priority>${entry.priority}</priority>
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
