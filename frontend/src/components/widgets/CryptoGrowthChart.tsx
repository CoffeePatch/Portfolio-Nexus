// src/components/widgets/CryptoGrowthChart.tsx
// Area chart with timeframe filters for crypto portfolio

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
  cryptoChartData1D,
  cryptoChartData1W,
  cryptoChartData1M,
  cryptoChartData1Y,
  cryptoChartDataMax,
  type ChartDataPoint,
} from "../../data/mockCryptoData";

type TimeframeKey = "1D" | "1W" | "1M" | "1Y" | "MAX";

const chartDataMap: Record<TimeframeKey, ChartDataPoint[]> = {
  "1D": cryptoChartData1D,
  "1W": cryptoChartData1W,
  "1M": cryptoChartData1M,
  "1Y": cryptoChartData1Y,
  MAX: cryptoChartDataMax,
};

const CryptoGrowthChart: React.FC = () => {
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
    <>
      {/* Timeframe Filters */}
      <div className="mb-4 flex justify-end">
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
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={currentData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cryptoColorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f7931a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f7931a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cryptoColorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              {/* Multi-color gradient for stroke */}
              <linearGradient id="cryptoStrokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f7931a" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#627eea" />
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
              stroke="#f7931a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#cryptoColorInvested)"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#cryptoStrokeGradient)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#cryptoColorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CryptoGrowthChart;
