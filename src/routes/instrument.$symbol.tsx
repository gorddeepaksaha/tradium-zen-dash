import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import {
  RangePills,
  Sunken,
  fmtMoney,
  fmtPct,
  fmtVolume,
  toneClass,
} from "@/components/market-ui";
import { CandleChart } from "@/components/candle-chart";
import {
  buildCandles,
  findInstrument,
  holdings,
  instruments,
  ranges,
  type Range,
} from "@/data/market";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/instrument/$symbol")({
  loader: ({ params }) => {
    const instrument = findInstrument(params.symbol);
    if (!instrument) throw notFound();
    return { instrument };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Instrument unavailable — Tradium" }, { name: "robots", content: "noindex" }],
      };
    }
    const { instrument } = loaderData;
    const title = `${instrument.symbol} · ${fmtMoney(instrument.price)} — Tradium`;
    const description = `Trade ${instrument.name} (${instrument.symbol}) on Tradium: live chart, key stats and a buy/sell order panel.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: InstrumentPage,
});

function InstrumentPage() {
  const { instrument } = Route.useLoaderData();
  const [range, setRange] = useState<Range>("1M");
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT" | "STOP">("MARKET");
  const [qty, setQty] = useState("10");
  const [limitPrice, setLimitPrice] = useState(instrument.price.toFixed(2));

  const candles = useMemo(
    () => buildCandles(instrument.symbol.length + instrument.price, instrument.price, range),
    [instrument, range],
  );

  const held = holdings.find((h) => h.symbol === instrument.symbol);
  const up = instrument.changePct >= 0;
  const rangePos =
    ((instrument.price - instrument.week52Low) / (instrument.week52High - instrument.week52Low)) *
    100;
  const execPrice = orderType === "MARKET" ? instrument.price : Number(limitPrice) || 0;
  const total = execPrice * (Number(qty) || 0);

  const stats: { label: string; value: string }[] = [
    { label: "Open", value: fmtMoney(instrument.open) },
    { label: "High", value: fmtMoney(instrument.high) },
    { label: "Low", value: fmtMoney(instrument.low) },
    { label: "Prev close", value: fmtMoney(instrument.prevClose) },
    { label: "Volume", value: fmtVolume(instrument.volume) },
    { label: "Exchange", value: instrument.exchange },
  ];

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const q = Number(qty);
    if (!q || q <= 0) {
      toast.error("Enter a quantity greater than zero");
      return;
    }
    if (orderType !== "MARKET" && !Number(limitPrice)) {
      toast.error("Enter a trigger price");
      return;
    }
    toast.success(
      `${side === "BUY" ? "Buy" : "Sell"} ${q} ${instrument.symbol} ${orderType.toLowerCase()} order placed`,
      { description: `Estimated value ${fmtMoney(total)}` },
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <div className="animate-entry mb-6 flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
        <Link to="/watchlist" className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="size-3" /> Markets
        </Link>
        <span>/</span>
        <span className="text-foreground">{instrument.symbol}</span>
      </div>

      <header className="animate-entry mb-8 flex flex-wrap items-end justify-between gap-8 border-b border-border pb-8">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h1 className="font-display text-4xl font-extrabold tracking-tight">
              {instrument.symbol}
            </h1>
            <span className="rounded border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {instrument.exchange}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-positive">
              <span className="size-1.5 rounded-full bg-positive" /> Live
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{instrument.name}</p>
        </div>
        <div className="flex items-end gap-6">
          <div className="text-right">
            <p className="num text-4xl">{fmtMoney(instrument.price)}</p>
            <p className={cn("num mt-1 text-sm", toneClass(instrument.change))}>
              {fmtMoney(instrument.change, { sign: true })} ({fmtPct(instrument.changePct)}) today
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 space-y-8 lg:col-span-8">
          <Sunken className="animate-entry [animation-delay:100ms]">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold">Price action</h2>
                <p className="num mt-1 text-[11px] text-muted-foreground">
                  Candlestick · {range}
                </p>
              </div>
              <RangePills values={ranges} active={range} onChange={setRange} />
            </div>
            <CandleChart candles={candles} />
          </Sunken>

          <Sunken className="animate-entry [animation-delay:200ms]">
            <h2 className="mb-6 text-sm font-semibold">Key statistics</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-border pl-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="num mt-1 text-base">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="num">{fmtMoney(instrument.week52Low)}</span>
                <span className="font-semibold uppercase tracking-wider">52-week range</span>
                <span className="num">{fmtMoney(instrument.week52High)}</span>
              </div>
              <div className="relative h-1.5 w-full rounded-full bg-secondary">
                <span
                  className="absolute -top-1 size-3.5 -translate-x-1/2 rounded-full border-2 border-surface bg-foreground"
                  style={{ left: `${Math.min(100, Math.max(0, rangePos))}%` }}
                />
              </div>
            </div>
          </Sunken>

          <section className="animate-entry [animation-delay:250ms]">
            <h2 className="mb-3 text-sm font-semibold">Related instruments</h2>
            <div className="flex flex-wrap gap-2">
              {instruments
                .filter((i) => i.symbol !== instrument.symbol)
                .slice(0, 5)
                .map((i) => (
                  <Link
                    key={i.symbol}
                    to="/instrument/$symbol"
                    params={{ symbol: i.symbol }}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2 shadow-xs transition-colors hover:border-accent/40"
                  >
                    <span className="text-[12px] font-semibold">{i.symbol}</span>
                    <span className={cn("num text-[11px]", toneClass(i.changePct))}>
                      {fmtPct(i.changePct)}
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="animate-entry sticky top-20 space-y-4 [animation-delay:300ms]">
            <Sunken>
              <div className="mb-5 grid grid-cols-2 gap-2">
                {(["BUY", "SELL"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSide(s)}
                    className={cn(
                      "rounded-md py-2 text-[12px] font-semibold uppercase tracking-wide transition-all",
                      s === side
                        ? s === "BUY"
                          ? "bg-accent text-accent-foreground"
                          : "bg-foreground text-background"
                        : "border border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form onSubmit={placeOrder} className="space-y-4">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Order type
                  </label>
                  <div className="flex gap-1 rounded-lg bg-secondary p-1">
                    {(["MARKET", "LIMIT", "STOP"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setOrderType(t)}
                        className={cn(
                          "flex-1 rounded-md px-2 py-1 text-[11px] font-semibold capitalize transition-all",
                          t === orderType
                            ? "bg-surface shadow-sm ring-1 ring-black/5"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {t.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="qty"
                      className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Quantity
                    </label>
                    <input
                      id="qty"
                      inputMode="numeric"
                      value={qty}
                      onChange={(e) => setQty(e.target.value.replace(/[^0-9]/g, ""))}
                      className="num w-full rounded-md border border-input bg-surface-sunken px-3 py-2 text-sm outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {orderType === "STOP" ? "Trigger" : "Price"}
                    </label>
                    <input
                      id="price"
                      inputMode="decimal"
                      disabled={orderType === "MARKET"}
                      value={orderType === "MARKET" ? "At market" : limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                      className="num w-full rounded-md border border-input bg-surface-sunken px-3 py-2 text-sm outline-none focus:border-accent/50 disabled:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t border-border pt-4 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated total</span>
                    <span className="num font-medium">{fmtMoney(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margin required</span>
                    <span className="num">{fmtMoney(total * 0.25)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Charges (est.)</span>
                    <span className="num">{fmtMoney(Math.min(24, total * 0.0004))}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full rounded-lg py-3 text-[13px] font-semibold transition-transform active:scale-[0.99]",
                    side === "BUY"
                      ? "bg-accent text-accent-foreground"
                      : "bg-foreground text-background",
                  )}
                >
                  {side === "BUY" ? "Place buy order" : "Place sell order"}
                </button>
              </form>
            </Sunken>

            <div className="rounded-xl border border-border bg-surface-sunken p-4">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-muted-foreground">Your position</span>
                <span className="num">
                  {held ? `${held.qty} @ ${fmtMoney(held.avgPrice)}` : "None"}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[12px]">
                <span className="text-muted-foreground">Buying power</span>
                <span className="num">$142,084.50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
