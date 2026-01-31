// src/components/widgets/StockGrowthChart.tsx
// Area chart with timeframe filters for stock portfolio

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  stockChartData1D,
  stockChartData1W,
  stockChartData1M,
  stockChartData1Y,
  stockChartDataMax,
  type ChartDataPoint,
} from "../../data/mockStockData";

type TimeframeKey = "1D" | "1W" | "1M" | "1Y" | "MAX";

const chartDataMap: Record<TimeframeKey, ChartDataPoint[]> = {
  "1D": stockChartData1D,
  "1W": stockChartData1W,
  "1M": stockChartData1M,
  "1Y": stockChartData1Y,
  MAX: stockChartDataMax,
};

const StockGrowthChart: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeKey>("1Y");
  const timeframes: TimeframeKey[] = ["1D", "1W", "1M", "1Y", "MAX"];

  const currentData = chartDataMap[activeTimeframe];

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/70">Overview Statistics</h3>
          <p className="mt-1 text-xs text-white/40">Portfolio value over time</p>
        </div>
        {/* Timeframe Filters */}
        <div className="flex gap-1 rounded-full bg-white/5 p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeTimeframe === tf
                  ? "bg-orange-500 text-white"
                  : "text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={currentData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              {/* Multi-color gradient for stroke */}
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff50", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff50", fontSize: 11 }}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(12px)",
              }}
              labelStyle={{ color: "#ffffff80" }}
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === "invested" ? "Invested" : "Current Value",
              ]}
            />
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              formatter={(value) => (
                <span className="text-xs text-white/60">
                  {value === "invested" ? "Invested" : "Current Value"}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="invested"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInvested)"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#strokeGradient)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockGrowthChart;
