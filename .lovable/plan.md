# Dark mode + homepage motion polish

Two things: a real dark theme for the app (with a toggle), and a layer of tasteful scroll/hover animation on the landing page — same Machined Precision language, nothing bouncy.

## Dark mode

- Add a `.dark` token set in `src/styles.css` alongside the existing light `:root` tokens: near-black paper (`hsl(0 0% 7%)` background, `hsl(0 0% 10%)` surface, `hsl(0 0% 13%)` sunken), off-white ink, hairline borders as `hsl(0 0% 100% / 0.10)`, accent shifted slightly brighter (`hsl(221 100% 62%)`) so it stays legible, and P&L green/red lifted for contrast on dark. Chart colors get dark variants too.
- Theme is stored in `localStorage` and applied to `<html>`; respects `prefers-color-scheme` on first visit. Applied via a tiny inline script in the root route head so there is no light flash before hydration.
- A sun/moon toggle button lands in the app top nav (right side, next to the buying-power chip) and in the marketing nav.
- Sweep every screen for contrast: dashboard AI-insights panel (currently inverted with `bg-foreground`), status pills, the sunken cards, candlestick chart strokes, sparklines, ticker strip, and screenshot frames on the landing page — the light-mode app screenshots get a subtle border/scrim in dark so they don't glare.
- Default remains light; dark is opt-in per visitor.

## Homepage animations

- **Scroll reveal**: a small `useInView` hook drives a fade-and-rise on each section (feature grid, stats band, how-it-works, showcase rows, testimonials, pricing, FAQ) with per-item stagger. Runs once, respects `prefers-reduced-motion`.
- **Hero**: staggered entry for eyebrow → headline → subcopy → buttons, and the three mosaic screenshots settle in with a slight scale/offset drift plus a very slow parallax on scroll.
- **Stats band**: numerals count up when the band enters view (mono, tabular so no width jitter).
- **Feature grid + pricing**: hover lifts the card a hairline, brightens the border, and nudges the icon; Pro tier keeps its accent edge.
- **How it works**: the connector line draws left-to-right as the section enters, step numbers popping in behind it.
- **Showcase rows**: screenshot slides in from its side while the copy and checkpoints stagger in from the other.
- **Nav**: the marketing nav gains a border + blur once scrolled past the hero.
- **CTA**: a slow accent glow drift behind the closing block.

## Technical notes

- New: `src/hooks/use-in-view.ts`, `src/components/theme-toggle.tsx`, `src/lib/theme.ts` (localStorage + `<html>` class helper), and a `reveal` utility plus dark token block in `src/styles.css`.
- Animation is CSS-driven (existing `animate-entry` keyframe family + new `reveal` / `draw-line` keyframes) triggered by an `IntersectionObserver` class swap — no animation library added.
- All new colors go through tokens; no hardcoded `bg-white` / `text-black`.
- No backend, no data changes.
