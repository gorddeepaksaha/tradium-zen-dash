import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function PerformanceChart({
  data,
  up = true,
  height = 320,
}: {
  data: { label: string; value: number }[];
  up?: boolean;
  height?: number;
}) {
  const stroke = up ? "var(--positive)" : "var(--negative)";
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="tradium-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.16} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            minTickGap={48}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          />
          <YAxis
            domain={[min - pad, max + pad]}
            orientation="right"
            width={64}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `$${Math.round(v).toLocaleString("en-US")}`}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          />
          <Tooltip
            cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              boxShadow: "0 8px 24px -12px rgb(0 0 0 / 0.25)",
            }}
            labelStyle={{ color: "var(--muted-foreground)", fontSize: 10 }}
            formatter={(v: number) => [
              `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              "Value",
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2}
            fill="url(#tradium-area)"
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0, fill: stroke }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
