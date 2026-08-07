export type Instrument = {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePct: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  volume: number;
  week52High: number;
  week52Low: number;
};

export const instruments: Instrument[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    exchange: "NASDAQ",
    price: 482.1,
    change: 17.62,
    changePct: 3.79,
    open: 466.4,
    high: 484.95,
    low: 464.2,
    prevClose: 464.48,
    volume: 41_284_000,
    week52High: 502.66,
    week52Low: 208.9,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    exchange: "NASDAQ",
    price: 192.42,
    change: 1.18,
    changePct: 0.62,
    open: 191.1,
    high: 193.04,
    low: 190.55,
    prevClose: 191.24,
    volume: 52_910_000,
    week52High: 199.62,
    week52Low: 143.9,
  },
  {
    symbol: "TSLA",
    name: "Tesla Motors",
    exchange: "NASDAQ",
    price: 241.5,
    change: -5.42,
    changePct: -2.2,
    open: 247.2,
    high: 248.8,
    low: 240.1,
    prevClose: 246.92,
    volume: 98_440_000,
    week52High: 299.29,
    week52Low: 152.37,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    exchange: "NASDAQ",
    price: 338.11,
    change: 4.14,
    changePct: 1.24,
    open: 334.5,
    high: 339.2,
    low: 333.8,
    prevClose: 333.97,
    volume: 24_180_000,
    week52High: 366.78,
    week52Low: 245.61,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    exchange: "NASDAQ",
    price: 136.5,
    change: -1.13,
    changePct: -0.82,
    open: 137.8,
    high: 138.2,
    low: 136.1,
    prevClose: 137.63,
    volume: 31_060_000,
    week52High: 141.22,
    week52Low: 88.34,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    exchange: "NASDAQ",
    price: 128.91,
    change: 2.71,
    changePct: 2.15,
    open: 126.4,
    high: 129.44,
    low: 126.02,
    prevClose: 126.2,
    volume: 45_720_000,
    week52High: 145.86,
    week52Low: 81.43,
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    exchange: "NYSE",
    price: 154.28,
    change: 0.42,
    changePct: 0.27,
    open: 153.9,
    high: 155.1,
    low: 153.4,
    prevClose: 153.86,
    volume: 9_120_000,
    week52High: 159.38,
    week52Low: 123.11,
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    exchange: "NASDAQ",
    price: 118.72,
    change: -2.04,
    changePct: -1.69,
    open: 121.0,
    high: 121.5,
    low: 118.1,
    prevClose: 120.76,
    volume: 62_310_000,
    week52High: 132.83,
    week52Low: 60.05,
  },
];

export function findInstrument(symbol: string) {
  return instruments.find((i) => i.symbol.toUpperCase() === symbol.toUpperCase());
}

export type Holding = {
  symbol: string;
  name: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  dayChangePct: number;
};

export const holdings: Holding[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", qty: 420, avgPrice: 412.5, ltp: 482.1, dayChangePct: 3.79 },
  { symbol: "AAPL", name: "Apple Inc", qty: 150, avgPrice: 188.2, ltp: 192.42, dayChangePct: 0.62 },
  { symbol: "TSLA", name: "Tesla Motors", qty: 85, avgPrice: 262.1, ltp: 241.5, dayChangePct: -2.2 },
  { symbol: "MSFT", name: "Microsoft Corp", qty: 210, avgPrice: 291.4, ltp: 338.11, dayChangePct: 1.24 },
  { symbol: "GOOGL", name: "Alphabet Inc", qty: 320, avgPrice: 121.85, ltp: 136.5, dayChangePct: -0.82 },
  { symbol: "AMZN", name: "Amazon.com Inc", qty: 260, avgPrice: 134.2, ltp: 128.91, dayChangePct: 2.15 },
  { symbol: "JPM", name: "JPMorgan Chase", qty: 140, avgPrice: 146.9, ltp: 154.28, dayChangePct: 0.27 },
  { symbol: "AMD", name: "Advanced Micro Devices", qty: 180, avgPrice: 104.5, ltp: 118.72, dayChangePct: -1.69 },
];

export function holdingMetrics(h: Holding) {
  const invested = h.qty * h.avgPrice;
  const value = h.qty * h.ltp;
  const pnl = value - invested;
  const pnlPct = (pnl / invested) * 100;
  return { invested, value, pnl, pnlPct };
}

export const portfolio = (() => {
  const invested = holdings.reduce((s, h) => s + h.qty * h.avgPrice, 0);
  const value = holdings.reduce((s, h) => s + h.qty * h.ltp, 0);
  const dayPnl = holdings.reduce(
    (s, h) => s + h.qty * h.ltp * (h.dayChangePct / (100 + h.dayChangePct)),
    0,
  );
  return {
    invested,
    value,
    pnl: value - invested,
    pnlPct: ((value - invested) / invested) * 100,
    dayPnl,
    dayPnlPct: (dayPnl / (value - dayPnl)) * 100,
  };
})();

export type Position = {
  symbol: string;
  name: string;
  side: "LONG" | "SHORT";
  product: "INTRADAY" | "OVERNIGHT";
  qty: number;
  entry: number;
  ltp: number;
};

export const positions: Position[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", side: "LONG", product: "INTRADAY", qty: 60, entry: 471.2, ltp: 482.1 },
  { symbol: "TSLA", name: "Tesla Motors", side: "SHORT", product: "INTRADAY", qty: 40, entry: 246.0, ltp: 241.5 },
  { symbol: "AMD", name: "Advanced Micro Devices", side: "LONG", product: "INTRADAY", qty: 200, entry: 121.4, ltp: 118.72 },
  { symbol: "MSFT", name: "Microsoft Corp", side: "LONG", product: "OVERNIGHT", qty: 50, entry: 330.2, ltp: 338.11 },
  { symbol: "GOOGL", name: "Alphabet Inc", side: "LONG", product: "OVERNIGHT", qty: 120, entry: 138.9, ltp: 136.5 },
  { symbol: "AMZN", name: "Amazon.com Inc", side: "SHORT", product: "INTRADAY", qty: 75, entry: 127.1, ltp: 128.91 },
];

export function positionPnl(p: Position) {
  const dir = p.side === "LONG" ? 1 : -1;
  const pnl = (p.ltp - p.entry) * p.qty * dir;
  const pnlPct = ((p.ltp - p.entry) / p.entry) * 100 * dir;
  return { pnl, pnlPct };
}

export type OrderStatus = "EXECUTED" | "OPEN" | "CANCELLED" | "REJECTED";

export type Order = {
  id: string;
  symbol: string;
  name: string;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT" | "STOP";
  qty: number;
  filled: number;
  price: number;
  status: OrderStatus;
  time: string;
};

export const orders: Order[] = [
  { id: "TRD-98241", symbol: "NVDA", name: "NVIDIA Corp", side: "BUY", type: "MARKET", qty: 20, filled: 20, price: 480.4, status: "EXECUTED", time: "09:41:12" },
  { id: "TRD-98240", symbol: "MSFT", name: "Microsoft Corp", side: "BUY", type: "LIMIT", qty: 50, filled: 50, price: 330.2, status: "EXECUTED", time: "09:38:04" },
  { id: "TRD-98239", symbol: "AMZN", name: "Amazon.com Inc", side: "SELL", type: "LIMIT", qty: 75, filled: 0, price: 131.5, status: "OPEN", time: "09:34:51" },
  { id: "TRD-98238", symbol: "TSLA", name: "Tesla Motors", side: "SELL", type: "MARKET", qty: 40, filled: 40, price: 246.0, status: "EXECUTED", time: "09:31:20" },
  { id: "TRD-98237", symbol: "AMD", name: "Advanced Micro Devices", side: "BUY", type: "STOP", qty: 200, filled: 200, price: 121.4, status: "EXECUTED", time: "09:22:47" },
  { id: "TRD-98236", symbol: "GOOGL", name: "Alphabet Inc", side: "BUY", type: "LIMIT", qty: 120, filled: 0, price: 134.0, status: "CANCELLED", time: "09:18:03" },
  { id: "TRD-98235", symbol: "JPM", name: "JPMorgan Chase", side: "BUY", type: "LIMIT", qty: 140, filled: 140, price: 146.9, status: "EXECUTED", time: "09:15:38" },
  { id: "TRD-98234", symbol: "AAPL", name: "Apple Inc", side: "SELL", type: "LIMIT", qty: 30, filled: 0, price: 205.0, status: "REJECTED", time: "09:11:09" },
  { id: "TRD-98233", symbol: "NVDA", name: "NVIDIA Corp", side: "BUY", type: "LIMIT", qty: 100, filled: 100, price: 462.8, status: "EXECUTED", time: "Yesterday 15:52" },
  { id: "TRD-98232", symbol: "AMZN", name: "Amazon.com Inc", side: "BUY", type: "MARKET", qty: 60, filled: 60, price: 126.4, status: "EXECUTED", time: "Yesterday 14:07" },
  { id: "TRD-98231", symbol: "TSLA", name: "Tesla Motors", side: "BUY", type: "LIMIT", qty: 25, filled: 0, price: 232.0, status: "OPEN", time: "Yesterday 11:44" },
];

export type Transaction = {
  id: string;
  kind: "DEPOSIT" | "WITHDRAWAL" | "SETTLEMENT" | "FEE";
  method: string;
  amount: number;
  date: string;
  status: "COMPLETED" | "PROCESSING";
};

export const funds = {
  available: 142_084.5,
  usedMargin: 61_920.0,
  collateral: 38_400.0,
};

export const transactions: Transaction[] = [
  { id: "TXN-4412", kind: "DEPOSIT", method: "ACH • Chase ••4021", amount: 50_000, date: "24 Oct 2026", status: "COMPLETED" },
  { id: "TXN-4411", kind: "SETTLEMENT", method: "T+1 equity settlement", amount: 12_402.12, date: "23 Oct 2026", status: "COMPLETED" },
  { id: "TXN-4410", kind: "FEE", method: "Exchange & regulatory", amount: -184.6, date: "23 Oct 2026", status: "COMPLETED" },
  { id: "TXN-4409", kind: "WITHDRAWAL", method: "Wire • Chase ••4021", amount: -25_000, date: "20 Oct 2026", status: "COMPLETED" },
  { id: "TXN-4408", kind: "DEPOSIT", method: "ACH • Chase ••4021", amount: 75_000, date: "14 Oct 2026", status: "COMPLETED" },
  { id: "TXN-4407", kind: "SETTLEMENT", method: "T+1 equity settlement", amount: 8_940.4, date: "11 Oct 2026", status: "COMPLETED" },
];

export type WatchItem = { symbol: string; name: string };

export const defaultWatchlist: WatchItem[] = [
  { symbol: "MSFT", name: "Microsoft Corp" },
  { symbol: "GOOGL", name: "Alphabet Inc" },
  { symbol: "AMZN", name: "Amazon.com Inc" },
  { symbol: "TSLA", name: "Tesla Motors" },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "JPM", name: "JPMorgan Chase" },
];

/* ---------- deterministic pseudo-random series ---------- */

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Range = "1D" | "1W" | "1M" | "1Y" | "ALL";

export const ranges: Range[] = ["1D", "1W", "1M", "1Y", "ALL"];

const rangeConfig: Record<Range, { points: number; drift: number; vol: number }> = {
  "1D": { points: 78, drift: 0.00035, vol: 0.0022 },
  "1W": { points: 60, drift: 0.0009, vol: 0.004 },
  "1M": { points: 66, drift: 0.0016, vol: 0.006 },
  "1Y": { points: 84, drift: 0.0034, vol: 0.011 },
  ALL: { points: 96, drift: 0.0052, vol: 0.015 },
};

export function buildSeries(seed: number, base: number, range: Range) {
  const cfg = rangeConfig[range];
  const rnd = mulberry(seed + range.length * 977);
  let v = base / (1 + cfg.drift * cfg.points);
  const out: { t: number; label: string; value: number }[] = [];
  for (let i = 0; i < cfg.points; i++) {
    v = v * (1 + cfg.drift + (rnd() - 0.5) * cfg.vol);
    out.push({ t: i, label: labelFor(range, i, cfg.points), value: Number(v.toFixed(2)) });
  }
  out[out.length - 1] = { ...out[out.length - 1], value: Number(base.toFixed(2)) };
  return out;
}

function labelFor(range: Range, i: number, n: number) {
  if (range === "1D") {
    const minutes = 570 + Math.round((i / (n - 1)) * 390);
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  }
  if (range === "1W") return ["Mon", "Tue", "Wed", "Thu", "Fri"][Math.floor((i / n) * 5)];
  if (range === "1M") return `${Math.max(1, Math.round((i / (n - 1)) * 30))} Oct`;
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  if (range === "1Y") return months[Math.min(11, Math.floor((i / n) * 12))];
  return `${2019 + Math.floor((i / n) * 8)}`;
}

export type Candle = { label: string; open: number; high: number; low: number; close: number };

export function buildCandles(seed: number, base: number, range: Range): Candle[] {
  const cfg = rangeConfig[range];
  const n = Math.min(cfg.points, 60);
  const rnd = mulberry(seed * 31 + range.length * 13);
  let price = base / (1 + cfg.drift * n);
  const out: Candle[] = [];
  for (let i = 0; i < n; i++) {
    const open = price;
    const close = open * (1 + cfg.drift + (rnd() - 0.5) * cfg.vol * 2);
    const high = Math.max(open, close) * (1 + rnd() * cfg.vol * 0.8);
    const low = Math.min(open, close) * (1 - rnd() * cfg.vol * 0.8);
    out.push({
      label: labelFor(range, i, n),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
    });
    price = close;
  }
  const last = out[out.length - 1];
  out[out.length - 1] = {
    ...last,
    close: +base.toFixed(2),
    high: +Math.max(last.high, base).toFixed(2),
    low: +Math.min(last.low, base).toFixed(2),
  };
  return out;
}

export function sparkPoints(seed: number, up: boolean) {
  const rnd = mulberry(seed);
  let v = 50;
  return Array.from({ length: 16 }, () => {
    v += (rnd() - (up ? 0.38 : 0.62)) * 10;
    return Math.max(6, Math.min(94, v));
  });
}
