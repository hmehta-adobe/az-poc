# Consolidation Plan

**Name:** AZ Health Club HK Portal Consolidation
**Market:** Hong Kong
**Source sites:** 5 (azhealthclub-info.com.hk, crestor.com.hk, www.forxiga.com.hk, www.symbicort.com.hk, azhealthclub.com.hk)
**Generated:** 2026-05-26

## Steps
- [x] 0. Initialize
- [x] 1. Source Discovery
- [x] 2. Target Sitemap
- [x] 3. Source-to-Target Mapping

## Artifacts
- `brief.json` — user brief, source sites, target intent (providedSitemap = HK_sitemap.md)
- `source-inventory.json` — ~115 source URLs, all `provided-urls` discovery, locale per page
- `locale-pairs.json` — 10 Forxiga TC/SC locale-sibling pairs
- `target-sitemap.json` — ~120 target paths under azhealthclub.com.hk
- `source-target-map.json` — 1:1 source→target mapping with high-impact gaps

## Outcome
Every source URL from `HK_sitemap.md` maps to exactly one target path under `azhealthclub.com.hk`. Locale handling is Case A (source locales == target locales = `{tc, sc}`). High-impact gaps flagged for reviewer (alias dedup, slug spelling, trailing-slash consistency).
