import { AssetListingWidget } from "../components/widgets/AssetListingWidget";
import { LinkedCardWidget } from "../components/widgets/LinkedCardWidget";

/**
 * Right Panel Components Demo
 * 
 * This demonstrates:
 * 1. AssetListingWidget - "Transactions" inspired asset list
 * 2. LinkedCardWidget - "Available Card" inspired loan tracker
 */

export const RightPanelDemo = () => {
  const handleAssetClick = (assetId: string) => {
    console.log(`Asset clicked: ${assetId}`);
    alert(`Opening details for asset: ${assetId}`);
  };

  const handleLoanClick = (loanId: string) => {
    console.log(`Loan clicked: ${loanId}`);
    alert(`Opening loan management for: ${loanId}`);
  };

  // Custom assets example
  const customAssets = [
    {
      id: "apt-1",
      name: "3BHK Villa - Whitefield",
      category: "property" as const,
      value: 2500000,
      subtitle: "Bangalore, Karnataka",
      icon: "villa",
      iconBg: "bg-purple-500",
      trend: { value: 8.5, isPositive: true },
    },
    {
      id: "gold-1",
      name: "Digital Gold",
      category: "gold" as const,
      value: 150000,
      subtitle: "50g stored online",
      icon: "savings",
      iconBg: "bg-yellow-600",
      trend: { value: 1.2, isPositive: true },
    },
    {
      id: "crypto-1",
      name: "Solana Wallet",
      category: "crypto" as const,
      value: 125000,
      subtitle: "250 SOL",
      icon: "toll",
      iconBg: "bg-purple-600",
      trend: { value: -3.5, isPositive: false },
    },
  ];

  // Custom loans example
  const customLoans = [
    {
      id: "loan-1",
      loanType: "home" as const,
      linkedAsset: "3BHK Villa - Whitefield",
      loanAmount: 2000000,
      outstandingBalance: 1650000,
      monthlyEMI: 22000,
      interestRate: 8.75,
      endDate: "Jun 2040",
      icon: "villa",
      iconBg: "bg-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Right Panel Components Demo
          </h1>
          <p className="mt-2 text-slate-400">
            Asset listing and linked loans widgets for the right sidebar
          </p>
        </div>

        {/* Side by Side Default */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Default Configuration
            </h2>
            <p className="text-sm text-slate-400">
              Using built-in dummy data
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <AssetListingWidget
              onAssetClick={handleAssetClick}
              onViewAll={() => alert("Navigating to all assets...")}
            />
            <LinkedCardWidget
              onLoanClick={handleLoanClick}
              onViewAll={() => alert("Navigating to loan management...")}
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
              Using custom asset and loan data
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <AssetListingWidget
              assets={customAssets}
              onAssetClick={handleAssetClick}
            />
            <LinkedCardWidget
              loans={customLoans}
              onLoanClick={handleLoanClick}
            />
          </div>
        </section>

        {/* Empty States */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Empty States</h2>
            <p className="text-sm text-slate-400">
              When no assets or loans exist
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <AssetListingWidget assets={[]} />
            <LinkedCardWidget loans={[]} />
          </div>
        </section>

        {/* Loading States */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Loading States
            </h2>
            <p className="text-sm text-slate-400">Skeleton loaders</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <AssetListingWidget isLoading={true} />
            <LinkedCardWidget isLoading={true} />
          </div>
        </section>

        {/* As Right Sidebar */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Right Sidebar Layout
            </h2>
            <p className="text-sm text-slate-400">
              How it appears in the actual vault dashboard
            </p>
          </div>
          <div className="w-80 space-y-6 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <AssetListingWidget
              onAssetClick={handleAssetClick}
              onViewAll={() => console.log("View all")}
            />
            <LinkedCardWidget
              onLoanClick={handleLoanClick}
              onViewAll={() => console.log("View all loans")}
            />
          </div>
        </section>

        {/* Component Details: Asset Listing */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            AssetListingWidget Component
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">
                  receipt_long
                </span>
                <h4 className="font-semibold text-indigo-400">
                  Inspiration: "Transactions" List (Top Right)
                </h4>
              </div>
              <ul className="ml-8 space-y-1 text-sm text-slate-300">
                <li>• Adapted to "My Assets" listing</li>
                <li>• Row 1: "2BHK Apartment - Indiranagar" ($1.85M)</li>
                <li>• Row 2: "Sovereign Gold Bond" ($425K)</li>
                <li>• Row 3: "Bitcoin Wallet" ($847K)</li>
                <li>• Shows total asset value at top</li>
                <li>• Trend indicators for each asset</li>
                <li>• Click to view asset details</li>
                <li>• Displays up to 6 assets with "show more"</li>
              </ul>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-2 font-semibold text-white">Asset Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                    <span className="material-symbols-outlined text-white">
                      apartment
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    Property - Real estate assets
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-600">
                    <span className="material-symbols-outlined text-white">
                      workspace_premium
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    Gold - Physical gold, bonds, digital gold
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
                    <span className="material-symbols-outlined text-white">
                      currency_bitcoin
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    Crypto - Digital currency wallets
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-2 font-semibold text-white">Features</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Total value summary</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Trend indicators</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Category icons</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-300">Compact list view</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Details: Linked Card */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            LinkedCardWidget Component
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400">
                  credit_card
                </span>
                <h4 className="font-semibold text-red-400">
                  Inspiration: "Available Card" (Bottom Right)
                </h4>
              </div>
              <ul className="ml-8 space-y-1 text-sm text-slate-300">
                <li>• Adapted to "Linked Loans"</li>
                <li>• Shows home loans on properties</li>
                <li>• Displays as negative balance (liability)</li>
                <li>• Provides true Net Asset Value calculation</li>
                <li>• Outstanding balance highlighted in red</li>
                <li>• EMI and loan term information</li>
                <li>• Repayment progress bar</li>
              </ul>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-2 font-semibold text-white">
                Net Asset Value Concept
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="rounded-lg bg-slate-900 p-3">
                  <p className="font-mono">
                    <span className="text-emerald-400">Asset Value</span>
                    <span className="mx-2 text-slate-500">-</span>
                    <span className="text-red-400">Outstanding Loans</span>
                    <span className="mx-2 text-slate-500">=</span>
                    <span className="text-blue-400">Net Worth</span>
                  </p>
                </div>
                <p className="text-slate-400">
                  Example: $2.5M apartment - $1.25M loan = $1.25M net equity
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-2 font-semibold text-white">Loan Details</h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Outstanding Balance:</span>
                  <span className="font-bold text-red-400">
                    Total liability amount
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly EMI:</span>
                  <span className="font-semibold text-white">
                    Regular payment
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interest Rate:</span>
                  <span className="text-slate-300">Annual percentage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Loan End Date:</span>
                  <span className="text-slate-300">Maturity timeline</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Repaid %:</span>
                  <span className="text-emerald-400">Progress tracker</span>
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
              <h4 className="mb-2 font-semibold text-white">
                AssetListingWidget
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-slate-300">
                <code>{`import { AssetListingWidget } from "./components/widgets/AssetListingWidget";

// In right sidebar
<AssetListingWidget
  onAssetClick={(id) => navigate(\`/vault/asset/\${id}\`)}
  onViewAll={() => navigate('/vault/assets')}
/>`}</code>
              </pre>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-white">
                LinkedCardWidget
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-slate-300">
                <code>{`import { LinkedCardWidget } from "./components/widgets/LinkedCardWidget";

// Show loans linked to assets
<LinkedCardWidget
  onLoanClick={(id) => navigate(\`/vault/loan/\${id}\`)}
  onViewAll={() => navigate('/vault/loans')}
/>`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
              <span className="material-symbols-outlined text-2xl text-blue-400">
                analytics
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                True Net Worth Tracking
              </h3>
              <p className="mt-2 text-slate-300">
                Most wealth trackers only show assets. This system shows your
                complete financial picture by including linked loans as
                liabilities. A $2M property with a $1.5M loan is actually worth
                $500K to you—that's your real equity.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-blue-400">
                    arrow_right
                  </span>
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Realistic Picture:</strong>{" "}
                    See your actual net worth, not inflated numbers
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-blue-400">
                    arrow_right
                  </span>
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Debt Awareness:</strong>{" "}
                    Track loan repayment progress visually
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-blue-400">
                    arrow_right
                  </span>
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Better Decisions:</strong>{" "}
                    Make informed choices about new loans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RightPanelDemo;
