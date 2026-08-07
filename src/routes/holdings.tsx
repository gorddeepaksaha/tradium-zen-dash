import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import {
  MetricReadout,
  PageHeader,
  PnlValue,
  fmtMoney,
  fmtPct,
  toneClass,
} from "@/components/market-ui";
import { holdingMetrics, holdings, portfolio } from "@/data/market";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/holdings")({
  head: () => ({
    meta: [
      { title: "Holdings — Tradium" },
      {
        name: "description",
        content:
          "Every stock you own with quantity, average buy price, current price, market value and P&L.",
      },
      { property: "og:title", content: "Holdings — Tradium" },
      {
        property: "og:description",
        content: "Sortable, filterable holdings ledger with an aggregate portfolio summary.",
      },
    ],
  }),
  component: HoldingsPage,
});

type SortKey = "symbol" | "qty" | "avgPrice" | "ltp" | "value" | "pnl" | "dayChangePct";

const columns: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "symbol", label: "Instrument" },
  { key: "qty", label: "Qty", numeric: true },
  { key: "avgPrice", label: "Avg price", numeric: true },
  { key: "ltp", label: "LTP", numeric: true },
  { key: "dayChangePct", label: "Day", numeric: true },
  { key: "value", label: "Market value", numeric: true },
  { key: "pnl", label: "P&L", numeric: true },
];

export default function HoldingsPage() {
  const [sort, setSort] = useState<SortKey>("value");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "gainers" | "losers">("all");

  const rows = useMemo(() => {
    const enriched = holdings.map((h) => ({ ...h, ...holdingMetrics(h) }));
    const filtered = enriched.filter((h) => {
      const q = query.trim().toLowerCase();
      const matches =
        !q || h.symbol.toLowerCase().includes(q) || h.name.toLowerCase().includes(q);
      const side = filter === "all" || (filter === "gainers" ? h.pnl >= 0 : h.pnl < 0);
      return matches && side;
    });
    return filtered.sort((a, b) => {
      const av = a[sort];
      const bv = b[sort];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return dir === "asc" ? cmp : -cmp;
    });
  }, [sort, dir, query, filter]);

  function toggle(key: SortKey) {
    if (key === sort) setDir(dir === "asc" ? "desc" : "asc");
    else {
      setSort(key);
      setDir(key === "symbol" ? "asc" : "desc");
    }
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <PageHeader
        eyebrow="Portfolio"
        title="Holdings"
        description="Long-term equity positions settled to your demat account."
      >
        <div className="grid grid-cols-2 gap-10 border-border pl-0 lg:grid-cols-4 lg:border-l lg:pl-12">
          <MetricReadout label="Invested" value={fmtMoney(portfolio.invested)} />
          <MetricReadout label="Current value" value={fmtMoney(portfolio.value)} />
          <MetricReadout
            label="Total P&L"
            value={fmtMoney(portfolio.pnl, { sign: true })}
            tone={portfolio.pnl}
            sub={fmtPct(portfolio.pnlPct)}
          />
          <MetricReadout
            label="Day's change"
            value={fmtMoney(portfolio.dayPnl, { sign: true })}
            tone={portfolio.dayPnl}
            sub={fmtPct(portfolio.dayPnlPct)}
          />
        </div>
      </PageHeader>

      <div className="animate-entry mb-4 flex flex-wrap items-center justify-between gap-3 [animation-delay:100ms]">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 shadow-xs">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by symbol or name"
            className="w-56 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-1 rounded-lg bg-secondary p-1">
          {(["all", "gainers", "losers"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md px-3 py-1 text-[11px] font-semibold capitalize transition-all",
                f === filter
                  ? "bg-surface shadow-sm ring-1 ring-black/5"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-entry overflow-hidden rounded-xl border border-border bg-surface shadow-xs [animation-delay:150ms]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface-sunken/60">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                    c.numeric && "text-right",
                  )}
                >
                  <button
                    onClick={() => toggle(c.key)}
                    className={cn(
                      "inline-flex items-center gap-1 transition-colors hover:text-foreground",
                      sort === c.key && "text-foreground",
                    )}
                  >
                    {c.label}
                    {sort === c.key &&
                      (dir === "asc" ? (
                        <ArrowUp className="size-3" />
                      ) : (
                        <ArrowDown className="size-3" />
                      ))}
                  </button>
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="num divide-y divide-border text-[13px]">
            {rows.map((h) => (
              <tr key={h.symbol} className="group transition-colors hover:bg-surface-sunken">
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-semibold">{h.symbol}</span>
                    <span className="font-sans text-[11px] text-muted-foreground">{h.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">{h.qty}</td>
                <td className="px-4 py-4 text-right">{fmtMoney(h.avgPrice)}</td>
                <td className="px-4 py-4 text-right">{fmtMoney(h.ltp)}</td>
                <td className={cn("px-4 py-4 text-right", toneClass(h.dayChangePct))}>
                  {fmtPct(h.dayChangePct)}
                </td>
                <td className="px-4 py-4 text-right">{fmtMoney(h.value)}</td>
                <td className="px-4 py-4 text-right">
                  <PnlValue value={h.pnl} pct={h.pnlPct} />
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
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center font-sans text-sm text-muted-foreground">
                  No holdings match that filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
