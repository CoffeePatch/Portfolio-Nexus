import { MOCK_CRYPTO } from "../api/mock/mockPortfolioService";

// Crypto names mapping
const CRYPTO_NAMES: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  DOGE: "Dogecoin"
};

// Current market prices in INR (simulated)
const CURRENT_PRICES: Record<string, number> = {
  BTC: 5950000,
  ETH: 235000,
  SOL: 5200,
  DOGE: 14
};

const Crypto = () => {
  // Calculate holdings with current values
  const holdings = MOCK_CRYPTO.map(h => {
    const currentPrice = CURRENT_PRICES[h.symbol] || h.purchasePrice * 1.1;
    const currentValue = h.quantity * currentPrice;
    const investedValue = h.quantity * h.purchasePrice;
    return { ...h, currentPrice, currentValue, investedValue };
  });

  // Calculate total crypto value
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.investedValue, 0);
  const totalGain = totalValue - totalInvested;
  const totalGainPercent = ((totalGain / totalInvested) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-black">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Crypto Portfolio</h1>
            <p className="text-slate-400 mt-1">
              All your cryptocurrency holdings in one place
            </p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Add Crypto
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Value</p>
            <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Invested</p>
            <p className="text-2xl font-bold text-white">${totalInvested.toLocaleString()}</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalGain >= 0 ? '+' : ''}{totalGain.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Return</p>
            <p className={`text-2xl font-bold ${Number(totalGainPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Number(totalGainPercent) >= 0 ? '+' : ''}{totalGainPercent}%
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Your Holdings</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-slate-900/50">
                  <tr className="text-left text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Asset</th>
                    <th className="px-4 py-3 font-medium text-right">Price</th>
                    <th className="px-4 py-3 font-medium text-right">Holdings</th>
                    <th className="px-4 py-3 font-medium text-right">Value</th>
                    <th className="px-4 py-3 font-medium text-right">24h</th>
                    <th className="px-4 py-3 font-medium text-right">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {holdings.map((holding) => {
                    const gain = holding.currentValue - holding.investedValue;
                    const gainPercent = ((gain / holding.investedValue) * 100).toFixed(2);
                    const change24h = (Math.random() * 8) - 3; // Random -3% to +5%
                    return (
                      <tr key={holding.symbol} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-xs font-bold text-white">
                              {holding.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{holding.symbol}</p>
                              <p className="text-xs text-slate-500">{CRYPTO_NAMES[holding.symbol] || holding.coinId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right font-mono text-white">
                          ₹{holding.currentPrice.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-right text-slate-300">
                          {holding.quantity} {holding.symbol}
                        </td>
                        <td className="px-4 py-4 text-right font-mono text-white">
                          ₹{holding.currentValue.toLocaleString()}
                        </td>
                        <td className={`px-4 py-4 text-right ${change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
                        </td>
                        <td className={`px-4 py-4 text-right ${gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          <div className="text-right">
                            <p className="font-mono">{gain >= 0 ? '+' : ''}₹{gain.toLocaleString()}</p>
                            <p className="text-xs opacity-75">{Number(gainPercent) >= 0 ? '+' : ''}{gainPercent}%</p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Market Insight */}
            <div className="bg-gradient-to-br from-orange-900/10 to-yellow-900/10 rounded-xl border border-orange-500/20 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-orange-300 uppercase tracking-wide mb-2">Crypto Sentiment</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">Neutral</span>
                <span className="text-yellow-400 font-mono text-sm">52% Fear</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Market is consolidating after recent volatility. Bitcoin dominance remains strong at 54%.
              </p>
            </div>

            {/* Transactions */}
            <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4">
              <h3 className="text-sm font-bold text-slate-300 mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-400 text-sm">arrow_downward</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Bought BTC</p>
                      <p className="text-xs text-slate-500">Jan 15, 2026</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-green-400">+0.05 BTC</p>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-red-400 text-sm">arrow_upward</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Sold ETH</p>
                      <p className="text-xs text-slate-500">Jan 10, 2026</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-red-400">-1.2 ETH</p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-400 text-sm">arrow_downward</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Bought SOL</p>
                      <p className="text-xs text-slate-500">Jan 5, 2026</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-green-400">+15 SOL</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4 space-y-2">
              <button className="w-full py-2.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/20 transition flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">swap_horiz</span>
                Swap Tokens
              </button>
              <button className="w-full py-2.5 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">history</span>
                View All Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
