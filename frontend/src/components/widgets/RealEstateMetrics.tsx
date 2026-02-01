// src/components/widgets/RealEstateMetrics.tsx

import React from 'react';
import { 
  realEstateSummary, 
  mortgageSummary, 
  upcomingEvents 
} from '../../data/mockRealEstateData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatCrores = (val: number) => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  } else if (val >= 100000) {
    return `₹${(val / 100000).toFixed(1)} L`;
  }
  return formatCurrency(val);
};

export const RealEstateMetrics: React.FC = () => {
  const nextEvents = upcomingEvents.slice(0, 4);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>

      {/* Rental Summary */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wide">Rental Income</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
            <p className="text-[10px] text-slate-400">Monthly</p>
            <p className="text-lg font-bold text-emerald-400">
              {formatCurrency(realEstateSummary.totalRentalIncome)}
            </p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
            <p className="text-[10px] text-slate-400">Avg Yield</p>
            <p className="text-lg font-bold text-emerald-400">
              {realEstateSummary.averageRentalYield.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            <span className="text-emerald-400">{realEstateSummary.occupiedProperties}</span> Occupied
          </span>
          <span className="text-slate-500">
            <span className="text-amber-400">{realEstateSummary.vacantProperties}</span> Vacant
          </span>
        </div>
      </div>

      {/* Mortgage Summary */}
      <div className="mb-4 pt-4 border-t border-white/10">
        <h4 className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wide">Mortgage Overview</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Outstanding</span>
            <span className="text-sm font-medium text-red-400">
              {formatCrores(mortgageSummary.totalOutstanding)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Monthly EMI</span>
            <span className="text-sm font-medium text-white">
              {formatCurrency(mortgageSummary.totalEmi)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Avg Interest</span>
            <span className="text-sm font-medium text-amber-400">
              {mortgageSummary.averageInterestRate}%
            </span>
          </div>
        </div>

        {/* Mortgage Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
            <span>Paid: {formatCrores(mortgageSummary.totalPaid)}</span>
            <span>{((mortgageSummary.totalPaid / mortgageSummary.totalLoanAmount) * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              style={{ width: `${(mortgageSummary.totalPaid / mortgageSummary.totalLoanAmount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="pt-4 border-t border-white/10 flex-1">
        <h4 className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wide">Upcoming</h4>
        <div className="space-y-2">
          {nextEvents.map((event, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-2 rounded-lg ${
                event.type === 'rent' ? 'bg-emerald-500/10' :
                event.type === 'emi' ? 'bg-red-500/10' :
                'bg-blue-500/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-base ${
                  event.type === 'rent' ? 'text-emerald-400' :
                  event.type === 'emi' ? 'text-red-400' :
                  'text-blue-400'
                }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {event.type === 'rent' ? 'payments' :
                   event.type === 'emi' ? 'account_balance' :
                   'event'}
                </span>
                <div>
                  <p className="text-[10px] text-white truncate max-w-[120px]">{event.title}</p>
                  <p className="text-[9px] text-slate-500">{event.date}</p>
                </div>
              </div>
              {event.amount > 0 && (
                <span className={`text-xs font-medium ${
                  event.type === 'rent' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {event.type === 'rent' ? '+' : '-'}{formatCurrency(event.amount)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealEstateMetrics;
