import { useState } from 'react';
import { metalHoldings } from '../../data/mockMetalsData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getMetalIcon = (type: string) => {
  switch (type) {
    case 'Gold': return '🥇';
    case 'Silver': return '🥈';
    case 'Platinum': return '💎';
    default: return '💰';
  }
};

const getMetalColor = (type: string) => {
  switch (type) {
    case 'Gold': return 'text-yellow-400 bg-yellow-500/20';
    case 'Silver': return 'text-slate-300 bg-slate-500/20';
    case 'Platinum': return 'text-gray-200 bg-gray-500/20';
    default: return 'text-slate-400 bg-slate-500/20';
  }
};

type SortField = 'metalType' | 'weightGrams' | 'totalPurchasePrice' | 'currentValue' | 'returnPercent' | 'purchaseDate';
type MetalFilter = 'all' | 'Gold' | 'Silver' | 'Platinum';

export const MetalHoldingsTable = () => {
  const [sortField, setSortField] = useState<SortField>('currentValue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<MetalFilter>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredData = metalHoldings.filter(m => {
    if (filter === 'all') return true;
    return m.metalType === filter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aVal: string | number = a[sortField];
    let bVal: string | number = b[sortField];
    
    if (sortField === 'purchaseDate') {
      aVal = new Date(a.purchaseDate).getTime();
      bVal = new Date(b.purchaseDate).getTime();
    }
    
    if (typeof aVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal);
    }
    
    return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className={`material-symbols-outlined text-xs ml-1 ${sortField === field ? 'text-yellow-400' : 'text-slate-600'}`}>
      {sortField === field ? (sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
    </span>
  );

  return (
    <div className="h-[350px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Your Metal Holdings</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
            {(['all', 'Gold', 'Silver', 'Platinum'] as MetalFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-yellow-500 text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-xs text-yellow-400 cursor-pointer hover:text-yellow-300">View All</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-black/90 backdrop-blur-sm">
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-3 pr-4 cursor-pointer hover:text-white" onClick={() => handleSort('metalType')}>
                <span className="flex items-center">Item <SortIcon field="metalType" /></span>
              </th>
              <th className="py-3 px-4">Purity</th>
              <th className="py-3 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('weightGrams')}>
                <span className="flex items-center justify-end">Weight <SortIcon field="weightGrams" /></span>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('purchaseDate')}>
                <span className="flex items-center">Purchased <SortIcon field="purchaseDate" /></span>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('totalPurchasePrice')}>
                <span className="flex items-center justify-end">Invested <SortIcon field="totalPurchasePrice" /></span>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('currentValue')}>
                <span className="flex items-center justify-end">Current Value <SortIcon field="currentValue" /></span>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('returnPercent')}>
                <span className="flex items-center justify-end">Return <SortIcon field="returnPercent" /></span>
              </th>
              <th className="py-3 pl-4">Storage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedData.map((metal) => (
              <tr key={metal.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getMetalColor(metal.metalType)}`}>
                      <span className="text-sm">{getMetalIcon(metal.metalType)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{metal.description}</p>
                      <p className="text-xs text-slate-500">{metal.form} • {metal.vendor}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getMetalColor(metal.metalType)}`}>
                    {metal.purity}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-medium text-white">
                  {metal.weightDisplay}
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {formatDate(metal.purchaseDate)}
                </td>
                <td className="py-3 px-4 text-right text-slate-300">
                  {formatCurrency(metal.totalPurchasePrice)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-white">
                  {formatCurrency(metal.currentValue)}
                </td>
                <td className={`py-3 px-4 text-right font-medium ${metal.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metal.returnPercent >= 0 ? '+' : ''}{metal.returnPercent.toFixed(1)}%
                </td>
                <td className="py-3 pl-4">
                  <span className="text-xs text-slate-400">
                    {metal.storageLocation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
