// src/pages/PreciousMetals.tsx
// Redesigned to match Crypto page layout with glass effect

import React, { useEffect, useState } from "react";
import { MetalsSummaryCard } from "../components/widgets/MetalsSummaryCard";
import { MetalPriceChart } from "../components/widgets/MetalPriceChart";
import { MetalAllocationChart } from "../components/widgets/MetalAllocationChart";
import { MetalHoldingsTable } from "../components/widgets/MetalHoldingsTable";
import { MetalMarketRates } from "../components/widgets/MetalMarketRates";
import { getManualHoldings } from "../api/portfolioService";
import { AssetPageShell } from "../components/shared/AssetPageShell";
import { MetalsExplorer } from "./explorers";

const MetalsPortfolio: React.FC = () => {
  const [metalSummary, setMetalSummary] = useState({
    currentValue: 0, totalInvested: 0, totalProfitLoss: 0,
    overallReturn: 0, totalWeightGold: "0g", totalWeightSilver: "0g", totalItems: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const manuals = await getManualHoldings();
        const metals = manuals.filter((m) => m.assetType === "Gold" || m.assetType === "Silver");
        const invested = metals.reduce((s, m) => s + m.investedValue, 0);
        const current = metals.reduce((s, m) => s + m.currentValue, 0);
        const gain = current - invested;
        const goldCount = metals.filter((m) => m.assetType === "Gold").length;
        const silverCount = metals.filter((m) => m.assetType === "Silver").length;
        setMetalSummary({
          currentValue: current, totalInvested: invested, totalProfitLoss: gain,
          overallReturn: invested > 0 ? (gain / invested) * 100 : 0,
          totalWeightGold: `${goldCount} items`, totalWeightSilver: `${silverCount} items`,
          totalItems: metals.length,
        });
      } catch { /* leave defaults */ }
    };
    load();
  }, []);

  return (
  <div className="relative min-h-screen w-full bg-transparent font-sans text-slate-200">

      {/* Main Content - p-8 like Crypto */}
      <div className="relative z-10 p-8">

        {/* Grid: Left side (widgets stacked) + Right side (vertical widget) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* LEFT COLUMN: Widgets stacked vertically */}
          <div className="lg:col-span-3 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            {/* 1. Overall Precious Metals Portfolio Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl" style={{ marginBottom: '1cm' }}>
              <h1 className="mb-2 text-2xl font-bold text-white">Overall Precious Metals Portfolio</h1>
              <div className="mb-4 flex gap-6 text-xs text-slate-400">
                <span>Total Value <span className="text-emerald-400">▲ +{metalSummary.overallReturn.toFixed(1)}%</span></span>
                <span>Gold Rate <span className="text-yellow-400">₹6,850/g</span></span>
              </div>
              <MetalsSummaryCard
                currentValue={metalSummary.currentValue}
                investedAmount={metalSummary.totalInvested}
                totalGain={metalSummary.totalProfitLoss}
                totalReturnPercent={metalSummary.overallReturn}
                totalGoldWeight={metalSummary.totalWeightGold}
                totalSilverWeight={metalSummary.totalWeightSilver}
                totalItems={metalSummary.totalItems}
              />
            </div>

            {/* 2. Price Trend Chart Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <MetalPriceChart />
            </div>

          </div>

          {/* RIGHT COLUMN: Metal Allocation + Market Rates (Stacked) */}
          <div className="lg:col-span-1 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
              <MetalAllocationChart />
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <MetalMarketRates />
            </div>
          </div>

        </div>

        {/* Holdings Table - Below everything */}
        <div className="mt-6">
          <MetalHoldingsTable />
        </div>

      </div>
    </div>
  );
};

const PreciousMetals: React.FC = () => (
  <AssetPageShell
    explorerView={<MetalsExplorer />}
    portfolioView={<MetalsPortfolio />}
    explorerTitle="Metals Explorer"
    portfolioTitle="Gold & Silver"
    explorerSubtitle="Real-time precious metals data"
    portfolioSubtitle="Your metals portfolio"
  />
);

export default PreciousMetals;
