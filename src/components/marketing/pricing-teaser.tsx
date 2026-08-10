import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/hooks/use-in-view";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    note: "per month",
    points: ["Portfolio & holdings", "One watchlist", "Delayed market data"],
    cta: "Open account",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    note: "per month",
    points: ["Real-time data", "Unlimited watchlists", "Full order audit trail"],
    cta: "Start with Pro",
    featured: true,
  },
  {
    name: "Institutional",
    price: "Custom",
    note: "annual",
    points: ["Multi-account books", "Dedicated venues", "SLA & onboarding"],
    cta: "Talk to sales",
    featured: false,
  },
];

export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">Pricing</p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em]">
          Simple while you grow.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          No platform fee to start. Upgrade when real-time data matters.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {tiers.map((t, i) => (
          <Reveal
            as="article"
            key={t.name}
            delay={i * 90}
            className={`flex flex-col rounded-2xl border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
              t.featured
                ? "border-accent shadow-[var(--shadow-frame)] lg:-mt-3 lg:mb-3"
                : "border-border hover:border-border-strong"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[19px] font-semibold">{t.name}</h3>
              {t.featured && (
                <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-accent-foreground">
                  Popular
                </span>
              )}
            </div>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="num text-[36px] leading-none tracking-[-0.02em]">{t.price}</span>
              <span className="text-[12px] text-muted-foreground">{t.note}</span>
            </p>
            <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-6">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/dashboard"
              className={`mt-8 rounded-lg px-5 py-3 text-center text-sm font-semibold transition-opacity ${
                t.featured
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "border border-border hover:bg-secondary"
              }`}
            >
              {t.cta}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
