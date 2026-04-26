import type { APIRoute } from 'astro';
import { absoluteUrl, lastUpdatedISO, siteMetadata } from '../data/profile';

const jsonResponse = (description: string, schema: Record<string, unknown>) => ({
  description,
  content: {
    'application/json': {
      schema,
    },
  },
});

const textResponse = (description: string) => ({
  description,
  content: {
    'text/plain': {
      schema: {
        type: 'string',
      },
    },
  },
});

const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'Chijun Sima Machine-Readable Profile API',
    version: lastUpdatedISO,
    description:
      'Read-only static endpoints exposing public profile, publication, update, and agent discovery metadata for chijunsima.com.',
  },
  servers: [
    {
      url: siteMetadata.url,
    },
  ],
  externalDocs: {
    description: 'Concise LLM-oriented site summary',
    url: absoluteUrl('/llms.txt'),
  },
  paths: {
    '/profile.json': {
      get: {
        operationId: 'getProfile',
        summary: 'Get structured public profile metadata.',
        responses: {
          '200': jsonResponse('Structured profile, experience, contact, and site metadata.', {
            $ref: '#/components/schemas/Profile',
          }),
        },
      },
    },
    '/publications.json': {
      get: {
        operationId: 'getPublications',
        summary: 'Get selected publication metadata.',
        responses: {
          '200': jsonResponse('Selected publications.', {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Publication',
            },
          }),
        },
      },
    },
    '/feed.json': {
      get: {
        operationId: 'getFeed',
        summary: 'Get public site updates as JSON Feed.',
        responses: {
          '200': {
            description: 'JSON Feed document for site news and notable updates.',
            content: {
              'application/feed+json': {
                schema: {
                  type: 'object',
                  additionalProperties: true,
                },
              },
            },
          },
        },
      },
    },
    '/llms.txt': {
      get: {
        operationId: 'getLlmsSummary',
        summary: 'Get concise LLM-oriented text context.',
        responses: {
          '200': textResponse('Concise LLM-oriented public summary.'),
        },
      },
    },
    '/llms-full.txt': {
      get: {
        operationId: 'getLlmsFullContext',
        summary: 'Get expanded LLM-oriented text context.',
        responses: {
          '200': textResponse('Expanded LLM-oriented public profile context.'),
        },
      },
    },
    '/.well-known/agent-skills/index.json': {
      get: {
        operationId: 'getAgentSkillsIndex',
        summary: 'Get Agent Skills discovery metadata.',
        responses: {
          '200': jsonResponse('Agent Skills discovery index.', {
            type: 'object',
            required: ['$schema', 'skills'],
            properties: {
              $schema: { type: 'string', format: 'uri' },
              skills: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['name', 'type', 'description', 'url', 'digest'],
                  additionalProperties: true,
                },
              },
            },
          }),
        },
      },
    },
  },
  components: {
    schemas: {
      Profile: {
        type: 'object',
        additionalProperties: true,
        description: 'Public profile data for Chijun Sima.',
      },
      Publication: {
        type: 'object',
        required: ['id', 'title', 'authors', 'summary'],
        additionalProperties: true,
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          authors: { type: 'string' },
          summary: { type: 'string' },
        },
      },
    },
  },
} as const;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(openapi, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
