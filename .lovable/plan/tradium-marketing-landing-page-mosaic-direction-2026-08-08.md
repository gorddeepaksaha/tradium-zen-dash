# Tradium. — Marketing Landing Page (Mosaic direction)

Build the mosaic template as the public landing page: split hero (headline + CTAs on the left, a mosaic of real product screenshots on the right), a live ticker strip, numbered feature cards, and a closing CTA — all in the existing "Machined Precision" light design language.

## Routing change

- `/` becomes the marketing landing page.
- The dashboard moves to `/dashboard` (same content, unchanged).
- App nav links update to point at `/dashboard`; the landing page gets its own marketing nav (Product / Markets / Institutional + "Log in" and "Open account") and a simpler marketing footer.
- The app shell (top nav + app footer) renders only on app routes, so the landing page is clean and full-bleed.

## Landing page sections

1. **Nav** — `Tradium.` wordmark, three quiet links, ghost "Log in", solid "Open account" (both route to `/dashboard`).
2. **Hero (split, desktop-first)** — status pill ("Trading infrastructure v2.0" with a live dot), a two-line display headline where the second line is accent blue, a short subhead, primary "Start trading" → `/dashboard` and secondary "View documentation", plus a hairline stat rail (average latency / markets supported / uptime) with mono numerals.
3. **Screenshot mosaic** — right side of the hero: one large dashboard capture on top, two smaller captures (Positions, Funds) beneath, in rounded, hairline-bordered, softly shadowed frames with a subtle browser-chrome edge. Slight scale-up on hover so it feels alive.
4. **Ticker strip** — full-width band of symbols with prices and colored day changes, marquee-scrolling continuously (pauses on hover, respects reduced-motion).
5. **Why Tradium — three numbered cards** — `01 — Overview`, `02 — Manage`, `03 — Execute`, each with a heading and one tight sentence.
6. **Product depth grid** (added for persuasion) — four alternating rows/cards pairing a real screenshot (Holdings, Orders, Watchlist, Trade) with a one-line benefit, so a visitor sees the whole product before signing up.
7. **Trust row** — short line of quiet proof points (bank-grade encryption, segregated funds, SOC 2 in progress, 40+ venues) as hairline-separated items, no fake logos.
8. **Closing CTA** — centered large headline, one supporting line, single solid "Get started" button → `/dashboard`.
9. **Marketing footer** — copyright, Terms / Privacy / Security, "Markets open" status dot.

## Screenshots

Real captures of the running app (dashboard, positions, funds, holdings, orders, watchlist, trade) are registered as CDN assets and imported in the landing page — no mockups, no embedding of the reference image itself. Each has descriptive alt text.

## Craft details

- Existing tokens only (`background`, `surface`, `accent`, hairline `border`, `positive`/`negative` for changes) — no hardcoded colors, no new palette.
- Inter Display for headlines, JetBrains Mono for every number.
- Staggered `animate-entry` reveals per section; generous vertical rhythm (~120px section spacing) at 1440px, collapsing to a single column on tablet/mobile.
- Landing route gets its own `head()` with a marketing title, description, og/twitter tags.

## Technical notes

- `src/routes/index.tsx` → new landing page; current dashboard content moves to `src/routes/dashboard.tsx` with its own `head()`.
- `src/routes/__root.tsx` conditionally renders `TopNav`/`SiteFooter` based on the active route (landing renders its own chrome).
- New components: `src/components/marketing/marketing-nav.tsx`, `hero-mosaic.tsx`, `ticker-strip.tsx`, `feature-cards.tsx`, `screen-showcase.tsx`, `closing-cta.tsx`, `marketing-footer.tsx`.
- Ticker data reuses `src/data/market.ts`; no backend work in this pass.

## Not in this pass

Real auth, real market data, video walkthrough, pricing page.
