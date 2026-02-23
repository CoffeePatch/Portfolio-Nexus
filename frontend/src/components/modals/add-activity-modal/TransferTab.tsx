import type { FormEvent } from "react";
import {
  accountOptions,
  inputBaseClassName,
  labelBaseClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "./constants";
import { formatAmount } from "./utils";
import type { TransferEntry, TransferForm } from "./types";

type TransferTabProps = {
  form: TransferForm;
  setForm: React.Dispatch<React.SetStateAction<TransferForm>>;
  isSubmitting: boolean;
  entries: TransferEntry[];
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
};

export const TransferTab = ({
  form,
  setForm,
  isSubmitting,
  entries,
  onClose,
  onSubmit,
}: TransferTabProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="tr-date-time" className={labelBaseClassName}>Date/Time</label>
          <input
            id="tr-date-time"
            type="datetime-local"
            className={inputBaseClassName}
            value={form.dateTime}
            onChange={(e) => setForm((prev) => ({ ...prev, dateTime: e.target.value }))}
            required
          />
        </div>
        <div>
          <label htmlFor="tr-title" className={labelBaseClassName}>Title</label>
          <input
            id="tr-title"
            type="text"
            className={inputBaseClassName}
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Move funds to savings"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="tr-amount" className={labelBaseClassName}>Amount</label>
          <input
            id="tr-amount"
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
        <div>
          <label htmlFor="tr-category" className={labelBaseClassName}>Category</label>
          <input
            id="tr-category"
            type="text"
            className={`${inputBaseClassName} text-slate-300`}
            value={form.category}
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="tr-out-account" className={labelBaseClassName}>Out account</label>
          <select
            id="tr-out-account"
            className={inputBaseClassName}
            value={form.outAccount}
            onChange={(e) => setForm((prev) => ({ ...prev, outAccount: e.target.value }))}
            required
          >
            {accountOptions.map((account) => (
              <option key={`out-${account}`} value={account}>{account}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tr-in-account" className={labelBaseClassName}>In account</label>
          <select
            id="tr-in-account"
            className={inputBaseClassName}
            value={form.inAccount}
            onChange={(e) => setForm((prev) => ({ ...prev, inAccount: e.target.value }))}
            required
          >
            {accountOptions.map((account) => (
              <option key={`in-${account}`} value={account}>{account}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tr-tags" className={labelBaseClassName}>Tags</label>
        <input
          id="tr-tags"
          type="text"
          className={inputBaseClassName}
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
          placeholder="e.g., internal, monthly"
        />
      </div>

      <div>
        <label htmlFor="tr-notes" className={labelBaseClassName}>Notes</label>
        <textarea
          id="tr-notes"
          className={inputBaseClassName}
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          rows={3}
          placeholder="Add transfer notes"
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
          {isSubmitting ? "Saving..." : "Save Transfer"}
        </button>
      </div>

      <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-4">
        <h3 className="text-sm font-semibold text-slate-200">Recent mock entries</h3>
        {entries.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No transfer records yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {entries.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{entry.title}</p>
                  <span className="text-sm font-semibold text-slate-100">{formatAmount(entry.amount)}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{entry.outAccount} → {entry.inAccount} • {entry.category} • {entry.dateTime}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};
