import { Link } from "@tanstack/react-router";

const links = [
  { label: "Product", to: "/dashboard" as const },
  { label: "Markets", to: "/watchlist" as const },
  { label: "Institutional", to: "/funds" as const },
];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-24">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tighter">
          Tradium<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden rounded-lg border border-border px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-secondary sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open account
          </Link>
        </div>
      </div>
    </header>
  );
}
