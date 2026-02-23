import type { InvestAssetClass, MarketInstrument } from "./types";

export const accountOptions = [
  "Main Wallet",
  "Savings Account",
  "Salary Account",
  "Cash",
  "Credit Card",
];

export const transactionCategories = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Income",
  "Bills",
  "Health",
];

export const transferCategory = "Transfer";

export const investAssetClassOptions: InvestAssetClass[] = [
  "Mutual Fund",
  "Stock",
  "Crypto",
  "Fixed Deposit",
  "Real Estate",
];

export const marketAssetClasses: InvestAssetClass[] = [
  "Mutual Fund",
  "Stock",
  "Crypto",
];

export const initialInvestAccountBalances: Record<string, number> = {
  "SBI Savings": 325000,
  "Zerodha Wallet": 185000,
  "HDFC Salary": 142500,
  "Emergency Fund": 95000,
};

export const marketInstruments: MarketInstrument[] = [
  { symbol: "TCS.NS", name: "Tata Consultancy Services", assetClass: "Stock", mockPrice: 4125.2 },
  { symbol: "TATAMOTORS.NS", name: "Tata Motors", assetClass: "Stock", mockPrice: 985.4 },
  { symbol: "INFY.NS", name: "Infosys", assetClass: "Stock", mockPrice: 1662.75 },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank", assetClass: "Stock", mockPrice: 1745.9 },
  { symbol: "MOTILALMIDC150-G", name: "Motilal Oswal Midcap Fund", assetClass: "Mutual Fund", mockPrice: 82.13 },
  { symbol: "PPFAS-FLEXI-G", name: "Parag Parikh Flexi Cap Fund", assetClass: "Mutual Fund", mockPrice: 69.84 },
  { symbol: "BTCINR", name: "Bitcoin", assetClass: "Crypto", mockPrice: 5685400 },
  { symbol: "ETHINR", name: "Ethereum", assetClass: "Crypto", mockPrice: 286900 },
];

export const internalSystemTags = {
  transaction: "system:transaction",
  transfer: "system:transfer",
  investment: "system:investment",
} as const;

export const inputBaseClassName =
  "w-full rounded-xl border border-slate-700/60 bg-black px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-slate-300 focus:bg-black focus:outline-none focus:ring-2 focus:ring-slate-300/20";

export const labelBaseClassName =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400";

export const primaryButtonClassName =
  "flex-1 rounded-xl border border-slate-200 bg-slate-100 px-6 py-3 font-semibold text-black shadow-sm transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButtonClassName =
  "flex-1 rounded-xl border border-slate-700/70 bg-black px-6 py-3 font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-900";

export const sectionHeaderClassName =
  "rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3";

export const sectionHeaderTextClassName =
  "text-xs font-semibold uppercase tracking-wider text-slate-200";
