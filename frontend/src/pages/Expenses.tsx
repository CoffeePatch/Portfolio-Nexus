import { useState, useMemo } from 'react';
import { BudgetStatusCards } from '../components/widgets/BudgetStatusCards';
import { CashFlowChart } from '../components/widgets/CashFlowChart';
import { ExpenseCategoryDonut } from '../components/widgets/ExpenseCategoryDonut';
import { SmartTransactionTable } from '../components/widgets/SmartTransactionTable';
import { AccountsWidget } from '../components/widgets/AccountsWidget';
import {
  cashFlowData,
  categoryBreakdownData,
  transactionsData,
  accountsData,
  budgetUsageData,
} from '../data/expenseDummyData';
import type { BudgetCard } from '../data/expenseDummyData';

type TimePeriod = 'weekly' | 'monthly' | 'yearly';

// Period-based data for dynamic filtering
const periodData: Record<TimePeriod, { income: number; expense: number; incomeChange: number; expenseChange: number; trends: { income: number[]; expense: number[]; netFlow: number[] } }> = {
  weekly: {
    income: 21250,
    expense: 13085,
    incomeChange: 8.2,
    expenseChange: -3.5,
    trends: {
      income: [18000, 19500, 20000, 19800, 21000, 20500, 21250],
      expense: [14500, 13800, 14200, 13500, 13200, 13400, 13085],
      netFlow: [3500, 5700, 5800, 6300, 7800, 7100, 8165],
    },
  },
  monthly: {
    income: 85000,
    expense: 52340,
    incomeChange: 12.5,
    expenseChange: -7.2,
    trends: {
      income: [42000, 45000, 52000, 68000, 72000, 78000, 85000],
      expense: [58000, 56000, 54000, 55000, 53000, 54000, 52340],
      netFlow: [18000, 20000, 22000, 25000, 28000, 30000, 32660],
    },
  },
  yearly: {
    income: 1020000,
    expense: 628080,
    incomeChange: 18.3,
    expenseChange: -4.8,
    trends: {
      income: [720000, 780000, 820000, 890000, 950000, 980000, 1020000],
      expense: [680000, 670000, 660000, 650000, 640000, 635000, 628080],
      netFlow: [40000, 110000, 160000, 240000, 310000, 345000, 391920],
    },
  },
};

const Expenses = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('monthly');

  // Generate budget cards based on selected period
  const budgetCards = useMemo<BudgetCard[]>(() => {
    const data = periodData[selectedPeriod];
    const netCashFlow = data.income - data.expense;
    
    // Calculate net flow change percentage (comparing to previous period estimate)
    const previousNetFlow = data.trends.netFlow[data.trends.netFlow.length - 2] || 1;
    const currentNetFlow = data.trends.netFlow[data.trends.netFlow.length - 1];
    const netFlowChange = previousNetFlow !== 0 
      ? Math.round(((currentNetFlow - previousNetFlow) / Math.abs(previousNetFlow)) * 100 * 10) / 10
      : 0;

    return [
      {
        title: 'Total Income',
        amount: data.income,
        change: Math.round(data.incomeChange * 10) / 10,
        trend: data.trends.income,
        icon: 'trending_up',
        color: 'from-green-500/20 to-emerald-500/20',
      },
      {
        title: 'Total Expenses',
        amount: data.expense,
        change: Math.round(data.expenseChange * 10) / 10,
        trend: data.trends.expense,
        icon: 'trending_down',
        color: 'from-red-500/20 to-rose-500/20',
      },
      {
        title: 'Net Cash Flow',
        amount: netCashFlow,
        change: netFlowChange,
        trend: data.trends.netFlow,
        icon: 'account_balance',
        color: 'from-blue-500/20 to-cyan-500/20',
      },
    ];
  }, [selectedPeriod]);

  // Period label for display
  const periodLabels: Record<TimePeriod, string> = {
    weekly: 'This Week',
    monthly: 'This Month',
    yearly: 'This Year',
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans text-slate-200">

      {/* Main Content */}
      <div className="relative z-10 p-8">
        
        {/* Grid: Left side (widgets stacked) + Right side (vertical widget) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* LEFT COLUMN: Widgets stacked vertically */}
          <div className="lg:col-span-3 flex flex-col gap-4" style={{ marginTop: '1cm' }}>
            
            {/* 1. Expense Summary Widget (Glass - Black tint) */}
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl" style={{ marginBottom: '1cm' }}>
              {/* Header with Title and Period Filter */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Expense Tracker</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Showing data for <span className="text-emerald-400 font-medium">{periodLabels[selectedPeriod]}</span>
                  </p>
                </div>
                
                {/* Period Filter Pills */}
                <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/10">
                  {(['weekly', 'monthly', 'yearly'] as TimePeriod[]).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                        selectedPeriod === period
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Stats Summary */}
              <div className="flex items-center gap-6 mb-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Income 
                  <span className={periodData[selectedPeriod].incomeChange >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {periodData[selectedPeriod].incomeChange >= 0 ? '▲' : '▼'} {Math.abs(periodData[selectedPeriod].incomeChange)}%
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Expenses 
                  <span className={periodData[selectedPeriod].expenseChange <= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {periodData[selectedPeriod].expenseChange <= 0 ? '▼' : '▲'} {Math.abs(periodData[selectedPeriod].expenseChange)}%
                  </span>
                </span>
              </div>

              <BudgetStatusCards cards={budgetCards} />
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
