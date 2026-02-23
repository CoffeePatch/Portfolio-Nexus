import type { FormEvent } from "react";
import {
  inputBaseClassName,
  investAssetClassOptions,
  labelBaseClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
  sectionHeaderClassName,
  sectionHeaderTextClassName,
} from "./constants";
import { formatAmount, isMarketAsset } from "./utils";
import type {
  InvestAssetClass,
  InvestForm,
  InvestmentEntry,
  MarketInstrument,
} from "./types";

type InvestTabProps = {
  form: InvestForm;
  setForm: React.Dispatch<React.SetStateAction<InvestForm>>;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  onAssetClassChange: (assetClass: InvestAssetClass) => void;
  onMarketAmountOrPriceChange: (
    field: "investmentAmount" | "pricePerUnit",
    value: string
  ) => void;
  onInstrumentPick: (instrument: MarketInstrument) => void;
  filteredMarketInstruments: MarketInstrument[];
  accountOptions: string[];
  accountBalances: Record<string, number>;
  entries: InvestmentEntry[];
};

export const InvestTab = ({
  form,
  setForm,
  isSubmitting,
  onClose,
  onSubmit,
  onAssetClassChange,
  onMarketAmountOrPriceChange,
  onInstrumentPick,
  filteredMarketInstruments,
  accountOptions,
  accountBalances,
  entries,
}: InvestTabProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className={sectionHeaderClassName}>
        <p className={sectionHeaderTextClassName}>
          Global Transaction Data (Out Flow)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="inv-date-time" className={labelBaseClassName}>Date/Time</label>
          <input
            id="inv-date-time"
            type="datetime-local"
            className={inputBaseClassName}
            value={form.dateTime}
            onChange={(e) => setForm((prev) => ({ ...prev, dateTime: e.target.value }))}
            required
          />
        </div>
        <div>
          <label htmlFor="inv-out-account" className={labelBaseClassName}>Out Account</label>
          <select
            id="inv-out-account"
            className={inputBaseClassName}
            value={form.outAccount}
            onChange={(e) => setForm((prev) => ({ ...prev, outAccount: e.target.value }))}
            required
          >
            {accountOptions.map((account) => (
              <option key={account} value={account}>{account}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Balance</p>
        <p className="mt-1 text-sm text-slate-200">
          {form.outAccount}: {formatAmount(accountBalances[form.outAccount] ?? 0)}
        </p>
      </div>

      <div className={sectionHeaderClassName}>
        <p className={sectionHeaderTextClassName}>
          Asset Classification (Routing Node)
        </p>
      </div>

      <div>
        <label htmlFor="inv-asset-class" className={labelBaseClassName}>Asset Class</label>
        <select
          id="inv-asset-class"
          className={inputBaseClassName}
          value={form.assetClass}
          onChange={(e) => onAssetClassChange(e.target.value as InvestAssetClass)}
          required
        >
          {investAssetClassOptions.map((assetClass) => (
            <option key={assetClass} value={assetClass}>{assetClass}</option>
          ))}
        </select>
      </div>

      {isMarketAsset(form.assetClass) ? (
        <div className="space-y-4 rounded-xl border border-slate-700/60 bg-slate-800/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dynamic Asset Details (Market Asset Flow)
          </p>

          <div className="relative">
            <label htmlFor="inv-search" className={labelBaseClassName}>Search Symbol/Scheme</label>
            <input
              id="inv-search"
              type="text"
              className={inputBaseClassName}
              value={form.searchQuery}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, searchQuery: e.target.value, selectedSymbol: "" }))
              }
              placeholder="Type Tata / TCS / Bitcoin"
              required
            />
            {filteredMarketInstruments.length > 0 && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900 shadow-xl">
                {filteredMarketInstruments.map((instrument) => (
                  <button
                    key={instrument.symbol}
                    type="button"
                    onClick={() => onInstrumentPick(instrument)}
                    className="flex w-full items-center justify-between border-b border-slate-700/40 px-4 py-3 text-left text-sm last:border-b-0 hover:bg-slate-800"
                  >
                    <span className="text-slate-100">{instrument.symbol} - {instrument.name}</span>
                    <span className="text-xs text-slate-400">{formatAmount(instrument.mockPrice)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="inv-amount" className={labelBaseClassName}>Investment Amount</label>
              <input
                id="inv-amount"
                type="number"
                min="0"
                step="0.01"
                className={inputBaseClassName}
                value={form.investmentAmount}
                onChange={(e) => onMarketAmountOrPriceChange("investmentAmount", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label htmlFor="inv-price" className={labelBaseClassName}>Price / NAV</label>
              <input
                id="inv-price"
                type="number"
                min="0"
                step="0.0001"
                className={inputBaseClassName}
                value={form.pricePerUnit}
                onChange={(e) => onMarketAmountOrPriceChange("pricePerUnit", e.target.value)}
                placeholder="Auto-filled or manual"
                required
              />
            </div>
            <div>
              <label htmlFor="inv-units" className={labelBaseClassName}>Units / Quantity</label>
              <input
                id="inv-units"
                type="number"
                min="0"
                step="0.000001"
                className={inputBaseClassName}
                value={form.units}
                onChange={(e) => setForm((prev) => ({ ...prev, units: e.target.value, unitsManuallyEdited: true }))}
                placeholder="Auto-calculated"
                required
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-slate-700/60 bg-slate-800/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dynamic Asset Details (Manual Asset Flow)
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="inv-asset-name" className={labelBaseClassName}>Asset Name</label>
              <input
                id="inv-asset-name"
                type="text"
                className={inputBaseClassName}
                value={form.assetName}
                onChange={(e) => setForm((prev) => ({ ...prev, assetName: e.target.value }))}
                placeholder="e.g., HDFC 1-Year FD"
                required
              />
            </div>
            <div>
              <label htmlFor="inv-manual-amount" className={labelBaseClassName}>Investment Amount</label>
              <input
                id="inv-manual-amount"
                type="number"
                min="0"
                step="0.01"
                className={inputBaseClassName}
                value={form.investmentAmount}
                onChange={(e) => setForm((prev) => ({ ...prev, investmentAmount: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="inv-roi" className={labelBaseClassName}>Expected Interest Rate / ROI (%)</label>
              <input
                id="inv-roi"
                type="number"
                step="0.01"
                className={inputBaseClassName}
                value={form.expectedRoi}
                onChange={(e) => setForm((prev) => ({ ...prev, expectedRoi: e.target.value }))}
                placeholder="Optional"
              />
            </div>
            {form.assetClass === "Fixed Deposit" ? (
              <div>
                <label htmlFor="inv-maturity" className={labelBaseClassName}>Maturity Date</label>
                <input
                  id="inv-maturity"
                  type="date"
                  className={inputBaseClassName}
                  value={form.maturityDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, maturityDate: e.target.value }))}
                  required
                />
              </div>
            ) : (
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 px-4 py-3 text-sm text-slate-400">
                Maturity Date applies only to Fixed Deposit.
              </div>
            )}
          </div>
        </div>
      )}

      <div className={sectionHeaderClassName}>
        <p className={sectionHeaderTextClassName}>Optional Metadata</p>
      </div>

      <div>
        <label htmlFor="inv-tags" className={labelBaseClassName}>Tags</label>
        <input
          id="inv-tags"
          type="text"
          className={inputBaseClassName}
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
          placeholder="#TaxSaving, #Retirement"
        />
      </div>

      <div>
        <label htmlFor="inv-notes" className={labelBaseClassName}>Notes</label>
        <textarea
          id="inv-notes"
          className={inputBaseClassName}
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          rows={3}
          placeholder="Broker details / rationale"
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
          {isSubmitting ? "Executing..." : "Save Investment"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-4">
          <h3 className="text-sm font-semibold text-slate-200">Mock account balances</h3>
          <div className="mt-3 space-y-2">
            {accountOptions.map((account) => (
              <div key={account} className="flex items-center justify-between rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2">
                <span className="text-sm text-slate-300">{account}</span>
                <span className="text-sm font-semibold text-slate-100">{formatAmount(accountBalances[account])}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-4">
          <h3 className="text-sm font-semibold text-slate-200">Recent mock investment entries</h3>
          {entries.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No investment records yet.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {entries.map((entry) => (
                <div key={entry.id} className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-white">{entry.assetName}</p>
                    <span className="text-sm font-semibold text-slate-100">{formatAmount(entry.amount)}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{entry.assetClass} • {entry.outAccount} • {entry.dateTime}</p>
                  {typeof entry.units === "number" && (
                    <p className="mt-1 text-xs text-slate-500">Units: {entry.units.toFixed(6)}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
