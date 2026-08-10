import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import holdingsAsset from "@/assets/app-holdings.png.asset.json";
import ordersAsset from "@/assets/app-orders.png.asset.json";
import watchlistAsset from "@/assets/app-watchlist.png.asset.json";
import tradeAsset from "@/assets/app-trade.png.asset.json";

const screens = [
  {
    step: "01 — Holdings",
    title: "Every position, one ledger",
    body: "Quantity, average cost, live price and P&L in tabular numerals you can scan without squinting. Sort and filter without losing your place.",
    points: ["Aggregate summary on top", "Sort by value, P&L or weight", "Filter winners and losers"],
    to: "/holdings" as const,
    cta: "Open holdings",
    img: holdingsAsset.url,
    alt: "Tradium holdings table with quantity, average price, current value and P&L",
  },
  {
    step: "02 — Orders",
    title: "A full audit trail",
    body: "Every instruction you've sent, grouped by status. Working, executed, cancelled and rejected orders stay one click apart.",
    points: ["Status tabs with counts", "Timestamped to the second", "Instrument, type, qty and price"],
    to: "/orders" as const,
    cta: "Open orders",
    img: ordersAsset.url,
    alt: "Tradium orders page with status tabs and full order history",
  },
  {
    step: "03 — Watchlist",
    title: "Track what matters",
    body: "Prices, day change, volume and a sparkline per row. Add or remove instruments instantly — no dialogs, no reloads.",
    points: ["Instant search and add", "Sparkline trend per row", "Volume and day change side by side"],
    to: "/watchlist" as const,
    cta: "Open watchlist",
    img: watchlistAsset.url,
    alt: "Tradium watchlist with prices, day change, volume and sparklines",
  },
  {
    step: "04 — Execute",
    title: "The trade screen",
    body: "A large candlestick chart, key stats, the 52-week range, and an order panel that shows your estimated total before you commit.",
    points: ["Selectable time ranges", "Open, high, low, volume at a glance", "Estimated total before you confirm"],
    to: "/instrument/$symbol" as const,
    params: { symbol: "NVDA" },
    cta: "Open trade screen",
    img: tradeAsset.url,
    alt: "Tradium instrument detail page with candlestick chart and buy/sell order panel",
  },
];

function ShowcaseRow({
  screen,
  flipped,
}: {
  screen: (typeof screens)[number];
  flipped: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const s = screen;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
        flipped ? "lg:[&>figure]:order-first" : ""
      }`}
    >
      <div
        className={`${flipped ? "reveal-right" : "reveal-left"} ${
          inView ? "is-visible" : ""
        } max-w-lg`}
      >
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          {s.step}
        </p>
        <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">{s.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
        <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
          {s.points.map((p, i) => (
            <li
              key={p}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
              className={`reveal ${inView ? "is-visible" : ""} flex items-start gap-2.5 text-sm text-muted-foreground`}
            >
              <Check size={15} className="mt-0.5 shrink-0 text-accent" />
              {p}
            </li>
          ))}
        </ul>
        <Link
          to={s.to}
          params={s.params as never}
          className="story-link mt-6 inline-block text-sm font-semibold text-accent"
        >
          {s.cta}
        </Link>
      </div>
      <figure
        className={`${flipped ? "reveal-left" : "reveal-right"} ${
          inView ? "is-visible" : ""
        } overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-frame)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]`}
      >
        <img src={s.img} alt={s.alt} loading="lazy" className="block w-full dark:brightness-[0.85] dark:contrast-[0.95]" />
      </figure>
    </div>
  );
}

export function ScreenShowcase() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          The whole product
        </p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em]">
          Seven screens, one grammar.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Nothing to learn twice. The same typography, spacing and numerals carry from portfolio
          overview all the way down to a single fill.
        </p>
      </div>

      <div className="flex flex-col gap-24">
        {screens.map((s, i) => (
          <ShowcaseRow key={s.step} screen={s} flipped={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
