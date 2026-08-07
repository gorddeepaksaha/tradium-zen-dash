# Tradium. — Premium Trading Dashboard

Building the "Machined Precision" direction: light, paper-white surfaces, near-black ink, one blue accent, hairline borders, tabular monospace numerals, restrained entry motion. Top horizontal navigation — no icon sidebar.

## Design system

- Tokens copied verbatim from the chosen direction into `src/styles.css`: background `hsl(60 10% 98%)`, foreground `hsl(0 0% 7%)`, muted, accent `hsl(221 100% 50%)`, hairline border `hsl(0 0% 0% / 0.08)`, positive `hsl(142 76% 36%)`, negative `hsl(0 84% 60%)`.
- Fonts: Inter (UI), Inter Display (headings), JetBrains Mono (all numbers), loaded via `<link>` in the root route.
- Semantic tokens only — no hardcoded color classes. Green/red reserved strictly for P&L.
- Shared entry animation utility (`slide-up`, expo easing) with small staggered delays.

## Shared shell

Root layout gets the sticky top nav: `Tradium.` wordmark, links to Dashboard / Holdings / Positions / Orders / Watchlist / Funds with active states, and a right-side buying-power + avatar chip. Shared footer with legal links and a "Markets Open" status dot.

## Screens

1. **Dashboard (`/`)** — greeting with date, four metric readouts (portfolio value, today's P&L, total investment, available margin) in the header rail, performance chart with 1D/1W/1M/1Y/ALL pills, top-holdings table with hover Trade action, watchlist card with sparklines, recent orders card, and a dark "AI Insights — coming soon" panel.
2. **Holdings (`/holdings`)** — aggregate summary strip (invested, current value, total P&L, day change), then full table: instrument, qty, avg price, LTP, value, P&L absolute + %, with sortable column headers and a search/filter row.
3. **Positions (`/positions`)** — open and intraday positions with entry price, LTP, qty, P&L; profitable vs losing rows distinguished by numeral color plus a subtle left edge marker. Net P&L summary on top.
4. **Orders (`/orders`)** — full order history table (instrument, side, type, qty, price, status pill, timestamp) with status tabs: All / Open / Executed / Cancelled / Rejected.
5. **Watchlist (`/watchlist`)** — expanded rows with price, day change absolute + %, volume, sparkline; add-instrument input with symbol search and per-row remove.
6. **Funds (`/funds`)** — available balance, used margin, total balance readouts, Add funds / Withdraw actions with dialogs, margin utilisation bar, and a transaction history table.
7. **Instrument detail (`/instrument/$symbol`)** — the most active screen: price header with day change and market status, large candlestick chart with time-range pills, key stats grid (open/high/low/prev close/volume/52-week range with position marker), and a sticky Buy/Sell order panel (side toggle, order type, qty, limit price, estimated total, place-order button).

## Technical notes

- TanStack Router file routes; each route gets its own `head()` with unique title/description/og tags.
- Charts via Recharts (area chart for performance, custom candlestick rendering for the instrument page).
- All data is typed mock data in `src/data/` (instruments, holdings, positions, orders, watchlist, funds, price series) — no backend in this pass. Interactions (sorting, filtering, tabs, add/remove watchlist, order form, add/withdraw funds) are client state so the app feels live.
- Reusable presentation components: `TopNav`, `SiteFooter`, `MetricReadout`, `RangePills`, `DataTable` primitives, `StatusPill`, `Sparkline`, `PnlValue`, `PageHeader`.
- Desktop-first at 1440px, gracefully collapsing to tablet/mobile.

## Not in this pass

Real market data, authentication, order execution, and functional AI insights (placeholder panel only).
