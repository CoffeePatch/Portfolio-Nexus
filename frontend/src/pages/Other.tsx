const Other = () => {
  return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center">
          <span className="material-symbols-outlined text-5xl text-slate-500">
            construction
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">Coming Soon</h1>

        {/* Description */}
        <p className="text-slate-400 mb-8 leading-relaxed">
          This section is under development. We're working on bringing you new features 
          to manage additional asset types and investment categories.
        </p>

        {/* Feature Preview Cards */}
        <div className="space-y-3 text-left mb-8">
          <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4 flex items-center gap-4 opacity-50">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-500">savings</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Gold & Silver</p>
              <p className="text-xs text-slate-500">Track precious metal investments</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4 flex items-center gap-4 opacity-50">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-500">home</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Real Estate</p>
              <p className="text-xs text-slate-500">Property investments & REITs</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-4 flex items-center gap-4 opacity-50">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-500">account_balance</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Fixed Deposits</p>
              <p className="text-xs text-slate-500">Bank FDs and bonds</p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 mx-auto">
          <span className="material-symbols-outlined text-sm">notifications</span>
          Notify me when ready
        </button>
      </div>
    </div>
  );
};

export default Other;
