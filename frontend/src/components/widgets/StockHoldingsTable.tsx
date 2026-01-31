// src/components/widgets/StockHoldingsTable.tsx
// Holdings table with sparkline trends

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { mockStocks } from "../../data/mockStockData";

const StockHoldingsTable: React.FC = () => {
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

  return (
    <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/70">Your Holdings</h3>
          <p className="mt-1 text-xs text-white/40">{mockStocks.length} stocks in portfolio</p>
        </div>
        <button className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-sm">tune</span>
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="h-[320px] overflow-y-auto custom-scrollbar">
          <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                Stock
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                LTP
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Qty
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Invested
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Current
              </th>
              <th className="pb-3 text-center text-xs font-medium text-white/40 uppercase tracking-wider">
                7D Trend
              </th>
              <th className="pb-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Return
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockStocks.map((stock) => {
              const isPositive = stock.totalReturn >= 0;
              const trendData = getTrendData(stock.trend);
              const trendColor = isPositive ? "#10b981" : "#ef4444";

              return (
                <tr
                  key={stock.id}
                  className="group cursor-pointer transition-colors hover:bg-white/5"
                >
                  {/* Stock Info */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10">
                        <span className="text-xs font-bold text-white/80">
                          {stock.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{stock.symbol}</p>
                        <p className="text-xs text-white/40">{stock.exchange}</p>
                      </div>
                    </div>
                  </td>

                  {/* LTP */}
                  <td className="py-4 text-right">
                    <p className="text-sm font-medium text-white">
                      {formatCurrency(stock.ltp)}
                    </p>
                    <p
                      className={`text-xs ${
                        stock.dayChange >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {formatPercent(stock.dayChange)}
                    </p>
                  </td>

                  {/* Quantity */}
                  <td className="py-4 text-right">
                    <p className="text-sm font-medium text-white">{stock.quantity}</p>
                  </td>

                  {/* Invested */}
                  <td className="py-4 text-right">
                    <p className="text-sm font-medium text-white/70">
                      {formatCurrency(stock.investedAmount)}
                    </p>
                  </td>

                  {/* Current Value */}
                  <td className="py-4 text-right">
                    <p className="text-sm font-medium text-white">
                      {formatCurrency(stock.currentValue)}
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

                  {/* Total Return */}
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isPositive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {formatPercent(stock.totalReturn)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
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

export default StockHoldingsTable;
