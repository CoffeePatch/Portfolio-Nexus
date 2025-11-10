const Expenses = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Expenses</h1>
        <p className="text-sm text-slate-400">
          Full expense breakdown and category management coming soon.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 ring-1 ring-red-500/30">
            <span className="material-symbols-outlined text-3xl text-red-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}>
              payments
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Expense Overview</h2>
            <p className="text-sm text-slate-500">Track and manage your expenses</p>
          </div>
        </div>
        
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-slate-700 mb-4" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
            construction
          </span>
          <p className="text-slate-400">
            Detailed expense analytics and category management interface coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
