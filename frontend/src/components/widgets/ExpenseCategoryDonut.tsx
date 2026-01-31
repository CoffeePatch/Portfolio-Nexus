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
    <div className="space-y-6">
      {/* Category Breakdown */}
      <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 ring-1 ring-orange-500/30">
            <span
              className="material-symbols-outlined text-3xl text-orange-400"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}
            >
              donut_large
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Category Breakdown</h2>
            <p className="text-sm text-slate-500">Where did your money go?</p>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="h-[280px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
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
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                }}
                formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-sm text-slate-500">Total Spent</p>
              <p className="text-2xl font-bold text-white">
                ₹{data.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Category Legend */}
        <div className="mt-6 space-y-2">
          {data.map((category, index) => (
            <div key={index} className="flex items-center justify-between group hover:bg-slate-900/50 p-2 rounded-lg transition-all">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full ring-2 ring-black"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium text-slate-300">{category.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">{category.percentage.toFixed(1)}%</span>
                <span className="text-sm font-bold text-white">₹{category.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Progress */}
      <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-cyan-500/30">
            <span
              className="material-symbols-outlined text-3xl text-cyan-400"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}
            >
              target
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Monthly Budget</h2>
            <p className="text-sm text-slate-500">Track your spending limit</p>
          </div>
        </div>

        {/* Budget Stats */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm text-slate-400">Used Budget</p>
            <p className="text-2xl font-bold text-white">₹{budgetUsed.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Total Budget</p>
            <p className="text-2xl font-bold text-slate-300">₹{totalBudget.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-900">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage > 90
                ? 'bg-gradient-to-r from-red-500 to-rose-500'
                : percentage > 70
                ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Percentage Badge */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            ₹{(totalBudget - budgetUsed).toLocaleString('en-IN')} remaining
          </span>
          <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
            percentage > 90
              ? 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20'
              : percentage > 70
              ? 'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20'
              : 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20'
          }`}>
            {percentage.toFixed(1)}% Used
          </div>
        </div>
      </div>
    </div>
  );
};
