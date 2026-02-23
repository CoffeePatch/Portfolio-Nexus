import { InvestTab } from "./add-activity-modal/InvestTab";
import { TransactionTab } from "./add-activity-modal/TransactionTab";
import { TransferTab } from "./add-activity-modal/TransferTab";
import { useAddActivityModalState } from "./add-activity-modal/useAddActivityModalState";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({
  isOpen,
  onClose,
}: AddTransactionModalProps) => {
  const {
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
  } = useAddActivityModalState();

  if (!isOpen) return null;

  const messageClassName =
    statusTone === "success"
      ? "mb-5 rounded-xl border border-slate-600 bg-slate-900/60 px-4 py-3 text-sm text-slate-200"
      : "mb-5 rounded-xl border border-rose-400/40 bg-rose-950/30 px-4 py-3 text-sm text-rose-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-700/60 bg-black p-8 shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-400 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          aria-label="Close modal"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
          >
            close
          </span>
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/60">
            <span
              className="material-symbols-outlined text-3xl text-slate-100"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
            >
              add_circle
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Add Activity
            </h2>
            <p className="text-sm text-slate-500">
              Create transaction, transfer, or investment
            </p>
          </div>
        </div>

        <div className="mb-6 flex rounded-xl border border-slate-700/70 bg-black p-1">
          {([
            { key: "transaction", label: "Transaction" },
            { key: "transfer", label: "Transfer" },
            { key: "invest", label: "Invest" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setStatusMessage(null);
              }}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "border border-slate-500 bg-slate-900 text-white"
                  : "text-slate-400 hover:bg-slate-900/70 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {statusMessage && <div className={messageClassName}>{statusMessage}</div>}

        {activeTab === "transaction" && (
          <TransactionTab
            form={transactionForm}
            setForm={setTransactionForm}
            isSubmitting={isSubmitting}
            entries={transactionEntries}
            onClose={onClose}
            onSubmit={(e) => handleMockSubmit(e, "transaction")}
          />
        )}

        {activeTab === "transfer" && (
          <TransferTab
            form={transferForm}
            setForm={setTransferForm}
            isSubmitting={isSubmitting}
            entries={transferEntries}
            onClose={onClose}
            onSubmit={(e) => handleMockSubmit(e, "transfer")}
          />
        )}

        {activeTab === "invest" && (
          <InvestTab
            form={investForm}
            setForm={setInvestForm}
            isSubmitting={isSubmitting}
            onClose={onClose}
            onSubmit={handleInvestSubmit}
            onAssetClassChange={handleInvestAssetClassChange}
            onMarketAmountOrPriceChange={handleMarketAmountOrPriceChange}
            onInstrumentPick={handleInstrumentPick}
            filteredMarketInstruments={filteredMarketInstruments}
            accountOptions={investAccountOptions}
            accountBalances={investAccountBalances}
            entries={investmentEntries}
          />
        )}
      </div>
    </div>
  );
};
