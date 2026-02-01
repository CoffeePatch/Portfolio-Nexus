import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { metalAllocation } from '../../data/mockMetalsData';

const formatCurrency = (amount: number) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${(amount / 1000).toFixed(0)}K`;
};

export const MetalAllocationChart = () => {
  const total = metalAllocation.reduce((sum, item) => sum + item.currentValue, 0);

  const chartData = metalAllocation.map(item => ({
    type: item.type,
    value: item.currentValue,
    color: item.color,
    weight: item.weight,
  }));

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Metal Allocation</h3>
      
      <div className="flex-1 flex items-center">
        <div className="w-1/2 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                nameKey="type"
                strokeWidth={2}
                stroke="#000"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Value']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-1/2 space-y-3">
          {metalAllocation.map((item) => (
            <div key={item.type} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300">{item.type}</span>
                </div>
                <span className="text-white font-medium">
                  {((item.currentValue / total) * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 pl-4">
                {item.type === 'Gold' ? `${item.weight}g` : item.type === 'Silver' ? `${(item.weight/1000).toFixed(1)}kg` : `${item.weight}g`} • {formatCurrency(item.currentValue)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
