import type { Candle } from "@/data/market";

export function CandleChart({ candles, height = 380 }: { candles: Candle[]; height?: number }) {
  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const span = max - min || 1;
  const W = 1000;
  const H = 400;
  const step = W / candles.length;
  const bodyW = Math.max(2, step * 0.55);
  const y = (v: number) => ((max - v) / span) * (H - 20) + 10;

  const gridLines = Array.from({ length: 5 }, (_, i) => min + (span / 4) * i);

  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full">
        {gridLines.map((g) => (
          <line
            key={g}
            x1={0}
            x2={W}
            y1={y(g)}
            y2={y(g)}
            stroke="var(--border)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {candles.map((c, i) => {
          const up = c.close >= c.open;
          const color = up ? "var(--positive)" : "var(--negative)";
          const x = i * step + step / 2;
          const top = y(Math.max(c.open, c.close));
          const bottom = y(Math.min(c.open, c.close));
          return (
            <g key={i}>
              <line
                x1={x}
                x2={x}
                y1={y(c.high)}
                y2={y(c.low)}
                stroke={color}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={x - bodyW / 2}
                y={top}
                width={bodyW}
                height={Math.max(1, bottom - top)}
                fill={color}
                opacity={up ? 0.9 : 0.85}
              />
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-col justify-between py-1">
        {[...gridLines].reverse().map((g) => (
          <span
            key={g}
            className="num bg-surface/80 px-1 text-[10px] text-muted-foreground"
          >
            ${g.toFixed(2)}
          </span>
        ))}
      </div>
      <div className="mt-2 flex justify-between px-1">
        {[0, Math.floor(candles.length / 2), candles.length - 1].map((i) => (
          <span key={i} className="num text-[10px] text-muted-foreground">
            {candles[i]?.label}
          </span>
        ))}
      </div>
    </div>
  );
}
