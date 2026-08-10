import { useInView } from "@/hooks/use-in-view";

const steps = [
  {
    n: "01",
    title: "Fund your account",
    body: "Move capital in, see it settle, and track margin utilisation from the funds screen.",
  },
  {
    n: "02",
    title: "Build your watchlist",
    body: "Search instruments, pin what matters, and follow price, day change and volume live.",
  },
  {
    n: "03",
    title: "Execute with confidence",
    body: "Open the trade screen, read the chart and stats, and place the order with a clear total.",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <div className="reveal-wrapper mb-14 max-w-2xl">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          How it works
        </p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em]">
          Three steps to your first fill.
        </h2>
      </div>

      <div ref={ref} className="relative grid gap-12 md:grid-cols-3 lg:gap-16">
        <div
          aria-hidden
          className={`draw-line ${inView ? "is-visible" : ""} absolute left-0 right-0 top-5 hidden h-px bg-border md:block`}
        />
        {steps.map((s, i) => (
          <div
            key={s.n}
            style={{ transitionDelay: `${200 + i * 140}ms` }}
            className={`reveal ${inView ? "is-visible" : ""} relative`}
          >
            <span className="num relative z-10 mb-6 grid size-10 place-items-center rounded-full border border-border bg-background text-[12px] font-semibold text-accent">
              {s.n}
            </span>
            <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em]">{s.title}</h3>
            <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
