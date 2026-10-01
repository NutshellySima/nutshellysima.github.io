import type { APIRoute } from 'astro';
import { absoluteUrl, experience, lastUpdatedISO, profile, publications, siteMetadata } from '../data/profile';

const toYearDate = (year: number) => `${year}-01-01T00:00:00+08:00`;
const toMonthDate = (startDate: string) => {
  const [year, month = '01'] = startDate.split('-');
  return `${year}-${month}-01T00:00:00+08:00`;
};

const items = [
  ...experience.map((entry) => ({
    id: absoluteUrl(`/#experience-${entry.startDate}`),
    url: absoluteUrl('/#experience'),
    title: `${entry.role}, ${entry.org}`,
    content_text: `${entry.role} at ${entry.org} (${entry.period}).`,
    date_published: toMonthDate(entry.startDate),
    tags: ['experience'],
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
  description: 'Publications and career milestones from the academic homepage of Chijun Sima.',
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
