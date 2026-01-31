import { QuickAssetActions } from "../components/widgets/QuickAssetActions";
import { PropertyDuesWidget } from "../components/widgets/PropertyDuesWidget";

/**
 * QuickActions Demo
 * 
 * This demonstrates:
 * 1. QuickAssetActions - "Send Money To" inspired circular asset icons
 * 2. PropertyDuesWidget - "Scheduled Payments" inspired dues tracker
 */

export const QuickActionsDemo = () => {
  const handleQuickAction = (actionId: string, category: string) => {
    console.log(`Quick action clicked: ${actionId} (${category})`);
    
    const messages: { [key: string]: string } = {
      bitcoin: "Opening Bitcoin details and transaction history...",
      ethereum: "Opening Ethereum portfolio...",
      property1: "Opening Sunset Villa property tax log...",
      property2: "Opening Downtown property maintenance records...",
      gold: "Opening Gold storage locker details...",
      silver: "Opening Silver holdings...",
    };

    alert(messages[actionId] || `Opening ${actionId} details...`);
  };

  const handleDuePayment = (dueId: string) => {
    console.log(`Payment clicked for due: ${dueId}`);
    alert(`Opening payment interface for due: ${dueId}`);
  };

  const handleViewAllDues = () => {
    console.log("View all dues clicked");
    alert("Navigating to full dues calendar...");
  };

  // Custom actions example
  const customActions = [
    {
      id: "btc",
      name: "BTC",
      icon: "currency_bitcoin",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      category: "crypto" as const,
    },
    {
      id: "eth",
      name: "ETH",
      icon: "currency_exchange",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      category: "crypto" as const,
    },
    {
      id: "sol",
      name: "SOL",
      icon: "toll",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      category: "crypto" as const,
    },
    {
      id: "villa",
      name: "Villa",
      icon: "home",
      iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      category: "property" as const,
    },
    {
      id: "gold-vault",
      name: "Gold",
      icon: "stacks",
      iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
      category: "gold" as const,
    },
    {
      id: "nft",
      name: "NFTs",
      icon: "brush",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
      category: "other" as const,
    },
  ];

  // Custom dues example
  const customDues = [
    {
      id: "tax1",
      title: "Property Tax",
      subtitle: "Sunset Villa - Q4 2024",
      amount: 18500,
      dueDate: "Dec 31, 2024",
      status: "due-soon" as const,
      category: "property-tax" as const,
      icon: "account_balance",
      iconBg: "bg-red-500",
    },
    {
      id: "locker1",
      title: "Bank Locker Fee",
      subtitle: "Premium Gold Storage",
      amount: 1200,
      dueDate: "Jan 10, 2025",
      status: "upcoming" as const,
      category: "locker-fee" as const,
      icon: "lock",
      iconBg: "bg-yellow-600",
    },
    {
      id: "maint1",
      title: "HOA Dues",
      subtitle: "Downtown Loft Community",
      amount: 550,
      dueDate: "Jan 1, 2025",
      status: "due-soon" as const,
      category: "maintenance" as const,
      icon: "home_repair_service",
      iconBg: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Quick Actions & Dues Demo
          </h1>
          <p className="mt-2 text-slate-400">
            Bottom section components for asset management and maintenance
          </p>
        </div>

        {/* Side by Side Layout */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Default Configuration
            </h2>
            <p className="text-sm text-slate-400">
              Quick asset access + scheduled dues
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <QuickAssetActions onActionClick={handleQuickAction} />
            <PropertyDuesWidget
              onPaymentClick={handleDuePayment}
              onViewAll={handleViewAllDues}
            />
          </div>
        </section>

        {/* Custom Configuration */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Custom Configuration
            </h2>
            <p className="text-sm text-slate-400">
              Custom actions and dues data
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <QuickAssetActions
              actions={customActions}
              onActionClick={handleQuickAction}
            />
            <PropertyDuesWidget
              dues={customDues}
              onPaymentClick={handleDuePayment}
              onViewAll={handleViewAllDues}
            />
          </div>
        </section>

        {/* Loading States */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Loading State</h2>
            <p className="text-sm text-slate-400">
              PropertyDuesWidget skeleton loader
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <QuickAssetActions actions={[]} />
            <PropertyDuesWidget isLoading={true} />
          </div>
        </section>

        {/* Component Details: Quick Asset Actions */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            QuickAssetActions Component
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">
                  bolt
                </span>
                <h4 className="font-semibold text-indigo-400">
                  Inspiration: "Send Money To" Contact Circles
                </h4>
              </div>
              <ul className="ml-8 space-y-1 text-sm text-slate-300">
                <li>• Circular asset icons instead of contact faces</li>
                <li>• Bitcoin icon → Opens Crypto Details</li>
                <li>• House icon → Opens Property Tax log</li>
                <li>• Gold icon → Opens Gold storage details</li>
                <li>• Hover effects with scale and glow</li>
                <li>• Responsive grid (3 cols mobile, 6 cols desktop)</li>
                <li>• Custom click handlers per asset</li>
              </ul>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-2 font-semibold text-white">Features</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Gradient icon backgrounds</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Hover scale animations</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Category-based routing</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Customizable actions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Details: Property Dues Widget */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            PropertyDuesWidget Component
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400">
                  calendar_month
                </span>
                <h4 className="font-semibold text-orange-400">
                  Inspiration: "Scheduled Payments"
                </h4>
              </div>
              <ul className="ml-8 space-y-1 text-sm text-slate-300">
                <li>• Adapted to "Upcoming Dues"</li>
                <li>• Property Tax tracking</li>
                <li>• Locker Fees (Gold storage)</li>
                <li>• Maintenance Charges</li>
                <li>• Insurance premiums</li>
                <li>• Status badges (Upcoming, Due Soon, Overdue)</li>
                <li>• Summary cards for quick overview</li>
              </ul>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-2 font-semibold text-white">Due Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                    <span className="material-symbols-outlined text-white">
                      account_balance
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    Property Tax - Annual/Quarterly government dues
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-600">
                    <span className="material-symbols-outlined text-white">lock</span>
                  </div>
                  <span className="text-sm text-slate-300">
                    Locker Fees - Bank storage for gold/valuables
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                    <span className="material-symbols-outlined text-white">
                      home_repair_service
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    Maintenance - HOA, society, building charges
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                    <span className="material-symbols-outlined text-white">shield</span>
                  </div>
                  <span className="text-sm text-slate-300">
                    Insurance - Property/asset protection
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-2 font-semibold text-white">Status System</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-500/20 px-2 py-0.5 text-xs font-medium text-slate-400 ring-1 ring-slate-500/30">
                    Upcoming
                  </span>
                  <span className="text-sm text-slate-300">
                    More than 2 weeks away
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-400 ring-1 ring-orange-500/30">
                    Due Soon
                  </span>
                  <span className="text-sm text-slate-300">
                    Within 2 weeks - needs attention
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400 ring-1 ring-red-500/30">
                    Overdue
                  </span>
                  <span className="text-sm text-slate-300">
                    Past due date - urgent action required
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Usage Examples
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-white">QuickAssetActions</h4>
              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-slate-300">
                <code>{`import { QuickAssetActions } from "./components/widgets/QuickAssetActions";

// Default usage
<QuickAssetActions
  onActionClick={(id, category) => {
    if (category === "crypto") navigateToCrypto(id);
    if (category === "property") openPropertyTaxLog(id);
    if (category === "gold") showGoldStorage(id);
  }}
/>`}</code>
              </pre>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-white">PropertyDuesWidget</h4>
              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-slate-300">
                <code>{`import { PropertyDuesWidget } from "./components/widgets/PropertyDuesWidget";

// Default usage
<PropertyDuesWidget
  onPaymentClick={(dueId) => openPaymentForm(dueId)}
  onViewAll={() => navigate('/dues-calendar')}
/>`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuickActionsDemo;
