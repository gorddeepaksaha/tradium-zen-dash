import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  MetricReadout,
  PageHeader,
  SectionHeading,
  StatusPill,
  Sunken,
  fmtMoney,
  toneClass,
} from "@/components/market-ui";
import { funds, transactions, type Transaction } from "@/data/market";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/funds")({
  head: () => ({
    meta: [
      { title: "Funds — Tradium" },
      {
        name: "description",
        content:
          "Available balance, used margin and total balance with instant deposits, withdrawals and full transaction history.",
      },
      { property: "og:title", content: "Funds — Tradium" },
      {
        property: "og:description",
        content: "Move money in and out, and reconcile every settlement and fee.",
      },
    ],
  }),
  component: FundsPage,
});

function FundsPage() {
  const [ledger, setLedger] = useState<Transaction[]>(transactions);
  const [available, setAvailable] = useState(funds.available);
  const [mode, setMode] = useState<"DEPOSIT" | "WITHDRAWAL">("DEPOSIT");
  const [amount, setAmount] = useState("");

  const total = available + funds.usedMargin;
  const utilisation = (funds.usedMargin / total) * 100;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) {
      toast.error("Enter an amount greater than zero");
      return;
    }
    if (mode === "WITHDRAWAL" && value > available) {
      toast.error("Amount exceeds available balance");
      return;
    }
    const signed = mode === "DEPOSIT" ? value : -value;
    setAvailable(available + signed);
    setLedger([
      {
        id: `TXN-${4413 + ledger.length - transactions.length}`,
        kind: mode,
        method: mode === "DEPOSIT" ? "ACH • Chase ••4021" : "Wire • Chase ••4021",
        amount: signed,
        date: "24 Oct 2026",
        status: "PROCESSING",
      },
      ...ledger,
    ]);
    setAmount("");
    toast.success(
      `${mode === "DEPOSIT" ? "Deposit" : "Withdrawal"} of ${fmtMoney(value)} initiated`,
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <PageHeader
        eyebrow="Treasury"
        title="Funds"
        description="Cash available to trade, margin currently committed, and every movement in between."
      >
        <div className="grid grid-cols-2 gap-10 border-border pl-0 lg:grid-cols-3 lg:border-l lg:pl-12">
          <MetricReadout label="Available balance" value={fmtMoney(available)} />
          <MetricReadout label="Used margin" value={fmtMoney(funds.usedMargin)} />
          <MetricReadout label="Total balance" value={fmtMoney(total)} />
        </div>
      </PageHeader>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 space-y-8 lg:col-span-8">
          <Sunken className="animate-entry [animation-delay:100ms]">
            <SectionHeading
              title="Margin utilisation"
              action={
                <span className="num text-[11px] text-muted-foreground">
                  {utilisation.toFixed(1)}% deployed
                </span>
              }
            />
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-accent" style={{ width: `${utilisation}%` }} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Collateral
                </p>
                <p className="num mt-1 text-lg">{fmtMoney(funds.collateral)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Payout eligible
                </p>
                <p className="num mt-1 text-lg">{fmtMoney(available * 0.92)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Settlement cycle
                </p>
                <p className="num mt-1 text-lg">T+1</p>
              </div>
            </div>
          </Sunken>

          <section className="animate-entry [animation-delay:200ms]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight">
                Transaction history
              </h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-surface-sunken/60">
                    {["Reference", "Type", "Method", "Date", "Amount", "Status"].map((h, i) => (
                      <th
                        key={h}
                        className={cn(
                          "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                          i === 4 && "text-right",
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="num divide-y divide-border text-[13px]">
                  {ledger.map((t) => (
                    <tr key={t.id} className="transition-colors hover:bg-surface-sunken">
                      <td className="px-4 py-4 text-[11px] text-muted-foreground">{t.id}</td>
                      <td className="px-4 py-4 font-sans text-[11px] uppercase tracking-wide">
                        {t.kind.toLowerCase()}
                      </td>
                      <td className="px-4 py-4 font-sans text-[13px] text-muted-foreground">
                        {t.method}
                      </td>
                      <td className="px-4 py-4 text-[12px] text-muted-foreground">{t.date}</td>
                      <td className={cn("px-4 py-4 text-right", toneClass(t.amount))}>
                        {fmtMoney(t.amount, { sign: true })}
                      </td>
                      <td className="px-4 py-4">
                        <StatusPill status={t.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Sunken className="animate-entry sticky top-20 [animation-delay:300ms]">
            <div className="mb-5 flex gap-1 rounded-lg bg-secondary p-1">
              {(["DEPOSIT", "WITHDRAWAL"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-[12px] font-semibold capitalize transition-all",
                    m === mode
                      ? "bg-surface shadow-sm ring-1 ring-black/5"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {m === "DEPOSIT" ? "Add funds" : "Withdraw"}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Amount
                </label>
                <div className="flex items-center rounded-md border border-input bg-surface-sunken px-3">
                  <span className="num text-sm text-muted-foreground">$</span>
                  <input
                    id="amount"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                    placeholder="0.00"
                    className="num w-full bg-transparent px-2 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                {[5000, 25_000, 50_000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(String(v))}
                    className="num flex-1 rounded border border-border py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {fmtMoney(v, { decimals: 0 })}
                  </button>
                ))}
              </div>

              <div className="space-y-2 border-t border-border pt-4 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method</span>
                  <span className="font-medium">
                    {mode === "DEPOSIT" ? "ACH • Chase ••4021" : "Wire • Chase ••4021"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available after</span>
                  <span className="num">
                    {fmtMoney(
                      mode === "DEPOSIT"
                        ? available + (Number(amount) || 0)
                        : available - (Number(amount) || 0),
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-accent py-3 text-[13px] font-semibold text-accent-foreground transition-transform active:scale-[0.99]"
              >
                {mode === "DEPOSIT" ? "Add funds" : "Request withdrawal"}
              </button>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Deposits settle instantly for trading. Withdrawals are processed on the next banking
                day.
              </p>
            </form>
          </Sunken>
        </div>
      </div>
    </main>
  );
}
