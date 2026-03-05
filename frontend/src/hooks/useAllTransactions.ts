import { useState, useEffect } from "react";
import {
  getStockHoldings,
  getMutualFundHoldings,
  getCryptoHoldings,
  getManualHoldings,
} from "../api/portfolioService";
import { getExpenses } from "../api/expenseService";
import { getMockTransactions } from "../data/mockTransactionMapper";

/* ------------------------------------------------------------------ */
/*  Unified row that every data source maps into                      */
/* ------------------------------------------------------------------ */

export type TransactionType =
  | "Stock Buy"
  | "MF Buy"
  | "Crypto Buy"
  | "Fixed Deposit"
  | "Real Estate"
  | "Manual"
  | "Expense"
  | "Transfer";

export type UnifiedTransaction = {
  id: string;
  date: string;             // ISO string (YYYY-MM-DD or full ISO)
  type: TransactionType;
  category: string;         // asset class or expense category
  description: string;      // symbol / scheme / asset name / expense desc
  amount: number;           // always positive
  direction: "IN" | "OUT";  // money flow
  quantity: number | null;
  pricePerUnit: number | null;
  account: string;          // source or "Portfolio"
  status: "Completed";
  tags: string[];
  source: "portfolioService" | "expenseService";
  externalId: string;
};

export type UseAllTransactionsReturn = {
  transactions: UnifiedTransaction[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

export const useAllTransactions = (): UseAllTransactionsReturn => {
  const [transactions, setTransactions] = useState<UnifiedTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = () => setTick((t) => t + 1);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const [stocks, mfs, cryptos, manuals, expenses] = await Promise.all([
          getStockHoldings().catch(() => []),
          getMutualFundHoldings().catch(() => []),
          getCryptoHoldings().catch(() => []),
          getManualHoldings().catch(() => []),
          getExpenses().catch(() => []),
        ]);

        if (cancelled) return;

        const rows: UnifiedTransaction[] = [];

        /* ---------- Stock holdings ---------- */
        for (const s of stocks) {
          rows.push({
            id: `stock-${s.id}`,
            date: s.purchaseDate ?? s.createdAt,
            type: "Stock Buy",
            category: "Stocks",
            description: `${s.symbol}${s.exchange ? ` (${s.exchange})` : ""}`,
            amount: s.quantity * s.purchasePrice,
            direction: "OUT",
            quantity: s.quantity,
            pricePerUnit: s.purchasePrice,
            account: "Portfolio",
            status: "Completed",
            tags: ["investment", "stock"],
            source: "portfolioService",
            externalId: s.externalId,
          });
        }

        /* ---------- Mutual Fund holdings ---------- */
        for (const m of mfs) {
          rows.push({
            id: `mf-${m.id}`,
            date: m.purchaseDate ?? m.createdAt,
            type: "MF Buy",
            category: "Mutual Funds",
            description: `Scheme ${m.schemeCode}`,
            amount: m.quantity * m.purchasePrice,
            direction: "OUT",
            quantity: m.quantity,
            pricePerUnit: m.purchasePrice,
            account: "Portfolio",
            status: "Completed",
            tags: ["investment", "mutual-fund"],
            source: "portfolioService",
            externalId: m.externalId,
          });
        }

        /* ---------- Crypto holdings ---------- */
        for (const c of cryptos) {
          rows.push({
            id: `crypto-${c.id}`,
            date: c.purchaseDate ?? c.createdAt,
            type: "Crypto Buy",
            category: "Crypto",
            description: `${c.symbol}${c.coinId ? ` (${c.coinId})` : ""}`,
            amount: c.quantity * c.purchasePrice,
            direction: "OUT",
            quantity: c.quantity,
            pricePerUnit: c.purchasePrice,
            account: "Portfolio",
            status: "Completed",
            tags: ["investment", "crypto"],
            source: "portfolioService",
            externalId: c.externalId,
          });
        }

        /* ---------- Manual holdings (FD / Real Estate / Gold) ---------- */
        for (const h of manuals) {
          const assetType = h.assetType?.toUpperCase() === "FD"
            ? "Fixed Deposit"
            : h.assetType === "Real Estate"
              ? "Real Estate"
              : "Manual";

          rows.push({
            id: `manual-${h.id}`,
            date: h.purchaseDate ?? h.createdAt,
            type: assetType as TransactionType,
            category: assetType,
            description: h.assetName,
            amount: h.investedValue,
            direction: "OUT",
            quantity: null,
            pricePerUnit: null,
            account: "Portfolio",
            status: "Completed",
            tags: ["investment", h.assetType?.toLowerCase() ?? "manual"],
            source: "portfolioService",
            externalId: h.externalId,
          });
        }

        /* ---------- Expenses ---------- */
        for (const e of expenses) {
          const isTransfer = e.description?.startsWith("Transfer:");

          rows.push({
            id: `expense-${e.id}`,
            date: e.expenseDate ?? e.createdAt,
            type: isTransfer ? "Transfer" : "Expense",
            category: e.category?.name ?? "Uncategorized",
            description: e.description,
            amount: e.amount,
            direction: "OUT",
            quantity: null,
            pricePerUnit: null,
            account: "Expense",
            status: "Completed",
            tags: isTransfer ? ["transfer"] : ["expense"],
            source: "expenseService",
            externalId: e.externalId,
          });
        }

        // Sort by date descending (newest first)
        rows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // If all APIs returned empty (backend not running), use mock data
        if (rows.length === 0) {
          setTransactions(getMockTransactions());
        } else {
          setTransactions(rows);
        }
      } catch (err) {
        if (!cancelled) {
          setIsError(true);
          setError(err instanceof Error ? err : new Error("Failed to fetch transactions"));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [tick]);

  return { transactions, isLoading, isError, error, refetch };
};
