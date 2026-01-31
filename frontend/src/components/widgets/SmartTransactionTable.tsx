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
    <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
          <span
            className="material-symbols-outlined text-3xl text-indigo-400"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}
          >
            receipt_long
          </span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight text-white">All Transactions</h2>
          <p className="text-sm text-slate-500">Complete transaction history with filters</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{filteredTransactions.length}</p>
          <p className="text-xs text-slate-500">Results</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            search
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/50 py-3 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="mb-6 space-y-3">
        {/* Type Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-2">TYPE:</span>
          {(['all', 'income', 'expense', 'transfer'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                typeFilter === type
                  ? 'bg-indigo-500/20 text-indigo-300 ring-2 ring-indigo-500/50'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-2">CATEGORY:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-full bg-slate-800/50 px-4 py-1.5 text-xs font-semibold text-slate-300 border border-slate-700 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <span className="text-xs font-semibold text-slate-500 ml-4 mr-2">ACCOUNT:</span>
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="rounded-full bg-slate-800/50 px-4 py-1.5 text-xs font-semibold text-slate-300 border border-slate-700 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {accounts.map((acc) => (
              <option key={acc} value={acc}>
                {acc === 'all' ? 'All Accounts' : acc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800/50">
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          <table className="w-full">
            <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
              <tr className="border-b border-slate-800">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Account
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredTransactions.map((transaction) => {
                const typeInfo = getTypeIcon(transaction.type);
                return (
                  <tr
                    key={transaction.id}
                    className="group hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-slate-300 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 ring-1 ring-slate-700/50`}>
                          <span className={`material-symbols-outlined text-lg ${typeInfo.color}`}>
                            {typeInfo.icon}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400">{transaction.category}</td>
                    <td className="px-4 py-4 text-sm text-slate-400">{transaction.account}</td>
                    <td className={`px-4 py-4 text-right text-sm font-bold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${getStatusBadge(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredTransactions.length === 0 && (
            <div className="py-12 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-700 mb-3">
                search_off
              </span>
              <p className="text-slate-400">No transactions found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
