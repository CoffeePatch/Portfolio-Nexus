// src/pages/MutualFunds.tsx
import { MFSummaryCard } from "../components/widgets/MFSummaryCard";
import { GrowthCurveChart } from "../components/widgets/GrowthCurveChart";
import { CategoryAllocationDonut } from "../components/widgets/CategoryAllocationDonut";
import { UpcomingSIPsWidget } from "../components/widgets/UpcomingSIPsWidget";
import { FundHoldingsTable } from "../components/widgets/FundHoldingsTable";

const MutualFunds = () => {
  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans text-slate-200">

      {/* Main Content */}
      <div className="relative z-10 p-8">
        
        {/* Grid: Left side (2 widgets stacked) + Right side (vertical widget) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* LEFT COLUMN: 2 widgets stacked vertically */}
          <div className="lg:col-span-3 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            {/* 1. Overall Portfolio Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl" style={{ marginBottom: '1cm' }}>
              <h1 className="mb-2 text-2xl font-bold text-white">Overall Portfolio</h1>
              <div className="mb-4 flex gap-6 text-xs text-slate-400">
                <span>My Balance <span className="text-emerald-400">▲ +24%</span></span>
                <span>Investment <span className="text-emerald-400">▲ +28%</span></span>
              </div>
              <MFSummaryCard />
            </div>

            {/* 2. Overview Statistic Widget (Glass - Black tint) - Increased height */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <h2 className="mb-4 text-xl font-semibold text-white">Overview Statistic</h2>
              <GrowthCurveChart />
            </div>

          </div>

          {/* RIGHT COLUMN: Vertical Widget (Single component - Glass - Black tint) */}
          <div className="lg:col-span-1" style={{ marginTop: '1cm' }}>
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl h-full">
              
              {/* Fund Info */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500">
                  <span className="material-symbols-outlined">pie_chart</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Mutual Funds</h3>
                  <p className="text-xs text-slate-500">SIP Portfolio</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-xs text-slate-500">Total Valuation</p>
                <p className="text-2xl font-bold text-white">₹3,15,840</p>
              </div>

              {/* Allocation Donut */}
              <div className="mb-6">
                <CategoryAllocationDonut />
              </div>

              {/* SIP Schedule */}
              <div>
                <UpcomingSIPsWidget />
              </div>
              
            </div>
          </div>

        </div>

        {/* Holdings Table - Below everything */}
        <div className="mt-6">
          <FundHoldingsTable />
        </div>

      </div>
    </div>
  );
};

export default MutualFunds;
