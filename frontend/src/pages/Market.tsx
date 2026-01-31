import { MarketTicker } from "../components/market/MarketTicker";
import { MarketTable } from "../components/market/MarketTable";

const Market = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* 1. The Ticker Tape (Full Width) */}
      <MarketTicker />

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Market Overview</h1>
            <p className="text-slate-400 mt-1">
              Global indices and watchlist performance
            </p>
          </div>
          
          {/* Mock Search Bar */}
          <div className="relative group w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-500 group-focus-within:text-indigo-400 transition-colors">search</span>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-lg leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 sm:text-sm transition-all shadow-lg"
              placeholder="Search symbols (e.g., AAPL, BTC, RELIANCE)..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-xs text-slate-600 border border-slate-700 px-1.5 rounded">⌘K</span>
            </div>
          </div>
        </div>

        {/* 2. Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: The Big Table (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <MarketTable />
          </div>

          {/* Right Column: Widgets (Placeholder for Phase 2.3) */}
          <div className="space-y-6">
            {/* Market Sentiment Card */}
            <div className="bg-gradient-to-br from-indigo-900/10 to-purple-900/10 rounded-xl border border-indigo-500/20 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide mb-2">AI Market Sentiment</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">Bullish</span>
                    <span className="text-green-400 font-mono text-sm">84% Confidence</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Mistral AI analysis of recent news indicates strong momentum in Tech and Energy sectors driven by Q3 earnings reports.
                </p>
            </div>

            {/* Top Movers (Mini List) */}
            <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4">
                <h3 className="text-sm font-bold text-slate-300 mb-4">Top Movers (24h)</h3>
                <div className="space-y-3">
                    {/* Mock Mover 1 */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500 text-xs font-bold">NVDA</div>
                            <span className="text-sm text-slate-300">NVIDIA</span>
                        </div>
                        <span className="text-green-400 text-sm font-mono">+4.5%</span>
                    </div>
                     {/* Mock Mover 2 */}
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-bold">TSLA</div>
                            <span className="text-sm text-slate-300">Tesla</span>
                        </div>
                        <span className="text-red-400 text-sm font-mono">-2.1%</span>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Market;
