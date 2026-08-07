import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MetricReadout, PageHeader, PnlValue, fmtMoney, fmtPct } from "@/components/market-ui";
import { positionPnl, positions } from "@/data/market";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/positions")({
  head: () => ({
    meta: [
      { title: "Positions — Tradium" },
      {
        name: "description",
        content:
          "Open and intraday positions with entry price, current price and live P&L for each leg.",
      },
      { property: "og:title", content: "Positions — Tradium" },
      {
        property: "og:description",
        content: "Track winning and losing legs at a glance with net intraday exposure.",
      },
    ],
  }),
  component: PositionsPage,
});

const tabs = ["ALL", "INTRADAY", "OVERNIGHT"] as const;

function PositionsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("ALL");

  const rows = useMemo(
    () =>
      positions
        .filter((p) => tab === "ALL" || p.product === tab)
        .map((p) => ({ ...p, ...positionPnl(p) })),
    [tab],
  );

  const net = rows.reduce((s, r) => s + r.pnl, 0);
  const winners = rows.filter((r) => r.pnl >= 0).length;
  const exposure = rows.reduce((s, r) => s + r.qty * r.ltp, 0);

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <PageHeader
        eyebrow="Live book"
        title="Positions"
        description="Everything currently exposed to the market, netted by product type."
      >
        <div className="grid grid-cols-2 gap-10 border-border pl-0 lg:grid-cols-3 lg:border-l lg:pl-12">
          <MetricReadout
            label="Net P&L"
            value={fmtMoney(net, { sign: true })}
            tone={net}
            sub={`${winners} of ${rows.length} in profit`}
          />
          <MetricReadout label="Gross exposure" value={fmtMoney(exposure)} />
          <MetricReadout label="Open legs" value={String(rows.length)} />
        </div>
      </PageHeader>

      <div className="animate-entry mb-4 flex gap-1 rounded-lg bg-secondary p-1 w-fit [animation-delay:100ms]">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-3 py-1 text-[11px] font-semibold capitalize transition-all",
              t === tab
                ? "bg-surface shadow-sm ring-1 ring-black/5"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="animate-entry overflow-hidden rounded-xl border border-border bg-surface shadow-xs [animation-delay:150ms]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface-sunken/60">
              {["Instrument", "Product", "Side", "Qty", "Entry", "LTP", "Change", "P&L"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                      i >= 3 && "text-right",
                    )}
                  >
                    {h}
                  </th>
                ),
              )}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="num divide-y divide-border text-[13px]">
            {rows.map((p) => (
              <tr
                key={`${p.symbol}-${p.product}-${p.side}`}
                className="group relative transition-colors hover:bg-surface-sunken"
              >
                <td className="relative px-4 py-4">
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 w-[2px]",
                      p.pnl >= 0 ? "bg-positive" : "bg-negative",
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-semibold">{p.symbol}</span>
                    <span className="font-sans text-[11px] text-muted-foreground">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 font-sans text-[11px] uppercase tracking-wide text-muted-foreground">
                  {p.product.toLowerCase()}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide",
                      p.side === "LONG" ? "bg-accent/10 text-accent" : "bg-secondary text-foreground",
                    )}
                  >
                    {p.side}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">{p.qty}</td>
                <td className="px-4 py-4 text-right">{fmtMoney(p.entry)}</td>
                <td className="px-4 py-4 text-right">{fmtMoney(p.ltp)}</td>
                <td
                  className={cn(
                    "px-4 py-4 text-right",
                    p.pnl >= 0 ? "text-positive" : "text-negative",
                  )}
                >
                  {fmtPct(p.pnlPct)}
                </td>
                <td className="px-4 py-4 text-right">
                  <PnlValue value={p.pnl} />
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    to="/instrument/$symbol"
                    params={{ symbol: p.symbol }}
                    className="rounded bg-foreground px-3 py-1 font-sans text-[11px] font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    Exit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
