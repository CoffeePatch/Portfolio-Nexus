import { TotalVaultCard } from "../components/widgets/TotalVaultCard";
import { AssetBucketCards } from "../components/widgets/AssetBucketCards";
import { ValuationHistoryChart } from "../components/widgets/ValuationHistoryChart";
import { QuickAssetActions } from "../components/widgets/QuickAssetActions";
import { PropertyDuesWidget } from "../components/widgets/PropertyDuesWidget";
import { AssetListingWidget } from "../components/widgets/AssetListingWidget";
import { LinkedCardWidget } from "../components/widgets/LinkedCardWidget";
import { VaultShell } from "../components/layout/VaultShell";
import { RightSidebarSection } from "../components/layout/RightSidebarSection";
import { RightSidebarItem } from "../components/layout/RightSidebarItem";

const cryptoAssets = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    value: "$847.2K",
    icon: "currency_bitcoin",
    iconBg: "bg-orange-500",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    value: "$245.5K",
    icon: "currency_exchange",
    iconBg: "bg-blue-500",
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    value: "$154.5K",
    icon: "toll",
    iconBg: "bg-purple-500",
  },
];

const goldHoldings = [
  {
    id: 1,
    name: "Gold Bars",
    subtitle: "24K, 1kg bars",
    value: "$650K",
    icon: "stacks",
    iconBg: "bg-yellow-600",
  },
  {
    id: 2,
    name: "Gold Coins",
    subtitle: "American Eagle",
    value: "$200K",
    icon: "copyright",
    iconBg: "bg-yellow-500",
  },
];

const realEstateProperties = [
  {
    id: 1,
    name: "Sunset Villa",
    subtitle: "Los Angeles, CA",
    value: "$1.85M",
    icon: "home",
    iconBg: "bg-indigo-500",
  },
  {
    id: 2,
    name: "Downtown Loft",
    subtitle: "New York, NY",
    value: "$1.2M",
    icon: "apartment",
    iconBg: "bg-indigo-600",
  },
  {
    id: 3,
    name: "Beach House",
    subtitle: "Miami, FL",
    value: "$700K",
    icon: "cottage",
    iconBg: "bg-blue-600",
  },
];

export const VaultDashboard = () => {
  const handleAddAsset = () => {
    console.log("Opening Add Asset modal...");
    // TODO: Open modal to add new asset (crypto, gold, or real estate)
  };

  const handleUpdateValue = () => {
    console.log("Opening Update Value modal...");
    // TODO: Open modal to update asset values
  };

  const handleCryptoClick = () => {
    console.log("Navigate to Crypto details...");
  };

  const handleMetalsClick = () => {
    console.log("Navigate to Precious Metals details...");
  };

  const handleRealEstateClick = () => {
    console.log("Navigate to Real Estate details...");
  };

  const handleQuickAction = (actionId: string, category: string) => {
    console.log(`Quick action clicked: ${actionId} (${category})`);
    
    switch (category) {
      case "crypto":
        console.log(`Opening ${actionId} crypto details...`);
        break;
      case "property":
        console.log(`Opening ${actionId} property tax log...`);
        break;
      case "gold":
        console.log(`Opening gold storage details...`);
        break;
      default:
        console.log(`Opening ${actionId} details...`);
    }
  };

  const handleDuePayment = (dueId: string) => {
    console.log(`Opening payment for due: ${dueId}`);
  };

  const handleAssetClick = (assetId: string) => {
    console.log(`Opening asset details: ${assetId}`);
  };

  const handleLoanClick = (loanId: string) => {
    console.log(`Opening loan details: ${loanId}`);
  };

  const rightSidebarContent = (
    <div className="space-y-6">
      {/* Asset Listing Widget */}
      <AssetListingWidget
        onAssetClick={handleAssetClick}
        onViewAll={() => console.log("View all assets")}
      />

      {/* Linked Loans Widget */}
      <LinkedCardWidget
        onLoanClick={handleLoanClick}
        onViewAll={() => console.log("View all loans")}
      />
    </div>
  );

  return (
    <VaultShell rightSidebarContent={rightSidebarContent}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Vault Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Manage your alternative investments: Crypto, Gold & Real Estate
          </p>
        </div>

        {/* Total Vault Card - Featured at Top */}
        <TotalVaultCard onAddAsset={handleAddAsset} onUpdateValue={handleUpdateValue} />

        {/* Asset Bucket Cards - Center Stage */}
        <AssetBucketCards
          onCryptoClick={handleCryptoClick}
          onMetalsClick={handleMetalsClick}
          onRealEstateClick={handleRealEstateClick}
        />

        {/* Valuation History Chart - Net Worth Growth */}
        <ValuationHistoryChart />

        {/* Bottom Section: Quick Actions & Maintenance */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Asset Actions */}
          <QuickAssetActions onActionClick={handleQuickAction} />

          {/* Property Dues Widget */}
          <PropertyDuesWidget onPaymentClick={handleDuePayment} />
        </div>

        {/* Asset Category Overview - Compact Summary (commented out for now) */}
        <div className="hidden grid-cols-3 gap-6 md:grid">
          {/* Crypto Summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                <span className="material-symbols-outlined text-2xl text-white">
                  currency_bitcoin
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">
                  Cryptocurrency
                </h3>
                <p className="text-2xl font-bold text-white">$1.25M</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-800/50 px-3 py-2">
              <span className="text-xs text-slate-400">3 assets</span>
              <span className="text-xs font-semibold text-emerald-400">
                +18.5%
              </span>
            </div>
          </div>

          {/* Gold Summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600">
                <span className="material-symbols-outlined text-2xl text-white">
                  stacks
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">
                  Gold Holdings
                </h3>
                <p className="text-2xl font-bold text-white">$850K</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-800/50 px-3 py-2">
              <span className="text-xs text-slate-400">2 types</span>
              <span className="text-xs font-semibold text-emerald-400">
                +7.2%
              </span>
            </div>
          </div>

          {/* Real Estate Summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600">
                <span className="material-symbols-outlined text-2xl text-white">
                  home
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">
                  Real Estate
                </h3>
                <p className="text-2xl font-bold text-white">$3.75M</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-800/50 px-3 py-2">
              <span className="text-xs text-slate-400">3 properties</span>
              <span className="text-xs font-semibold text-emerald-400">
                +9.8%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Recent Activities
            </h2>
            <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                  <span className="material-symbols-outlined text-emerald-400">
                    add_circle
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">Bitcoin Purchase</p>
                  <p className="text-sm text-slate-400">0.5 BTC • Today</p>
                </div>
              </div>
              <p className="font-semibold text-white">+$22,615</p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20">
                  <span className="material-symbols-outlined text-indigo-400">
                    update
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">
                    Property Value Updated
                  </p>
                  <p className="text-sm text-slate-400">
                    Sunset Villa • Yesterday
                  </p>
                </div>
              </div>
              <p className="font-semibold text-emerald-400">+$50,000</p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                  <span className="material-symbols-outlined text-yellow-400">
                    add_circle
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">Gold Bars Added</p>
                  <p className="text-sm text-slate-400">5x 1kg bars • 2 days ago</p>
                </div>
              </div>
              <p className="font-semibold text-white">+$325,000</p>
            </div>
          </div>
        </div>
      </div>
    </VaultShell>
  );
};

export default VaultDashboard;
