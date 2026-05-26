## Learned User Preferences

- When changing site copy or profile fields, keep the remaining SEO surfaces in sync (meta, canonical URL, minimal JSON-LD, sitemap, robots) with the same source data.
- Prefer straightforward professional titles and bios; do not frame LLM, ML systems, or researcher identity as the user's expertise unless explicitly asked.
- Do not surface a personal GitHub profile link on the public site, in JSON-LD personal links, or in LLM-oriented text exports; repository and deployment metadata may still mention GitHub.
- For `robots.txt` Content Signals, keep the explicit explanatory notice and allow `ai-train=yes, search=yes, ai-input=yes` unless the user changes the policy.

## Learned Workspace Facts

- The site is an Astro static project; minimal identity content, freshness dates, and SEO-related fields are centralized in `src/data/profile.ts`.
- Generated or committed `dist/` output can lag `src/`; rebuild and deploy are needed for deployed artifacts to match source.
- The homepage intentionally avoids analytics, PWA/service-worker files, custom client JavaScript, public images, and extra machine-readable metadata.
- Major TypeScript upgrades can be constrained by `typescript-eslint` peer ranges (e.g. TypeScript 6 may be incompatible until the lint stack supports it).
- Public traffic is now proxied through Cloudflare while GitHub Pages remains the static origin; the current Worker only adds response security headers.
- LLM-oriented routes, JSON/feed/OpenAPI endpoints, Agent Skills discovery, AI plugin metadata, and browser-side WebMCP registration were removed to keep machine-readable exposure minimal.
