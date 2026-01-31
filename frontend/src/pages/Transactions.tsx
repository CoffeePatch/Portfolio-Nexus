const Transactions = () => {
  return (
    <div className="space-y-6 px-6 py-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Transactions</h1>
        <p className="text-sm text-slate-400">
          Complete transaction history across all your assets and expenses.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/30">
            <span className="material-symbols-outlined text-3xl text-emerald-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}>
              receipt_long
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Transaction History</h2>
            <p className="text-sm text-slate-500">View all your financial activities</p>
          </div>
        </div>
        
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-slate-700 mb-4" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
            construction
          </span>
          <p className="text-slate-400">
            Comprehensive transaction list with filtering and export features coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
