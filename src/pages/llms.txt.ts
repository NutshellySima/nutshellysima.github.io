import type { APIRoute } from 'astro';
import { absoluteUrl, advisors, lastUpdated, machineReadableResources, profile, publications } from '../data/profile';

// Follows the llms.txt layout (https://llmstxt.org): H1, blockquote summary,
// then H2 sections of `[name](url): notes` lists, with secondary links under "Optional".
const flagship = publications[0];
const primaryResources = machineReadableResources.filter((resource) =>
  ['llms-full.txt', 'profile.json', 'publications.json'].includes(resource.label)
);
const optionalResources = machineReadableResources.filter(
  (resource) => resource.label !== 'llms.txt' && !primaryResources.includes(resource)
);

const body = [
  `# ${profile.fullName}`,
  '',
  `> ${profile.description}`,
  '',
  `${profile.jobTitle}, ${profile.affiliation}, ${profile.location}. Contact: ${profile.email}. Last updated ${lastUpdated}.`,
  '',
  '## Profile',
  '',
  `- [Homepage](${absoluteUrl('/')}): Publications, experience, education, talks, awards, and links.`,
  '- [Google Scholar](https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en): Full publication list.',
  '- [LinkedIn](https://www.linkedin.com/in/chijun-sima/): Professional profile.',
  ...advisors.map((advisor) => `- [${advisor.name}](${advisor.url}): Advisor (${advisor.title}, ${advisor.affiliation}).`),
  '',
  '## Flagship work',
  '',
  `- [${flagship.title}](${flagship.link}): ${flagship.venue}. ${flagship.summary}`,
  '',
  '## Data',
  '',
  ...primaryResources.map((resource) => `- [${resource.label}](${absoluteUrl(resource.href)}): ${resource.description}`),
  '',
  '## Optional',
  '',
  ...optionalResources.map((resource) => `- [${resource.label}](${absoluteUrl(resource.href)}): ${resource.description}`),
  '',
].join('\n');

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
