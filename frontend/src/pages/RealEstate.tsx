// src/pages/RealEstate.tsx
// Comprehensive Real Estate Portfolio Page for Builders & Investors

import React from "react";
import { RealEstateSummaryCard } from "../components/widgets/RealEstateSummaryCard";
import { PropertyValueChart } from "../components/widgets/PropertyValueChart";
import { PropertyAllocationChart } from "../components/widgets/PropertyAllocationChart";
import { RealEstateMetrics } from "../components/widgets/RealEstateMetrics";
import { PropertyHoldingsTable } from "../components/widgets/PropertyHoldingsTable";
import { realEstateSummary } from "../data/mockRealEstateData";

const RealEstate: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans text-slate-200">

      {/* Main Content - p-8 like other pages */}
      <div className="relative z-10 p-8">

        {/* Grid: Left side (widgets stacked) + Right side (vertical widgets) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* LEFT COLUMN: Widgets stacked vertically */}
          <div className="lg:col-span-3 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            {/* 1. Overall Real Estate Portfolio Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl" style={{ marginBottom: '1cm' }}>
              <h1 className="mb-2 text-2xl font-bold text-white">Overall Real Estate Portfolio</h1>
              <div className="mb-4 flex gap-6 text-xs text-slate-400">
                <span>Portfolio Value <span className="text-emerald-400">▲ +{realEstateSummary.appreciationPercent.toFixed(1)}%</span></span>
                <span>Rental Yield <span className="text-emerald-400">{realEstateSummary.averageRentalYield.toFixed(2)}% avg</span></span>
                <span>Monthly Income <span className="text-blue-400">₹{(realEstateSummary.totalRentalIncome / 1000).toFixed(0)}K</span></span>
              </div>
              <RealEstateSummaryCard
                portfolioValue={realEstateSummary.currentPortfolioValue}
                totalInvestment={realEstateSummary.totalInvestment}
                totalAppreciation={realEstateSummary.totalAppreciation}
                appreciationPercent={realEstateSummary.appreciationPercent}
                netEquity={realEstateSummary.netEquity}
                monthlyRental={realEstateSummary.totalRentalIncome}
                totalProperties={realEstateSummary.totalProperties}
              />
            </div>

            {/* 2. Portfolio Value Trend Chart (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <PropertyValueChart />
            </div>

          </div>

          {/* RIGHT COLUMN: Allocation + Metrics (Stacked) */}
          <div className="lg:col-span-1 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
              <PropertyAllocationChart />
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <RealEstateMetrics />
            </div>
          </div>

        </div>

        {/* Holdings Table - Below everything */}
        <div className="mt-6">
          <PropertyHoldingsTable />
        </div>

      </div>
    </div>
  );
};

export default RealEstate;
