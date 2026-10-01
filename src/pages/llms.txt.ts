import type { APIRoute } from 'astro';
import { absoluteUrl, advisors, lastUpdated, machineReadableResources, profile, publications, siteMetadata } from '../data/profile';

const body = [
  `# ${profile.fullName}`,
  '',
  `> ${profile.description}`,
  '',
  `Last updated: ${lastUpdated}`,
  '',
  '- Website: ' + absoluteUrl('/'),
  ...advisors.map((advisor) => `- Advisor: ${advisor.name} (${advisor.title}, ${advisor.affiliation}) — ${advisor.url}`),
  `- Email: ${profile.email}`,
  '- Google Scholar: https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en',
  '- LinkedIn: https://www.linkedin.com/in/chijun-sima/',
  '',
  '## Flagship work',
  '',
  `**${publications[0].title}** (${publications[0].venue}): ${publications[0].summary}`,
  '',
  `Paper: ${publications[0].link}`,
  '',
  '## Machine-readable endpoints',
  '',
  ...machineReadableResources.map(
    (resource) => `- ${resource.label}: ${absoluteUrl(resource.href)} (${resource.description})`
  ),
  '',
  `## Canonical page`,
  '',
  siteMetadata.description,
].join('\n');

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
