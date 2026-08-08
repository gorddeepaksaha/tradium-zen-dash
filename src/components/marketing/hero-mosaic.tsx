import { Link } from "@tanstack/react-router";
import dashboardAsset from "@/assets/app-dashboard.png.asset.json";
import positionsAsset from "@/assets/app-positions.png.asset.json";
import fundsAsset from "@/assets/app-funds.png.asset.json";

const stats = [
  { label: "Average latency", value: "12ms" },
  { label: "Markets supported", value: "40+" },
  { label: "Uptime", value: "99.99%" },
];

function Frame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure
      className={
        "group overflow-hidden rounded-xl border border-border bg-surface shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.18)] " +
        (className ?? "")
      }
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-sunken/70 px-3 py-2">
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </figure>
  );
}

export function HeroMosaic() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-24 lg:py-28">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="animate-entry max-w-xl">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-positive" />
            Trading infrastructure v2.0
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.03em] lg:text-[56px]">
            Capital management,{" "}
            <span className="text-accent">designed for focus.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            From portfolio overview to single-stock execution, Tradium gives you a consistent,
            precise interface that gets out of your way.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/dashboard"
              className="rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start trading
            </Link>
            <Link
              to="/watchlist"
              className="rounded-lg border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Explore markets
            </Link>
          </div>
          <dl className="mt-12 flex flex-wrap gap-10 border-t border-border pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="num text-[28px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-entry grid grid-cols-2 gap-4 [animation-delay:120ms]">
          <Frame
            src={dashboardAsset.url}
            alt="Tradium dashboard showing portfolio value, today's P&L and a performance chart"
            className="col-span-2"
          />
          <Frame
            src={positionsAsset.url}
            alt="Tradium positions screen listing open intraday positions with live P&L"
          />
          <Frame
            src={fundsAsset.url}
            alt="Tradium funds screen with available balance, margin utilisation and transactions"
          />
        </div>
      </div>
    </section>
  );
}
