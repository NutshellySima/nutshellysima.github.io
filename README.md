## Overview

This repository is a **static GitHub Pages** site for `www.chijunsima.com`.

It is intentionally **no-build** (no bundler, no npm) to keep deployment simple and reliable.

## Structure

- `index.html`: Main single-page site content.
- `assets/css/site.css`: Custom CSS extracted from `index.html`.
- `assets/js/site.js`: Custom JavaScript extracted from `index.html`.
- `avatar.jpg`: Profile image used by the page and social previews.
- `cv.pdf`: Downloadable CV linked from the page.
- `CNAME`, `robots.txt`, `sitemap.xml`: GitHub Pages / SEO config.

## Editing guidelines

- **Content/layout**: edit `index.html`.
- **Custom CSS**: edit `assets/css/site.css`.
- **Custom JS**: edit `assets/js/site.js`.
- Keep existing file paths stable (e.g. `avatar.jpg`, `/cv.pdf`) to avoid breaking inbound links.

## Local preview

Any static file server works. Examples:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

