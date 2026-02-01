// src/components/widgets/PropertyValueChart.tsx

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { propertyValueHistory } from '../../data/mockRealEstateData';

type FilterType = 'all' | 'residential' | 'commercial' | 'land';

export const PropertyValueChart: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const formatYAxis = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(0)}Cr`;
    }
    return `₹${(value / 100000).toFixed(0)}L`;
  };

  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Portfolio Value Trend</h2>
        <div className="flex gap-2">
          {(['all', 'residential', 'commercial', 'land'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors capitalize ${
                filter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={propertyValueHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorResidential" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCommercial" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
              tickFormatter={formatYAxis}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px',
              }}
              labelStyle={{ color: '#fff', marginBottom: '8px' }}
              formatter={(value: number, name: string) => [formatTooltip(value), name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            {(filter === 'all' || filter === 'residential') && (
              <Area
                type="monotone"
                dataKey="residential"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorResidential)"
                name="Residential"
              />
            )}
            {(filter === 'all' || filter === 'commercial') && (
              <Area
                type="monotone"
                dataKey="commercial"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#colorCommercial)"
                name="Commercial"
              />
            )}
            {(filter === 'all' || filter === 'land') && (
              <Area
                type="monotone"
                dataKey="land"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#colorLand)"
                name="Land"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-xs text-slate-400">Residential</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500"></span>
          <span className="text-xs text-slate-400">Commercial</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-xs text-slate-400">Land</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyValueChart;
