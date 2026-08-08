import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HeroMosaic } from "@/components/marketing/hero-mosaic";
import { TickerStrip } from "@/components/marketing/ticker-strip";
import { FeatureCards, TrustRow } from "@/components/marketing/feature-cards";
import { ScreenShowcase } from "@/components/marketing/screen-showcase";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tradium — Capital management, designed for focus" },
      {
        name: "description",
        content:
          "Tradium is a precision trading terminal: portfolio overview, holdings, positions, orders, watchlist, funds and single-stock execution in one calm interface.",
      },
      { property: "og:title", content: "Tradium — Capital management, designed for focus" },
      {
        property: "og:description",
        content:
          "A precision trading terminal for portfolio overview, live positions and single-stock execution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Tradium",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          description:
            "A precision trading terminal for portfolio overview, live positions and single-stock execution.",
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        
        <HeroMosaic />
        <TickerStrip />
        <FeatureCards />
        <TrustRow />
        <ScreenShowcase />
        <ClosingCta />
      </main>
      <MarketingFooter />
    </div>
  );
}
