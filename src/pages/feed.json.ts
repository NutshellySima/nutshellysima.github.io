import type { APIRoute } from 'astro';
import { absoluteUrl, lastUpdatedISO, news, profile, publications, siteMetadata } from '../data/profile';

const toYearDate = (year: number) => `${year}-01-01T00:00:00+08:00`;

const items = [
  ...news.map((item, index) => ({
    id: absoluteUrl(`/#news-${index + 1}`),
    url: absoluteUrl('/#news'),
    title: item.text,
    content_text: item.text,
    date_published: item.dateISO,
    tags: ['news'],
  })),
  ...publications.map((publication) => ({
    id: absoluteUrl(`/#${publication.id}`),
    url: absoluteUrl('/#publications'),
    external_url: publication.link || undefined,
    title: publication.title,
    content_text: `${publication.venue}. ${publication.summary}`,
    date_published: toYearDate(publication.year),
    tags: ['publication'],
  })),
].sort((left, right) => right.date_published.localeCompare(left.date_published));

const feed = {
  version: 'https://jsonfeed.org/version/1.1',
  title: `${siteMetadata.name} updates`,
  home_page_url: absoluteUrl('/'),
  feed_url: absoluteUrl('/feed.json'),
  description: 'News and selected publications from the academic homepage of Chijun Sima.',
  language: siteMetadata.language,
  icon: absoluteUrl('/icon-512.svg'),
  favicon: absoluteUrl('/favicon.svg'),
  authors: [
    {
      name: profile.fullName,
      url: absoluteUrl('/'),
    },
  ],
  items,
  _meta: {
    updatedAt: lastUpdatedISO,
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
