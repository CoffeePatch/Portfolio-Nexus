import type { FormEvent } from "react";
import {
  accountOptions,
  inputBaseClassName,
  labelBaseClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
  transactionCategories,
} from "./constants";
import { formatAmount } from "./utils";
import type { TransactionEntry, TransactionForm, TransactionType } from "./types";

type TransactionTabProps = {
  form: TransactionForm;
  setForm: React.Dispatch<React.SetStateAction<TransactionForm>>;
  isSubmitting: boolean;
  entries: TransactionEntry[];
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
};

export const TransactionTab = ({
  form,
  setForm,
  isSubmitting,
  entries,
  onClose,
  onSubmit,
}: TransactionTabProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="tx-date-time" className={labelBaseClassName}>Date/Time</label>
          <input
            id="tx-date-time"
            type="datetime-local"
            className={inputBaseClassName}
            value={form.dateTime}
            onChange={(e) => setForm((prev) => ({ ...prev, dateTime: e.target.value }))}
            required
          />
        </div>
        <div>
          <label htmlFor="tx-account" className={labelBaseClassName}>Account</label>
          <select
            id="tx-account"
            className={inputBaseClassName}
            value={form.account}
            onChange={(e) => setForm((prev) => ({ ...prev, account: e.target.value }))}
            required
          >
            {accountOptions.map((account) => (
              <option key={account} value={account}>{account}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="tx-title" className={labelBaseClassName}>Title</label>
          <input
            id="tx-title"
            type="text"
            className={inputBaseClassName}
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Grocery purchase"
            required
          />
        </div>
        <div>
          <label htmlFor="tx-amount" className={labelBaseClassName}>Amount</label>
          <input
            id="tx-amount"
            type="number"
            min="0"
            step="0.01"
            className={inputBaseClassName}
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="tx-type" className={labelBaseClassName}>Type (IN/OUT)</label>
          <select
            id="tx-type"
            className={inputBaseClassName}
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as TransactionType }))}
            required
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>
        <div>
          <label htmlFor="tx-category" className={labelBaseClassName}>Category</label>
          <select
            id="tx-category"
            className={inputBaseClassName}
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            required
          >
            {transactionCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tx-tags" className={labelBaseClassName}>Tags</label>
        <input
          id="tx-tags"
          type="text"
          className={inputBaseClassName}
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
          placeholder="e.g., needs, monthly"
        />
      </div>

      <div>
        <label htmlFor="tx-notes" className={labelBaseClassName}>Notes</label>
        <textarea
          id="tx-notes"
          className={inputBaseClassName}
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          rows={3}
          placeholder="Add transaction notes"
        />
      </div>

      <div className="flex gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className={secondaryButtonClassName}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={primaryButtonClassName}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Transaction"}
        </button>
      </div>

      <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-4">
        <h3 className="text-sm font-semibold text-slate-200">Recent mock entries</h3>
        {entries.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No transaction records yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {entries.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{entry.title}</p>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${entry.type === "IN" ? "border border-slate-500 bg-slate-800 text-slate-100" : "border border-slate-700 bg-black text-slate-400"}`}>
                      {entry.type}
                    </span>
                    <span className="text-sm font-semibold text-slate-100">{formatAmount(entry.amount)}</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-400">{entry.account} • {entry.category} • {entry.dateTime}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};
