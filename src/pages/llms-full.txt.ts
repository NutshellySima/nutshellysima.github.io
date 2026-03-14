import type { APIRoute } from 'astro';
import {
  absoluteUrl,
  awards,
  education,
  experience,
  lastUpdated,
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

const lines: string[] = [
  `# ${profile.fullName} — Full Context`,
  '',
  '> This file provides comprehensive information about Chijun Sima for LLM agents and AI systems. For a concise summary, see /llms.txt.',
  '',
  '## Snapshot',
  '',
  `- Last updated: ${lastUpdated}`,
  `- Website: ${absoluteUrl('/')}`,
  `- Canonical description: ${siteMetadata.description}`,
  '',
  '## Machine-readable endpoints',
  '',
  ...machineReadableResources.map(
    (resource) => `- ${resource.label}: ${absoluteUrl(resource.href)} (${resource.type})`
  ),
  '',
  '## Identity',
  '',
  `- Full name: ${profile.fullName}`,
  `- Current role: ${profile.jobTitle} — ${profile.subtitle}`,
  `- Employer: ${profile.employer} (${profile.department}), ${profile.location}`,
  `- Research focus: ${profile.researchFocus}`,
  `- Current topics: ${profile.currentTopics.join(', ')}`,
  '',
  '## Contact',
  '',
  `- Email: ${profile.email}`,
  `- Website: ${absoluteUrl('/')}`,
  '- Google Scholar: https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en',
  '- GitHub: https://github.com/NutshellySima',
  '- LinkedIn: https://www.linkedin.com/in/chijun-sima/',
  `- CV (PDF): ${absoluteUrl('/cv.pdf')}`,
  '',
  '## News',
  '',
  ...news.map((item) => `- ${item.dateLabel}: ${item.text}`),
  '',
  '## Education',
  '',
  `- ${education.degree}, ${education.school}, ${education.period}`,
  `- ${education.detail}`,
  '',
  '## Selected publications',
  '',
];

for (const [index, publication] of publications.entries()) {
  lines.push(`### ${index + 1}. ${publication.title}`);
  lines.push('');
  lines.push(`- Venue: ${publication.venueFull}${publication.year ? `, ${publication.year}` : ''}`);
  lines.push(`- Authors: ${publication.authors}`);
  if (publication.link) {
    lines.push(`- URL: ${publication.link}`);
  }
  if (publication.note) {
    lines.push(`- Note: ${publication.note}`);
  }
  lines.push(`- Summary: ${publication.summary}`);
  lines.push('');
}

lines.push('## Industry and open-source experience');
lines.push('');

for (const entry of experience) {
  lines.push(`### ${entry.org} — ${entry.role}`);
  lines.push(`- Period: ${entry.period}`);
  if (entry.subtitle) {
    lines.push(`- Focus: ${entry.subtitle}`);
  }
  if (entry.location) {
    lines.push(`- Location: ${entry.location}`);
  }
  for (const project of entry.projects) {
    if (project.name) {
      lines.push(`- Project: ${project.name}${project.note ? ` (${project.note})` : ''}`);
    }
    for (const bullet of project.bullets) {
      lines.push(`  - ${stripHtml(bullet)}`);
    }
  }
  lines.push('');
}

lines.push('## Academic service');
lines.push('');
for (const item of reviewing) {
  lines.push(`- Reviewer: ${item}`);
}
lines.push('');
lines.push('## Awards');
lines.push('');
for (const award of awards) {
  lines.push(`- ${award.text}${award.year ? ` (${award.year})` : ''}`);
}
lines.push('');
lines.push('## Talks');
lines.push('');
lines.push(`- "${publications[0].title}"`);
for (const talk of talks) {
  lines.push(`  - ${talk.text} (${talk.date})`);
}
lines.push('');
lines.push('## Selected company and press write-ups about Ekko');
lines.push('');
for (const writeup of writeups) {
  lines.push(`- ${writeup.label}: ${writeup.href}`);
}
lines.push('');
lines.push('## Keywords');
lines.push('');
lines.push(profile.knowsAbout.join(', '));

export const GET: APIRoute = () =>
  new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
