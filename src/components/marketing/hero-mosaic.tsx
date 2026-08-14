import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import dashboardAsset from "@/assets/app-dashboard.png.asset.json";
import positionsAsset from "@/assets/app-positions.png.asset.json";
import fundsAsset from "@/assets/app-funds.png.asset.json";
import dashboardClip from "@/assets/preview-dashboard.mp4.asset.json";
import { PreviewMedia } from "@/components/marketing/preview-media";

const stats = [
  { label: "Average latency", value: "12ms" },
  { label: "Markets supported", value: "40+" },
  { label: "Uptime", value: "99.99%" },
];

function Frame({
  src,
  video,
  alt,
  className,
  offset = 0,
}: {
  src: string;
  video?: string | undefined;
  alt: string;
  className?: string;
  offset?: number;
}) {
  return (
    <figure
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      className={
        "group overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] " +
        (className ?? "")
      }
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-sunken/70 px-3 py-2">
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
      </div>
      <PreviewMedia video={video} poster={src} alt={alt} />
    </figure>
  );
}


export function HeroMosaic() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const drift = Math.min(scrollY, 700);

  return (
    <section className="relative mx-auto max-w-[1440px] overflow-hidden px-6 py-20 lg:px-24 lg:py-28">
      <div
        aria-hidden
        className="glow-drift pointer-events-none absolute -right-24 -top-32 -z-10 size-[520px] rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl">
          <span className="animate-entry mb-7 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-positive" />
            Trading infrastructure v2.0
          </span>
          <h1 className="animate-entry font-display text-5xl font-bold leading-[1.05] tracking-[-0.03em] [animation-delay:80ms] lg:text-[56px]">
            Capital management, <span className="text-accent">designed for focus.</span>
          </h1>
          <p className="animate-entry mt-6 text-lg leading-relaxed text-muted-foreground [animation-delay:160ms]">
            From portfolio overview to single-stock execution, Tradium gives you a consistent,
            precise interface that gets out of your way.
          </p>
          <div className="animate-entry mt-8 flex flex-wrap gap-4 [animation-delay:240ms]">
            <Link
              to="/dashboard"
              className="rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[var(--shadow-soft)]"
            >
              Start trading
            </Link>
            <Link
              to="/watchlist"
              className="rounded-lg border border-border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary"
            >
              Explore markets
            </Link>
          </div>
          <dl className="animate-entry mt-12 flex flex-wrap gap-10 border-t border-border pt-6 [animation-delay:320ms]">
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
            video={dashboardClip.url}
            alt="Tradium dashboard showing portfolio value, today's P&L and a performance chart switching time ranges"
            className="col-span-2"
            offset={drift * -0.03}
          />
          <Frame
            src={positionsAsset.url}
            alt="Tradium positions page with open positions and live P&L"
            offset={drift * -0.07}
          />
          <Frame
            src={fundsAsset.url}
            alt="Tradium funds page with available balance, used margin and transactions"
            offset={drift * -0.015}
          />
        </div>
      </div>
    </section>
  );
}
