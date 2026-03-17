import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  accountOptions,
  internalSystemTags,
  initialInvestAccountBalances,
  marketInstruments,
  transactionCategories,
  transferCategory,
} from "./constants";
import { calculateUnits, isMarketAsset, toLocalDateTimeInputValue } from "./utils";
import {
  getCryptoPrice,
  getMutualFundPrice,
  getStockPrice,
  searchMarketInstruments,
} from "../../../api/marketDataService";
import {
  addStockHolding,
  addMutualFundHolding,
  addCryptoHolding,
  addManualHolding,
} from "../../../api/portfolioService";
import { createExpense, getCategories, createCategory } from "../../../api/expenseService";
import type { ExpenseCategory } from "../../../api/expenseService";
import type {
  InvestAssetClass,
  InvestForm,
  InvestmentEntry,
  MarketInstrument,
  MessageTone,
  ModalTab,
  TransactionEntry,
  TransactionForm,
  TransferEntry,
  TransferForm,
} from "./types";

export const useAddActivityModalState = () => {
  const [activeTab, setActiveTab] = useState<ModalTab>("transaction");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<MessageTone>("success");

  const [transactionEntries, setTransactionEntries] = useState<TransactionEntry[]>([]);
  const [transferEntries, setTransferEntries] = useState<TransferEntry[]>([]);
  const [investmentEntries, setInvestmentEntries] = useState<InvestmentEntry[]>([]);
  const [investAccountBalances, setInvestAccountBalances] = useState<Record<string, number>>(
    initialInvestAccountBalances
  );

  const [transactionForm, setTransactionForm] = useState<TransactionForm>({
    dateTime: toLocalDateTimeInputValue(),
    account: accountOptions[0],
    title: "",
    amount: "",
    type: "OUT",
    category: transactionCategories[0],
    tags: "",
    notes: "",
  });

  const [transferForm, setTransferForm] = useState<TransferForm>({
    dateTime: toLocalDateTimeInputValue(),
    title: "",
    amount: "",
    outAccount: accountOptions[0],
    inAccount: accountOptions[1],
    category: transferCategory,
    tags: "",
    notes: "",
  });

  const investAccountOptions = useMemo(
    () => Object.keys(investAccountBalances),
    [investAccountBalances]
  );

  const [investForm, setInvestForm] = useState<InvestForm>({
    dateTime: toLocalDateTimeInputValue(),
    outAccount: investAccountOptions[0] ?? "SBI Savings",
    assetClass: "Mutual Fund",
    searchQuery: "",
    selectedSymbol: "",
    investmentAmount: "",
    pricePerUnit: "",
    units: "",
    unitsManuallyEdited: false,
    assetName: "",
    expectedRoi: "",
    maturityDate: "",
    tags: "",
    notes: "",
  });

  const [liveMarketInstruments, setLiveMarketInstruments] = useState<MarketInstrument[]>([]);

  // ── Expense categories: fetch from backend, auto-create missing ones ──
  const [userCategories, setUserCategories] = useState<ExpenseCategory[]>([]);

  useEffect(() => {
    const syncCategories = async () => {
      try {
        const existing = await getCategories();
        setUserCategories(existing);

        // Ensure every UI category (+ "Transfer" and "Income") exists in the DB
        const requiredNames = [...transactionCategories, transferCategory, "Income"];
        const existingNames = new Set(existing.map((c) => c.name));
        const missing = requiredNames.filter((n) => !existingNames.has(n));

        const newlyCreated: ExpenseCategory[] = [];
        for (const name of missing) {
          try {
            const cat = await createCategory({ name });
            newlyCreated.push(cat);
          } catch {
            // Ignore duplicates or other errors
          }
        }

        if (newlyCreated.length > 0) {
          setUserCategories((prev) => [...prev, ...newlyCreated]);
        }
      } catch {
        // Backend unreachable — categories will be empty
      }
    };
    syncCategories();
  }, []);

  /** Resolve a category name to its backend ID for the current user */
  const resolveCategoryId = async (categoryName: string): Promise<number> => {
    // Try from cached list first
    const found = userCategories.find((c) => c.name === categoryName);
    if (found) return found.id;

    // Not found — create it on the fly
    const created = await createCategory({ name: categoryName });
    setUserCategories((prev) => [...prev, created]);
    return created.id;
  };

  const localFilteredMarketInstruments = useMemo(() => {
    if (!isMarketAsset(investForm.assetClass)) {
      return [];
    }

    const query = investForm.searchQuery.trim().toLowerCase();
    return marketInstruments
      .filter((instrument) => instrument.assetClass === investForm.assetClass)
      .filter((instrument) => {
        if (!query) {
          return true;
        }

        return (
          instrument.name.toLowerCase().includes(query) ||
          instrument.symbol.toLowerCase().includes(query)
        );
      })
      .slice(0, 6);
  }, [investForm.assetClass, investForm.searchQuery]);

  useEffect(() => {
    if (!isMarketAsset(investForm.assetClass)) {
      setLiveMarketInstruments([]);
      return;
    }

    // Skip search when a symbol is already selected (user picked from dropdown)
    if (investForm.selectedSymbol) {
      return;
    }

    const query = investForm.searchQuery.trim();
    if (query.length < 2) {
      setLiveMarketInstruments([]);
      return;
    }

    const searchTypeByAssetClass = {
      Stock: "stock",
      "Mutual Fund": "mutual_fund",
      Crypto: "crypto",
    } as const;

    const searchType = searchTypeByAssetClass[investForm.assetClass];
    if (!searchType) {
      setLiveMarketInstruments([]);
      return;
    }

    let isActive = true;
    const timeoutId = window.setTimeout(async () => {
      const results = await searchMarketInstruments(query, searchType);
      if (!isActive) {
        return;
      }

      setLiveMarketInstruments(
        results.map((result) => ({
          symbol: result.symbol,
          name: result.name,
          assetClass: investForm.assetClass,
          mockPrice: 0,
        }))
      );
    }, 300);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [investForm.assetClass, investForm.searchQuery, investForm.selectedSymbol]);

  const filteredMarketInstruments = useMemo(
    () =>
      liveMarketInstruments.length > 0
        ? liveMarketInstruments
        : localFilteredMarketInstruments,
    [liveMarketInstruments, localFilteredMarketInstruments]
  );

  const setMessage = (message: string, tone: MessageTone) => {
    setStatusTone(tone);
    setStatusMessage(message);
  };

  const resetTransactionForm = () => {
    setTransactionForm({
      dateTime: toLocalDateTimeInputValue(),
      account: accountOptions[0],
      title: "",
      amount: "",
      type: "OUT",
      category: transactionCategories[0],
      tags: "",
      notes: "",
    });
  };

  const resetTransferForm = () => {
    setTransferForm({
      dateTime: toLocalDateTimeInputValue(),
      title: "",
      amount: "",
      outAccount: accountOptions[0],
      inAccount: accountOptions[1],
      category: transferCategory,
      tags: "",
      notes: "",
    });
  };

  const resetInvestForm = () => {
    setInvestForm({
      dateTime: toLocalDateTimeInputValue(),
      outAccount: investAccountOptions[0] ?? "SBI Savings",
      assetClass: "Mutual Fund",
      searchQuery: "",
      selectedSymbol: "",
      investmentAmount: "",
      pricePerUnit: "",
      units: "",
      unitsManuallyEdited: false,
      assetName: "",
      expectedRoi: "",
      maturityDate: "",
      tags: "",
      notes: "",
    });
  };

  const handleMockSubmit = async (
    e: FormEvent,
    tab: "transaction" | "transfer"
  ) => {
    e.preventDefault();

    if (
      tab === "transfer" &&
      transferForm.outAccount &&
      transferForm.outAccount === transferForm.inAccount
    ) {
      setMessage("Out account and In account should be different.", "error");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      if (tab === "transaction") {
        const expenseDate = transactionForm.dateTime
          ? transactionForm.dateTime.split("T")[0]
          : new Date().toISOString().split("T")[0];

        // Map the selected category name to a real backend category ID
        const categoryName = transactionForm.category || "Food";
        // For income use "Income" category, for expense use the selected category
        const resolvedName = transactionForm.type === "IN" ? "Income" : categoryName;
        const categoryId = await resolveCategoryId(resolvedName);

        await createExpense({
          amount: Number(transactionForm.amount),
          description: transactionForm.title,
          expenseDate,
          categoryId,
        });

        const newTransaction: TransactionEntry = {
          id: crypto.randomUUID(),
          internalTags: [internalSystemTags.transaction],
          dateTime: transactionForm.dateTime,
          account: transactionForm.account,
          title: transactionForm.title,
          amount: Number(transactionForm.amount),
          type: transactionForm.type,
          category: transactionForm.category,
          tags: transactionForm.tags,
          notes: transactionForm.notes,
        };

        setTransactionEntries((prev) => [newTransaction, ...prev].slice(0, 5));
        setMessage(
          `${transactionForm.type === "IN" ? "Income" : "Expense"} saved to database successfully.`,
          "success"
        );
        resetTransactionForm();
      } else {
        // Transfer: create TWO expense records — outflow and inflow
        const expenseDate = transferForm.dateTime
          ? transferForm.dateTime.split("T")[0]
          : new Date().toISOString().split("T")[0];

        const transferCatId = await resolveCategoryId("Transfer");
        const amount = Number(transferForm.amount);

        // 1. Outflow record (money leaving the out-account)
        await createExpense({
          amount,
          description: `Transfer OUT: ${transferForm.outAccount} → ${transferForm.inAccount} — ${transferForm.title}`,
          expenseDate,
          categoryId: transferCatId,
        });

        // 2. Inflow record (money arriving at the in-account)
        await createExpense({
          amount,
          description: `Transfer IN: ${transferForm.inAccount} ← ${transferForm.outAccount} — ${transferForm.title}`,
          expenseDate,
          categoryId: transferCatId,
        });

        const newTransfer: TransferEntry = {
          id: crypto.randomUUID(),
          internalTags: [internalSystemTags.transfer],
          dateTime: transferForm.dateTime,
          title: transferForm.title,
          amount,
          outAccount: transferForm.outAccount,
          inAccount: transferForm.inAccount,
          category: transferForm.category,
          tags: transferForm.tags,
          notes: transferForm.notes,
        };

        setTransferEntries((prev) => [newTransfer, ...prev].slice(0, 5));
        setMessage("Transfer saved to database (2 entries: outflow + inflow).", "success");
        resetTransferForm();
      }
    } catch (error) {
      console.error("Failed to save", tab, error);
      setMessage(
        `Failed to save ${tab}. Please check if the backend is running and try again.`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInvestAssetClassChange = (assetClass: InvestAssetClass) => {
    setInvestForm((prev) => ({
      ...prev,
      assetClass,
      searchQuery: "",
      selectedSymbol: "",
      pricePerUnit: "",
      units: "",
      unitsManuallyEdited: false,
      assetName: "",
      maturityDate: "",
    }));
  };

  const handleMarketAmountOrPriceChange = (
    field: "investmentAmount" | "pricePerUnit",
    value: string
  ) => {
    setInvestForm((prev) => {
      const next = { ...prev, [field]: value };

      if (!next.unitsManuallyEdited) {
        next.units = calculateUnits(next.investmentAmount, next.pricePerUnit);
      }

      return next;
    });
  };

  const handleInstrumentPick = async (instrument: MarketInstrument) => {
    setIsPriceLoading(true);

    try {
      let fetchedPrice = instrument.mockPrice;

      if (instrument.assetClass === "Stock") {
        const stockData = await getStockPrice(instrument.symbol);
        fetchedPrice = Number(stockData.current_price);
      } else if (instrument.assetClass === "Mutual Fund") {
        const mfData = await getMutualFundPrice(instrument.symbol);
        fetchedPrice = Number(mfData.nav);
      } else if (instrument.assetClass === "Crypto") {
        const cryptoData = await getCryptoPrice(instrument.symbol.toLowerCase());
        fetchedPrice = Number(cryptoData.current_price);
      }

      const resolvedPrice = Number.isFinite(fetchedPrice)
        ? Math.round(fetchedPrice * 100) / 100
        : 0;

      setInvestForm((prev) => {
        const next = {
          ...prev,
          searchQuery: `${instrument.symbol} - ${instrument.name}`,
          selectedSymbol: instrument.symbol,
          pricePerUnit: resolvedPrice > 0 ? resolvedPrice.toString() : prev.pricePerUnit,
        };

        if (!next.unitsManuallyEdited) {
          next.units = calculateUnits(next.investmentAmount, next.pricePerUnit);
        }

        return next;
      });
    } catch (error) {
      console.error("Failed to fetch live price for selected instrument", error);
      setMessage("Could not fetch live price. Please try another symbol.", "error");
    } finally {
      setIsPriceLoading(false);
    }
  };

  const handleInvestSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const marketFlow = isMarketAsset(investForm.assetClass);
    const amount = Number(investForm.investmentAmount);

    if (!investForm.dateTime || !investForm.outAccount || !investForm.assetClass) {
      setMessage("Date/Time, Out Account and Asset Class are mandatory.", "error");
      return;
    }

    if (!amount || amount <= 0) {
      setMessage("Investment Amount should be greater than 0.", "error");
      return;
    }

    if (marketFlow) {
      if (!investForm.selectedSymbol) {
        setMessage("Select a symbol/scheme from search before saving.", "error");
        return;
      }

      if (!Number(investForm.pricePerUnit) || Number(investForm.pricePerUnit) <= 0) {
        setMessage("Price / NAV must be greater than 0 for market assets.", "error");
        return;
      }

      if (!Number(investForm.units) || Number(investForm.units) <= 0) {
        setMessage("Units / Quantity must be greater than 0.", "error");
        return;
      }
    } else {
      if (!investForm.assetName.trim()) {
        setMessage("Asset Name is mandatory for Fixed Deposit and Real Estate.", "error");
        return;
      }

      if (investForm.assetClass === "Fixed Deposit" && !investForm.maturityDate) {
        setMessage("Maturity Date is required for Fixed Deposit.", "error");
        return;
      }
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    // Extract purchaseDate in YYYY-MM-DD format for the backend
    const purchaseDate = investForm.dateTime
      ? investForm.dateTime.split("T")[0]
      : new Date().toISOString().split("T")[0];

    try {
      /* ------------------------------------------------------------ */
      /*  Route to the correct backend POST endpoint by asset class   */
      /* ------------------------------------------------------------ */

      if (investForm.assetClass === "Stock") {
        // Parse exchange from symbol (e.g., "NSE:RELIANCE" → exchange "NSE", symbol "RELIANCE")
        const rawSymbol = investForm.selectedSymbol;
        let exchange = "";
        let symbol = rawSymbol;

        if (rawSymbol.includes(":")) {
          const parts = rawSymbol.split(":");
          exchange = parts[0];
          symbol = parts[1];
        } else if (rawSymbol.includes(".")) {
          // Handle Yahoo-style symbols like "TCS.NS" → exchange "NSE", symbol "TCS"
          const parts = rawSymbol.split(".");
          symbol = parts[0];
          exchange = parts[1] === "NS" ? "NSE" : parts[1] === "BO" ? "BSE" : parts[1];
        }

        await addStockHolding({
          symbol,
          exchange,
          quantity: Number(investForm.units),
          purchasePrice: Number(investForm.pricePerUnit),
          purchaseDate,
        });
      } else if (investForm.assetClass === "Mutual Fund") {
        await addMutualFundHolding({
          schemeCode: investForm.selectedSymbol,
          quantity: Number(investForm.units),
          purchasePrice: Number(investForm.pricePerUnit),
          purchaseDate,
        });
      } else if (investForm.assetClass === "Crypto") {
        // For crypto, coinId is the CoinGecko id (e.g., "bitcoin") and symbol is "BTC"
        const rawSymbol = investForm.selectedSymbol;
        await addCryptoHolding({
          coinId: rawSymbol.toLowerCase(),
          symbol: rawSymbol.toUpperCase(),
          quantity: Number(investForm.units),
          purchasePrice: Number(investForm.pricePerUnit),
          purchaseDate,
        });
      } else {
        // Fixed Deposit / Real Estate → manual holding
        const assetTypeMap: Record<string, string> = {
          "Fixed Deposit": "FD",
          "Real Estate": "Real Estate",
        };

        await addManualHolding({
          assetName: investForm.assetName.trim(),
          assetType: assetTypeMap[investForm.assetClass] ?? investForm.assetClass,
          investedValue: amount,
          currentValue: amount, // At purchase time, current = invested
          purchaseDate,
          maturityDate:
            investForm.assetClass === "Fixed Deposit" && investForm.maturityDate
              ? investForm.maturityDate
              : null,
        });
      }

      /* ------------------------------------------------------------ */
      /*  On success: update local UI entries for display             */
      /* ------------------------------------------------------------ */

      const entryAssetName = marketFlow
        ? investForm.selectedSymbol
        : investForm.assetName.trim();

      const newEntry: InvestmentEntry = {
        id: crypto.randomUUID(),
        internalTags: [internalSystemTags.investment],
        dateTime: investForm.dateTime,
        outAccount: investForm.outAccount,
        assetClass: investForm.assetClass,
        assetName: entryAssetName,
        amount,
        pricePerUnit: marketFlow ? Number(investForm.pricePerUnit) : undefined,
        units: marketFlow ? Number(investForm.units) : undefined,
        expectedRoi: investForm.expectedRoi
          ? Number(investForm.expectedRoi)
          : undefined,
        maturityDate: investForm.assetClass === "Fixed Deposit"
          ? investForm.maturityDate
          : undefined,
        tags: investForm.tags,
        notes: investForm.notes,
      };

      setInvestmentEntries((prev) => [newEntry, ...prev].slice(0, 8));
      setMessage(
        `${investForm.assetClass} investment saved to database successfully.`,
        "success"
      );
      resetInvestForm();
    } catch (error) {
      console.error("Failed to save investment", error);
      setMessage(
        "Failed to save investment. Please check if the backend is running and try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    isSubmitting,
    isPriceLoading,
    statusMessage,
    statusTone,
    setStatusMessage,
    transactionEntries,
    transferEntries,
    investmentEntries,
    investAccountBalances,
    investAccountOptions,
    transactionForm,
    setTransactionForm,
    transferForm,
    setTransferForm,
    investForm,
    setInvestForm,
    filteredMarketInstruments,
    userCategories,
    handleMockSubmit,
    handleInvestSubmit,
    handleInvestAssetClassChange,
    handleMarketAmountOrPriceChange,
    handleInstrumentPick,
  };
};
