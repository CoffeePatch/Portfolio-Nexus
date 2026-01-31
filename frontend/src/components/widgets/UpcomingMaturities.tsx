import { upcomingMaturities } from '../../data/mockFDData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getDaysRemaining = (dateStr: string) => {
  const maturityDate = new Date(dateStr);
  const now = new Date();
  const diffTime = maturityDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getStatusColor = (days: number) => {
  if (days <= 30) return 'text-red-400 bg-red-500/20';
  if (days <= 90) return 'text-amber-400 bg-amber-500/20';
  return 'text-emerald-400 bg-emerald-500/20';
};

export const UpcomingMaturities = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Upcoming Maturities</h3>
        <span className="text-xs text-amber-400 cursor-pointer hover:text-amber-300">View All</span>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
        {upcomingMaturities.map((fd) => {
          const daysRemaining = getDaysRemaining(fd.maturityDate);
          const statusColor = getStatusColor(daysRemaining);
          
          return (
            <div 
              key={fd.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
                  <span className="material-symbols-outlined text-amber-400 text-lg">
                    account_balance
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{fd.bankName}</p>
                  <p className="text-xs text-slate-500">{formatDate(fd.maturityDate)}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{formatCurrency(fd.maturityAmount)}</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor}`}>
                  {daysRemaining > 0 ? `${daysRemaining} days` : 'Matured'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
