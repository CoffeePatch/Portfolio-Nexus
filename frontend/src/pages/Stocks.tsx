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
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Gradient Header Background - Blue/Indigo theme for Stocks */}
      <div
        className="absolute left-0 top-0 h-48 w-full"
        style={{
          background:
            "linear-gradient(90deg, #1e3a5f 0%, #2563eb 25%, #3b82f6 50%, #6366f1 75%, #1e1b4b 100%)",
          opacity: 0.85,
        }}
      />
      {/* Fade overlay for smooth transition */}
      <div className="absolute left-0 top-32 h-20 w-full bg-gradient-to-b from-transparent to-[#0a0a0a]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl space-y-6 px-6 py-4">
        {/* Market Ticker */}
        <MarketTicker />

        {/* Page Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-white">Stocks & ETFs</h1>
          <p className="mt-1 text-sm text-white/60">
            Track and manage your equity investments
          </p>
        </div>

        {/* Main Grid Layout - 4 columns like MutualFunds */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Left Column - Takes 3 columns */}
          <div className="space-y-6 lg:col-span-3">
            {/* Overall Stock Portfolio Summary */}
            <StockSummaryCard
              currentValue={mockStockSummary.totalCurrentValue}
              investedAmount={mockStockSummary.totalInvested}
              totalGain={mockStockSummary.totalGain}
              totalReturnPercent={mockStockSummary.totalReturnPercent}
              dayPnL={mockStockSummary.dayPnL}
              dayPnLPercent={mockStockSummary.dayPnLPercent}
            />

            {/* Overview Statistics Chart */}
            <StockGrowthChart />

            {/* Holdings Table */}
            <StockHoldingsTable />
          </div>

          {/* Right Column - Takes 1 column */}
          <div className="lg:col-span-1">
            {/* Sector Allocation Widget with horizontal bars */}
            <SectorAllocationWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
