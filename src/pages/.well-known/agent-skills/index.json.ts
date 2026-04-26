import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import type { APIRoute } from 'astro';
import { absoluteUrl } from '../../../data/profile';

const skillPath = resolve(cwd(), '.well-known/agent-skills/chijun-sima-profile/SKILL.md');

export const GET: APIRoute = async () => {
  const skill = await readFile(skillPath);
  const digest = createHash('sha256').update(skill).digest('hex');

  return new Response(
    JSON.stringify(
      {
        $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
        skills: [
          {
            name: 'chijun-sima-profile',
            type: 'skill-md',
            description:
              'Find current public profile, publication, and machine-readable endpoint information for Chijun Sima.',
            url: absoluteUrl('/.well-known/agent-skills/chijun-sima-profile/SKILL.md'),
            digest: `sha256:${digest}`,
          },
        ],
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
};
