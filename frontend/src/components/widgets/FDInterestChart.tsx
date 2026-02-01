import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { interestTrend } from '../../data/mockFDData';
import { useState } from 'react';

type TimeFilter = '6M' | '1Y' | 'ALL';

export const FDInterestChart = () => {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('1Y');

  const getFilteredData = () => {
    switch (activeFilter) {
      case '6M':
        return interestTrend.slice(-6);
      case '1Y':
        return interestTrend;
      case 'ALL':
        return interestTrend;
      default:
        return interestTrend;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Interest Growth</h3>
        <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
          {(['6M', '1Y', 'ALL'] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-pink-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getFilteredData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px',
              }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
              formatter={(value: number, name: string) => [
                `₹${value.toLocaleString('en-IN')}`,
                name === 'cumulative' ? 'Total Interest' : 'Monthly Interest'
              ]}
            />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#ec4899"
              strokeWidth={2}
              fill="url(#interestGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
