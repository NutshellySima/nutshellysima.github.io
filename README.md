## Overview

This repository is a **static GitHub Pages** site for `www.chijunsima.com`, built with Astro + Tailwind for modern tooling and performance.

## Structure

- `src/pages/index.astro`: Main single-page site content.
- `src/data/profile.ts`: Shared source of truth for homepage content and AI-facing exports.
- `src/styles/site.css`: Custom CSS extracted from `index.html`.
- `src/scripts/site.ts`: Theme toggle, footer year, service worker setup, and browser-side WebMCP registration.
- `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`: Generated LLM-friendly text endpoints.
- `src/pages/profile.json.ts`, `src/pages/publications.json.ts`, `src/pages/feed.json.ts`: Machine-readable JSON endpoints.
- `src/pages/openapi.json.ts`: OpenAPI description for public read-only machine-readable endpoints.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`: Generated crawler discovery endpoints.
- `.well-known/agent-skills/chijun-sima-profile/SKILL.md`: Agent Skills artifact copied into the static build.
- `.nojekyll`: Ensures GitHub Pages publishes `.well-known` discovery files.
- `cloudflare/agent-discovery-worker.js`, `wrangler.toml`: Cloudflare Worker config for homepage `Link` headers, markdown negotiation, and the API catalog.
- `avatar.jpg`: Profile image used by the page.
- `og-image.png`: 1200×630 social preview card. Regenerate with `npm run build && npx -p playwright node scripts/generate-og-image.mjs` (template: `scripts/og-card.html`).
- `scripts/check-agent-sync.js`: CI guard that keeps the SKILL.md copy embedded in the Cloudflare worker identical to the static file.
- `CNAME`, `.well-known/ai-plugin.json`: GitHub Pages / AI discovery config.

## Editing guidelines

- **Content/layout**: edit `src/pages/index.astro`.
- **Shared profile data**: edit `src/data/profile.ts`.
- **Custom CSS**: edit `src/styles/site.css`.
- **Custom JS**: edit `src/scripts/site.ts`.
- Keep existing file paths stable (e.g. `avatar.jpg`) to avoid breaking inbound links.
- Broad machine-readable access to public profile content is intentional. Preserve the LLM text routes, JSON/feed/OpenAPI endpoints, Agent Skills discovery, AI plugin metadata, and browser-side WebMCP tools when editing content or profile data.

## Local preview

Use Astro's dev server for local preview:

```bash
npm install
npm run dev
```

Then open `http://localhost:4321/`.

## Cloudflare Worker

GitHub Pages remains the static origin. The Cloudflare Worker in `cloudflare/agent-discovery-worker.js` (config in `wrangler.toml`) adds edge-only behavior:

- Redirects the bare domain `chijunsima.com` to `https://www.chijunsima.com` (301). GitHub Pages only has a certificate for `www`, so the apex would otherwise return Cloudflare 526.
- Homepage `Link` response headers.
- `Accept: text/markdown` negotiation for `/`.
- `/.well-known/api-catalog` with `application/linkset+json`.
- Security response headers on every path.

### Deployment

The worker deploys automatically (`.github/workflows/deploy-worker.yml`) when `cloudflare/`, `wrangler.toml`, the Agent Skills files, or the worker check scripts change on `main`. It can also be run manually from the Actions tab.

It needs two repository secrets: `CLOUDFLARE_API_TOKEN` (the "Edit Cloudflare Workers" template, limited to the `chijunsima.com` zone) and `CLOUDFLARE_ACCOUNT_ID`.

Manual alternative: `npx wrangler login` then `npx wrangler deploy`.

### Checks

`npm run check` runs offline tests in CI before every deploy: the SKILL.md copy embedded in the worker must equal the static file (`scripts/check-agent-sync.js`), and the worker's own responses are smoke-tested (`scripts/check-worker.mjs`). If you edit `.well-known/agent-skills/chijun-sima-profile/SKILL.md`, update the copy in the worker too.

### Auditing the account

`.github/workflows/cloudflare-audit.yml` is a manual, read-only job that lists Workers scripts, custom domains, and zone routes. The repository is public, so its log is public too; it prints names and route patterns only, never secrets.
