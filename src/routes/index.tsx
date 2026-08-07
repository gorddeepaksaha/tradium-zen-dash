import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MetricReadout,
  PnlValue,
  RangePills,
  SectionHeading,
  Sparkline,
  StatusPill,
  Sunken,
  fmtMoney,
  fmtPct,
  sparkTone,
} from "@/components/market-ui";
import { PerformanceChart } from "@/components/performance-chart";
import {
  buildSeries,
  defaultWatchlist,
  findInstrument,
  holdingMetrics,
  holdings,
  orders,
  portfolio,
  ranges,
  sparkPoints,
  type Range,
} from "@/data/market";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Tradium" },
      {
        name: "description",
        content:
          "Your Tradium dashboard: portfolio value, today's P&L, performance over time, watchlist, holdings and recent orders.",
      },
      { property: "og:title", content: "Dashboard — Tradium" },
      {
        property: "og:description",
        content: "Portfolio value, P&L, performance, watchlist and recent orders in one calm view.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [range, setRange] = useState<Range>("1W");
  const series = useMemo(() => buildSeries(7, portfolio.value, range), [range]);
  const topHoldings = useMemo(
    () => [...holdings].sort((a, b) => b.qty * b.ltp - a.qty * a.ltp).slice(0, 4),
    [],
  );
  const watch = defaultWatchlist.slice(0, 4);

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <header className="animate-entry mb-10 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="mb-1 text-sm font-medium text-muted-foreground">Tuesday, 24 October</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight">
            Good morning, Elena.
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-10 border-border pl-0 lg:grid-cols-4 lg:border-l lg:pl-12">
          <MetricReadout label="Portfolio value" value={fmtMoney(portfolio.value)} />
          <MetricReadout
            label="Today's P&L"
            value={fmtMoney(portfolio.dayPnl, { sign: true })}
            tone={portfolio.dayPnl}
            sub={fmtPct(portfolio.dayPnlPct)}
          />
          <MetricReadout label="Total investment" value={fmtMoney(portfolio.invested)} />
          <MetricReadout label="Available margin" value={fmtMoney(142_084.5)} />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 space-y-8 lg:col-span-8">
          <Sunken className="animate-entry [animation-delay:100ms]">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold">Performance over time</h2>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Net asset value, {range === "ALL" ? "since inception" : `last ${range}`}
                </p>
              </div>
              <RangePills values={ranges} active={range} onChange={setRange} />
            </div>
            <PerformanceChart data={series} up={portfolio.pnl >= 0} />
          </Sunken>

          <section className="animate-entry [animation-delay:200ms]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight">Top holdings</h2>
              <Link to="/holdings" className="text-sm font-semibold text-accent hover:underline">
                View all holdings
              </Link>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-surface-sunken/60">
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Instrument
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Avg price
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      LTP
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      P&L
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="num divide-y divide-border text-[13px]">
                  {topHoldings.map((h) => {
                    const m = holdingMetrics(h);
                    return (
                      <tr key={h.symbol} className="group transition-colors hover:bg-surface-sunken">
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-sans text-sm font-semibold">{h.symbol}</span>
                            <span className="font-sans text-[11px] text-muted-foreground">
                              {h.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">{h.qty}</td>
                        <td className="px-4 py-4 text-right">{fmtMoney(h.avgPrice)}</td>
                        <td className="px-4 py-4 text-right">{fmtMoney(h.ltp)}</td>
                        <td className="px-4 py-4 text-right">
                          <PnlValue value={m.pnl} pct={m.pnlPct} />
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Link
                            to="/instrument/$symbol"
                            params={{ symbol: h.symbol }}
                            className="rounded bg-foreground px-3 py-1 font-sans text-[11px] font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                          >
                            Trade
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="col-span-12 space-y-8 lg:col-span-4">
          <Sunken className="animate-entry [animation-delay:300ms] p-5">
            <SectionHeading
              title="Watchlist"
              action={
                <Link
                  to="/watchlist"
                  className="text-[11px] font-semibold text-accent hover:underline"
                >
                  Manage
                </Link>
              }
            />
            <div className="space-y-1">
              {watch.map((w, i) => {
                const ins = findInstrument(w.symbol)!;
                const up = ins.changePct >= 0;
                return (
                  <Link
                    key={w.symbol}
                    to="/instrument/$symbol"
                    params={{ symbol: w.symbol }}
                    className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-surface-sunken"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{w.symbol}</span>
                      <span className="num text-[10px] text-muted-foreground">
                        {fmtMoney(ins.price)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkline points={sparkPoints(i + 3, up)} up={up} />
                      <span className={`num text-[13px] ${sparkTone(up)}`}>
                        {fmtPct(ins.changePct)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Sunken>

          <Sunken className="animate-entry [animation-delay:400ms] p-5">
            <SectionHeading
              title="Recent orders"
              action={
                <Link to="/orders" className="text-[11px] font-semibold text-accent hover:underline">
                  All orders
                </Link>
              }
            />
            <div className="space-y-4">
              {orders.slice(0, 4).map((o) => (
                <div key={o.id} className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold">
                      {o.side === "BUY" ? "Buy" : "Sell"} {o.symbol}
                    </span>
                    <span className="num text-[10px] text-muted-foreground">
                      {o.qty} × {fmtMoney(o.price)} · {o.time}
                    </span>
                  </div>
                  <StatusPill status={o.status} />
                </div>
              ))}
            </div>
          </Sunken>

          <section className="animate-entry relative overflow-hidden rounded-xl bg-foreground p-6 text-background [animation-delay:500ms]">
            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-accent" />
                <h2 className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  AI insights
                </h2>
              </div>
              <p className="font-display mb-4 text-lg font-bold leading-tight">
                Real-time sentiment analysis and pattern recognition.
              </p>
              <span className="inline-block rounded-full border border-background/20 bg-background/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                Coming soon
              </span>
            </div>
            <div className="absolute right-0 top-0 size-32 -translate-y-10 translate-x-10 rounded-full bg-accent/20 blur-3xl" />
          </section>
        </div>
      </div>
    </main>
  );
}
