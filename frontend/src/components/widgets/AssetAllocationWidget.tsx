import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Stocks", value: 450000, color: "#6366f1" },  // Indigo
  { name: "Crypto", value: 120000, color: "#8b5cf6" },  // Violet
  { name: "Mutual Funds", value: 300000, color: "#10b981" }, // Emerald
  { name: "Gold", value: 50000, color: "#f59e0b" },     // Amber
  { name: "Cash", value: 80000, color: "#64748b" },     // Slate
];

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
  return (
    <div className={`p-6 rounded-2xl bg-[#0a0a0a] border border-slate-800/50 shadow-xl flex flex-col ${className}`}>
      <h3 className="text-slate-200 font-bold mb-6">Asset Allocation</h3>
      
      <div className="flex-1 min-h-[250px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
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
          <span className="text-lg font-bold text-white">₹10L</span>
        </div>
      </div>
    </div>
  );
};
