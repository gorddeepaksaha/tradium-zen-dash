import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MetricReadout, PageHeader, StatusPill, fmtMoney } from "@/components/market-ui";
import { orders, type OrderStatus } from "@/data/market";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Tradium" },
      {
        name: "description",
        content:
          "Complete order history with instrument, side, type, quantity, price, status and timestamp.",
      },
      { property: "og:title", content: "Orders — Tradium" },
      {
        property: "og:description",
        content: "Filter your order book by executed, open, cancelled or rejected status.",
      },
    ],
  }),
  component: OrdersPage,
});

const tabs = ["ALL", "OPEN", "EXECUTED", "CANCELLED", "REJECTED"] as const;

function OrdersPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("ALL");

  const rows = useMemo(
    () => orders.filter((o) => tab === "ALL" || o.status === (tab as OrderStatus)),
    [tab],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: orders.length };
    for (const o of orders) c[o.status] = (c[o.status] ?? 0) + 1;
    return c;
  }, []);

  const turnover = rows.reduce((s, o) => s + o.filled * o.price, 0);

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <PageHeader
        eyebrow="Order book"
        title="Orders"
        description="Every instruction sent to the exchange today and yesterday."
      >
        <div className="grid grid-cols-2 gap-10 border-border pl-0 lg:grid-cols-3 lg:border-l lg:pl-12">
          <MetricReadout label="Orders shown" value={String(rows.length)} />
          <MetricReadout label="Executed turnover" value={fmtMoney(turnover)} />
          <MetricReadout label="Working orders" value={String(counts["OPEN"] ?? 0)} />
        </div>
      </PageHeader>

      <div className="animate-entry mb-4 flex w-fit gap-1 rounded-lg bg-secondary p-1 [animation-delay:100ms]">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1 text-[11px] font-semibold capitalize transition-all",
              t === tab
                ? "bg-surface shadow-sm ring-1 ring-black/5"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.toLowerCase()}
            <span className="num text-[10px] opacity-60">{counts[t] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="animate-entry overflow-hidden rounded-xl border border-border bg-surface shadow-xs [animation-delay:150ms]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface-sunken/60">
              {["Order ID", "Instrument", "Side", "Type", "Qty", "Price", "Status", "Time"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                      (i === 4 || i === 5 || i === 7) && "text-right",
                    )}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="num divide-y divide-border text-[13px]">
            {rows.map((o) => (
              <tr key={o.id} className="transition-colors hover:bg-surface-sunken">
                <td className="px-4 py-4 text-[11px] text-muted-foreground">{o.id}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-semibold">{o.symbol}</span>
                    <span className="font-sans text-[11px] text-muted-foreground">{o.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide",
                      o.side === "BUY" ? "bg-accent/10 text-accent" : "bg-secondary text-foreground",
                    )}
                  >
                    {o.side}
                  </span>
                </td>
                <td className="px-4 py-4 font-sans text-[11px] uppercase tracking-wide text-muted-foreground">
                  {o.type.toLowerCase()}
                </td>
                <td className="px-4 py-4 text-right">
                  {o.filled}
                  <span className="text-muted-foreground"> / {o.qty}</span>
                </td>
                <td className="px-4 py-4 text-right">{fmtMoney(o.price)}</td>
                <td className="px-4 py-4">
                  <StatusPill status={o.status} />
                </td>
                <td className="px-4 py-4 text-right text-[11px] text-muted-foreground">{o.time}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center font-sans text-sm text-muted-foreground"
                >
                  No orders with this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
