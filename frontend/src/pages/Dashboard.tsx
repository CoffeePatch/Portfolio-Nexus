import { AssetClassCarousel } from "../components/widgets/AssetClassCarousel";
import { PortfolioPerformanceChart } from "../components/widgets/PortfolioPerformanceChart";
import { NetWorthSummary } from "../components/widgets/NetWorthSummary";
import { AssetAllocationWidget } from "../components/widgets/AssetAllocationWidget";
import { RecentTransactions } from "../components/widgets/RecentTransactions";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      {/* Page Header - Compact */}
      <header className="mb-4">
        <h1 className="text-xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-xs text-slate-500">
          Portfolio performance overview
        </p>
      </header>

      {/* Top Row - 3 Columns Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Net Worth Summary - Spans 1 column */}
        <NetWorthSummary />

        {/* Asset Class Carousel - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <div className="group relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-4 shadow-xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            
            <div className="relative mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
                <span className="material-symbols-outlined text-lg text-indigo-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                  dashboard
                </span>
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-white">My Portfolio</h2>
                <p className="text-xs text-slate-500">Asset breakdown by class</p>
              </div>
            </div>
            <div className="relative">
              <AssetClassCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance Chart - Full Width */}
      <PortfolioPerformanceChart />

      {/* Bottom Row - 3 Columns Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Asset Allocation Widget - Spans 2 columns */}
        <AssetAllocationWidget className="lg:col-span-2" />

        {/* Recent Transactions - Spans 1 column */}
        <RecentTransactions className="lg:col-span-1" />
      </div>
    </div>
  );
};

export default Dashboard;
