import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HeroMosaic } from "@/components/marketing/hero-mosaic";
import { TickerStrip } from "@/components/marketing/ticker-strip";
import { VenueStrip } from "@/components/marketing/venue-strip";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { StatsBand } from "@/components/marketing/stats-band";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TrustRow } from "@/components/marketing/feature-cards";
import { ScreenShowcase } from "@/components/marketing/screen-showcase";
import { Testimonials } from "@/components/marketing/testimonials";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { Faq, faqs } from "@/components/marketing/faq";
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
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
        <VenueStrip />
        <FeatureGrid />
        <StatsBand />
        <HowItWorks />
        <ScreenShowcase />
        <TrustRow />
        <Testimonials />
        <PricingTeaser />
        <Faq />
        <ClosingCta />
      </main>
      <MarketingFooter />
    </div>
  );
}
