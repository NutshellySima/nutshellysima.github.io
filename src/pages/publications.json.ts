import type { APIRoute } from 'astro';
import { absoluteUrl, lastUpdatedISO, publications, siteMetadata } from '../data/profile';

const document = {
  version: 1,
  updatedAt: lastUpdatedISO,
  site: {
    name: siteMetadata.name,
    url: absoluteUrl('/'),
  },
  publications: publications.map((publication) => ({
    id: publication.id,
    title: publication.title,
    venue: publication.venue,
    venueFull: publication.venueFull,
    year: publication.year,
    datePublished: publication.datePublished,
    authors: publication.authors.split(', ').map((author) => author.replaceAll('*', '')),
    authorLine: publication.authors,
    url: publication.link || null,
    note: publication.note || null,
    summary: publication.summary,
  })),
  source: {
    homepage: absoluteUrl('/#publications'),
    llmsFull: absoluteUrl('/llms-full.txt'),
    googleScholar: 'https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en',
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(document, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
