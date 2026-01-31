// src/components/widgets/SectorAllocationWidget.tsx
// Sector allocation with horizontal bars (replaces donut chart)

import React from "react";
import { mockSectorAllocation } from "../../data/mockStockData";

const SectorAllocationWidget: React.FC = () => {
  const total = mockSectorAllocation.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/70">Sector Allocation</h3>
          <p className="mt-1 text-xs text-white/40">Portfolio distribution</p>
        </div>
        <span className="material-symbols-rounded text-white/40">pie_chart</span>
      </div>

      {/* Sector Bars */}
      <div className="flex flex-col gap-5 flex-1">
        {mockSectorAllocation.map((sector, index) => (
          <div key={index} className="space-y-2">
            {/* Label & Percentage */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: sector.color }}
                />
                <span className="text-sm font-medium text-white/80">{sector.name}</span>
              </div>
              <span className="text-sm font-semibold text-white">{sector.value}%</span>
            </div>
            {/* Progress Bar */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(sector.value / 100) * 100}%`,
                  backgroundColor: sector.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">Total Allocation</span>
          <span className="text-sm font-semibold text-emerald-400">{total}%</span>
        </div>
      </div>
    </div>
  );
};

export default SectorAllocationWidget;
