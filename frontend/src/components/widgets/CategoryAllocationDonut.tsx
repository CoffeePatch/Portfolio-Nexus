import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockAllocation } from "../../data/mockMutualFundData";

export const CategoryAllocationDonut = () => {
  const COLORS = ["#3b82f6", "#ec4899", "#f97316", "#10b981"];

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockAllocation}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={95}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {mockAllocation.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ filter: `drop-shadow(0px 0px 6px ${COLORS[index % COLORS.length]}80)` }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#000", borderRadius: "8px", border: "none" }}
              itemStyle={{ fontWeight: "bold" }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-white">4</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Categories</span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex w-full justify-center gap-4">
        {mockAllocation.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="h-2 w-2 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 0 8px ${COLORS[index % COLORS.length]}` }} 
            />
            <span className="text-xs font-bold text-slate-400">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
