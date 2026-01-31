import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryBreakdown } from '../../data/expenseDummyData';

interface ExpenseCategoryDonutProps {
  data: CategoryBreakdown[];
  budgetUsed: number;
  totalBudget: number;
}

export const ExpenseCategoryDonut = ({ data, budgetUsed, totalBudget }: ExpenseCategoryDonutProps) => {
  const percentage = (budgetUsed / totalBudget) * 100;

  return (
    <div className="space-y-4">
      {/* Donut Chart */}
      <div className="h-[180px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
              }}
              formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-slate-500">Total</p>
            <p className="text-lg font-bold text-white">
              ₹{(data.reduce((sum, item) => sum + item.amount, 0) / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
      </div>

      {/* Category Legend */}
      <div className="space-y-1.5">
        {data.slice(0, 5).map((category, index) => (
          <div key={index} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 transition-all">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs font-medium text-slate-400">{category.category}</span>
            </div>
            <span className="text-xs font-bold text-white">{category.percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>

      {/* Budget Progress */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Budget Used</span>
          <span className={`text-xs font-medium ${
            percentage > 90 ? 'text-red-400' : percentage > 70 ? 'text-orange-400' : 'text-emerald-400'
          }`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage > 90
                ? 'bg-gradient-to-r from-red-500 to-rose-500'
                : percentage > 70
                ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          ₹{(totalBudget - budgetUsed).toLocaleString('en-IN')} remaining
        </p>
      </div>
    </div>
  );
};
