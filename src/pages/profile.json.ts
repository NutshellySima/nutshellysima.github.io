import type { APIRoute } from 'astro';
import {
  absoluteUrl,
  awards,
  education,
  experience,
  lastUpdated,
  lastUpdatedISO,
  machineReadableResources,
  news,
  profile,
  publications,
  reviewing,
  siteMetadata,
  stripHtml,
  talks,
  writeups,
} from '../data/profile';

const document = {
  version: 1,
  updatedAt: lastUpdatedISO,
  site: {
    name: siteMetadata.name,
    title: siteMetadata.title,
    url: absoluteUrl('/'),
    description: siteMetadata.description,
    language: siteMetadata.language,
    llms: {
      concise: absoluteUrl('/llms.txt'),
      full: absoluteUrl('/llms-full.txt'),
    },
  },
  person: {
    name: profile.fullName,
    givenName: profile.givenName,
    familyName: profile.familyName,
    jobTitle: profile.jobTitle,
    subtitle: profile.subtitle,
    employer: {
      name: profile.employer,
      department: profile.department,
      url: profile.employerUrl,
    },
    location: profile.location,
    summary: profile.description,
    email: profile.email,
    profiles: {
      googleScholar: 'https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en',
      linkedin: 'https://www.linkedin.com/in/chijun-sima/',
    },
  },
  education,
  news: news.map((item) => ({
    date: item.dateISO,
    dateLabel: item.dateLabel,
    text: item.text,
  })),
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
  experience: experience.map((entry) => ({
    period: entry.period,
    startDate: entry.startDate,
    role: entry.role,
    subtitle: entry.subtitle,
    organization: entry.org,
    organizationUrl: entry.orgUrl,
    location: entry.location || null,
    projects: entry.projects.map((project) => ({
      name: project.name || null,
      note: project.note || null,
      bullets: project.bullets.map(stripHtml),
    })),
  })),
  talks,
  reviewing,
  awards,
  references: writeups,
  machineReadableResources: machineReadableResources.map((resource) => ({
    ...resource,
    url: absoluteUrl(resource.href),
  })),
  canonicalSources: {
    homepage: absoluteUrl('/'),
    aiPlugin: absoluteUrl('/.well-known/ai-plugin.json'),
    sitemap: absoluteUrl('/sitemap.xml'),
  },
  metadata: {
    lastUpdated,
    generatedBy: 'Astro',
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(document, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
