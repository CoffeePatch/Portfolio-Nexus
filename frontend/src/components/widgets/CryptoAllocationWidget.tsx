// src/components/widgets/CryptoAllocationWidget.tsx
// Crypto allocation with horizontal bars - matches right sidebar style

import React from "react";
import { mockCryptoAllocation, mockCryptoSummary } from "../../data/mockCryptoData";

const CryptoAllocationWidget: React.FC = () => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl h-full flex flex-col">
      
      {/* Header - Like MutualFunds/Stocks */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500">
          <span className="material-symbols-outlined">currency_bitcoin</span>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Crypto Assets</h3>
          <p className="text-xs text-slate-500">Digital Currency</p>
        </div>
      </div>
      
      {/* Total Valuation */}
      <div className="mb-6">
        <p className="text-xs text-slate-500">Total Valuation</p>
        <p className="text-2xl font-bold text-white">{formatCurrency(mockCryptoSummary.totalCurrentValue)}</p>
      </div>

      {/* Asset Allocation Title */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-white">Asset Allocation</h4>
        <p className="text-xs text-slate-500">Portfolio distribution</p>
      </div>

      {/* Allocation Bars */}
      <div className="flex flex-col gap-4 flex-1">
        {mockCryptoAllocation.map((crypto, index) => (
          <div key={index} className="space-y-2">
            {/* Label & Percentage */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: crypto.color }}
                />
                <span className="text-sm font-medium text-white/80">{crypto.symbol}</span>
                <span className="text-xs text-white/40">{crypto.name}</span>
              </div>
              <span className="text-sm font-semibold text-white">{crypto.value}%</span>
            </div>
            {/* Progress Bar */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${crypto.value}%`,
                  backgroundColor: crypto.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">Total Invested</span>
          <span className="text-sm font-semibold text-white">{formatCurrency(mockCryptoSummary.totalInvested)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">Total Returns</span>
          <span className={`text-sm font-semibold ${mockCryptoSummary.totalGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {mockCryptoSummary.totalGain >= 0 ? '+' : ''}{formatCurrency(mockCryptoSummary.totalGain)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CryptoAllocationWidget;
