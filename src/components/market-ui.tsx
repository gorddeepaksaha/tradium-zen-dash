import { cn } from "@/lib/utils";

export function fmtMoney(v: number, opts?: { sign?: boolean; decimals?: number }) {
  const decimals = opts?.decimals ?? 2;
  const s = Math.abs(v).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const sign = v < 0 ? "-" : opts?.sign ? "+" : "";
  return `${sign}$${s}`;
}

export function fmtPct(v: number) {
  return `${v >= 0 ? "+" : "-"}${Math.abs(v).toFixed(2)}%`;
}

export function fmtVolume(v: number) {
  if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return String(v);
}

export function toneClass(v: number) {
  return v > 0 ? "text-positive" : v < 0 ? "text-negative" : "text-muted-foreground";
}

export function PnlValue({
  value,
  pct,
  className,
  size = "sm",
}: {
  value: number;
  pct?: number;
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <span className={cn("num inline-flex items-baseline gap-2", toneClass(value), className)}>
      <span className={size === "lg" ? "text-2xl" : ""}>{fmtMoney(value, { sign: true })}</span>
      {pct !== undefined && (
        <span className={size === "lg" ? "text-sm" : "text-[11px] opacity-70"}>{fmtPct(pct)}</span>
      )}
    </span>
  );
}

export function MetricReadout({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  tone?: number;
}) {
  return (
    <div className="flex flex-col">
      <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      <span className={cn("num text-2xl", tone !== undefined && toneClass(tone))}>{value}</span>
      {sub && <span className="mt-1 text-[11px] text-muted-foreground">{sub}</span>}
    </div>
  );
}

export function Sunken({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("rounded-xl border border-border bg-surface p-6 shadow-xs", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  action,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between", className)}>
      <h2 className="text-sm font-semibold">{title}</h2>
      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="animate-entry mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-extrabold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </header>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    EXECUTED: "bg-positive/10 text-positive",
    FILLED: "bg-positive/10 text-positive",
    COMPLETED: "bg-positive/10 text-positive",
    OPEN: "bg-accent/10 text-accent",
    PROCESSING: "bg-accent/10 text-accent",
    CANCELLED: "bg-secondary text-muted-foreground",
    REJECTED: "bg-negative/10 text-negative",
  };
  return (
    <span
      className={cn(
        "inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        map[status] ?? "bg-secondary text-muted-foreground",
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}

export function RangePills<T extends string>({
  values,
  active,
  onChange,
}: {
  values: readonly T[];
  active: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg bg-secondary p-1">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            "rounded-md px-3 py-1 text-[11px] font-semibold transition-all",
            v === active
              ? "bg-surface shadow-sm ring-1 ring-black/5"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

export function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${100 - p}`)
    .join(" L ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-5 w-16" aria-hidden>
      <path
        d={`M ${d}`}
        fill="none"
        stroke={up ? "var(--positive)" : "var(--negative)"}
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function sparkTone(up: boolean) {
  return up ? "text-positive" : "text-negative";
}
