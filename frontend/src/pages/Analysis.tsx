import { WealthProjectionChart } from "../components/widgets/WealthProjectionChart";
import { AssetAllocationWidget } from "../components/widgets/AssetAllocationWidget";
import { CashFlowChart } from "../components/widgets/CashFlowChart";

const Analysis = () => {
  return (
    <div className="min-h-screen bg-black p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Financial Analysis</h1>
        <p className="text-slate-400 mt-1">AI-driven insights and future projections</p>
      </div>

      {/* 2. Top Section: The AI Insight Console */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Insight Card 1 */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-900/10 to-blue-900/10 border border-indigo-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-indigo-500">psychology</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white">AI INSIGHT</span>
              <span className="text-xs text-indigo-300">Portfolio Health</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High Cash Drag Detected</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              You have <span className="text-white font-medium">15%</span> of your portfolio in cash. Consider deploying this into <span className="text-white font-medium">Large Cap Funds</span> to improve your XIRR by an estimated 1.2%.
            </p>
            <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
              View Opportunities <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Insight Card 2 */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-900/10 to-teal-900/10 border border-emerald-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-emerald-500">trending_up</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">TAX HARVESTING</span>
              <span className="text-xs text-emerald-300">Year End</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">₹45k Unbooked Losses</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              You can offset your Short Term Capital Gains by booking losses in <span className="text-white font-medium">ADANIENT</span>. This could save you approx ₹6,750 in taxes.
            </p>
            <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
              Review Holdings <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Insight Card 3 */}
        <div className="p-5 rounded-xl bg-[#0a0a0a] border border-slate-800 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-slate-400">add</span>
          </div>
          <h3 className="text-sm font-bold text-slate-300">New Analysis Goal</h3>
          <p className="text-xs text-slate-500 mt-1 mb-3">Create a custom financial plan</p>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors">
            Start Wizard
          </button>
        </div>
      </div>

      {/* 3. Wealth Projection Widget (The "Hero" of the page) */}
      <WealthProjectionChart />

      {/* 4. Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetAllocationWidget />
        <CashFlowChart />
      </div>
    </div>
  );
};

export default Analysis;
