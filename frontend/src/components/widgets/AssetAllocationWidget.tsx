import { useAssetClassSummary } from "../../hooks/useAssetClassSummary";

const COLORS = [
  "#6366f1", // indigo
  "#10b981", // green
  "#ef4444", // red
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

// Icon mapping for asset classes
const getAssetIcon = (type: string) => {
  const iconMap: Record<string, string> = {
    "Stocks": "show_chart",
    "Crypto": "currency_bitcoin",
    "Mutual Funds": "account_balance",
    "Gold": "diamond",
    "Real Estate": "home",
    "Bonds": "savings",
    "Cash": "payments",
  };
  return iconMap[type] || "account_balance_wallet";
};

type AssetAllocationWidgetProps = {
  className?: string;
};

export const AssetAllocationWidget = ({
  className = "",
}: AssetAllocationWidgetProps) => {
  const { data: assetSummaries, isLoading, isError } = useAssetClassSummary();

  if (isLoading) {
    return (
      <div
        className={`rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-4 shadow-2xl ${className}`}
      >
        <div className="mb-3">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
          <div className="mt-1 h-3 w-48 animate-pulse rounded bg-slate-800" />
        </div>
        <div className="flex flex-col gap-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-800/50" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`rounded-2xl border border-red-900/50 bg-red-950/20 p-6 ${className}`}
      >
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-red-500">
            error
          </span>
          <h3 className="mt-2 text-lg font-semibold text-red-500">
            Error Loading Allocation
          </h3>
          <p className="mt-1 text-sm text-red-400">
            Could not load asset allocation data
          </p>
        </div>
      </div>
    );
  }

  if (!assetSummaries || assetSummaries.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-4 shadow-2xl ${className}`}
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-purple-500/30">
            <span className="material-symbols-outlined text-lg text-purple-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
              pie_chart
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white">
              Asset Allocation
            </h2>
            <p className="text-xs text-slate-500">
              Portfolio breakdown by asset class
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-6">
          <span className="material-symbols-outlined text-4xl text-slate-700">
            pie_chart
          </span>
          <p className="mt-2 text-sm text-slate-500">No assets to display</p>
          <p className="mt-1 text-xs text-slate-600">
            Add assets to see your allocation
          </p>
        </div>
      </div>
    );
  }

  // Calculate total portfolio value
  const totalPortfolioValue = assetSummaries.reduce(
    (sum, s) => sum + s.totalValue,
    0
  );

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-4 shadow-2xl ${className}`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-purple-500/30">
            <span className="material-symbols-outlined text-lg text-purple-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
              pie_chart
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white">
              Asset Allocation
            </h2>
            <p className="text-xs text-slate-500">
              Portfolio breakdown by asset class
            </p>
          </div>
        </div>

        {/* Asset Class Rows */}
        <div className="flex flex-col gap-y-2">
          {assetSummaries.map((summary, index) => {
            const percentage = (
              (summary.totalValue / totalPortfolioValue) *
              100
            ).toFixed(1);

            return (
              <div
                key={summary.type}
                className="group/item relative overflow-hidden rounded-lg border border-slate-800/50 bg-gradient-to-r from-slate-900/40 to-transparent p-3 transition-all hover:border-slate-700/50 hover:bg-slate-900/60 hover:shadow-lg"
              >
                {/* Subtle glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity group-hover/item:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${COLORS[index % COLORS.length]}15, transparent 70%)`,
                  }}
                />
                
                <div className="relative flex items-center justify-between">
                  {/* Left: Icon + Name */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex h-9 w-9 items-center justify-center rounded-lg shadow-lg ring-1 ring-white/10 transition-transform group-hover/item:scale-110"
                      style={{
                        backgroundColor: `${COLORS[index % COLORS.length]}20`,
                        borderColor: COLORS[index % COLORS.length],
                      }}
                    >
                      <span 
                        className="material-symbols-outlined text-lg"
                        style={{ 
                          color: COLORS[index % COLORS.length],
                          fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                        }}
                      >
                        {getAssetIcon(summary.type)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {summary.type}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {percentage}% of portfolio
                      </p>
                    </div>
                  </div>

                  {/* Right: Value */}
                  <div className="text-right">
                    <p className="text-base font-bold text-white">
                      ${summary.totalValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-slate-500">
                      Total value
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
