## Overview

This repository is a **static GitHub Pages** site for `www.chijunsima.com`, built with Astro + Tailwind for modern tooling and performance.

## Structure

- `src/pages/index.astro`: Main single-page site content.
- `src/data/profile.ts`: Shared source of truth for homepage identity and SEO metadata.
- `src/styles/site.css`: Custom CSS extracted from `index.html`.
- `src/scripts/site.ts`: Custom JavaScript extracted from `index.html`.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`: Generated crawler discovery endpoints.
- `.nojekyll`: Ensures GitHub Pages publishes `.well-known` discovery files.
- `cloudflare/agent-discovery-worker.js`, `wrangler.toml`: Cloudflare Worker config for response security headers.
- `CNAME`: GitHub Pages custom domain config.

## Editing guidelines

- **Content/layout**: edit `src/pages/index.astro`.
- **Shared profile data**: edit `src/data/profile.ts`.
- **Custom CSS**: edit `src/styles/site.css`.
- **Custom JS**: edit `src/scripts/site.ts`.
- Keep existing public file paths stable unless a privacy or content-removal request requires deleting them.

## Local preview

Use Astro's dev server for local preview:

```bash
npm install
npm run dev
```

Then open `http://localhost:4321/`.

## Cloudflare Worker

GitHub Pages remains the static origin. The Cloudflare Worker in `cloudflare/agent-discovery-worker.js` adds response security headers.

Deploy with Wrangler after authenticating Cloudflare locally:

```bash
npx wrangler deploy
```

