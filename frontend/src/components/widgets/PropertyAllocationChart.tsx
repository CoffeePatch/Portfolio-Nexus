// src/components/widgets/PropertyAllocationChart.tsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { propertyAllocation, cityDistribution } from '../../data/mockRealEstateData';

const formatCrores = (val: number) => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  } else if (val >= 100000) {
    return `₹${(val / 100000).toFixed(1)} L`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
};

export const PropertyAllocationChart: React.FC = () => {
  // Transform data for chart compatibility
  const chartData = propertyAllocation.map(item => ({
    ...item,
    name: item.type
  }));

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Property Allocation</h3>
      
      {/* Pie Chart */}
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {propertyAllocation.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [formatCrores(value), 'Value']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-2">
        {propertyAllocation.map((item) => (
          <div key={item.type} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-300">{item.type}</span>
            </div>
            <div className="text-right">
              <span className="text-white font-medium">{item.percentage.toFixed(1)}%</span>
              <span className="text-slate-500 text-xs ml-2">({item.count})</span>
            </div>
          </div>
        ))}
      </div>

      {/* City Distribution */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <h4 className="text-sm font-medium text-slate-400 mb-3">By City</h4>
        <div className="space-y-2">
          {cityDistribution.slice(0, 4).map((city) => (
            <div key={city.city} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{city.city}</span>
              <div className="text-right">
                <span className="text-white">{formatCrores(city.value)}</span>
                <span className="text-slate-500 ml-2">({city.properties})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyAllocationChart;
