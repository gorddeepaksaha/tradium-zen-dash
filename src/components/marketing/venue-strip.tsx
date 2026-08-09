const venues = ["NYSE", "NASDAQ", "CBOE", "LSE", "EUREX", "TSX", "SGX"];

export function VenueStrip() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-20 lg:px-24 lg:pt-24">
      <div className="animate-entry flex flex-col items-center gap-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Built on infrastructure trusted across 40+ execution venues
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {venues.map((v) => (
            <span
              key={v}
              className="num rounded-md border border-border bg-surface px-4 py-2 text-[12px] font-semibold tracking-[0.08em] text-muted-foreground"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
