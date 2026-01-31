import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { CashFlowData } from '../../data/expenseDummyData';

interface CashFlowChartProps {
  data: CashFlowData[];
}

export const CashFlowChart = ({ data }: CashFlowChartProps) => {
  // Calculate totals for summary
  const totalIncome = data.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = data.reduce((sum, d) => sum + d.expense, 0);
  const netFlow = totalIncome - totalExpense;

  return (
    <div className="flex flex-col h-full">
      {/* Summary Stats Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <div>
              <span className="text-xs text-slate-500">Income</span>
              <p className="text-sm font-bold text-emerald-400">₹{(totalIncome / 1000).toFixed(0)}k</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500"></div>
            <div>
              <span className="text-xs text-slate-500">Expenses</span>
              <p className="text-sm font-bold text-rose-400">₹{(totalExpense / 1000).toFixed(0)}k</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${netFlow >= 0 ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
            <div>
              <span className="text-xs text-slate-500">Net Flow</span>
              <p className={`text-sm font-bold ${netFlow >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                {netFlow >= 0 ? '+' : ''}₹{(netFlow / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        </div>
        
        {/* Time Period Pills */}
        <div className="flex items-center gap-1">
          {['1W', '1M', '3M', '1Y'].map((period, idx) => (
            <button
              key={period}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                idx === 1
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart - fills remaining space */}
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="cashIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="cashExpenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#e2e8f0', fontWeight: '600', fontSize: '11px', marginBottom: '4px' }}
              itemStyle={{ fontSize: '11px', padding: '2px 0' }}
              formatter={(value: number, name: string) => [
                `₹${value.toLocaleString('en-IN')}`,
                name === 'income' ? 'Income' : 'Expenses'
              ]}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#cashIncomeGradient)"
              name="income"
              dot={false}
              activeDot={{ r: 4, fill: '#10b981', stroke: '#000', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#f43f5e"
              strokeWidth={2}
              fill="url(#cashExpenseGradient)"
              name="expense"
              dot={false}
              activeDot={{ r: 4, fill: '#f43f5e', stroke: '#000', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
