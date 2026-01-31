type LinkedLoan = {
  id: string;
  loanType: "home" | "car" | "personal" | "education" | "other";
  linkedAsset: string;
  loanAmount: number;
  outstandingBalance: number;
  monthlyEMI: number;
  interestRate: number;
  endDate: string;
  icon: string;
  iconBg: string;
};

type LinkedCardWidgetProps = {
  loans?: LinkedLoan[];
  isLoading?: boolean;
  onLoanClick?: (loanId: string) => void;
  onViewAll?: () => void;
};

const defaultLoans: LinkedLoan[] = [
  {
    id: "loan-1",
    loanType: "home",
    linkedAsset: "2BHK Apartment - Indiranagar",
    loanAmount: 1500000,
    outstandingBalance: 850000,
    monthlyEMI: 15250,
    interestRate: 8.5,
    endDate: "Dec 2035",
    icon: "home",
    iconBg: "bg-red-500",
  },
  {
    id: "loan-2",
    loanType: "home",
    linkedAsset: "Beach House - Goa",
    loanAmount: 1800000,
    outstandingBalance: 1250000,
    monthlyEMI: 18500,
    interestRate: 9.0,
    endDate: "Mar 2038",
    icon: "cottage",
    iconBg: "bg-red-600",
  },
];

const SkeletonLoader = () => (
  <div className="space-y-3">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/50 p-4"
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded bg-slate-800" />
            <div className="h-2 w-1/2 rounded bg-slate-800" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-slate-800" />
          <div className="h-2 w-full rounded bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export const LinkedCardWidget = ({
  loans = defaultLoans,
  isLoading = false,
  onLoanClick,
  onViewAll,
}: LinkedCardWidgetProps) => {
  // Calculate totals
  const totalOutstanding = loans.reduce(
    (sum, loan) => sum + loan.outstandingBalance,
    0
  );
  const totalMonthlyEMI = loans.reduce((sum, loan) => sum + loan.monthlyEMI, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 ring-1 ring-red-500/30">
            <span
              className="material-symbols-outlined text-base text-red-400"
              style={{
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              credit_card
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Linked Loans</h3>
            <p className="text-xs text-slate-400">
              {loans.length} active loan{loans.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-medium text-red-400 transition-colors hover:text-red-300"
          >
            Details →
          </button>
        )}
      </div>

      {/* Total Liability Summary */}
      <div className="mb-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 p-3 ring-1 ring-red-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Outstanding Balance
            </p>
            <p className="mt-1 text-2xl font-bold text-red-400">
              -${totalOutstanding.toLocaleString("en-US")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-400">Monthly EMI</p>
            <p className="mt-1 text-lg font-bold text-white">
              ${totalMonthlyEMI.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Loan Cards */}
          <div className="space-y-3">
            {loans.map((loan) => {
              const paidPercentage =
                ((loan.loanAmount - loan.outstandingBalance) /
                  loan.loanAmount) *
                100;

              return (
                <div
                  key={loan.id}
                  onClick={() => onLoanClick?.(loan.id)}
                  className="group cursor-pointer rounded-xl border border-red-900/30 bg-gradient-to-br from-red-950/20 to-orange-950/20 p-4 transition-all hover:border-red-800/50 hover:shadow-lg hover:shadow-red-900/20"
                >
                  {/* Loan Header */}
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={[
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform group-hover:scale-110",
                        loan.iconBg,
                      ].join(" ")}
                    >
                      <span
                        className="material-symbols-outlined text-lg text-white"
                        style={{
                          fontVariationSettings:
                            "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        {loan.icon}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="truncate text-sm font-semibold text-white">
                        {loan.linkedAsset}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Home Loan • {loan.interestRate}% p.a.
                      </p>
                    </div>
                  </div>

                  {/* Loan Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Outstanding</span>
                      <span className="font-bold text-red-400">
                        ${loan.outstandingBalance.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Monthly EMI</span>
                      <span className="font-semibold text-white">
                        ${loan.monthlyEMI.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Until</span>
                      <span className="font-medium text-slate-300">
                        {loan.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Repaid</span>
                      <span className="font-semibold text-emerald-400">
                        {paidPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all"
                        style={{ width: `${paidPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Net Asset Value Info */}
          <div className="mt-4 rounded-lg border border-slate-800/50 bg-slate-800/20 p-3">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-blue-400">
                info
              </span>
              <div>
                <h5 className="text-xs font-semibold text-white">
                  Net Asset Value
                </h5>
                <p className="mt-1 text-xs text-slate-400">
                  These loans are deducted from your total assets to show your
                  true net worth. Asset Value - Outstanding Loans = Net Value.
                </p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {loans.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
                <span className="material-symbols-outlined text-2xl text-emerald-500">
                  check_circle
                </span>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-slate-300">
                No Linked Loans
              </h4>
              <p className="text-xs text-slate-500">
                All your assets are debt-free!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LinkedCardWidget;
