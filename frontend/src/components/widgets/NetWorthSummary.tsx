import { useNetWorth } from "../../hooks/useNetWorth";

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6">
    <div className="space-y-2">
      <div className="h-6 w-40 rounded bg-slate-800"></div>
      <div className="h-12 w-56 rounded bg-slate-800"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 w-32 rounded bg-slate-800"></div>
      <div className="h-8 w-48 rounded bg-slate-800"></div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-16 rounded-lg bg-slate-800"></div>
      <div className="h-16 rounded-lg bg-slate-800"></div>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-red-400">error</span>
      <div>
        <p className="font-medium text-red-200">Error Loading Net Worth</p>
        <p className="text-sm text-red-300/80">{message}</p>
      </div>
    </div>
  </div>
);

export const NetWorthSummary = () => {
  const { data, isLoading, isError } = useNetWorth();

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-[#000000] p-6">
        <SkeletonLoader />
      </div>
    );
  }

  // Show error state
  if (isError || !data) {
    return <ErrorState message="Could not load net worth data" />;
  }

  const isPositiveChange = data.changeAmount >= 0;
  const changeColorClass = isPositiveChange ? "text-green-500" : "text-red-500";
  const changePrefix = isPositiveChange ? "+" : "";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-4 shadow-xl transition-all hover:border-slate-700/50 hover:shadow-indigo-900/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-3">
        {/* Header with Premium Icon */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
            <span className="material-symbols-outlined text-lg font-light text-indigo-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
              account_balance_wallet
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white">Net Worth</h2>
            <p className="text-xs text-slate-500">Total value</p>
          </div>
        </div>

        {/* Main Net Worth Value */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Net Worth</p>
          <p className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-3xl font-black tracking-tight text-transparent">
            ${data.netWorth.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        {/* 24h Change */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">24h Change</p>
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full ${isPositiveChange ? 'bg-green-500/10 ring-1 ring-green-500/30' : 'bg-red-500/10 ring-1 ring-red-500/30'}`}>
              <span className={`material-symbols-outlined text-sm ${changeColorClass}`} style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                {isPositiveChange ? "trending_up" : "trending_down"}
              </span>
            </div>
            <div>
              <p className={`text-lg font-bold ${changeColorClass}`}>
                {changePrefix}${Math.abs(data.changeAmount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className={`text-xs font-medium ${changeColorClass}`}>
                {changePrefix}{data.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Assets and Liabilities Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Total Assets */}
          <div className="group/card relative overflow-hidden rounded-lg border border-slate-800/50 bg-gradient-to-br from-blue-500/5 to-transparent p-2.5 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-blue-400 text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
                savings
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Assets</p>
            </div>
            <p className="text-base font-bold text-white">
              ${data.totalAssets.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          {/* Total Expenses/Liabilities */}
          <div className="group/card relative overflow-hidden rounded-lg border border-slate-800/50 bg-gradient-to-br from-red-500/5 to-transparent p-2.5 transition-all hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-red-400 text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
                credit_card
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Expenses
              </p>
            </div>
            <p className="text-base font-bold text-white">
              ${data.totalLiabilities.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetWorthSummary;
