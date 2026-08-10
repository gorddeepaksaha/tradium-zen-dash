import { Reveal } from "@/hooks/use-in-view";
import {
  LayoutGrid,
  Activity,
  ScrollText,
  LineChart,
  Wallet,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Unified portfolio view",
    body: "Portfolio value, invested capital and available margin on one calm screen — no tab hunting.",
  },
  {
    icon: Activity,
    title: "Real-time P&L",
    body: "Every holding and intraday position marks to market continuously, with profit and loss colour-coded.",
  },
  {
    icon: ScrollText,
    title: "Order audit trail",
    body: "Working, executed, cancelled and rejected instructions stay grouped and one click apart.",
  },
  {
    icon: LineChart,
    title: "Watchlists with sparklines",
    body: "Price, day change, volume and a trend line per row. Add or drop instruments instantly.",
  },
  {
    icon: Wallet,
    title: "Margin & funds control",
    body: "Deposit, withdraw and watch margin utilisation against your balance in one panel.",
  },
  {
    icon: Zap,
    title: "Single-stock execution",
    body: "A large candlestick chart, key stats and an order pad that shows your estimated total first.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          Capabilities
        </p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em]">
          Everything you need to run the book.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Six tightly built surfaces instead of fifty half-finished ones.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {features.map((f, i) => (
          <Reveal
            as="article"
            key={f.title}
            delay={i * 80}
            className="group rounded-2xl border border-border bg-surface p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-soft)]"
          >
            <span className="mb-5 grid size-10 place-items-center rounded-lg border border-border bg-surface-sunken text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
              <f.icon size={18} strokeWidth={2} />
            </span>
            <h3 className="font-display text-[19px] font-semibold tracking-[-0.01em]">{f.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
