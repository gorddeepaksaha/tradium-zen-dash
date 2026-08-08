import { instruments } from "@/data/market";
import { fmtMoney, fmtPct, toneClass } from "@/components/market-ui";

const items = instruments.slice(0, 10);

export function TickerStrip() {
  const row = (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {items.map((i) => (
        <div key={i.symbol} className="num flex items-center gap-3 text-[13px]">
          <span className="font-semibold text-foreground">{i.symbol}</span>
          <span className="text-muted-foreground">{fmtMoney(i.ltp)}</span>
          <span className={toneClass(i.changePct)}>{fmtPct(i.changePct)}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="group overflow-hidden border-y border-border bg-surface py-4">
      <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
