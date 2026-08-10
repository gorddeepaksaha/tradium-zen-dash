import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

const stats = [
  { prefix: "", target: 12, decimals: 0, suffix: "ms", label: "Median order latency" },
  { prefix: "", target: 40, decimals: 0, suffix: "+", label: "Execution venues" },
  { prefix: "", target: 99.99, decimals: 2, suffix: "%", label: "Platform uptime" },
  { prefix: "$", target: 2.4, decimals: 1, suffix: "B", label: "Notional cleared" },
];

function CountUp({
  target,
  decimals,
  run,
}: {
  target: number;
  decimals: number;
  run: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, target]);

  return <>{value.toFixed(decimals)}</>;
}

export function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="border-y border-border bg-surface-sunken/50">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border lg:px-24"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{ transitionDelay: `${i * 80}ms` }}
            className={`reveal ${inView ? "is-visible" : ""} flex flex-col gap-2 lg:px-10 lg:first:pl-0 lg:last:pr-0`}
          >
            <span className="num text-[34px] leading-none tracking-[-0.02em]">
              {s.prefix}
              <CountUp target={s.target} decimals={s.decimals} run={inView} />
              {s.suffix}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
