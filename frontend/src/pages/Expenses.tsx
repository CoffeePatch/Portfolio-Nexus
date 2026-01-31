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
    <div className="space-y-6">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            Expense Tracker
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your income, expenses, and financial accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 transition-all hover:bg-slate-800 hover:text-white">
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Transaction
          </button>
        </div>
      </header>

      {/* Budget Status Cards */}
      <BudgetStatusCards cards={budgetCardsData} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Cash Flow Chart (Spans 2 columns) */}
        <div className="lg:col-span-2">
          <CashFlowChart data={cashFlowData} />
        </div>

        {/* Right Column - Accounts Widget */}
        <div className="lg:col-span-1">
          <AccountsWidget accounts={accountsData} />
        </div>
      </div>

      {/* Category Breakdown and Transaction Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-1">
          <ExpenseCategoryDonut
            data={categoryBreakdownData}
            budgetUsed={budgetUsageData.usedBudget}
            totalBudget={budgetUsageData.totalBudget}
          />
        </div>

        {/* Transaction Table (Spans 2 columns) */}
        <div className="lg:col-span-2">
          <SmartTransactionTable transactions={transactionsData} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
