import { Link } from "@tanstack/react-router";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/holdings", label: "Holdings" },
  { to: "/positions", label: "Positions" },
  { to: "/orders", label: "Orders" },
  { to: "/watchlist", label: "Watchlist" },
  { to: "/funds", label: "Funds" },
] as const;


export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tighter">
            Tradium<span className="text-accent">.</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-1 shadow-xs">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Buying power
            </span>
            <span className="num text-sm">$142,084.50</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="grid size-7 place-items-center rounded-full bg-secondary text-[10px] font-semibold outline outline-offset-[-1px] outline-black/5">
            EK
          </div>
        </div>
      </div>
    </nav>
  );
}
