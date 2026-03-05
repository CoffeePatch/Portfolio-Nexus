/**
 * Converts all mock data from src/data/ files into UnifiedTransaction[]
 * Used as fallback data when backend services are not running,
 * so the Transactions spreadsheet can be visually tested.
 */
import type { UnifiedTransaction, TransactionType } from "../hooks/useAllTransactions";
import { mockStocks } from "./mockStockData";
import { mockFunds } from "./mockMutualFundData";
import { mockCryptos } from "./mockCryptoData";
import { fdHoldings } from "./mockFDData";
import { properties } from "./mockRealEstateData";
import { metalHoldings } from "./mockMetalsData";
import { transactionsData } from "./expenseDummyData";

/* ================================================================== */
/*  Mappers – one per mock data source                                */
/* ================================================================== */

const mapStocks = (): UnifiedTransaction[] =>
  mockStocks.map((s) => ({
    id: `mock-stock-${s.id}`,
    date: s.lastUpdated,
    type: "Stock Buy" as TransactionType,
    category: `Stocks – ${s.sector}`,
    description: `${s.symbol} (${s.exchange})`,
    amount: s.investedAmount,
    direction: "OUT" as const,
    quantity: s.quantity,
    pricePerUnit: s.avgCost,
    account: "Zerodha",
    status: "Completed" as const,
    tags: ["investment", "stock", s.sector.toLowerCase()],
    source: "portfolioService" as const,
    externalId: s.id,
  }));

const mapMutualFunds = (): UnifiedTransaction[] =>
  mockFunds.map((f) => ({
    id: `mock-mf-${f.id}`,
    date: f.lastUpdated,
    type: "MF Buy" as TransactionType,
    category: `Mutual Funds – ${f.category}`,
    description: f.name,
    amount: f.investedAmount,
    direction: "OUT" as const,
    quantity: f.units,
    pricePerUnit: +(f.investedAmount / f.units).toFixed(2),
    account: "Groww",
    status: "Completed" as const,
    tags: ["investment", "mutual-fund", f.category.toLowerCase()],
    source: "portfolioService" as const,
    externalId: f.id,
  }));

const mapCrypto = (): UnifiedTransaction[] =>
  mockCryptos.map((c) => ({
    id: `mock-crypto-${c.id}`,
    date: c.lastUpdated,
    type: "Crypto Buy" as TransactionType,
    category: `Crypto – ${c.network}`,
    description: `${c.name} (${c.symbol})`,
    amount: c.investedAmount,
    direction: "OUT" as const,
    quantity: c.quantity,
    pricePerUnit: c.avgCost,
    account: "WazirX",
    status: "Completed" as const,
    tags: ["investment", "crypto", c.symbol.toLowerCase()],
    source: "portfolioService" as const,
    externalId: c.id,
  }));

const mapFixedDeposits = (): UnifiedTransaction[] =>
  fdHoldings.map((fd) => ({
    id: `mock-fd-${fd.id}`,
    date: fd.startDate,
    type: "Fixed Deposit" as TransactionType,
    category: fd.fdType,
    description: `${fd.bankName} – ${fd.fdType} (${fd.interestRate}% p.a.)`,
    amount: fd.principalAmount,
    direction: "OUT" as const,
    quantity: null,
    pricePerUnit: null,
    account: fd.bankName,
    status: "Completed" as const,
    tags: ["investment", "fixed-deposit", fd.status.toLowerCase().replace(" ", "-")],
    source: "portfolioService" as const,
    externalId: fd.id,
  }));

const mapRealEstate = (): UnifiedTransaction[] =>
  properties.map((p) => ({
    id: `mock-re-${p.id}`,
    date: p.purchaseDate,
    type: "Real Estate" as TransactionType,
    category: `Real Estate – ${p.type}`,
    description: `${p.name} – ${p.city}`,
    amount: p.totalInvestment,
    direction: "OUT" as const,
    quantity: null,
    pricePerUnit: null,
    account: p.hasMortgage ? (p.mortgage?.lender ?? "Portfolio") : "Portfolio",
    status: "Completed" as const,
    tags: ["investment", "real-estate", p.type.toLowerCase(), p.status.toLowerCase().replace(" ", "-")],
    source: "portfolioService" as const,
    externalId: p.id,
  }));

const mapMetals = (): UnifiedTransaction[] =>
  metalHoldings.map((m) => ({
    id: `mock-metal-${m.id}`,
    date: m.purchaseDate,
    type: "Manual" as TransactionType,
    category: `Precious Metals – ${m.metalType}`,
    description: `${m.description} (${m.purity})`,
    amount: m.totalPurchasePrice,
    direction: "OUT" as const,
    quantity: m.weightGrams,
    pricePerUnit: m.purchasePricePerGram,
    account: m.vendor,
    status: "Completed" as const,
    tags: ["investment", "precious-metal", m.metalType.toLowerCase(), m.form.toLowerCase()],
    source: "portfolioService" as const,
    externalId: m.id,
  }));

const mapExpenses = (): UnifiedTransaction[] =>
  transactionsData.map((t) => ({
    id: `mock-exp-${t.id}`,
    date: t.date,
    type: (t.type === "transfer"
      ? "Transfer"
      : t.type === "income"
        ? "Transfer"
        : "Expense") as TransactionType,
    category: t.category,
    description: t.description,
    amount: t.amount,
    direction: (t.type === "income" ? "IN" : "OUT") as "IN" | "OUT",
    quantity: null,
    pricePerUnit: null,
    account: t.account,
    status: "Completed" as const,
    tags: [t.type, t.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")],
    source: "expenseService" as const,
    externalId: t.id,
  }));

/* ================================================================== */
/*  Public: returns every mock data row merged & sorted by date desc  */
/* ================================================================== */

let _cached: UnifiedTransaction[] | null = null;

export const getMockTransactions = (): UnifiedTransaction[] => {
  if (_cached) return _cached;

  const all = [
    ...mapStocks(),
    ...mapMutualFunds(),
    ...mapCrypto(),
    ...mapFixedDeposits(),
    ...mapRealEstate(),
    ...mapMetals(),
    ...mapExpenses(),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  _cached = all;
  return all;
};
