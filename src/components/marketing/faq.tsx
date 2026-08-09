import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "How long does opening an account take?",
    a: "Most accounts are ready in under ten minutes. You can explore every screen in the terminal before funding.",
  },
  {
    q: "How do I fund or withdraw?",
    a: "Deposits and withdrawals are handled from the funds screen, where you also see used margin against your total balance.",
  },
  {
    q: "Is market data real-time?",
    a: "Pro and Institutional plans stream real-time prices. Starter accounts see delayed quotes on the same layouts.",
  },
  {
    q: "What are the trading fees?",
    a: "Commission is charged per execution and shown in the estimated total before you confirm an order — never after.",
  },
  {
    q: "How is my account secured?",
    a: "Bank-grade encryption in transit and at rest, segregated client funds, and a SOC 2 Type II programme in progress.",
  },
  {
    q: "Which markets are supported?",
    a: "Equities and ETFs across 40+ execution venues, including NYSE, NASDAQ, CBOE, LSE and TSX.",
  },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="animate-entry">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">FAQ</p>
          <h2 className="font-display text-4xl font-bold tracking-[-0.02em]">
            Questions, answered plainly.
          </h2>
        </div>
        <Accordion type="single" collapsible className="animate-entry w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
