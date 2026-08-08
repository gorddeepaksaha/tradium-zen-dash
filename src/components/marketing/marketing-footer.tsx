export function MarketingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 px-6 py-10 lg:px-24">
        <span className="text-xs text-muted-foreground">© 2026 Tradium Technologies Inc.</span>
        <div className="flex gap-6 text-xs font-medium text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Security
          </a>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-positive">
          <span className="size-1.5 rounded-full bg-positive" />
          Markets open
        </div>
      </div>
    </footer>
  );
}
