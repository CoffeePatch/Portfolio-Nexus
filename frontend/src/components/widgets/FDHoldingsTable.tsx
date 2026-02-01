import { useState } from 'react';
import { fdHoldings } from '../../data/mockFDData';

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

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-emerald-400 bg-emerald-500/20';
    case 'Matured':
      return 'text-amber-400 bg-amber-500/20';
    case 'Premature Closed':
      return 'text-red-400 bg-red-500/20';
    default:
      return 'text-slate-400 bg-slate-500/20';
  }
};

type SortField = 'bankName' | 'principalAmount' | 'interestRate' | 'startDate' | 'maturityDate' | 'maturityAmount';

export const FDHoldingsTable = () => {
  const [sortField, setSortField] = useState<SortField>('maturityDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<'all' | 'active' | 'matured'>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredData = fdHoldings.filter(fd => {
    if (filter === 'all') return true;
    if (filter === 'active') return fd.status === 'Active';
    if (filter === 'matured') return fd.status === 'Matured';
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aVal: string | number = a[sortField];
    let bVal: string | number = b[sortField];
    
    if (sortField === 'maturityDate') {
      aVal = new Date(a.maturityDate).getTime();
      bVal = new Date(b.maturityDate).getTime();
    }
    
    if (sortField === 'startDate') {
      aVal = new Date(a.startDate).getTime();
      bVal = new Date(b.startDate).getTime();
    }
    
    if (typeof aVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal);
    }
    
    return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className={`material-symbols-outlined text-xs ml-1 ${sortField === field ? 'text-pink-400' : 'text-slate-600'}`}>
      {sortField === field ? (sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
    </span>
  );

  return (
    <div className="h-[350px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Your FD Holdings</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
            {(['all', 'active', 'matured'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-pink-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}n          </div>
          <span className="text-xs text-pink-400 cursor-pointer hover:text-pink-300">View All</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-black/90 backdrop-blur-sm">
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-3 pr-4 cursor-pointer hover:text-white" onClick={() => handleSort('bankName')}>
                <span className="flex items-center">Bank/Institution <SortIcon field="bankName" /></span>
              </th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('principalAmount')}>
                <span className="flex items-center justify-end">Principal <SortIcon field="principalAmount" /></span>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('interestRate')}>
                <span className="flex items-center justify-end">Rate <SortIcon field="interestRate" /></span>
              </th>
              <th className="py-3 px-4">Tenure</th>
              <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('startDate')}>
                <span className="flex items-center">Invested Date <SortIcon field="startDate" /></span>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('maturityDate')}>
                <span className="flex items-center">Maturity Date <SortIcon field="maturityDate" /></span>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('maturityAmount')}>
                <span className="flex items-center justify-end">Maturity Amt <SortIcon field="maturityAmount" /></span>
              </th>
              <th className="py-3 pl-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedData.map((fd) => (
              <tr key={fd.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/20">
                      <span className="material-symbols-outlined text-pink-400 text-sm">
                        account_balance
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{fd.bankName}</p>
                      <p className="text-xs text-slate-500">{fd.accountNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">
                    {fd.fdType}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-medium text-white">
                  {formatCurrency(fd.principalAmount)}
                </td>
                <td className="py-3 px-4 text-right font-medium text-emerald-400">
                  {fd.interestRate}%
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {fd.tenureMonths >= 12 
                    ? `${Math.floor(fd.tenureMonths / 12)}Y ${fd.tenureMonths % 12 > 0 ? `${fd.tenureMonths % 12}M` : ''}`
                    : `${fd.tenureMonths}M`
                  }
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {formatDate(fd.startDate)}
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {formatDate(fd.maturityDate)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-white">
                  {formatCurrency(fd.maturityAmount)}
                </td>
                <td className="py-3 pl-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(fd.status)}`}>
                    {fd.status}
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
