import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import { 
  chartData1D, 
  chartData1W, 
  chartData1M, 
  chartData1Y, 
  chartDataMax 
} from "../../data/mockMutualFundData";

type TimeFrame = "1D" | "1W" | "1M" | "1Y" | "MAX";

export const GrowthCurveChart = () => {
  const [activeFilter, setActiveFilter] = useState<TimeFrame>("1Y");

  const getDataForTimeframe = (timeframe: TimeFrame) => {
    switch (timeframe) {
      case "1D": return chartData1D;
      case "1W": return chartData1W;
      case "1M": return chartData1M;
      case "1Y": return chartData1Y;
      case "MAX": return chartDataMax;
      default: return chartData1Y;
    }
  };

  const data = getDataForTimeframe(activeFilter);

  return (
    <div className="h-full w-full flex flex-col flex-1">
      <div className="mb-4 flex items-center justify-end gap-1">
        {(["1D", "1W", "1M", "1Y", "MAX"] as TimeFrame[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              filter === activeFilter
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "text-slate-500 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="h-full w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {/* Multi-color gradient for the line stroke */}
              <linearGradient id="lineGradient" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#C75B77" />
                <stop offset="14%" stopColor="#BD478D" />
                <stop offset="28%" stopColor="#D35061" />
                <stop offset="42%" stopColor="#CC478C" />
                <stop offset="56%" stopColor="#C832AF" />
                <stop offset="70%" stopColor="#D57141" />
                <stop offset="84%" stopColor="#CE5D66" />
                <stop offset="100%" stopColor="#CE4873" />
              </linearGradient>
              
              {/* Gradient for fill area */}
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C75B77" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C832AF" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#333" 
              vertical={false} 
              horizontal={true} 
            />
            
            <XAxis 
              dataKey="month" 
              stroke="#666" 
              tick={{ fontSize: 11, fill: "#888" }} 
              axisLine={false} 
              tickLine={false}
            />
            
            <Tooltip
              cursor={{ stroke: "#666", strokeDasharray: "4 4" }}
              contentStyle={{
                backgroundColor: "#111",
                borderColor: "#333",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "11px"
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
