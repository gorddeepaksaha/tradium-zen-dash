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
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          How it works
        </p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em]">
          Three steps to your first fill.
        </h2>
      </div>

      <div className="relative grid gap-12 md:grid-cols-3 lg:gap-16">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" />
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="animate-entry relative"
            style={{ animationDelay: `${i * 90}ms` }}
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
