import type { AssetClassSummary } from "../../hooks/useAssetClassSummary";

interface AssetClassCardProps {
  summary: AssetClassSummary;
}

export const AssetClassCard = ({ summary }: AssetClassCardProps) => {
  const isPositive = summary.gainLoss >= 0;
  const colorClass = isPositive ? "text-green-500" : "text-red-500";
  const prefix = isPositive ? "+" : "";

  return (
    <div className="group relative flex-shrink-0 w-64 overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-[#0a0a0a] to-[#000000] p-4 transition-all hover:border-slate-700/50 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-3">
        {/* Header with Icon and Type */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/20 transition-all group-hover:scale-110 group-hover:ring-indigo-500/40">
            <span className="material-symbols-outlined text-2xl text-indigo-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}>
              {summary.icon}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-white">
              {summary.type}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-xs text-slate-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                layers
              </span>
              <p className="text-xs font-medium text-slate-500">{summary.count} holdings</p>
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Total Value</p>
          <p className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-2xl font-black tracking-tight text-transparent">
            ${summary.totalValue.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        {/* Gain/Loss */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Return</p>
            <div className="flex items-center gap-1">
              <span className={`material-symbols-outlined text-sm ${colorClass}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPositive ? "arrow_upward" : "arrow_downward"}
              </span>
              <p className={`text-base font-bold ${colorClass}`}>
                {prefix}{summary.gainLossPercent.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Gain/Loss</p>
            <p className={`text-base font-bold ${colorClass}`}>
              {prefix}${Math.abs(summary.gainLoss).toLocaleString("en-US", {
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
