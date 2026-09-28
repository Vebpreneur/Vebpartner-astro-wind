# Vebpartner Publishing Foundation — Implementation Status

Updated: 2026-09-28
Branch: `feat/vebpartner-publishing-foundation`

## Implemented

- Five typed Astro Content Collections: START, BUILD, SERVICES, LEARN and TOOLS.
- PosBytz as the first published START content record.
- Shared Vebpartner brand, breadcrumbs, Quick Facts, official source, verification date, related-content, ecosystem and attribution primitives.
- Shared Vebpartner content layout with canonical metadata and BreadcrumbList JSON-LD.
- Data-driven `/start/[slug]` route and `/start/` index.
- Empty-state foundations for BUILD, SERVICES, LEARN and TOOLS.
- Vebpartner site config, navigation, wordmark and compact network homepage.
- AstroWind demo blog disabled in site config.

## Approval gate

PosBytz remains the only complete detail page. Do not bulk-import content or create bespoke detail templates for the other verticals until the START reference page has been visually approved.

## Verification pending

GitHub Actions must pass `npm run check` and `npm run build` on the pull request. Any failures are fixed on this branch before it is considered preview-ready.
