const SITE = 'https://www.chijunsima.com';

const linkHeaders = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/oas+json"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-full.txt>; rel="describedby"; type="text/plain"',
  '</profile.json>; rel="describedby"; type="application/json"',
];

const estimateMarkdownTokens = (text) => String(Math.ceil(text.trim().split(/\s+/).filter(Boolean).length * 1.3));

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

const withHomepageLinkHeaders = (response) => {
  const headers = new Headers(response.headers);

  for (const header of linkHeaders) {
    headers.append('Link', header);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/.well-known/api-catalog') {
      return serveApiCatalog();
    }

    if (url.pathname === '/' && request.headers.get('Accept')?.includes('text/markdown')) {
      return serveMarkdownHomepage(url);
    }

    const response = await fetch(request);

    if (url.pathname !== '/') {
      return response;
    }

    return withHomepageLinkHeaders(response);
  },
};
