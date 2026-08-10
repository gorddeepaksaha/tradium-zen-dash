import { Reveal } from "@/hooks/use-in-view";
const quotes = [
  {
    quote:
      "The first terminal my team stopped complaining about. Numbers line up, nothing moves under your cursor.",
    name: "Anya Raghavan",
    role: "Head of Trading",
    firm: "Meridian Capital",
  },
  {
    quote:
      "We replaced three dashboards with Tradium. Positions and orders finally tell the same story.",
    name: "Daniel Whitfield",
    role: "Portfolio Manager",
    firm: "Northgate Partners",
  },
  {
    quote:
      "The execution screen is quick enough to trade from and calm enough to think in. Rare combination.",
    name: "Mei Lin Zhao",
    role: "Founder",
    firm: "Vector Systematic",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          In practice
        </p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em]">
          Built with the people who trade on it.
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {quotes.map((q, i) => (
          <Reveal
            as="figure"
            key={q.name}
            delay={i * 90}
            className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-soft)]"
          >
            <blockquote className="text-[15px] leading-relaxed">&ldquo;{q.quote}&rdquo;</blockquote>
            <figcaption className="mt-7 border-t border-border pt-5">
              <span className="block text-sm font-semibold">{q.name}</span>
              <span className="block text-[12px] text-muted-foreground">
                {q.role} · {q.firm}
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
