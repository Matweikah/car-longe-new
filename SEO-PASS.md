# SEO pass ver22

Implemented on top of ver21:

- Removed brand icons near stock card prices.
- Added visible breadcrumbs to the stock listing page.
- Added JSON-LD `BreadcrumbList` and `ItemList`/`Product` data for the Next.js stock listing route.
- Added `app/sitemap.ts` with home, stock list, planned brand landing pages, and planned stock detail URLs.
- Expanded `robots.ts` for filter/query URLs and static HTML duplicates.
- Marked `inventory.html` as `noindex,follow` with canonical to `/avtomobili-v-nalichii` to avoid duplicate indexing when the static file is shipped together with the Next.js route.
- Improved stock page copy for commercial SEO and LSA terms.

Recommended next implementation step: create real internal `/avtomobili-v-nalichii/[slug]` detail pages and brand landing pages, then switch card hrefs from legacy URLs to internal Next.js routes.
