import { BudgetStatusCards } from '../components/widgets/BudgetStatusCards';
import { CashFlowChart } from '../components/widgets/CashFlowChart';
import { ExpenseCategoryDonut } from '../components/widgets/ExpenseCategoryDonut';
import { SmartTransactionTable } from '../components/widgets/SmartTransactionTable';
import { AccountsWidget } from '../components/widgets/AccountsWidget';
import {
  budgetCardsData,
  cashFlowData,
  categoryBreakdownData,
  transactionsData,
  accountsData,
  budgetUsageData,
} from '../data/expenseDummyData';

const Expenses = () => {
  return (
    <div className="relative min-h-screen w-full bg-black font-sans text-slate-200">
      
      {/* Linear Gradient - Green/Teal theme for Expenses - From LEFT to RIGHT, top 2 inches */}
      <div 
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: 0,
          height: '2in',
          left: 0,
          right: 0,
          width: '100%',
          background: `linear-gradient(90deg, 
            #064e3b 0%, 
            #047857 25%, 
            #10b981 50%, 
            #34d399 75%, 
            #1e3a5f 100%)`,
          opacity: 0.85,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 p-8">
        
        {/* Grid: Left side (widgets stacked) + Right side (vertical widget) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* LEFT COLUMN: Widgets stacked vertically */}
          <div className="lg:col-span-3 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            {/* 1. Expense Summary Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl" style={{ marginBottom: '1cm' }}>
              <h1 className="mb-2 text-2xl font-bold text-white">Expense Tracker</h1>
              <div className="mb-4 flex gap-6 text-xs text-slate-400">
                <span>Income <span className="text-emerald-400">▲ +12%</span></span>
                <span>Expenses <span className="text-red-400">▲ +5%</span></span>
              </div>
              <BudgetStatusCards cards={budgetCardsData} />
            </div>

            {/* 2. Cash Flow Overview Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <h2 className="mb-4 text-xl font-semibold text-white">Cash Flow Overview</h2>
              <CashFlowChart data={cashFlowData} />
            </div>

          </div>

          {/* RIGHT COLUMN: Accounts Widget */}
          <div className="lg:col-span-1 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            {/* Accounts Summary Card */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                  <span className="material-symbols-outlined text-xl text-emerald-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                    account_balance_wallet
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Accounts</h3>
                  <p className="text-xs text-slate-500">Financial Overview</p>
                </div>
              </div>
              <AccountsWidget accounts={accountsData} />
            </div>

            {/* Category Breakdown Widget */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl flex-1">
              <h3 className="mb-4 text-sm font-medium text-white">Category Breakdown</h3>
              <ExpenseCategoryDonut
                data={categoryBreakdownData}
                budgetUsed={budgetUsageData.usedBudget}
                totalBudget={budgetUsageData.totalBudget}
              />
            </div>
          </div>
        </div>

        {/* Transaction Table - Full Width below */}
        <div className="mt-4 rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-xl font-semibold text-white">Recent Transactions</h2>
          <SmartTransactionTable transactions={transactionsData} />
        </div>

      </div>
    </div>
  );
};

export default Expenses;
