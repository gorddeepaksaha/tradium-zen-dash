export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 max-w-[1440px] border-t border-border px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-8 text-[11px] font-medium text-muted-foreground">
          <span>© 2026 Tradium Technologies Inc.</span>
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
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-positive">
          <span className="size-1.5 rounded-full bg-positive" />
          Markets open
        </div>
      </div>
    </footer>
  );
}
