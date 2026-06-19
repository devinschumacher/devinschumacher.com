# Migrate devinschumacher.com To Cloudflare

Status: planning document based on local repo audit and public production checks.

> REFERENCE CODEX SESSION: codex resume 019edf0a-ad8d-73f3-9df0-96333c35f888

Source repo:

- Local path: `/Users/devin/dev/repos/devinschumacher.com`
- Git remote: `https://github.com/devinschumacher/devinschumacher.com.git`
- Public repo URL provided: `https://github.com/devinschumacher/devinschumacher.com`
- Vercel project URL provided: `https://vercel.com/serpcompany/devinschumacher-com`
- Current production domain: `https://devinschumacher.com`
- Current hosting: Vercel
- Current database: none
- Target hosting: Cloudflare Pages or Cloudflare Workers

## Executive Summary

`devinschumacher.com` is mostly a content site and should be much easier to move than `tools.serp.co` or `dlp.yt`. There is no application database and no native processing service.

The main migration considerations are:

- TinaCMS admin/build output.
- Tina Cloud token handling.
- PostHog `/ingest` rewrites.
- static export vs OpenNext Worker deployment.
- preserving blog/static page routing, sitemap, robots, and trailing slash behavior.

Recommended migration shape:

1. Prefer Cloudflare Pages static export if the Tina admin flow works without a same-origin dynamic API proxy.
2. Use Cloudflare Workers/OpenNext if PostHog rewrites and Tina proxy routes must remain dynamic on the same host.
3. Remove/rotate sensitive Tina token defaults before or during migration.
4. Cut over DNS only after `/admin`, sitemap, PostHog ingest, and top content pages are validated.

## Public Checks

Checked on 2026-06-20 JST:

- `https://devinschumacher.com/` is live.
- Response headers show `server: Vercel`.
- `https://devinschumacher.com/admin/` returns 200.
- `https://devinschumacher.com/api/tina/foo` returns 404.
- `https://devinschumacher.com/sitemap.xml` returns XML and is served by Vercel.
- The Vercel project overview page for `serpcompany/devinschumacher-com` is reachable.
- The GitHub repository page is public and shows `devinschumacher/devinschumacher.com`.

## Current Repo Facts

Local audit findings:

- Next.js App Router.
- Next.js `15.1.11`.
- React 19.
- TinaCMS.
- MDX/blog content under `content/blog`.
- PostHog client and server packages.
- No runtime database.
- No `docs/` directory existed before this file.
- Vercel project metadata exists in `.vercel`.
- `.vercel` is gitignored.
- Vercel project name: `devinschumacher-com`.
- Vercel root directory: repo root.
- Vercel node version: 22.x.
- App route surface:
  - 22 app page/route/sitemap/robots files.
- Existing GitHub Actions:
  - `.github/workflows/deploy.yml` deploys static output to GitHub Pages.
  - `.github/workflows/check-links.yml` checks markdown links.
- `next.config.mjs` switches to `output: "export"` when:
  - `GITHUB_ACTIONS === "true"`, or
  - `NEXT_OUTPUT === "export"`.
- `vercel.json` uses:
  - `npx tinacms build && npm run build`.
  - `outputDirectory: ".next"`.
  - rewrites for `/admin`.
  - a Vercel function entry for `app/admin/[[...index]]/route.ts`.
  - disabled Vercel Git deployment for `main`.

Note:

- The local audited app tree contains `app/api/tina/[...routes]/route.ts`.
- The Vercel config references `app/admin/[[...index]]/route.ts`, but that file was not present in the audited app tree. Confirm whether this is stale Vercel config or generated Tina output before migration.

## Current Stack

Application:

- Next.js App Router.
- MDX through `@next/mdx`.
- static/content-driven pages.
- TinaCMS admin/build.
- PostHog browser provider.
- PostHog Node client.
- Google Tag Manager configured in `site.config.ts`.
- static sitemap and robots generation.

Content:

- `content/blog`.
- `lib/blog.ts`.
- `lib/static-pages.ts`.
- project/brand/video/product data modules.

TinaCMS:

- `tina/config.ts`.
- `tinacms dev -c "next dev"` for local development.
- `tinacms build` outputs admin assets.
- Admin URL currently documented as a Vercel preview URL.
- Dynamic Tina proxy route:
  - `app/api/tina/[...routes]/route.ts`.
- The Tina proxy route returns 404 when static export mode is enabled.

Analytics:

- PostHog browser initialization.
- PostHog Node client.
- `next.config.mjs` rewrites:
  - `/ingest/static/:path*`
  - `/ingest/:path*`
  - `/ingest/flags`

Deployment:

- Vercel production.
- Separate GitHub Pages workflow exists and uploads `./out`.

## Current Environment Variables

Documented/discovered variables:

- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`
- `NEXT_PUBLIC_TINA_SEARCH_TOKEN`
- `NEXT_PUBLIC_TINA_PUBLIC_API_URL`
- `NEXT_PUBLIC_VERCEL_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `GITHUB_BRANCH`
- `VERCEL_GIT_COMMIT_REF`
- `HEAD`
- `GITHUB_ACTIONS`
- `NEXT_OUTPUT`

Security note:

- Tina-related token values appear in `.env.example` and as fallback values in `tina/config.ts`.
- Do not copy token values into docs or logs.
- Review which values are public client IDs and which are private tokens.
- Rotate private Tina tokens before or during migration.
- Prefer required runtime/build env vars over hardcoded token fallbacks.

## Cloudflare Deployment Options

### Option A: Cloudflare Pages Static Export

Use this if the production site can remain static and the Tina admin can work from generated static admin assets.

How it fits:

- `next.config.mjs` already supports static export via `NEXT_OUTPUT=export`.
- Existing GitHub Pages workflow already builds and uploads `./out`.
- No DB migration is needed.
- Tina proxy route intentionally returns 404 in static export mode.

Extra work:

- Ensure `tinacms build` runs before static export so `/admin` assets are available.
- Add Cloudflare Pages build config:
  - build command: `npm install && npx tinacms build && NEXT_OUTPUT=export npm run build`
  - output directory: `out`
- Add `_redirects` or Pages Functions for `/admin` if needed.
- Replace Vercel admin URL references in README.
- Handle PostHog `/ingest` rewrites through Cloudflare Pages redirects or a Pages Function because Next static export will not preserve server rewrites automatically.

Pros:

- Simplest Cloudflare migration.
- No Worker runtime complexity.
- No D1 required.

Cons:

- Tina API proxy remains unavailable.
- Any dynamic server behavior must be moved to Pages Functions or removed.

### Option B: Cloudflare Workers With OpenNext

Use this if same-origin dynamic behavior must remain.

How it fits:

- OpenNext can preserve Next.js App Router behavior better than static export.
- PostHog rewrites can remain closer to current Next config.
- Tina proxy route can remain available if desired.

Extra work:

- Add `@opennextjs/cloudflare`.
- Add `open-next.config.ts`.
- Add `wrangler.jsonc`.
- Add Node 24 CI.
- Validate Tina route and admin output under Worker runtime.

Pros:

- Closer to current Vercel runtime.
- Can preserve rewrites/API routes.

Cons:

- More moving parts than a static Cloudflare Pages deployment.
- Must validate TinaCMS and PostHog behavior in Worker runtime.

Recommendation:

- Start with Cloudflare Pages static export.
- Use a small Pages Function or `_redirects` file for PostHog `/ingest` if needed.
- Only use OpenNext Workers if Tina proxy or other dynamic behavior is required on production.

## Target Cloudflare Stack

Recommended target:

- Cloudflare Pages for static site.
- Production custom domain: `devinschumacher.com`.
- Build output: `out`.
- Optional Pages Functions or redirects for:
  - `/ingest/*`
  - `/admin/*`

Alternative target:

- Cloudflare Workers with OpenNext.
- Worker names:
  - production: `devinschumacher-com`
  - preview: `devinschumacher-com-preview`
- Production route:
  - `devinschumacher.com`

Secrets/build variables:

- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`
- `NEXT_PUBLIC_TINA_SEARCH_TOKEN`, if still needed.
- `NEXT_PUBLIC_TINA_PUBLIC_API_URL`, if used.
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_OUTPUT=export`, if Pages static export is used.

No D1 database is required.

## Migration Plan

### Phase 1: Baseline Audit

- Confirm current production behavior:
  - `/`
  - `/blog`
  - representative `/blog/{slug}` pages.
  - `/projects`
  - `/brands`
  - `/videos`
  - `/category`
  - `/category/{category}`
  - `/best/{slug}`
  - `/comparison/{slug}`
  - `/reviews/{slug}`
  - `/tools/character-counter`
  - `/legal/privacy`
  - `/legal/terms`
  - `/legal/dmca`
  - `/contact`
  - `/admin`
  - `/sitemap.xml`
  - `/robots.txt`
  - `/ingest/*`
  - `/api/tina/*`
- Capture current headers and redirects.
- Confirm whether production depends on the Tina proxy or only on the static admin bundle.
- Confirm DNS is managed in Cloudflare.

### Phase 2: Secret Cleanup

- Remove private token fallbacks from `tina/config.ts`.
- Replace `.env.example` token values with placeholders.
- Rotate Tina token if it has been committed or exposed.
- Review Vercel local env dumps and avoid copying those values.

### Phase 3: Cloudflare Pages Proof

- Add Cloudflare Pages build settings:
  - install command: `npm install`
  - build command: `npx tinacms build && NEXT_OUTPUT=export npm run build`
  - output directory: `out`
- Run local static export.
- Confirm `/admin` assets are in the output.
- Confirm sitemap and robots exist in output.
- Confirm all content routes generate.
- Confirm images are unoptimized/static.

### Phase 4: PostHog Routing

Current Next rewrites proxy PostHog through `/ingest`.

For Cloudflare Pages static export, choose one:

1. Use Cloudflare Pages `_redirects` to proxy `/ingest/*`.
2. Use a Pages Function to proxy `/ingest/*`.
3. Point PostHog directly to PostHog host and remove same-origin ingest.

Validate:

- `/ingest/static/*`
- `/ingest/*`
- `/ingest/flags`
- browser event delivery.

### Phase 5: Tina Admin

Validate:

- `/admin`.
- Tina Cloud login.
- editing an existing post.
- creating a draft/test post.
- saving content back to GitHub.
- preview behavior.

If static admin cannot work without Vercel:

- add a Pages Function/Worker route for the Tina proxy; or
- use OpenNext Workers instead of static Pages; or
- host admin separately and keep the public site static.

### Phase 6: GitHub Actions

Replace or add deployment workflow:

- Keep markdown link checks.
- Add Cloudflare Pages production deploy on `main`.
- Add Cloudflare preview deploy for branches/PRs.
- Required secrets:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_API_TOKEN`
- Optional:
  - Cloudflare Pages project name.

If using Workers instead of Pages:

- Add OpenNext build.
- Add Wrangler dry-runs.
- Add production/preview Worker deploy workflows.

### Phase 7: Preview Validation

Validate Cloudflare preview:

- homepage.
- top blog posts.
- category pages.
- project/brand/video pages.
- `/admin`.
- sitemap XML.
- robots.
- PostHog ingest.
- no broken static images.
- no broken MDX rendering.
- trailing slash behavior.
- canonical URLs use `https://devinschumacher.com`.

### Phase 8: Production Cutover

- Deploy Cloudflare production.
- Validate Pages/Worker production URL before DNS cutover.
- Attach `devinschumacher.com` custom domain.
- Replace Vercel DNS record in Cloudflare DNS.
- Re-test:
  - home.
  - blog.
  - admin.
  - sitemap.
  - robots.
  - PostHog.
  - Tina save flow.
  - Cloudflare logs.

### Phase 9: Retire Vercel

Only after Cloudflare production is stable:

- Remove Vercel domain assignment.
- Disconnect Vercel deployment.
- Remove `vercel.json` if no longer needed.
- Update README admin URL and deployment references.
- Remove Vercel-specific environment references.
- Keep Vercel available briefly for rollback.

## Validation Checklist

Static checks:

- `npm run build`
- `npx tinacms build`
- `NEXT_OUTPUT=export npm run build`
- `npm run check-links`, if runtime/time budget allows.

Production checks:

- Live site returns Cloudflare headers after cutover.
- `/admin` returns the Tina admin UI.
- `/api/tina/*` behavior is intentionally chosen and documented.
- PostHog events arrive.
- Sitemap is valid XML.
- Robots points to `https://devinschumacher.com/sitemap.xml`.
- Canonicals and OpenGraph URLs are correct.

## Rollback

Before Vercel removal:

- Rollback is DNS back to Vercel.
- Keep Vercel project and env vars intact until Cloudflare is stable.

After Vercel removal:

- Rollback requires redeploying the previous Vercel project or restoring the prior commit and DNS route.

## Open Decisions

- Should production use Cloudflare Pages static export or OpenNext Workers?
- Does `/admin` need dynamic same-origin routes, or is the static Tina admin bundle enough?
- Should `/api/tina/*` exist in production, or is the current 404 behavior acceptable?
- Should PostHog stay proxied through `/ingest`, or call PostHog directly?
- Should the repo remain under `devinschumacher` or move to `serpcompany` before Cloudflare deployment?

## Recommended Next Step

Start with Cloudflare Pages static export.

Before DNS cutover:

1. Remove/rotate private Tina token defaults.
2. Prove `npx tinacms build && NEXT_OUTPUT=export npm run build` produces a complete `out` directory.
3. Add PostHog proxy support through Cloudflare Pages redirects/functions.
4. Validate `/admin` and content editing.
