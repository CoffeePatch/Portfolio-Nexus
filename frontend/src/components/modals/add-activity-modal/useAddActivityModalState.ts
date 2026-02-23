import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  accountOptions,
  internalSystemTags,
  initialInvestAccountBalances,
  marketInstruments,
  transactionCategories,
  transferCategory,
} from "./constants";
import { calculateUnits, formatAmount, isMarketAsset, toLocalDateTimeInputValue } from "./utils";
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

  const filteredMarketInstruments = useMemo(() => {
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

  const handleMockSubmit = (
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

    window.setTimeout(() => {
      if (tab === "transaction") {
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
      } else {
        const newTransfer: TransferEntry = {
          id: crypto.randomUUID(),
          internalTags: [internalSystemTags.transfer],
          dateTime: transferForm.dateTime,
          title: transferForm.title,
          amount: Number(transferForm.amount),
          outAccount: transferForm.outAccount,
          inAccount: transferForm.inAccount,
          category: transferForm.category,
          tags: transferForm.tags,
          notes: transferForm.notes,
        };

        setTransferEntries((prev) => [newTransfer, ...prev].slice(0, 5));
      }

      setIsSubmitting(false);
      setMessage(
        tab === "transaction"
          ? "Transaction saved to mock data successfully."
          : "Transfer saved to mock data successfully.",
        "success"
      );

      if (tab === "transaction") {
        resetTransactionForm();
      } else {
        resetTransferForm();
      }
    }, 450);
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

  const handleInstrumentPick = (instrument: MarketInstrument) => {
    setInvestForm((prev) => {
      const next = {
        ...prev,
        searchQuery: `${instrument.symbol} - ${instrument.name}`,
        selectedSymbol: instrument.symbol,
        pricePerUnit: instrument.mockPrice.toString(),
      };

      if (!next.unitsManuallyEdited) {
        next.units = calculateUnits(next.investmentAmount, next.pricePerUnit);
      }

      return next;
    });
  };

  const handleInvestSubmit = (e: FormEvent) => {
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

    const availableBalance = investAccountBalances[investForm.outAccount] ?? 0;

    if (availableBalance < amount) {
      setMessage(
        `Insufficient balance in ${investForm.outAccount}. Available: ${formatAmount(
          availableBalance
        )}`,
        "error"
      );
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    window.setTimeout(() => {
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

      const nextBalances = {
        ...investAccountBalances,
        [investForm.outAccount]: availableBalance - amount,
      };

      const nextInvestments = (() => {
        const existingIndex = investmentEntries.findIndex(
          (entry) =>
            entry.assetClass === newEntry.assetClass &&
            entry.assetName === newEntry.assetName
        );

        if (existingIndex === -1) {
          return [newEntry, ...investmentEntries].slice(0, 8);
        }

        const existingEntry = investmentEntries[existingIndex];
        const updatedEntry: InvestmentEntry = {
          ...existingEntry,
          internalTags: Array.from(
            new Set([...existingEntry.internalTags, ...newEntry.internalTags])
          ),
          dateTime: newEntry.dateTime,
          outAccount: newEntry.outAccount,
          amount: existingEntry.amount + newEntry.amount,
          pricePerUnit: newEntry.pricePerUnit ?? existingEntry.pricePerUnit,
          units:
            typeof existingEntry.units === "number" ||
            typeof newEntry.units === "number"
              ? (existingEntry.units ?? 0) + (newEntry.units ?? 0)
              : undefined,
          expectedRoi: newEntry.expectedRoi ?? existingEntry.expectedRoi,
          maturityDate: newEntry.maturityDate ?? existingEntry.maturityDate,
          tags: [existingEntry.tags, newEntry.tags]
            .filter(Boolean)
            .join(" | "),
          notes: [existingEntry.notes, newEntry.notes]
            .filter(Boolean)
            .join(" | "),
        };

        const updatedEntries = [...investmentEntries];
        updatedEntries.splice(existingIndex, 1);
        return [updatedEntry, ...updatedEntries].slice(0, 8);
      })();

      setInvestAccountBalances(nextBalances);
      setInvestmentEntries(nextInvestments);
      setIsSubmitting(false);
      setMessage(
        "Investment saved. Mock dual execution completed: amount deducted and holding updated.",
        "success"
      );
      resetInvestForm();
    }, 500);
  };

  return {
    activeTab,
    setActiveTab,
    isSubmitting,
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
    handleMockSubmit,
    handleInvestSubmit,
    handleInvestAssetClassChange,
    handleMarketAmountOrPriceChange,
    handleInstrumentPick,
  };
};
