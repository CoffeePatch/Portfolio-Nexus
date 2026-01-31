import { fdSummary } from '../../data/mockFDData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const FDSummaryCard = () => {
  const totalReturn = fdSummary.totalMaturityValue - fdSummary.totalInvested;
  const returnPercent = ((totalReturn / fdSummary.totalInvested) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Total Invested <span className="text-emerald-400">▲ +{fdSummary.activeDeposits} Active</span>
        </p>
        <p className="mt-1 text-2xl font-bold text-white">
          {formatCurrency(fdSummary.totalInvested)}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Maturity Value <span className="text-emerald-400">▲ +{returnPercent}%</span>
        </p>
        <p className="mt-1 text-2xl font-bold text-white">
          {formatCurrency(fdSummary.totalMaturityValue)}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Interest Earned
        </p>
        <p className="mt-1 text-2xl font-bold text-emerald-400">
          +{formatCurrency(fdSummary.totalInterestEarned)}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Avg. Interest Rate
        </p>
        <p className="mt-1 text-2xl font-bold text-white">
          {fdSummary.averageInterestRate.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
