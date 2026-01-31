// src/pages/Crypto.tsx
// Redesigned to match MutualFunds/Stocks page layout with glass effect

import React from "react";
import CryptoSummaryCard from "../components/widgets/CryptoSummaryCard";
import CryptoGrowthChart from "../components/widgets/CryptoGrowthChart";
import CryptoAllocationWidget from "../components/widgets/CryptoAllocationWidget";
import CryptoHoldingsTable from "../components/widgets/CryptoHoldingsTable";
import { mockCryptoSummary } from "../data/mockCryptoData";

const Crypto: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-black font-sans text-slate-200">
      {/* Linear Gradient - From LEFT to RIGHT, top 2 inches - Orange/Yellow theme for Crypto */}
      <div 
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: 0,
          height: '2in',
          left: 0,
          right: 0,
          width: '100%',
          background: `linear-gradient(90deg, 
            #7c2d12 0%, 
            #c2410c 25%, 
            #f97316 50%, 
            #fbbf24 75%, 
            #422006 100%)`,
          opacity: 0.85,
        }}
      />

      {/* Main Content - p-8 like MutualFunds/Stocks */}
      <div className="relative z-10 p-8">

        {/* Grid: Left side (widgets stacked) + Right side (vertical widget) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* LEFT COLUMN: Widgets stacked vertically */}
          <div className="lg:col-span-3 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            {/* 1. Overall Crypto Portfolio Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl" style={{ marginBottom: '1cm' }}>
              <h1 className="mb-2 text-2xl font-bold text-white">Overall Crypto Portfolio</h1>
              <div className="mb-4 flex gap-6 text-xs text-slate-400">
                <span>My Balance <span className="text-emerald-400">▲ +{mockCryptoSummary.totalReturnPercent.toFixed(1)}%</span></span>
                <span>Day P&L <span className={mockCryptoSummary.dayPnL >= 0 ? "text-emerald-400" : "text-red-400"}>
                  {mockCryptoSummary.dayPnL >= 0 ? "▲" : "▼"} {mockCryptoSummary.dayPnLPercent >= 0 ? "+" : ""}{mockCryptoSummary.dayPnLPercent.toFixed(2)}%
                </span></span>
              </div>
              <CryptoSummaryCard
                currentValue={mockCryptoSummary.totalCurrentValue}
                investedAmount={mockCryptoSummary.totalInvested}
                totalGain={mockCryptoSummary.totalGain}
                totalReturnPercent={mockCryptoSummary.totalReturnPercent}
                dayPnL={mockCryptoSummary.dayPnL}
                dayPnLPercent={mockCryptoSummary.dayPnLPercent}
              />
            </div>

            {/* 2. Overview Statistic Widget (Glass - Black tint) - Increased height */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <h2 className="mb-4 text-xl font-semibold text-white">Overview Statistic</h2>
              <CryptoGrowthChart />
            </div>

          </div>

          {/* RIGHT COLUMN: Crypto Allocation (Single component - Glass - Black tint) */}
          <div className="lg:col-span-1" style={{ marginTop: '1cm' }}>
            <CryptoAllocationWidget />
          </div>

        </div>

        {/* Holdings Table - Below everything */}
        <div className="mt-6">
          <CryptoHoldingsTable />
        </div>

      </div>
    </div>
  );
};

export default Crypto;
