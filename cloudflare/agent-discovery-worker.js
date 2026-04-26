const SITE = 'https://www.chijunsima.com';

const linkHeaders = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/oas+json"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-full.txt>; rel="describedby"; type="text/plain"',
  '</profile.json>; rel="describedby"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
];

const securityHeaders = {
  'Strict-Transport-Security': 'max-age=15552000',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), xr-spatial-tracking=()',
};

const corsPaths = new Set(['/llms.txt', '/llms-full.txt', '/profile.json', '/publications.json', '/feed.json', '/openapi.json']);

const skillMarkdown = [
  '# Chijun Sima Profile Lookup',
  '',
  'Use this skill when an agent needs current public information about Chijun Sima, his publications, or the machine-readable resources published on chijunsima.com.',
  '',
  '## Steps',
  '',
  '1. Fetch `https://www.chijunsima.com/llms.txt` for a concise summary.',
  '2. Fetch `https://www.chijunsima.com/llms-full.txt` when a fuller profile, experience, publication, award, or talk context is needed.',
  '3. Fetch `https://www.chijunsima.com/profile.json` for structured identity, contact, experience, education, and metadata.',
  '4. Fetch `https://www.chijunsima.com/publications.json` for structured publication data.',
  '5. Prefer the canonical public site URL, `https://www.chijunsima.com/`, when citing the homepage.',
  '',
  '## Guardrails',
  '',
  '- Treat the published endpoints as the source of truth.',
  '- Do not infer private contact channels or unpublished employment details.',
  '- Do not surface a personal GitHub profile link unless it appears in the published endpoints.',
  '',
].join('\n');

const estimateMarkdownTokens = (text) => String(Math.ceil(text.trim().split(/\s+/).filter(Boolean).length * 1.3));

const isCorsPath = (pathname) => pathname.startsWith('/.well-known/') || corsPaths.has(pathname);

const appendVary = (headers, value) => {
  const current = headers.get('Vary');
  if (!current) {
    headers.set('Vary', value);
    return;
  }

  const values = current.split(',').map((item) => item.trim().toLowerCase());
  if (!values.includes(value.toLowerCase())) {
    headers.set('Vary', `${current}, ${value}`);
  }
};

const withResponseHeaders = (response, url, options = {}) => {
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }

  if (isCorsPath(url.pathname)) {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Accept, Content-Type');
  }

  if (options.varyAccept) {
    appendVary(headers, 'Accept');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const sha256 = async (text) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));

  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const apiCatalog = () => ({
  linkset: [
    {
      anchor: `${SITE}/`,
      'service-desc': [
        {
          href: `${SITE}/openapi.json`,
          type: 'application/oas+json',
        },
      ],
      'service-doc': [
        {
          href: `${SITE}/llms.txt`,
          type: 'text/plain',
        },
        {
          href: `${SITE}/llms-full.txt`,
          type: 'text/plain',
        },
      ],
      describedby: [
        {
          href: `${SITE}/profile.json`,
          type: 'application/json',
        },
      ],
    },
  ],
});

const serveApiCatalog = () =>
  new Response(JSON.stringify(apiCatalog(), null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });

const serveAgentSkillsIndex = async () =>
  new Response(
    JSON.stringify(
      {
        $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
        skills: [
          {
            name: 'chijun-sima-profile',
            type: 'skill-md',
            description: 'Find current public profile, publication, and machine-readable endpoint information for Chijun Sima.',
            url: `${SITE}/.well-known/agent-skills/chijun-sima-profile/SKILL.md`,
            digest: `sha256:${await sha256(skillMarkdown)}`,
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

const serveSkillMarkdown = () =>
  new Response(skillMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });

const serveMarkdownHomepage = async (url) => {
  const markdownResponse = await fetch(new URL('/llms-full.txt', url));
  const markdown = await markdownResponse.text();

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'x-markdown-tokens': estimateMarkdownTokens(markdown),
    },
  });
};

const withHomepageLinkHeaders = (response, url) => {
  const headers = new Headers(response.headers);

  for (const header of linkHeaders) {
    headers.append('Link', header);
  }

  return withResponseHeaders(
    new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    }),
    url
  );
};

const serveCorsPreflight = (url) =>
  withResponseHeaders(
    new Response(null, {
      status: 204,
    }),
    url
  );

const secure = (response, url, options) => withResponseHeaders(response, url, options);

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && isCorsPath(url.pathname)) {
      return serveCorsPreflight(url);
    }

    if (url.pathname === '/.well-known/api-catalog') {
      return secure(serveApiCatalog(), url);
    }

    if (url.pathname === '/.well-known/agent-skills/index.json' || url.pathname === '/.well-known/skills/index.json') {
      return secure(await serveAgentSkillsIndex(), url);
    }

    if (
      url.pathname === '/.well-known/agent-skills/chijun-sima-profile/SKILL.md' ||
      url.pathname === '/.well-known/skills/chijun-sima-profile/SKILL.md'
    ) {
      return secure(serveSkillMarkdown(), url);
    }

    if (url.pathname === '/' && request.headers.get('Accept')?.includes('text/markdown')) {
      return secure(await serveMarkdownHomepage(url), url, { varyAccept: true });
    }

    const response = await fetch(request);

    if (url.pathname !== '/') {
      return secure(response, url);
    }

    return withHomepageLinkHeaders(response, url);
  },
};
