## Overview

This repository is a minimal static GitHub Pages site for `www.chijunsima.com`, built with Astro.

## Structure

- `src/pages/index.astro`: Main single-page site content.
- `src/data/profile.ts`: Shared source of truth for homepage identity and SEO metadata.
- `src/styles/site.css`: Small stylesheet for the homepage.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`: Generated crawler discovery endpoints.
- `.nojekyll`: Keeps GitHub Pages from running Jekyll transforms.
- `cloudflare/agent-discovery-worker.js`, `wrangler.toml`: Cloudflare Worker config for response security headers.
- `CNAME`: GitHub Pages custom domain config.

## Editing guidelines

- **Content/layout**: edit `src/pages/index.astro`.
- **Shared profile data**: edit `src/data/profile.ts`.
- **Custom CSS**: edit `src/styles/site.css`.
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

