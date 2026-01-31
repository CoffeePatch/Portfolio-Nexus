import type { Account } from '../../data/expenseDummyData';

interface AccountsWidgetProps {
  accounts: Account[];
}

export const AccountsWidget = ({ accounts }: AccountsWidgetProps) => {
  const totalBalance = accounts.reduce((sum, acc) => {
    if (acc.type !== 'credit') {
      return sum + acc.balance;
    }
    return sum;
  }, 0);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return 'account_balance';
      case 'cash':
        return 'account_balance_wallet';
      case 'credit':
        return 'credit_card';
      case 'investment':
        return 'trending_up';
      default:
        return 'account_balance';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 ring-1 ring-teal-500/30">
          <span
            className="material-symbols-outlined text-3xl text-teal-400"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}
          >
            account_balance_wallet
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Accounts</h2>
          <p className="text-sm text-slate-500">Your financial sources</p>
        </div>
      </div>

      {/* Total Balance */}
      <div className="mb-6 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-4 ring-1 ring-teal-500/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">Total Liquid Balance</p>
        <p className="mt-1 text-3xl font-bold text-white">
          ₹{totalBalance.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Account List */}
      <div className="space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="group relative overflow-hidden rounded-xl border border-slate-800/50 bg-slate-900/30 p-4 transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/50"
          >
            {/* Account Info */}
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${account.color} ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110`}>
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{
                    fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48",
                    color: account.balance < 0 ? '#ef4444' : '#10b981',
                  }}
                >
                  {account.icon}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white truncate">{account.name}</p>
                  {account.type === 'credit' && (
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-400 ring-1 ring-red-500/20">
                      Liability
                    </span>
                  )}
                  {account.type === 'cash' && (
                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400 ring-1 ring-green-500/20">
                      Liquid
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className={`text-lg font-bold ${
                    account.balance < 0 ? 'text-red-400' : 'text-white'
                  }`}>
                    ₹{Math.abs(account.balance).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">{account.type}</p>
                </div>
              </div>

              {/* Reconcile Button */}
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-slate-400 hover:text-indigo-400 transition-colors">
                  sync
                </span>
              </button>
            </div>

            {/* Progress Bar for Credit Cards */}
            {account.type === 'credit' && (
              <div className="mt-3">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-500"
                    style={{ width: `${(Math.abs(account.balance) / 50000) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  ₹{(50000 - Math.abs(account.balance)).toLocaleString('en-IN')} available
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Account Button */}
      <button className="mt-4 w-full rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-4 text-sm font-semibold text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-slate-900/50 hover:text-indigo-400">
        <span className="material-symbols-outlined mr-2 align-middle">add_circle</span>
        Add New Account
      </button>
    </div>
  );
};
