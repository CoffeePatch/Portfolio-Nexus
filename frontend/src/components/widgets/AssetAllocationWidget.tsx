import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useAssetClassSummary } from "../../hooks/useAssetClassSummary";

const COLORS = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#64748b", "#ec4899", "#14b8a6", "#f97316"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-indigo-400 font-mono">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const AssetAllocationWidget = ({ className }: { className?: string }) => {
  const { data: classes, isLoading } = useAssetClassSummary();

  const chartData = (classes || [])
    .filter((c) => c.currentValue > 0)
    .map((c, i) => ({
      name: c.label,
      value: Math.round(c.currentValue),
      color: COLORS[i % COLORS.length],
    }));

  const total = chartData.reduce((s, d) => s + d.value, 0);
  const totalLabel = total >= 100000 ? `₹${(total / 100000).toFixed(1)}L` : `₹${total.toLocaleString()}`;
  return (
    <div className={`p-6 rounded-2xl bg-[#0a0a0a] border border-slate-800/50 shadow-xl flex flex-col ${className}`}>
      <h3 className="text-slate-200 font-bold mb-6">Asset Allocation</h3>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-slate-500 text-sm">Loading…</span>
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-slate-500 text-sm">No holdings yet</span>
        </div>
      ) : (
      <div className="flex-1 min-h-[250px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-slate-400 text-xs ml-1">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-xs text-slate-500">Total</span>
          <span className="text-lg font-bold text-white">{totalLabel}</span>
        </div>
      </div>
      )}
    </div>
  );
};
