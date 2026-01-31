import { useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

type ValuationDataPoint = {
  date: string;
  marketValue: number;
  purchaseCost: number;
};

type ValuationHistoryChartProps = {
  data?: ValuationDataPoint[];
  isLoading?: boolean;
  className?: string;
};

const timeFilters = ["1Y", "3Y", "5Y", "10Y", "ALL"] as const;

// Dummy data showing hard asset growth over 10 years
const defaultData: ValuationDataPoint[] = [
  { date: "2015", marketValue: 1500000, purchaseCost: 1500000 },
  { date: "2016", marketValue: 1650000, purchaseCost: 1500000 },
  { date: "2017", marketValue: 1950000, purchaseCost: 1700000 },
  { date: "2018", marketValue: 2200000, purchaseCost: 1900000 },
  { date: "2019", marketValue: 2450000, purchaseCost: 2100000 },
  { date: "2020", marketValue: 2900000, purchaseCost: 2400000 },
  { date: "2021", marketValue: 3650000, purchaseCost: 2800000 },
  { date: "2022", marketValue: 4200000, purchaseCost: 3200000 },
  { date: "2023", marketValue: 4850000, purchaseCost: 3600000 },
  { date: "2024", marketValue: 5500000, purchaseCost: 4000000 },
  { date: "2025", marketValue: 5847230, purchaseCost: 4200000 },
];

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex items-center justify-between">
      <div className="h-6 w-48 rounded bg-slate-800"></div>
      <div className="flex gap-2">
        {timeFilters.map((filter) => (
          <div key={filter} className="h-9 w-16 rounded-lg bg-slate-800"></div>
        ))}
      </div>
    </div>
    <div className="h-96 rounded-lg bg-slate-800/50"></div>
  </div>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length >= 2) {
    const data = payload[0].payload;
    const gain = data.marketValue - data.purchaseCost;
    const gainPercent = ((gain / data.purchaseCost) * 100).toFixed(1);
    const isPositive = gain >= 0;

    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/98 px-5 py-4 shadow-2xl backdrop-blur-sm">
        <p className="mb-3 text-sm font-bold text-slate-300">{data.date}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
              <span className="text-xs font-medium text-slate-400">Market Value</span>
            </div>
            <span className="text-sm font-bold text-white">
              ${data.marketValue.toLocaleString("en-US")}
            </span>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-dashed border-slate-400"></div>
              <span className="text-xs font-medium text-slate-400">Purchase Cost</span>
            </div>
            <span className="text-sm font-bold text-slate-400">
              ${data.purchaseCost.toLocaleString("en-US")}
            </span>
          </div>

          <div className="mt-3 border-t border-slate-800 pt-2">
            <div className="flex items-center justify-between gap-6">
              <span className="text-xs font-medium text-slate-500">Appreciation</span>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}${gain.toLocaleString("en-US")}
                </span>
                <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  ({isPositive ? '+' : ''}{gainPercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Legend
const CustomLegend = () => (
  <div className="flex items-center justify-center gap-8 pt-4">
    <div className="flex items-center gap-2">
      <div className="h-1 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
      <span className="text-sm font-semibold text-slate-300">Market Value</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-1 w-8 rounded-full border-2 border-dashed border-slate-400"></div>
      <span className="text-sm font-semibold text-slate-400">Purchase Cost</span>
    </div>
  </div>
);

export const ValuationHistoryChart = ({
  data = defaultData,
  isLoading = false,
  className = "",
}: ValuationHistoryChartProps) => {
  const [period, setPeriod] = useState<typeof timeFilters[number]>("ALL");

  const containerClassName = [
    "group relative overflow-hidden rounded-2xl border border-slate-800",
    "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl",
    className,
  ].join(" ");

  if (isLoading) {
    return (
      <div className={containerClassName}>
        <SkeletonLoader />
      </div>
    );
  }

  // Calculate total gain
  const latestData = data[data.length - 1];
  const totalGain = latestData.marketValue - latestData.purchaseCost;
  const totalGainPercent = ((totalGain / latestData.purchaseCost) * 100).toFixed(1);
  const isPositiveGain = totalGain >= 0;

  return (
    <div className={containerClassName}>
      {/* Decorative gradient background */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-40 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 ring-1 ring-emerald-500/30 shadow-lg">
              <span
                className="material-symbols-outlined text-3xl text-emerald-400"
                style={{
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                }}
              >
                trending_up
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Net Worth Growth
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Hard assets appreciation over time
              </p>
              
              {/* Total Gain Display */}
              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-lg bg-slate-800/50 px-4 py-2">
                  <p className="text-xs font-medium text-slate-500">Total Appreciation</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`text-lg font-bold ${isPositiveGain ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPositiveGain ? '+' : ''}${totalGain.toLocaleString("en-US")}
                    </span>
                    <span className={`text-sm font-semibold ${isPositiveGain ? 'text-emerald-400' : 'text-red-400'}`}>
                      ({isPositiveGain ? '+' : ''}{totalGainPercent}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setPeriod(filter)}
                className={[
                  "rounded-lg px-4 py-2.5 text-sm font-bold transition-all",
                  period === filter
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                    : "border border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white",
                ].join(" ")}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="relative w-full min-w-0">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="marketValueGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                strokeOpacity={0.2}
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#64748b"
                style={{ fontSize: "13px", fontWeight: "600" }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />

              <YAxis
                stroke="#64748b"
                style={{ fontSize: "13px", fontWeight: "600" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                width={60}
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend content={<CustomLegend />} />

              {/* Solid Line: Market Value */}
              <Line
                type="monotone"
                dataKey="marketValue"
                stroke="url(#marketValueGradient)"
                strokeWidth={3}
                dot={{
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 5,
                }}
                activeDot={{
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 7,
                }}
                animationDuration={1500}
              />

              {/* Dashed Line: Purchase Cost */}
              <Line
                type="monotone"
                dataKey="purchaseCost"
                stroke="#94a3b8"
                strokeWidth={2.5}
                strokeDasharray="8 4"
                dot={{
                  fill: "#64748b",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  fill: "#64748b",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 6,
                }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-xl border border-slate-800/50 bg-slate-800/20 p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-emerald-400">
              info
            </span>
            <div>
              <h4 className="font-semibold text-white">Why This Matters</h4>
              <p className="mt-1 text-sm text-slate-400">
                Real Estate and Gold are long-term investments. The gap between your{" "}
                <span className="font-semibold text-emerald-400">Market Value</span> and{" "}
                <span className="font-semibold text-slate-300">Purchase Cost</span> shows 
                how your hard assets have appreciated over the years—a satisfying view of wealth growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationHistoryChart;
