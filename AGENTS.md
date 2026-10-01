## Learned User Preferences

- Maximize machine-readable access to the site's public profile content. Preserve LLM text routes, JSON/feed/OpenAPI endpoints, Agent Skills discovery, AI plugin metadata, and browser-side WebMCP registration when updating the site. The user's request to restore the full version supersedes the previous minimal-exposure guidance.
- When changing site copy or profile fields, keep machine-readable surfaces in sync (LLM text routes, JSON endpoints, meta and keywords, structured data) with the same source data.
- Prefer straightforward professional titles and bios; do not frame LLM, ML systems, or researcher identity as the user's expertise unless explicitly asked.
- Do not surface a personal GitHub profile link on the public site, in JSON-LD personal links, or in LLM-oriented text exports; repository and deployment metadata may still mention GitHub.
- Keep advisors (Chenfeng Xu, Aditya Akella) low-key: no prominent sidebar cards, intro, news, or SEO description mentions. A single linked "Advised by" line in the UT Austin experience entry plus structured data is enough; the user has just started.
- For `robots.txt` Content Signals, keep the explicit explanatory notice and allow `ai-train=yes, search=yes, ai-input=yes` unless the user changes the policy.

## Learned Workspace Facts

- The site is an Astro static project; profile content, freshness dates, and many SEO-related fields are centralized in `src/data/profile.ts` and propagate to pages, feeds, and machine-readable routes.
- Generated or committed `dist/` output can lag `src/`; rebuild and deploy are needed for deployed artifacts to match source.
- The GitHub Pages upload must set `include-hidden-files: true` for `dist/` so `.well-known` discovery files and `.nojekyll` are published.
- ProfilePage and WebSite JSON-LD `dateModified` must use a full ISO 8601 datetime (consistent with `lastUpdatedISO`), not a date-only string, for valid Google Search rich results.
- Major TypeScript upgrades can be constrained by `typescript-eslint` peer ranges (e.g. TypeScript 6 may be incompatible until the lint stack supports it).
- Public traffic is now proxied through Cloudflare while GitHub Pages remains the static origin; use Cloudflare for custom response headers, content negotiation, and extensionless well-known routes that GitHub Pages cannot serve correctly.
- The source now includes agent-discovery surfaces such as `/openapi.json`, `/.well-known/agent-skills/index.json`, and browser-side WebMCP registration alongside the existing LLM-oriented routes.
- The Cloudflare Worker (`cloudflare/agent-discovery-worker.js`) is deployed by `.github/workflows/deploy-worker.yml` using the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. It also 301-redirects the bare domain `chijunsima.com` to `www` because GitHub Pages has no valid certificate for the apex (otherwise Cloudflare returns 526). Cloudflare account state can be inspected with the read-only `cloudflare-audit.yml` workflow.
- Run `npm run check` (SKILL.md copy sync plus worker smoke test) together with lint, typecheck, and build; CI runs all of them. When verifying locally, read real exit codes (do not pipe lint/test output through `tail`, which hides failures).
- Astro 7 collapses whitespace between the end of a text line and a following inline element in `.astro` templates; use an explicit `{' '}`. Cache-busting query strings are baked into asset URLs at build time; never rewrite stylesheet `href`s after parse (Safari flashes unstyled content).
