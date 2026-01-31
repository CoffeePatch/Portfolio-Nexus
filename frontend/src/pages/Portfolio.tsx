import { PortfolioPerformanceChart } from "../components/widgets/PortfolioPerformanceChart";
import { AssetAllocationWidget } from "../components/widgets/AssetAllocationWidget";
import { RecentTransactions } from "../components/widgets/RecentTransactions";
import { MarketTable } from "../components/market/MarketTable";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-black p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Portfolio Analysis</h1>
          <p className="text-slate-400 mt-1">Deep dive into your asset performance</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Download Report
        </button>
      </div>

      {/* 2. Top Row: Performance & Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Spans 2 cols */}
        <div className="lg:col-span-2">
          <PortfolioPerformanceChart />
        </div>
        
        {/* Allocation - Spans 1 col */}
        <div className="lg:col-span-1">
          <AssetAllocationWidget className="h-full" />
        </div>
      </div>

      {/* 3. Middle Row: Holdings & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Holdings List (Reusing MarketTable for the 'Live' look) */}
        <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Your Holdings</h3>
            <MarketTable />
        </div>

        {/* Quick Stats / Recent Activity */}
        <div className="space-y-6">
            <RecentTransactions />
            
            {/* Quick Action Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
                <h3 className="text-white font-bold mb-2">Rebalance Required</h3>
                <p className="text-sm text-slate-400 mb-4">
                    Your Crypto allocation (12%) is higher than your target (10%).
                </p>
                <button className="w-full py-2 bg-indigo-500/10 border border-indigo-500/50 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/20 transition">
                    View Recommendations
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
