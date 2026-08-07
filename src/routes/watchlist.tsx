import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  MetricReadout,
  PageHeader,
  Sparkline,
  fmtMoney,
  fmtPct,
  fmtVolume,
  toneClass,
} from "@/components/market-ui";
import { defaultWatchlist, findInstrument, instruments, sparkPoints } from "@/data/market";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "Watchlist — Tradium" },
      {
        name: "description",
        content:
          "Track instruments with live price, day change, volume and a compact trend line. Add or remove symbols instantly.",
      },
      { property: "og:title", content: "Watchlist — Tradium" },
      {
        property: "og:description",
        content: "A focused list of the instruments you actually care about.",
      },
    ],
  }),
  component: WatchlistPage,
});

function WatchlistPage() {
  const [symbols, setSymbols] = useState<string[]>(defaultWatchlist.map((w) => w.symbol));
  const [draft, setDraft] = useState("");

  const rows = useMemo(
    () => symbols.map((s) => findInstrument(s)).filter((i): i is NonNullable<typeof i> => !!i),
    [symbols],
  );

  const suggestions = instruments.filter((i) => !symbols.includes(i.symbol));
  const advancing = rows.filter((r) => r.changePct >= 0).length;

  function add(symbol: string) {
    const s = symbol.trim().toUpperCase();
    if (!s) return;
    if (symbols.includes(s)) {
      toast.error(`${s} is already on your watchlist`);
      return;
    }
    if (!findInstrument(s)) {
      toast.error(`No instrument found for “${s}”`);
      return;
    }
    setSymbols([...symbols, s]);
    setDraft("");
    toast.success(`${s} added to watchlist`);
  }

  function remove(symbol: string) {
    setSymbols(symbols.filter((s) => s !== symbol));
    toast(`${symbol} removed from watchlist`);
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <PageHeader
        eyebrow="Market monitor"
        title="Watchlist"
        description="Instruments you follow, with day change, traded volume and intraday shape."
      >
        <div className="grid grid-cols-2 gap-10 border-border pl-0 lg:grid-cols-3 lg:border-l lg:pl-12">
          <MetricReadout label="Tracked" value={String(rows.length)} />
          <MetricReadout label="Advancing" value={String(advancing)} tone={1} />
          <MetricReadout label="Declining" value={String(rows.length - advancing)} tone={-1} />
        </div>
      </PageHeader>

      <div className="animate-entry mb-4 flex flex-wrap items-center gap-3 [animation-delay:100ms]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add(draft);
          }}
          className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 shadow-xs"
        >
          <Plus className="size-3.5 text-muted-foreground" />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add symbol, e.g. NVDA"
            className="num w-48 bg-transparent text-[13px] uppercase outline-none placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="rounded bg-foreground px-3 py-1 text-[11px] font-semibold text-background"
          >
            Add
          </button>
        </form>
        <div className="flex flex-wrap items-center gap-1.5">
          {suggestions.slice(0, 4).map((s) => (
            <button
              key={s.symbol}
              onClick={() => add(s.symbol)}
              className="num rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              + {s.symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-entry overflow-hidden rounded-xl border border-border bg-surface shadow-xs [animation-delay:150ms]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface-sunken/60">
              {["Instrument", "Last price", "Day change", "Day %", "Volume", "Trend", ""].map(
                (h, i) => (
                  <th
                    key={h || i}
                    className={cn(
                      "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                      i >= 1 && i <= 4 && "text-right",
                    )}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="num divide-y divide-border text-[13px]">
            {rows.map((r, i) => {
              const up = r.changePct >= 0;
              return (
                <tr key={r.symbol} className="group transition-colors hover:bg-surface-sunken">
                  <td className="px-4 py-4">
                    <Link
                      to="/instrument/$symbol"
                      params={{ symbol: r.symbol }}
                      className="flex flex-col"
                    >
                      <span className="font-sans text-sm font-semibold group-hover:text-accent">
                        {r.symbol}
                      </span>
                      <span className="font-sans text-[11px] text-muted-foreground">
                        {r.name} · {r.exchange}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-right">{fmtMoney(r.price)}</td>
                  <td className={cn("px-4 py-4 text-right", toneClass(r.change))}>
                    {fmtMoney(r.change, { sign: true })}
                  </td>
                  <td className={cn("px-4 py-4 text-right", toneClass(r.changePct))}>
                    {fmtPct(r.changePct)}
                  </td>
                  <td className="px-4 py-4 text-right text-muted-foreground">
                    {fmtVolume(r.volume)}
                  </td>
                  <td className="px-4 py-4">
                    <Sparkline points={sparkPoints(i + 11, up)} up={up} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => remove(r.symbol)}
                      aria-label={`Remove ${r.symbol}`}
                      className="grid size-6 place-items-center rounded border border-border text-muted-foreground opacity-0 transition-all hover:text-negative group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      <X className="size-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center font-sans text-sm text-muted-foreground"
                >
                  Your watchlist is empty. Add a symbol above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
