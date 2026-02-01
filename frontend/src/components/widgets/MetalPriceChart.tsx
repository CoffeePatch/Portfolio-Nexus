import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { metalPriceHistory } from '../../data/mockMetalsData';
import { useState } from 'react';

type MetalFilter = 'all' | 'gold' | 'silver';

export const MetalPriceChart = () => {
  const [activeFilter, setActiveFilter] = useState<MetalFilter>('all');

  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value}`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Price Trend (per gram)</h3>
        <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
          {(['all', 'gold', 'silver'] as MetalFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-all ${
                activeFilter === filter
                  ? 'bg-yellow-500 text-black'
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
          <LineChart data={metalPriceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={formatPrice}
              yAxisId="gold"
              orientation="left"
            />
            {(activeFilter === 'all' || activeFilter === 'silver') && (
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickFormatter={(v) => `₹${v}`}
                yAxisId="silver"
                orientation="right"
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px',
              }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
              formatter={(value: number, name: string) => [
                `₹${value.toLocaleString('en-IN')}/g`,
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => <span className="text-slate-400 text-xs capitalize">{value}</span>}
            />
            {(activeFilter === 'all' || activeFilter === 'gold') && (
              <Line
                type="monotone"
                dataKey="gold"
                stroke="#fbbf24"
                strokeWidth={2}
                dot={false}
                yAxisId="gold"
              />
            )}
            {(activeFilter === 'all' || activeFilter === 'silver') && (
              <Line
                type="monotone"
                dataKey="silver"
                stroke="#94a3b8"
                strokeWidth={2}
                dot={false}
                yAxisId="silver"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
