## Learned User Preferences

- When changing site copy or profile fields, keep machine-readable surfaces in sync (LLM text routes, JSON endpoints, meta and keywords, structured data) with the same source data.
- Prefer straightforward professional titles and bios; do not frame LLM, ML systems, or researcher identity as the user's expertise unless explicitly asked.
- Do not surface a personal GitHub profile link on the public site, in JSON-LD personal links, or in LLM-oriented text exports; repository and deployment metadata may still mention GitHub.
- For `robots.txt` Content Signals, keep the explicit explanatory notice and allow `ai-train=yes, search=yes, ai-input=yes` unless the user changes the policy.

## Learned Workspace Facts

- The site is an Astro static project; profile content, freshness dates, and many SEO-related fields are centralized in `src/data/profile.ts` and propagate to pages, feeds, and machine-readable routes.
- Generated or committed `dist/` output can lag `src/`; rebuild and deploy are needed for deployed artifacts to match source.
- ProfilePage and WebSite JSON-LD `dateModified` must use a full ISO 8601 datetime (consistent with `lastUpdatedISO`), not a date-only string, for valid Google Search rich results.
- Major TypeScript upgrades can be constrained by `typescript-eslint` peer ranges (e.g. TypeScript 6 may be incompatible until the lint stack supports it).
- Public traffic is now proxied through Cloudflare while GitHub Pages remains the static origin; use Cloudflare for custom response headers, content negotiation, and extensionless well-known routes that GitHub Pages cannot serve correctly.
- The source now includes agent-discovery surfaces such as `/openapi.json`, `/.well-known/agent-skills/index.json`, and browser-side WebMCP registration alongside the existing LLM-oriented routes.
