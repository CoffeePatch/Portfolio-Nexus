import { useState, useMemo, useCallback } from "react";
import { useAllTransactions } from "../hooks/useAllTransactions";
import type { UnifiedTransaction, TransactionType } from "../hooks/useAllTransactions";
import { deleteExpense, updateExpense, getCategories } from "../api/expenseService";
import type { ExpenseCategory } from "../api/expenseService";
import {
  deleteStockHolding,
  deleteMutualFundHolding,
  deleteCryptoHolding,
  deleteManualHolding,
} from "../api/portfolioService";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(n);

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
};

type SortDir = "asc" | "desc";
type SortKey = keyof UnifiedTransaction;

/* ------------------------------------------------------------------ */
/*  Column filter dropdown                                            */
/* ------------------------------------------------------------------ */

const ColumnFilter = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <select
    aria-label={`Filter by ${label}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="rounded-lg border border-slate-700/60 bg-black px-2 py-1.5 text-xs text-slate-300 transition-all hover:border-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
  >
    <option value="__all__">All {label}</option>
    {options.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
);

/* ------------------------------------------------------------------ */
/*  Type badge                                                        */
/* ------------------------------------------------------------------ */

const typeBadgeColors: Record<TransactionType, string> = {
  "Stock Buy": "bg-blue-500/15 text-blue-400 ring-blue-500/25",
  "MF Buy": "bg-violet-500/15 text-violet-400 ring-violet-500/25",
  "Crypto Buy": "bg-amber-500/15 text-amber-400 ring-amber-500/25",
  "Fixed Deposit": "bg-teal-500/15 text-teal-400 ring-teal-500/25",
  "Real Estate": "bg-rose-500/15 text-rose-400 ring-rose-500/25",
  Manual: "bg-slate-500/15 text-slate-400 ring-slate-500/25",
  Expense: "bg-red-500/15 text-red-400 ring-red-500/25",
  Transfer: "bg-sky-500/15 text-sky-400 ring-sky-500/25",
};

const typeIcons: Record<TransactionType, string> = {
  "Stock Buy": "candlestick_chart",
  "MF Buy": "pie_chart",
  "Crypto Buy": "currency_bitcoin",
  "Fixed Deposit": "account_balance",
  "Real Estate": "home_work",
  Manual: "edit_note",
  Expense: "receipt_long",
  Transfer: "sync_alt",
};

/* ------------------------------------------------------------------ */
/*  Page size options                                                 */
/* ------------------------------------------------------------------ */

const PAGE_SIZES = [25, 50, 100, 250] as const;

/* ------------------------------------------------------------------ */
/*  Main page component                                               */
/* ------------------------------------------------------------------ */

const Transactions = () => {
  const { transactions, isLoading, isError, error, refetch } = useAllTransactions();

  /* filter state */
  const [globalSearch, setGlobalSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("__all__");
  const [categoryFilter, setCategoryFilter] = useState("__all__");
  const [directionFilter, setDirectionFilter] = useState("__all__");
  const [accountFilter, setAccountFilter] = useState("__all__");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  /* sort state */
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  /* pagination */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(25);

  /* ---------- extract unique values for dropdowns ---------- */

  const uniqueTypes = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.type))).sort(),
    [transactions]
  );

  const uniqueCategories = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.category))).sort(),
    [transactions]
  );

  const uniqueAccounts = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.account))).sort(),
    [transactions]
  );

  /* ---------- filtering ---------- */

  const filtered = useMemo(() => {
    const q = globalSearch.toLowerCase().trim();

    return transactions.filter((t) => {
      if (typeFilter !== "__all__" && t.type !== typeFilter) return false;
      if (categoryFilter !== "__all__" && t.category !== categoryFilter) return false;
      if (directionFilter !== "__all__" && t.direction !== directionFilter) return false;
      if (accountFilter !== "__all__" && t.account !== accountFilter) return false;

      if (dateFrom) {
        const from = new Date(dateFrom).getTime();
        const td = new Date(t.date).getTime();
        if (td < from) return false;
      }
      if (dateTo) {
        const to = new Date(dateTo).getTime() + 86400000; // end of day
        const td = new Date(t.date).getTime();
        if (td > to) return false;
      }

      if (q) {
        const haystack = [
          t.description,
          t.type,
          t.category,
          t.account,
          t.direction,
          formatCurrency(t.amount),
          ...(t.tags ?? []),
        ].join(" ").toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [transactions, globalSearch, typeFilter, categoryFilter, directionFilter, accountFilter, dateFrom, dateTo]);

  /* ---------- sorting ---------- */

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let va: string | number = (a as Record<string, unknown>)[sortKey] as string | number;
      let vb: string | number = (b as Record<string, unknown>)[sortKey] as string | number;

      if (sortKey === "date") {
        va = new Date(va as string).getTime();
        vb = new Date(vb as string).getTime();
      }

      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();

      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  /* ---------- pagination ---------- */

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // Reset to page 1 when filters change
  const resetPage = useCallback(() => setPage(1), []);

  /* ---------- sort toggle ---------- */

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return "unfold_more";
    return sortDir === "asc" ? "expand_less" : "expand_more";
  };

  /* ---------- summary stats ---------- */

  const totalAmount = useMemo(() => filtered.reduce((s, t) => s + t.amount, 0), [filtered]);
  const investmentCount = useMemo(
    () => filtered.filter((t) => t.source === "portfolioService").length,
    [filtered]
  );
  const expenseCount = useMemo(
    () => filtered.filter((t) => t.source === "expenseService").length,
    [filtered]
  );

  /* ---------- clear all filters ---------- */

  const clearFilters = () => {
    setGlobalSearch("");
    setTypeFilter("__all__");
    setCategoryFilter("__all__");
    setDirectionFilter("__all__");
    setAccountFilter("__all__");
    setDateFrom("");
    setDateTo("");
    resetPage();
  };

  const hasActiveFilters =
    globalSearch || typeFilter !== "__all__" || categoryFilter !== "__all__" ||
    directionFilter !== "__all__" || accountFilter !== "__all__" || dateFrom || dateTo;

  /* ---------- edit / delete state ---------- */

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingTx, setEditingTx] = useState<UnifiedTransaction | null>(null);
  const [editForm, setEditForm] = useState({ description: "", amount: "", date: "", categoryId: 0 });
  const [editCategories, setEditCategories] = useState<ExpenseCategory[]>([]);
  const [editSaving, setEditSaving] = useState(false);

  /* ---------- delete handler ---------- */

  const handleDelete = async (t: UnifiedTransaction) => {
    if (!confirm(`Delete "${t.description}"?`)) return;
    setDeletingId(t.id);
    try {
      if (t.source === "expenseService") {
        await deleteExpense(t.externalId);
      } else {
        // portfolio holdings: determine type
        if (t.type === "Stock Buy") await deleteStockHolding(t.externalId);
        else if (t.type === "MF Buy") await deleteMutualFundHolding(t.externalId);
        else if (t.type === "Crypto Buy") await deleteCryptoHolding(t.externalId);
        else await deleteManualHolding(t.externalId);
      }
      refetch();
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  /* ---------- edit handler ---------- */

  const openEdit = async (t: UnifiedTransaction) => {
    if (t.source !== "expenseService") return;
    setEditingTx(t);
    setEditForm({
      description: t.description,
      amount: String(t.amount),
      date: t.date,
      categoryId: 0,
    });
    try {
      const cats = await getCategories();
      setEditCategories(cats);
      const match = cats.find((c) => c.name === t.category);
      if (match) setEditForm((f) => ({ ...f, categoryId: match.id }));
    } catch {
      setEditCategories([]);
    }
  };

  const handleEditSave = async () => {
    if (!editingTx) return;
    setEditSaving(true);
    try {
      await updateExpense(editingTx.externalId, {
        amount: parseFloat(editForm.amount),
        description: editForm.description,
        expenseDate: editForm.date,
        categoryId: editForm.categoryId,
      });
      setEditingTx(null);
      refetch();
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setEditSaving(false);
    }
  };

  /* ================================================================== */
  /*  RENDER                                                            */
  /* ================================================================== */

  return (
    <div className="space-y-5 px-6 py-6">
      {/* -------- Header -------- */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Transactions</h1>
          <p className="text-sm text-slate-400">
            All investments, expenses and transfers in one place.
          </p>
        </div>

        <button
          onClick={refetch}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800 disabled:opacity-50"
        >
          <span
            className={`material-symbols-outlined text-base ${isLoading ? "animate-spin" : ""}`}
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
          >
            refresh
          </span>
          Refresh
        </button>
      </header>

      {/* -------- Summary cards -------- */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Total Records", value: filtered.length.toString(), icon: "database", color: "text-slate-300" },
          { label: "Total Amount", value: formatCurrency(totalAmount), icon: "payments", color: "text-emerald-400" },
          { label: "Investments", value: investmentCount.toString(), icon: "trending_up", color: "text-blue-400" },
          { label: "Expenses", value: expenseCount.toString(), icon: "receipt_long", color: "text-red-400" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-800/50 bg-gradient-to-br from-[#000] via-[#0a0a0a] to-[#000] p-4"
          >
            <div className="flex items-center gap-2">
              <span
                className={`material-symbols-outlined text-lg ${card.color}`}
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
              >{card.icon}</span>
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{card.label}</span>
            </div>
            <p className={`mt-1 text-lg font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* -------- Filters bar -------- */}
      <div className="rounded-xl border border-slate-800/50 bg-gradient-to-br from-[#000] via-[#0a0a0a] to-[#000] p-4">
        {/* row 1: global search + date range */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
            <input
              type="text"
              placeholder="Search across all columns..."
              value={globalSearch}
              onChange={(e) => { setGlobalSearch(e.target.value); resetPage(); }}
              className="w-full rounded-xl border border-slate-700/60 bg-black py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500/40"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); resetPage(); }}
              className="rounded-lg border border-slate-700/60 bg-black px-2 py-1.5 text-xs text-slate-300 focus:border-slate-500 focus:outline-none"
            />
            <label className="text-xs text-slate-500">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); resetPage(); }}
              className="rounded-lg border border-slate-700/60 bg-black px-2 py-1.5 text-xs text-slate-300 focus:border-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* row 2: column-level filters */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <ColumnFilter label="Type" options={uniqueTypes} value={typeFilter} onChange={(v) => { setTypeFilter(v); resetPage(); }} />
          <ColumnFilter label="Category" options={uniqueCategories} value={categoryFilter} onChange={(v) => { setCategoryFilter(v); resetPage(); }} />
          <ColumnFilter label="Direction" options={["IN", "OUT"]} value={directionFilter} onChange={(v) => { setDirectionFilter(v); resetPage(); }} />
          <ColumnFilter label="Account" options={uniqueAccounts} value={accountFilter} onChange={(v) => { setAccountFilter(v); resetPage(); }} />

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 rounded-lg border border-slate-700/40 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 transition-all hover:border-slate-500 hover:text-slate-200"
            >
              <span className="material-symbols-outlined text-sm">filter_alt_off</span>
              Clear All
            </button>
          )}

          <span className="text-xs text-slate-500 ml-auto">{filtered.length} of {transactions.length} records</span>
        </div>
      </div>

      {/* -------- Error state -------- */}
      {isError && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 px-4 py-3 text-sm text-rose-300">
          {error?.message ?? "Failed to load transactions. Make sure the backend is running."}
        </div>
      )}

      {/* -------- Spreadsheet table -------- */}
      <div className="rounded-xl border border-slate-800/50 bg-gradient-to-br from-[#000] via-[#0a0a0a] to-[#000] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm">
              <tr className="border-b border-slate-800/70">
                {([
                  { key: "date", label: "Date", align: "left", width: "w-[130px]" },
                  { key: "type", label: "Type", align: "left", width: "w-[130px]" },
                  { key: "description", label: "Description", align: "left", width: "min-w-[200px]" },
                  { key: "category", label: "Category", align: "left", width: "w-[140px]" },
                  { key: "amount", label: "Amount", align: "right", width: "w-[140px]" },
                  { key: "direction", label: "Flow", align: "center", width: "w-[80px]" },
                  { key: "quantity", label: "Qty", align: "right", width: "w-[100px]" },
                  { key: "pricePerUnit", label: "Price/Unit", align: "right", width: "w-[120px]" },
                  { key: "account", label: "Account", align: "left", width: "w-[120px]" },
                  { key: "tags", label: "Tags", align: "left", width: "w-[120px]" },
                ] as { key: SortKey; label: string; align: string; width: string }[]).map(
                  (col) => (
                    <th
                      key={col.key}
                      className={`${col.width} cursor-pointer select-none px-3 py-3 text-${col.align} text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-300`}
                      onClick={() => toggleSort(col.key)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 300" }}>
                          {sortIcon(col.key)}
                        </span>
                      </span>
                    </th>
                  )
                )}
                <th className="w-[90px] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/40">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={`skel-${i}`}>
                    {Array.from({ length: 11 }).map((_, j) => (
                      <td key={j} className="px-3 py-3">
                        <div className="h-4 w-full animate-pulse rounded bg-slate-800/60" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-16 text-center">
                    <span
                      className="material-symbols-outlined text-5xl text-slate-700"
                      style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
                    >
                      search_off
                    </span>
                    <p className="mt-2 text-sm text-slate-500">
                      {transactions.length === 0
                        ? "No transactions found. Add investments or expenses to see them here."
                        : "No transactions match the current filters."}
                    </p>
                  </td>
                </tr>
              ) : (
                paged.map((t) => {
                  const badgeClass = typeBadgeColors[t.type] ?? typeBadgeColors.Manual;
                  const icon = typeIcons[t.type] ?? "receipt_long";

                  return (
                    <tr
                      key={t.id}
                      className="group transition-colors hover:bg-slate-900/40"
                    >
                      {/* Date */}
                      <td className="px-3 py-3 text-xs text-slate-400 whitespace-nowrap">
                        {formatDate(t.date)}
                      </td>

                      {/* Type badge */}
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold ring-1 ${badgeClass}`}
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
                          >{icon}</span>
                          {t.type}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="px-3 py-3">
                        <p className="text-sm font-medium text-white truncate max-w-[280px]" title={t.description}>
                          {t.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="px-3 py-3 text-xs text-slate-400">{t.category}</td>

                      {/* Amount */}
                      <td className="px-3 py-3 text-right text-sm font-bold tabular-nums text-slate-100">
                        {formatCurrency(t.amount)}
                      </td>

                      {/* Direction */}
                      <td className="px-3 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
                            t.direction === "IN"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          <span className="material-symbols-outlined text-xs">
                            {t.direction === "IN" ? "arrow_downward" : "arrow_upward"}
                          </span>
                          {t.direction}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="px-3 py-3 text-right text-xs tabular-nums text-slate-400">
                        {t.quantity != null ? t.quantity.toLocaleString("en-IN", { maximumFractionDigits: 6 }) : "—"}
                      </td>

                      {/* Price per unit */}
                      <td className="px-3 py-3 text-right text-xs tabular-nums text-slate-400">
                        {t.pricePerUnit != null ? formatCurrency(t.pricePerUnit) : "—"}
                      </td>

                      {/* Account */}
                      <td className="px-3 py-3 text-xs text-slate-400">{t.account}</td>

                      {/* Tags */}
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {t.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-slate-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {t.source === "expenseService" && (
                            <button
                              title="Edit"
                              onClick={() => openEdit(t)}
                              className="rounded-lg p-1.5 text-slate-500 transition-all hover:bg-slate-800 hover:text-blue-400"
                            >
                              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>edit</span>
                            </button>
                          )}
                          <button
                            title="Delete"
                            onClick={() => handleDelete(t)}
                            disabled={deletingId === t.id}
                            className="rounded-lg p-1.5 text-slate-500 transition-all hover:bg-slate-800 hover:text-red-400 disabled:opacity-30"
                          >
                            <span className={`material-symbols-outlined text-base ${deletingId === t.id ? "animate-spin" : ""}`} style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                              {deletingId === t.id ? "progress_activity" : "delete"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* -------- Pagination bar -------- */}
        {!isLoading && sorted.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/60 px-4 py-3">
            {/* Page size */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">Rows per page</label>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="rounded-lg border border-slate-700/60 bg-black px-2 py-1 text-xs text-slate-300 transition-all hover:border-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Page info */}
            <span className="text-xs text-slate-500">
              Page {page} of {totalPages} &nbsp;·&nbsp; Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
            </span>

            {/* Page nav */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="rounded-lg border border-slate-700/40 bg-black px-2 py-1 text-xs text-slate-400 disabled:opacity-30 hover:bg-slate-900"
              >
                <span className="material-symbols-outlined text-sm">first_page</span>
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-slate-700/40 bg-black px-2 py-1 text-xs text-slate-400 disabled:opacity-30 hover:bg-slate-900"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-slate-700/40 bg-black px-2 py-1 text-xs text-slate-400 disabled:opacity-30 hover:bg-slate-900"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="rounded-lg border border-slate-700/40 bg-black px-2 py-1 text-xs text-slate-400 disabled:opacity-30 hover:bg-slate-900"
              >
                <span className="material-symbols-outlined text-sm">last_page</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* -------- Edit Modal -------- */}
      {editingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-[#0a0a0a] p-6 shadow-2xl">
            <h2 className="mb-4 text-lg font-semibold text-white">Edit Transaction</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Description</label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700/60 bg-black px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editForm.amount}
                    onChange={(e) => setEditForm((f) => ({ ...f, amount: e.target.value }))}
                    className="w-full rounded-xl border border-slate-700/60 bg-black px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Date</label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full rounded-xl border border-slate-700/60 bg-black px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Category</label>
                <select
                  value={editForm.categoryId}
                  onChange={(e) => setEditForm((f) => ({ ...f, categoryId: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-slate-700/60 bg-black px-4 py-2.5 text-sm text-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                >
                  {editCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setEditingTx(null)}
                disabled={editSaving}
                className="flex-1 rounded-xl border border-slate-700/60 bg-black px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-900 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={editSaving || !editForm.description || !editForm.amount || !editForm.categoryId}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white disabled:opacity-50"
              >
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
