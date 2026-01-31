import { useRecentTransactions } from "../../hooks/useRecentTransactions";

interface RecentTransactionsProps {
  className?: string;
}

export const RecentTransactions = ({ className }: RecentTransactionsProps) => {
  const { transactions, isLoading } = useRecentTransactions();

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-4 shadow-2xl ${className || ""}`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      {/* Header */}
      <div className="relative mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-cyan-500/30">
          <span className="material-symbols-outlined text-lg text-cyan-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
            receipt_long
          </span>
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-tight text-white">
            Recent Transactions
          </h2>
          <p className="text-xs text-slate-500">
            Latest expenses and purchases
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="relative space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 animate-pulse">
              <div className="h-9 w-9 rounded-lg bg-slate-800" />
              <div className="flex-1">
                <div className="h-3 w-3/4 bg-slate-800 rounded mb-1" />
                <div className="h-2 w-1/2 bg-slate-800 rounded" />
              </div>
              <div className="h-3 w-12 bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && transactions.length === 0 && (
        <div className="relative py-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50">
            <span className="material-symbols-outlined text-3xl text-slate-600" style={{ fontVariationSettings: "'FILL' 0" }}>
              receipt_long
            </span>
          </div>
          <h3 className="mb-1 text-sm font-bold text-slate-300">
            No transactions yet
          </h3>
          <p className="text-xs text-slate-500">
            Start by adding an expense or asset purchase
          </p>
        </div>
      )}

      {/* Transaction List */}
      {!isLoading && transactions.length > 0 && (
        <div className="relative space-y-2">
          {transactions.slice(0, 8).map((transaction) => (
            <div
              key={transaction.id}
              className="group/item flex items-center gap-3 rounded-lg border border-slate-800/50 bg-gradient-to-r from-slate-900/30 to-transparent p-2.5 transition-all hover:border-slate-700/50 hover:bg-slate-900/50"
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ring-1 transition-all ${
                  transaction.type === "expense"
                    ? "bg-gradient-to-br from-red-500/20 to-red-600/20 ring-red-500/30"
                    : "bg-gradient-to-br from-blue-500/20 to-blue-600/20 ring-blue-500/30"
                }`}
              >
                <span 
                  className={`material-symbols-outlined text-lg ${
                    transaction.type === "expense" ? "text-red-400" : "text-blue-400"
                  }`}
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
                >
                  {transaction.type === "expense" ? "credit_card" : "trending_up"}
                </span>
              </div>

              {/* Description and Date */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[10px] text-slate-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                    schedule
                  </span>
                  <p className="text-[10px] font-medium text-slate-500">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex-shrink-0">
                <p
                  className={`text-sm font-bold ${
                    transaction.amount < 0 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {transaction.amount < 0 ? "-" : "+"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Show More Indicator */}
          {transactions.length > 8 && (
            <div className="pt-1 text-center">
              <p className="text-[10px] font-medium text-slate-500">
                Showing 8 of {transactions.length} transactions
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
