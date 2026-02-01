// src/components/widgets/PropertyHoldingsTable.tsx

import React, { useState, useMemo } from 'react';
import { properties, type PropertyType } from '../../data/mockRealEstateData';

type SortField = 'name' | 'currentMarketValue' | 'appreciation' | 'appreciationPercent' | 'rentalIncome';
type SortDirection = 'asc' | 'desc';
type FilterType = 'all' | 'Residential' | 'Commercial' | 'Land' | 'REIT' | 'Industrial';

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

export const PropertyHoldingsTable: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('currentMarketValue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filter, setFilter] = useState<FilterType>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = filter === 'all' 
      ? properties 
      : properties.filter(p => p.type === filter);
    
    return [...filtered].sort((a, b) => {
      let aVal: number | string = a[sortField] ?? 0;
      let bVal: number | string = b[sortField] ?? 0;
      
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal as string) 
          : (bVal as string).localeCompare(aVal);
      }
      
      return sortDirection === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
    });
  }, [filter, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className={`material-symbols-outlined text-xs ml-1 ${sortField === field ? 'text-blue-400' : 'text-slate-600'}`}>
      {sortField === field ? (sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
    </span>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rented': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Owned': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Vacant': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Under Construction': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'For Sale': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeColor = (type: PropertyType) => {
    switch (type) {
      case 'Residential': return 'bg-blue-500/20 text-blue-400';
      case 'Commercial': return 'bg-purple-500/20 text-purple-400';
      case 'Land': return 'bg-emerald-500/20 text-emerald-400';
      case 'REIT': return 'bg-amber-500/20 text-amber-400';
      case 'Industrial': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Your Properties</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            {(['all', 'Residential', 'Commercial', 'Land', 'Industrial'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filter === f
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-white/10">
              <th className="pb-3 cursor-pointer hover:text-slate-300" onClick={() => handleSort('name')}>
                Property <SortIcon field="name" />
              </th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">City</th>
              <th className="pb-3">Area</th>
              <th className="pb-3 text-right cursor-pointer hover:text-slate-300" onClick={() => handleSort('currentMarketValue')}>
                Market Value <SortIcon field="currentMarketValue" />
              </th>
              <th className="pb-3 text-right cursor-pointer hover:text-slate-300" onClick={() => handleSort('appreciationPercent')}>
                Return % <SortIcon field="appreciationPercent" />
              </th>
              <th className="pb-3 text-right cursor-pointer hover:text-slate-300" onClick={() => handleSort('rentalIncome')}>
                Rental <SortIcon field="rentalIncome" />
              </th>
              <th className="pb-3 text-center">Mortgage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredAndSortedProperties.map((property) => (
              <tr 
                key={property.id} 
                className="group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor(property.type)}`}>
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {property.type === 'Residential' ? 'home' :
                         property.type === 'Commercial' ? 'business' :
                         property.type === 'Land' ? 'landscape' :
                         property.type === 'REIT' ? 'monitoring' :
                         property.type === 'Industrial' ? 'warehouse' : 'home'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                        {property.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[200px]">
                        {property.address}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${getTypeColor(property.type)}`}>
                    {property.type}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${getStatusColor(property.status)}`}>
                    {property.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-slate-400">
                  {property.city}
                </td>
                <td className="py-4 text-sm text-slate-400">
                  {property.carpetArea > 0 ? `${property.carpetArea.toLocaleString()} sqft` : '-'}
                </td>
                <td className="py-4 text-right">
                  <p className="text-sm font-medium text-white">
                    {formatCrores(property.currentMarketValue)}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Inv: {formatCrores(property.totalInvestment)}
                  </p>
                </td>
                <td className="py-4 text-right">
                  <span className={`text-sm font-medium ${property.appreciationPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {property.appreciationPercent >= 0 ? '+' : ''}{property.appreciationPercent.toFixed(1)}%
                  </span>
                </td>
                <td className="py-4 text-right">
                  {property.rentalIncome ? (
                    <div>
                      <p className="text-sm font-medium text-emerald-400">
                        {formatCurrency(property.rentalIncome)}/mo
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Yield: {property.annualRentalYield?.toFixed(2)}%
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-600">-</span>
                  )}
                </td>
                <td className="py-4 text-center">
                  {property.hasMortgage ? (
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-amber-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        account_balance
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {formatCrores(property.mortgage?.outstandingAmount || 0)}
                      </span>
                    </div>
                  ) : (
                    <span className="material-symbols-outlined text-emerald-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyHoldingsTable;
