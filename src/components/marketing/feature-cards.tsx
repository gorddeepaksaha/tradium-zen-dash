const features = [
  {
    label: "01 — Overview",
    title: "Portfolio at a glance",
    body: "Start your day with portfolio value, today's P&L, and performance over time — all on one screen.",
  },
  {
    label: "02 — Manage",
    title: "Positions and funds",
    body: "Track open exposure, used margin, and available balance with the same precision across every view.",
  },
  {
    label: "03 — Execute",
    title: "Trade with clarity",
    body: "Large charts, clean stats, and a fast order panel give you the confidence to act quickly.",
  },
];

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
        {features.map((f, i) => (
          <article
            key={f.label}
            className="animate-entry rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
              {f.label}
            </p>
            <h3 className="font-display text-[22px] font-semibold tracking-[-0.01em]">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const proofs = [
  "Bank-grade encryption",
  "Segregated client funds",
  "SOC 2 Type II in progress",
  "40+ execution venues",
];

export function TrustRow() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-24">
      <div className="flex flex-wrap items-center justify-between gap-y-4 rounded-2xl border border-border bg-surface-sunken/60 px-8 py-6">
        {proofs.map((p) => (
          <span
            key={p}
            className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
          >
            <span className="size-1 rounded-full bg-accent" />
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
