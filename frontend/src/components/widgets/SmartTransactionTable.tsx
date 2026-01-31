import { useState, useMemo } from 'react';
import type { Transaction } from '../../data/expenseDummyData';

interface SmartTransactionTableProps {
  transactions: Transaction[];
}

type FilterType = 'all' | 'income' | 'expense' | 'transfer';
type CategoryFilter = string | 'all';
type AccountFilter = string | 'all';

export const SmartTransactionTable = ({ transactions }: SmartTransactionTableProps) => {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [accountFilter, setAccountFilter] = useState<AccountFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories and accounts
  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return ['all', ...Array.from(cats)];
  }, [transactions]);

  const accounts = useMemo(() => {
    const accs = new Set(transactions.map((t) => t.account));
    return ['all', ...Array.from(accs)];
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
      const matchesAccount = accountFilter === 'all' || transaction.account === accountFilter;
      const matchesSearch = searchQuery === '' || 
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesCategory && matchesAccount && matchesSearch;
    });
  }, [transactions, typeFilter, categoryFilter, accountFilter, searchQuery]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'income':
        return { icon: 'arrow_downward', color: 'text-green-400' };
      case 'expense':
        return { icon: 'arrow_upward', color: 'text-red-400' };
      case 'transfer':
        return { icon: 'sync_alt', color: 'text-blue-400' };
      default:
        return { icon: 'remove', color: 'text-slate-400' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400 ring-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-400 ring-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 ring-slate-500/20';
    }
  };

  return (
    <div>
      {/* Search and Filter Row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1">
          {(['all', 'income', 'expense'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                typeFilter === type
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <span className="text-xs text-slate-500">{filteredTransactions.length} results</span>
      </div>

      {/* Transaction Table */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="h-[350px] overflow-y-auto custom-scrollbar">
          <table className="w-full">
            <thead className="sticky top-0 bg-black/90 backdrop-blur-sm z-10">
              <tr className="border-b border-white/10">
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Description
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTransactions.slice(0, 10).map((transaction) => {
                const typeInfo = getTypeIcon(transaction.type);
                return (
                  <tr
                    key={transaction.id}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-3 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white/5`}>
                          <span className={`material-symbols-outlined text-sm ${typeInfo.color}`}>
                            {typeInfo.icon}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-white">
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-400">{transaction.category}</td>
                    <td className={`px-3 py-3 text-right text-xs font-bold ${
                      transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[280px]">
              <span className="material-symbols-outlined text-3xl text-slate-700 mb-2">
                search_off
              </span>
              <p className="text-xs text-slate-500">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
