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
    <div>
      {/* Total Balance */}
      <div className="mb-4 rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/20">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">Total Liquid Balance</p>
        <p className="mt-1 text-2xl font-bold text-white">
          ₹{totalBalance.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Account List */}
      <div className="space-y-2">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:border-white/10 hover:bg-white/10"
          >
            {/* Account Info */}
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${account.color} ring-1 ring-white/10`}>
                <span
                  className="material-symbols-outlined text-lg"
                  style={{
                    fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                    color: account.balance < 0 ? '#ef4444' : '#10b981',
                  }}
                >
                  {account.icon}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{account.name}</p>
                <p className={`text-sm font-bold ${
                  account.balance < 0 ? 'text-red-400' : 'text-white'
                }`}>
                  ₹{Math.abs(account.balance).toLocaleString('en-IN')}
                </p>
              </div>

              {account.type === 'credit' && (
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400">
                  Liability
                </span>
              )}
            </div>

            {/* Progress Bar for Credit Cards */}
            {account.type === 'credit' && (
              <div className="mt-2">
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-500"
                    style={{ width: `${(Math.abs(account.balance) / 50000) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
