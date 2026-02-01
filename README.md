## Overview

This repository is a **static GitHub Pages** site for `www.chijunsima.com`, built with Astro + Tailwind for modern tooling and performance.

## Structure

- `src/pages/index.astro`: Main single-page site content.
- `src/styles/site.css`: Custom CSS extracted from `index.html`.
- `src/scripts/site.ts`: Custom JavaScript extracted from `index.html`.
- `avatar.jpg`: Profile image used by the page and social previews.
- `cv.pdf`: Downloadable CV linked from the page.
- `CNAME`, `robots.txt`, `sitemap.xml`: GitHub Pages / SEO config.

## Editing guidelines

- **Content/layout**: edit `src/pages/index.astro`.
- **Custom CSS**: edit `src/styles/site.css`.
- **Custom JS**: edit `src/scripts/site.ts`.
- Keep existing file paths stable (e.g. `avatar.jpg`, `/cv.pdf`) to avoid breaking inbound links.

## Local preview

Use Astro's dev server for local preview:

```bash
npm install
npm run dev
```

Then open `http://localhost:4321/`.

