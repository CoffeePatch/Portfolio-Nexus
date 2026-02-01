import { FDSummaryCard } from '../components/widgets/FDSummaryCard';
import { FDInterestChart } from '../components/widgets/FDInterestChart';
import { FDTypeAllocation } from '../components/widgets/FDTypeAllocation';
import { UpcomingMaturities } from '../components/widgets/UpcomingMaturities';
import { FDHoldingsTable } from '../components/widgets/FDHoldingsTable';
import { fdSummary } from '../data/mockFDData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const FixedDeposits = () => {
  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans text-slate-200">

      <div className="relative z-10 p-8">
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          <div className="lg:col-span-3 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl" style={{ marginBottom: '1cm' }}>
              <h1 className="mb-2 text-2xl font-bold text-white">Fixed Deposits</h1>
              <div className="mb-4 flex gap-6 text-xs text-slate-400">
                <span>Active FDs <span className="text-emerald-400">▲ {fdSummary.activeDeposits}</span></span>
                <span>Avg. Rate <span className="text-emerald-400">▲ {fdSummary.averageInterestRate.toFixed(2)}%</span></span>
              </div>
              <FDSummaryCard />
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
              <FDInterestChart />
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
              <FDHoldingsTable />
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            <div className="rounded-3xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/30">
                  <span className="material-symbols-outlined text-pink-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                    savings
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">FD Portfolio</p>
                  <p className="text-xs text-slate-500">Fixed Deposits</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Total Invested</p>
                  <p className="text-xl font-bold text-pink-400">{formatCurrency(fdSummary.totalInvested)}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Interest Accrued</p>
                    <p className="text-sm font-semibold text-emerald-400">+{formatCurrency(fdSummary.totalInterestAccrued)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Upcoming</p>
                    <p className="text-sm font-semibold text-white">{fdSummary.upcomingMaturities} FDs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl">
              <FDTypeAllocation />
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl">
              <UpcomingMaturities />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedDeposits;
