const stats = [
  { value: "12ms", label: "Median order latency" },
  { value: "40+", label: "Execution venues" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "$2.4B", label: "Notional cleared" },
];

export function StatsBand() {
  return (
    <section className="border-y border-border bg-surface-sunken/50">
      <div className="animate-entry mx-auto grid max-w-[1440px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-24 lg:divide-x lg:divide-border">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2 lg:px-10 lg:first:pl-0 lg:last:pr-0">
            <span className="num text-[34px] leading-none tracking-[-0.02em]">{s.value}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
