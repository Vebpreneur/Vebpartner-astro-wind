# Vebpartner Programmatic Publishing Architecture

Date: 2026-09-28
Status: Approved design baseline
Repository: `Vebpreneur/Vebpartner-astro-wind`

## 1. Objective

Turn the existing AstroWind fork into the canonical publishing engine for Vebpartner's programmatic, SEO-first and agent-discoverable pages. The system must support hundreds of pages without creating separate applications or bespoke page implementations.

The first implementation milestone is intentionally narrow: establish the reusable architecture and publish one complete START reference page for PosBytz. No bulk publishing happens until that reference page has been visually reviewed and approved.

## 2. Locked platform decisions

- Framework: Astro 7.
- Base template: AstroWind.
- Styling: Tailwind CSS 4 and existing AstroWind design primitives.
- Language of public Vebpartner pages: English unless a future content record explicitly defines another locale.
- Canonical production repository: `Vebpartner-astro-wind`.
- Hosting target: Vercel.
- Canonical domain: `vebpartner.se`.
- GitHub is source of truth for production code and publishable content.
- Notion remains source of truth for project decisions, architecture notes and editorial planning.
- Static generation is preferred. Server-side infrastructure is not introduced unless a later feature requires it.

## 3. Information architecture

The site uses one domain and path-based verticals:

- `/start/` — business opportunities, partner programs, reseller/white-label opportunities and practical ways to start a business.
- `/build/` — resources and building blocks for creating digital products and businesses.
- `/services/` — service opportunities and commercially useful service models.
- `/learn/` — learning paths, certifications and educational resources.
- `/tools/` — useful tools and utilities.

Each vertical has an index route and generated detail routes. The architecture must make it possible to add a new content record without hand-building a new page.

## 4. Brand system

The common brand is Vebpartner. Each vertical is represented by the same wordmark plus a visually elevated qualifier: START, BUILD, SERVICES, LEARN or TOOLS.

Every detail page must expose a clear relationship to Vebpartner without overwhelming the page. Shared chrome includes:

- Vebpartner vertical wordmark.
- Breadcrumbs.
- Consistent header/navigation.
- Social links where configured.
- A restrained `Powered by Vebpartner` attribution.
- Small ecosystem links to approved related properties such as Vebstar, Anbudly and Identry.
- Related internal Vebpartner content when available.

The shared brand components are implemented once and consumed by all vertical templates.

## 5. Content model

Astro Content Collections are the publishing interface. Separate collections are maintained for `start`, `build`, `services`, `learn` and `tools`, while shared schema helpers enforce common fields.

Common fields include:

- `title`
- `slug`
- `description`
- `excerpt`
- `status`
- `publishedAt`
- `updatedAt`
- `lastVerifiedAt`
- `sourceUrl`
- `sourceLabel`
- `tags`
- `category`
- `featured`
- `draft`
- SEO title and description overrides when necessary
- optional image/social metadata
- related content references

Vertical-specific schema extensions are allowed only when they describe genuinely different domain data. Presentation details must not leak into content records.

## 6. Rendering architecture

Shared Vebpartner components live under `src/components/vebpartner/`. Initial component boundaries are:

- `Brand` — Vebpartner + vertical qualifier.
- `Breadcrumbs` — hierarchical navigation and structured breadcrumb data.
- `QuickFacts` — compact factual metadata.
- `SourceCard` — canonical external source/official program link.
- `LastVerified` — verification timestamp/status.
- `RelatedContent` — internal cross-linking.
- `SocialLinks` — Vebpartner social profiles.
- `EcosystemLinks` — approved sibling properties.
- `PoweredByVebpartner` — common attribution.

Layouts compose these primitives. Content pages must not duplicate common footer, brand, metadata or source-link markup.

Dynamic Astro routes use `getStaticPaths()` to generate pages from collections. Index pages enumerate the relevant collection and become the future basis for category/search/directory discovery.

## 7. START reference template

PosBytz is the first complete START reference page. It establishes the visual and semantic contract for later START pages.

The reference page should contain only information supported by the content record and official source. Its page structure is:

1. Brand/header and breadcrumbs.
2. Hero with opportunity name, concise value proposition and primary official-source CTA.
3. Quick facts.
4. Explanation of the opportunity/business model.
5. Key characteristics/benefits supported by source data.
6. Practical `How it works` section where supported.
7. Who the opportunity may suit, framed descriptively rather than as an unsupported recommendation.
8. Official source card and last-verified information.
9. Related Vebpartner content.
10. Social and ecosystem footer.

No invented pricing, economics, eligibility or commercial claims are allowed.

## 8. SEO architecture

SEO is a template responsibility, not manual work repeated per page. Each generated page must support:

- Unique `<title>` and meta description.
- Canonical URL.
- Open Graph/Twitter metadata.
- Semantic heading hierarchy.
- Internal links to its vertical and related pages.
- Breadcrumb structured data where applicable.
- Page-type-appropriate schema.org JSON-LD based only on factual content.
- Sitemap participation through the Astro deployment.
- Crawlable static HTML with meaningful content available without client-side JavaScript.

Programmatic scale must not create thin pages. A content record that lacks enough unique factual substance should remain draft rather than be published merely to increase page count.

## 9. Agent discovery

Pages are designed to be easy for search engines and machine agents to parse:

- Important facts are represented as text, not only imagery.
- The official source is explicitly identified.
- `lastVerifiedAt` is visible when available.
- Page purpose and entity/opportunity name are unambiguous in title, H1 and metadata.
- Structured data is factual and consistent with visible content.
- Internal relationships use ordinary crawlable links.
- The site avoids unnecessary client-side rendering for core content.

Any future `llms.txt`, feeds or machine-readable indexes are additive outputs of the same canonical content; they must not become a second content source.

## 10. Distribution and social layer

The publishing model must support later social automation without coupling social APIs to page rendering. A page/content record is canonical; social posts are downstream distribution artifacts.

The content model therefore exposes stable URL, title, excerpt, category, source and publish state that an external automation can consume. Facebook, LinkedIn, X or other integrations are not embedded in the Astro rendering layer.

## 11. Future directory/index model

The five vertical index routes are the first aggregation layer. As the collection grows, the same metadata can power:

- category pages;
- tag pages;
- search;
- cross-vertical discovery;
- a Vebpartner-wide index/directory;
- machine-readable feeds.

No separate directory database is introduced for the initial implementation.

## 12. Error handling and content integrity

Build-time validation is preferred. Invalid required frontmatter should fail the build rather than silently publish malformed pages.

External source links are treated as data. Missing required official sources prevent a page from being considered publication-ready. Related-page references should be validated where practical and omitted gracefully when empty.

Draft content is excluded from production route generation.

## 13. Testing and verification

Implementation is complete for the first milestone only when:

1. `npm run build` succeeds.
2. `npm run check` passes.
3. `/start/` builds successfully.
4. `/start/posbytz/` is generated from content rather than hard-coded as a bespoke page.
5. Core metadata, canonical URL and structured data render correctly.
6. Internal links and official-source links are valid in generated markup.
7. The page is visually checked on mobile and desktop.
8. Existing AstroWind functionality touched by the change has no regression.

## 14. Scope boundaries for milestone 1

Included:

- common content architecture;
- five vertical collection definitions;
- shared Vebpartner presentation primitives;
- vertical route foundations;
- SEO/agent-ready metadata foundation;
- one complete PosBytz START record and rendered reference page;
- build/check verification.

Explicitly excluded until the PosBytz reference is approved:

- bulk page generation;
- hundreds of imported opportunities/resources;
- search UI;
- a full directory product;
- CMS/admin dashboard;
- database;
- authentication;
- social-network API integration inside the website;
- BUILD, SERVICES, LEARN or TOOLS bespoke reference designs beyond the reusable route/content foundation.

## 15. Approval gate and next sequence

Milestone 1 ends at a reviewable PosBytz page. The user reviews that page, particularly on mobile. No bulk START publishing proceeds before approval.

After START approval, BUILD, SERVICES and LEARN each receive a reference page/template review before bulk publication in that vertical. TOOLS uses the same architecture and receives its own reference treatment when its first publishable tool is selected.

This keeps the system programmatic while preventing one unreviewed visual/content pattern from being multiplied across hundreds of URLs.
