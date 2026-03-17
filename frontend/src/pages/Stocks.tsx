// src/pages/Stocks.tsx
// Redesigned to match MutualFunds page layout with glass effect

import React, { useEffect, useState } from "react";
import { MarketTicker } from "../components/market/MarketTicker";
import StockSummaryCard from "../components/widgets/StockSummaryCard";
import StockGrowthChart from "../components/widgets/StockGrowthChart";
import SectorAllocationWidget from "../components/widgets/SectorAllocationWidget";
import StockHoldingsTable from "../components/widgets/StockHoldingsTable";
import { getStockHoldings } from "../api/portfolioService";
import { getStockPrice } from "../api/marketDataService";
import { AssetPageShell } from "../components/shared/AssetPageShell";
import { StocksExplorer } from "./explorers";

const StocksPortfolio: React.FC = () => {
  const [summary, setSummary] = useState({
    totalCurrentValue: 0, totalInvested: 0, totalGain: 0,
    totalReturnPercent: 0, dayPnL: 0, dayPnLPercent: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const holdings = await getStockHoldings();
        let invested = 0, current = 0;
        await Promise.all(holdings.map(async (h) => {
          const inv = h.quantity * h.purchasePrice;
          invested += inv;
          try {
            const p = await getStockPrice(h.symbol);
            current += h.quantity * p.current_price;
          } catch {
            current += inv * 1.05;
          }
        }));
        const gain = current - invested;
        const retPct = invested > 0 ? (gain / invested) * 100 : 0;
        setSummary({ totalCurrentValue: current, totalInvested: invested, totalGain: gain, totalReturnPercent: retPct, dayPnL: 0, dayPnLPercent: 0 });
      } catch { /* leave defaults */ }
    };
    load();
  }, []);

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
                <span>My Balance <span className="text-emerald-400">▲ +{summary.totalReturnPercent.toFixed(1)}%</span></span>
                <span>Day P&L <span className={summary.dayPnL >= 0 ? "text-emerald-400" : "text-red-400"}>
                  {summary.dayPnL >= 0 ? "▲" : "▼"} {summary.dayPnLPercent >= 0 ? "+" : ""}{summary.dayPnLPercent.toFixed(2)}%
                </span></span>
              </div>
              <StockSummaryCard
                currentValue={summary.totalCurrentValue}
                investedAmount={summary.totalInvested}
                totalGain={summary.totalGain}
                totalReturnPercent={summary.totalReturnPercent}
                dayPnL={summary.dayPnL}
                dayPnLPercent={summary.dayPnLPercent}
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

const Stocks: React.FC = () => (
  <AssetPageShell
    explorerView={<StocksExplorer />}
    portfolioView={<StocksPortfolio />}
    explorerTitle="Stocks Explorer"
    portfolioTitle="Stocks & ETF"
    explorerSubtitle="Real-time equity market data"
    portfolioSubtitle="Your stock portfolio"
  />
);

export default Stocks;
