// src/pages/Stocks.tsx
// Redesigned to match MutualFunds page layout with glass effect

import React from "react";
import { MarketTicker } from "../components/market/MarketTicker";
import StockSummaryCard from "../components/widgets/StockSummaryCard";
import StockGrowthChart from "../components/widgets/StockGrowthChart";
import SectorAllocationWidget from "../components/widgets/SectorAllocationWidget";
import StockHoldingsTable from "../components/widgets/StockHoldingsTable";
import { mockStockSummary } from "../data/mockStockData";

const Stocks: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans text-slate-200">

      {/* Market Ticker - Positioned in gradient header area */}
      <div className="relative z-20 px-8 pt-4">
        <MarketTicker />
      </div>

      {/* Main Content - p-8 like MutualFunds */}
      <div className="relative z-10 p-8">

        {/* Grid: Left side (widgets stacked) + Right side (vertical widget) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* LEFT COLUMN: Widgets stacked vertically */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* 1. Overall Stock Portfolio Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
              <h1 className="mb-2 text-2xl font-bold text-white">Overall Stock Portfolio</h1>
              <div className="mb-4 flex gap-6 text-xs text-slate-400">
                <span>My Balance <span className="text-emerald-400">▲ +{mockStockSummary.totalReturnPercent.toFixed(1)}%</span></span>
                <span>Day P&L <span className={mockStockSummary.dayPnL >= 0 ? "text-emerald-400" : "text-red-400"}>
                  {mockStockSummary.dayPnL >= 0 ? "▲" : "▼"} {mockStockSummary.dayPnLPercent >= 0 ? "+" : ""}{mockStockSummary.dayPnLPercent.toFixed(2)}%
                </span></span>
              </div>
              <StockSummaryCard
                currentValue={mockStockSummary.totalCurrentValue}
                investedAmount={mockStockSummary.totalInvested}
                totalGain={mockStockSummary.totalGain}
                totalReturnPercent={mockStockSummary.totalReturnPercent}
                dayPnL={mockStockSummary.dayPnL}
                dayPnLPercent={mockStockSummary.dayPnLPercent}
              />
            </div>

            {/* 2. Overview Statistic Widget (Glass - Black tint) - Increased height */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <h2 className="mb-4 text-xl font-semibold text-white">Overview Statistic</h2>
              <StockGrowthChart />
            </div>

          </div>

          {/* RIGHT COLUMN: Sector Allocation (Single component - Glass - Black tint) */}
          <div className="lg:col-span-1">
            <SectorAllocationWidget />
          </div>

        </div>

        {/* Holdings Table - Below everything */}
        <div className="mt-6">
          <StockHoldingsTable />
        </div>

      </div>
    </div>
  );
};

export default Stocks;
