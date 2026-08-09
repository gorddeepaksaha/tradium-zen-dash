# Landing page: more substance beyond screenshots

Right now `/` is mostly hero mosaic + ticker + 3 cards + screenshot walkthrough + CTA. This adds real marketing content between those blocks, in the same Machined Precision language (existing tokens, Inter Display headings, JetBrains Mono numerals, hairline borders, staggered `animate-entry`).

## New sections (in order on the page)

1. **Logo / venue strip** (under the ticker) — quiet line: "Built on infrastructure trusted across 40+ execution venues", with wordmark-style text chips instead of fake brand logos.
2. **Feature grid — 6 capabilities** (replaces the thin 3-card block with a richer 3x2 grid): Unified portfolio view, Real-time P&L, Order audit trail, Watchlists with sparklines, Margin & funds control, Single-stock execution. Each: small icon (lucide), title, one tight sentence.
3. **Numbers band** — hairline-separated stat rail with mono numerals: 12ms median latency, 40+ venues, 99.99% uptime, $2.4B notional cleared. Subtle count-up on scroll into view.
4. **How it works — 3 steps** — Fund your account → Build your watchlist → Execute with confidence, as numbered steps on a horizontal connector line.
5. **Feature deep-dive keeps existing `ScreenShowcase`** but each row gains 2–3 bullet "checkpoints" under the paragraph so screenshots are explained, not just shown.
6. **Testimonials** — three quiet quote cards (name, role, firm) styled as hairline cards, no photos.
7. **Pricing teaser** — three tiers (Starter / Pro / Institutional) with price in mono, 3 bullets each, Pro highlighted with accent border; buttons go to `/dashboard`.
8. **FAQ** — 6 accordion items (shadcn Accordion) covering account opening, funding, data delay, fees, security, supported markets.
9. **Closing CTA** — keep as is, add a secondary "Talk to sales" ghost link.

## Craft details

- No hardcoded colors; `accent`, `positive`, `negative`, `surface`, `border` tokens only.
- Section rhythm ~120px at desktop, collapsing to single column below `lg`.
- All new copy is product-accurate to the seven built screens; stats/testimonials are clearly illustrative marketing copy, no invented brand logos.
- Add JSON-LD `FAQPage` to the route `head()` alongside the existing SoftwareApplication schema.

## Technical notes

- New components under `src/components/marketing/`: `venue-strip.tsx`, `feature-grid.tsx`, `stats-band.tsx`, `how-it-works.tsx`, `testimonials.tsx`, `pricing-teaser.tsx`, `faq.tsx`.
- `feature-cards.tsx`: `FeatureCards` superseded by `FeatureGrid`; `TrustRow` kept.
- `screen-showcase.tsx`: add `points: string[]` per screen and render as a hairline checklist.
- `src/routes/index.tsx`: compose the new order and extend `head()` scripts with the FAQ schema.
- Uses existing shadcn `accordion`; no new dependencies, no backend work.

## Not in this pass

Real pricing/checkout, contact form backend, blog, auth.
