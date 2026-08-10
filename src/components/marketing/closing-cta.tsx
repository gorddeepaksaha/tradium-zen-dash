import { Link } from "@tanstack/react-router";
import { Reveal } from "@/hooks/use-in-view";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="glow-drift pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]"
      />
      <Reveal className="mx-auto max-w-[1440px] px-6 py-24 text-center lg:px-24 lg:py-28">
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em] lg:text-[44px]">
          Ready to trade with clarity?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Open an account in minutes and experience the Tradium terminal.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex rounded-lg bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[var(--shadow-soft)]"
          >
            Get started
          </Link>
          <Link
            to="/funds"
            className="inline-flex rounded-lg border border-border px-8 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary"
          >
            Talk to sales
          </Link>
        </div>

        <p className="num mt-4 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          No minimum balance · Cancel anytime
        </p>
      </Reveal>
    </section>
  );
}
