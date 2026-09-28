# Vebpartner Publishing Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the reusable Vebpartner publishing foundation and one complete data-driven START reference page for PosBytz.

**Architecture:** Extend AstroWind rather than replacing it. Astro Content Collections hold canonical records, shared Vebpartner components render common identity/facts/sources, and static routes generate vertical indexes and detail pages. PosBytz is the only complete content page in milestone 1; all bulk publishing waits for visual approval.

**Tech Stack:** Astro 7, Tailwind CSS 4, TypeScript 5.9, Astro Content Collections, AstroWind, static generation.

**Spec:** `docs/superpowers/specs/2026-09-28-vebpartner-programmatic-architecture-design.md`

## Global Constraints

- Canonical production repo is `Vebpreneur/Vebpartner-astro-wind`.
- Public Vebpartner pages are English unless a future content record explicitly defines another locale.
- Canonical production domain is `https://vebpartner.se`.
- Preserve AstroWind as the visual/design-system foundation; do not introduce a second UI framework.
- Static generation is the default; no database, auth, CMS or server runtime in milestone 1.
- Core content must render as crawlable HTML without client-side JavaScript.
- Draft records must not generate production detail routes.
- No unsupported pricing, eligibility, economics or commercial claims.
- No bulk publishing before the PosBytz START reference page is approved.

## Review Focus

- A draft content record must not produce a public static detail route.
- A publishable record missing its required official source must fail schema/build validation rather than silently publish.
- Empty related-content data must render no broken/empty related section.
- Canonical URLs and breadcrumb JSON-LD must resolve to `vebpartner.se` paths rather than preview/deployment hosts.
- Unknown/unsupported vertical identifiers must not silently render the wrong Vebpartner qualifier.

---

## File Structure

**Create**
- `src/data/start/posbytz.md` — first canonical START record.
- `src/data/build/.gitkeep`, `src/data/services/.gitkeep`, `src/data/learn/.gitkeep`, `src/data/tools/.gitkeep` — vertical foundations until their reference content is approved.
- `src/components/vebpartner/Brand.astro` — Vebpartner + vertical qualifier.
- `src/components/vebpartner/Breadcrumbs.astro` — visual breadcrumbs.
- `src/components/vebpartner/QuickFacts.astro` — factual key/value grid.
- `src/components/vebpartner/SourceCard.astro` — official source CTA/card.
- `src/components/vebpartner/LastVerified.astro` — verification date display.
- `src/components/vebpartner/RelatedContent.astro` — optional internal links.
- `src/components/vebpartner/SocialLinks.astro` — configured Vebpartner profiles.
- `src/components/vebpartner/EcosystemLinks.astro` — approved sibling properties.
- `src/components/vebpartner/PoweredByVebpartner.astro` — publisher attribution.
- `src/layouts/VebpartnerContentLayout.astro` — shared Vebpartner detail shell.
- `src/pages/start/index.astro` — START index.
- `src/pages/start/[slug].astro` — data-driven START details.
- `src/pages/build/index.astro`, `src/pages/services/index.astro`, `src/pages/learn/index.astro`, `src/pages/tools/index.astro` — vertical foundations.

**Modify**
- `src/content.config.ts` — define the five collections and shared schemas.
- `src/config.yaml` — Vebpartner site identity/domain/metadata.
- `src/navigation.ts` — Vebpartner vertical navigation/footer links.
- `src/pages/index.astro` — remove AstroWind demo identity and provide a restrained Vebpartner network entry page using existing widgets.

## Task 1: Content contracts and validation

**Files:** `src/content.config.ts`, `src/data/start/posbytz.md`, empty vertical data directories.

**Interfaces:**
- Produces collections named exactly `start`, `build`, `services`, `learn`, `tools`.
- START entries expose `title`, `slug`, `description`, `excerpt`, `status`, `publishedAt`, `updatedAt?`, `lastVerifiedAt`, `sourceUrl`, `sourceLabel`, `tags`, `category`, `featured`, `draft`, `seoTitle?`, `seoDescription?`, `related?`, and START-specific opportunity facts.

- [ ] Extend `src/content.config.ts` with a shared schema and five `glob()` collections; require a valid URL for `sourceUrl` on publishable records and constrain vertical/status values.
- [ ] Add PosBytz as the only complete START record, using only claims already approved for the reference concept: white-label platform, own pricing, customer relationship ownership, recurring-revenue potential, and provider-managed hosting/updates; mark the official partner page as source and verification date `2026-09-28`.
- [ ] Add empty directories for the other four collections without fabricated records.
- [ ] Run `npm run check`; expected result: schema/type checks pass.
- [ ] Commit: `feat: add Vebpartner content collections`.

## Task 2: Shared Vebpartner presentation primitives

**Files:** create the nine files under `src/components/vebpartner/` listed above.

**Interfaces:**
- `Brand.astro` consumes `vertical: 'START' | 'BUILD' | 'SERVICES' | 'LEARN' | 'TOOLS'`.
- `Breadcrumbs.astro` consumes ordered `{ label: string; href?: string }[]`.
- `QuickFacts.astro` consumes `{ label: string; value: string }[]`.
- `SourceCard.astro` consumes `label`, `url`, optional `description`.
- `LastVerified.astro` consumes a `Date`.
- `RelatedContent.astro` consumes links and renders nothing when the array is empty.

- [ ] Implement `Brand.astro` with an exhaustive vertical mapping so unsupported values are rejected by TypeScript.
- [ ] Implement breadcrumbs as semantic `<nav aria-label="Breadcrumb">` with ordinary links.
- [ ] Implement Quick Facts as semantic definition-list markup rather than presentation-only cards.
- [ ] Implement official source and last-verified primitives with accessible external-link behavior.
- [ ] Implement RelatedContent with an empty-array guard; verify it emits no section when empty.
- [ ] Implement social, ecosystem and Powered-by primitives as small shared footer elements; keep URLs/config centralized within the component or existing navigation config rather than duplicating them across pages.
- [ ] Run `npm run check`; expected result: PASS.
- [ ] Commit: `feat: add shared Vebpartner content components`.

## Task 3: Shared layout, metadata and structured-data contract

**Files:** create `src/layouts/VebpartnerContentLayout.astro`; reuse `src/components/common/StructuredData.astro` and existing PageLayout metadata support.

**Interfaces:**
- Layout consumes `vertical`, `title`, `description`, `canonicalPath`, breadcrumbs, optional structured-data objects and slots for page body/related content.
- Canonical URL is always built from `https://vebpartner.se` + `canonicalPath`, never `Astro.url.host`.

- [ ] Implement the shared layout on top of `PageLayout.astro`, preserving AstroWind header/footer infrastructure while inserting Vebpartner identity and content chrome.
- [ ] Build metadata from title/description/canonical path and pass through the existing `MetaData` interface.
- [ ] Emit BreadcrumbList JSON-LD through the existing `StructuredData.astro` component; use the canonical domain for every item URL.
- [ ] Include social/ecosystem/publisher primitives once in the layout rather than in each route.
- [ ] Run `npm run check`; expected result: PASS.
- [ ] Commit: `feat: add Vebpartner content layout`.

## Task 4: START route engine and PosBytz reference page

**Files:** create `src/pages/start/index.astro`, `src/pages/start/[slug].astro`.

**Interfaces:**
- `[slug].astro` reads the `start` collection, filters drafts/non-published records, and returns static paths using each record's `slug`.
- Detail page consumes the common layout/components; the body comes from the content record rather than hard-coded provider-specific markup.

- [ ] Implement `getStaticPaths()` so only non-draft published START entries generate routes; verify PosBytz resolves to `/start/posbytz/`.
- [ ] Render PosBytz with Brand/header, breadcrumbs, hero, Quick Facts, explanatory content, supported opportunity characteristics, SourceCard, LastVerified and optional RelatedContent.
- [ ] Emit page-appropriate JSON-LD containing only facts visible on the page; do not label PosBytz with unsupported schema properties.
- [ ] Implement `/start/` as a simple collection-driven index that links to published START records and contains no separate hard-coded listing source.
- [ ] Verify an empty `related` array does not create a blank section.
- [ ] Run `npm run check` and `npm run build`; expected result: both PASS and static output includes `/start/index.html` and `/start/posbytz/index.html` (or Astro's equivalent configured output path).
- [ ] Commit: `feat: add START publishing engine and PosBytz reference`.

## Task 5: Remaining vertical foundations

**Files:** create index routes for `build`, `services`, `learn`, `tools`.

**Interfaces:** each index reads only its own collection and uses the common Vebpartner brand/layout primitives. No bespoke detail template is approved yet.

- [ ] Add a BUILD index that renders a clear empty state when no records exist.
- [ ] Add SERVICES, LEARN and TOOLS indexes with the same collection-driven empty-state behavior and their correct brand qualifiers.
- [ ] Do not add detail routes or invented example records for these verticals.
- [ ] Run `npm run check` and `npm run build`; expected result: PASS and all four index URLs are generated.
- [ ] Commit: `feat: scaffold Vebpartner vertical indexes`.

## Task 6: Global Vebpartner identity and navigation

**Files:** modify `src/config.yaml`, `src/navigation.ts`, `src/pages/index.astro`.

**Interfaces:** global site config identifies `Vebpartner` and canonical `https://vebpartner.se`; primary navigation links to the five vertical roots.

- [ ] Replace AstroWind demo site name/domain/default metadata with Vebpartner values without deleting reusable AstroWind infrastructure.
- [ ] Replace demo navigation with START, BUILD, SERVICES, LEARN and TOOLS plus only intentionally retained global actions.
- [ ] Replace the AstroWind demo homepage content with a compact Vebpartner network entry page assembled from existing AstroWind widgets; avoid designing the future full homepage beyond what is required to remove template/demo identity.
- [ ] Ensure Organization/WebSite structured data on the homepage now describes Vebpartner and uses only configured factual values.
- [ ] Run `npm run check` and `npm run build`; expected result: PASS with no remaining AstroWind marketing copy in the public homepage/navigation.
- [ ] Commit: `feat: apply Vebpartner global identity`.

## Task 7: Milestone verification and approval artifact

**Files:** no production code unless verification exposes a defect.

**Interfaces:** milestone output is a buildable branch ready for Vercel preview and mobile review.

- [ ] Run `npm run check`; expected result: PASS with zero Astro/ESLint/Prettier errors.
- [ ] Run `npm run build`; expected result: PASS.
- [ ] Inspect generated markup for `/start/posbytz/`: title, description, canonical, H1, official source, last-verified text, breadcrumb JSON-LD and ordinary internal links are present.
- [ ] Confirm the five vertical index routes build and draft content is excluded from generated detail paths.
- [ ] Perform browser visual verification on desktop and mobile once a preview/dev server is available; specifically check navigation, PosBytz hierarchy, source CTA, dark/light behavior and mobile overflow.
- [ ] Record any required fixes and repeat check/build after fixes.
- [ ] Commit final verification fixes, if any, with `fix: verify Vebpartner publishing foundation`.

## Approval Gate

Stop after Task 7. Present the PosBytz preview to the user for mobile review. Do not bulk-import START records and do not create bespoke BUILD/SERVICES/LEARN detail templates until the user approves the START reference page.
