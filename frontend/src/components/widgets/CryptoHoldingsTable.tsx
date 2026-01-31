// src/components/widgets/CryptoHoldingsTable.tsx
// Holdings table with sparkline trends - matches StockHoldingsTable

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { mockCryptos } from "../../data/mockCryptoData";

const CryptoHoldingsTable: React.FC = () => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatPercent = (val: number) =>
    `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`;

  // Convert trend array to chart data
  const getTrendData = (trend: number[]) =>
    trend.map((value, index) => ({ value, index }));

  // Crypto color mapping
  const cryptoColors: Record<string, string> = {
    BTC: "from-orange-500/20 to-yellow-500/20",
    ETH: "from-indigo-500/20 to-purple-500/20",
    SOL: "from-emerald-500/20 to-teal-500/20",
    DOGE: "from-yellow-500/20 to-amber-500/20",
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/70">Your Holdings</h3>
          <p className="mt-1 text-xs text-white/40">{mockCryptos.length} assets in portfolio</p>
        </div>
        <button className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-sm">tune</span>
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                Asset
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Price
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Holdings
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Value
              </th>
              <th className="pb-3 text-center text-xs font-medium text-white/40 uppercase tracking-wider">
                7D Trend
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                24h
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Return
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockCryptos.map((crypto) => {
              const isPositive = crypto.totalReturn >= 0;
              const trendData = getTrendData(crypto.trend);
              const trendColor = isPositive ? "#10b981" : "#ef4444";
              const gradientClass = cryptoColors[crypto.symbol] || "from-gray-500/20 to-slate-500/20";

              return (
                <tr
                  key={crypto.id}
                  className="group cursor-pointer transition-colors hover:bg-white/5"
                >
                  {/* Asset Info */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradientClass} border border-white/10`}>
                        <span className="text-xs font-bold text-white/80">
                          {crypto.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{crypto.symbol}</p>
                        <p className="text-xs text-white/40">{crypto.name}</p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-4 text-right">
                    <p className="text-sm font-medium text-white">
                      {formatCurrency(crypto.ltp)}
                    </p>
                  </td>

                  {/* Holdings */}
                  <td className="py-4 text-right">
                    <p className="text-sm font-medium text-white">{crypto.quantity} {crypto.symbol}</p>
                  </td>

                  {/* Value */}
                  <td className="py-4 text-right">
                    <p className="text-sm font-medium text-white">
                      {formatCurrency(crypto.currentValue)}
                    </p>
                  </td>

                  {/* 7D Trend Sparkline */}
                  <td className="py-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-20">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData}>
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={trendColor}
                              strokeWidth={1.5}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </td>

                  {/* 24h Change */}
                  <td className="py-4 text-right">
                    <span
                      className={`text-sm font-medium ${
                        crypto.change24h >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {formatPercent(crypto.change24h)}
                    </span>
                  </td>

                  {/* Total Return */}
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isPositive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {formatPercent(crypto.totalReturn)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-xs text-white/40">Last updated: Just now</span>
        <button className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors">
          View All Holdings →
        </button>
      </div>
    </div>
  );
};

export default CryptoHoldingsTable;
