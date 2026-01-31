import { useState, useEffect } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { getMockPortfolioHistory } from "../../api/mock/mockPortfolioService";
import type { PortfolioHistory } from "../../api/portfolioService";

const TimeRangeButton = ({ 
  active, 
  label, 
  onClick 
}: { 
  active: boolean; 
  label: string; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 ${
      active
        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    {label}
  </button>
);

export const PortfolioPerformanceChart = () => {
  const [data, setData] = useState<PortfolioHistory[]>([]);
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "1Y" | "ALL">("1M");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch fresh mock data whenever time range changes
      const history = await getMockPortfolioHistory(timeRange);
      setData(history);
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  // Calculate percentage change for the header
  const firstValue = data.length > 0 ? data[0].totalValue : 0;
  const lastValue = data.length > 0 ? data[data.length - 1].totalValue : 0;
  const change = lastValue - firstValue;
  const changePercent = firstValue > 0 ? (change / firstValue) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <div className="w-full p-6 rounded-2xl bg-[#0a0a0a] border border-slate-800/50 shadow-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-slate-400 text-sm font-medium mb-1">Total Net Worth</h2>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white tracking-tight">
              ₹{lastValue.toLocaleString()}
            </span>
            <span
              className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                isPositive 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "bg-rose-500/10 text-rose-400"
              }`}
            >
              {isPositive ? "+" : ""}{changePercent.toFixed(2)}% ({timeRange})
            </span>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          {(["1D", "1W", "1M", "1Y", "ALL"] as const).map((range) => (
            <TimeRangeButton
              key={range}
              label={range}
              active={timeRange === range}
              onClick={() => setTimeRange(range)}
            />
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[300px] w-full relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/50 z-10 backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="snapshotDate" 
              hide={true} 
            />
            <YAxis 
              hide={false}
              orientation="right"
              tick={{ fill: '#64748b', fontSize: 10 }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
                borderRadius: "8px",
                color: "#f8fafc",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Value"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="totalValue"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioPerformanceChart;
