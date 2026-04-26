## Overview

This repository is a **static GitHub Pages** site for `www.chijunsima.com`, built with Astro + Tailwind for modern tooling and performance.

## Structure

- `src/pages/index.astro`: Main single-page site content.
- `src/data/profile.ts`: Shared source of truth for homepage content and AI-facing exports.
- `src/styles/site.css`: Custom CSS extracted from `index.html`.
- `src/scripts/site.ts`: Custom JavaScript extracted from `index.html`.
- `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`: Generated LLM-friendly text endpoints.
- `src/pages/profile.json.ts`, `src/pages/publications.json.ts`, `src/pages/feed.json.ts`: Machine-readable JSON endpoints.
- `src/pages/openapi.json.ts`: OpenAPI description for public read-only machine-readable endpoints.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`: Generated crawler discovery endpoints.
- `.well-known/agent-skills/chijun-sima-profile/SKILL.md`: Agent Skills artifact copied into the static build.
- `avatar.jpg`: Profile image used by the page and social previews.
- `CNAME`, `.well-known/ai-plugin.json`: GitHub Pages / AI discovery config.

## Editing guidelines

- **Content/layout**: edit `src/pages/index.astro`.
- **Shared profile data**: edit `src/data/profile.ts`.
- **Custom CSS**: edit `src/styles/site.css`.
- **Custom JS**: edit `src/scripts/site.ts`.
- Keep existing file paths stable (e.g. `avatar.jpg`) to avoid breaking inbound links.

## Local preview

Use Astro's dev server for local preview:

```bash
npm install
npm run dev
```

Then open `http://localhost:4321/`.

