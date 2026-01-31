type Asset = {
  id: string;
  name: string;
  category: "property" | "gold" | "crypto" | "other";
  value: number;
  subtitle?: string;
  icon: string;
  iconBg: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

type AssetListingWidgetProps = {
  assets?: Asset[];
  isLoading?: boolean;
  onAssetClick?: (assetId: string) => void;
  onViewAll?: () => void;
};

const defaultAssets: Asset[] = [
  {
    id: "apt-1",
    name: "2BHK Apartment - Indiranagar",
    category: "property",
    value: 1850000,
    subtitle: "Bangalore, India",
    icon: "apartment",
    iconBg: "bg-indigo-500",
    trend: {
      value: 5.2,
      isPositive: true,
    },
  },
  {
    id: "gold-1",
    name: "Sovereign Gold Bond",
    category: "gold",
    value: 425000,
    subtitle: "Series IV - 2021",
    icon: "workspace_premium",
    iconBg: "bg-yellow-600",
    trend: {
      value: 2.8,
      isPositive: true,
    },
  },
  {
    id: "crypto-1",
    name: "Bitcoin Wallet",
    category: "crypto",
    value: 847230,
    subtitle: "0.5 BTC",
    icon: "currency_bitcoin",
    iconBg: "bg-orange-500",
    trend: {
      value: 8.5,
      isPositive: true,
    },
  },
  {
    id: "property-2",
    name: "Beach House - Goa",
    category: "property",
    value: 2100000,
    subtitle: "Vacation Property",
    icon: "cottage",
    iconBg: "bg-blue-500",
    trend: {
      value: 3.2,
      isPositive: true,
    },
  },
  {
    id: "gold-2",
    name: "Gold Bars (24K)",
    category: "gold",
    value: 325000,
    subtitle: "5kg stored",
    icon: "stacks",
    iconBg: "bg-yellow-500",
    trend: {
      value: -0.5,
      isPositive: false,
    },
  },
  {
    id: "crypto-2",
    name: "Ethereum Wallet",
    category: "crypto",
    value: 245500,
    subtitle: "5.2 ETH",
    icon: "currency_exchange",
    iconBg: "bg-blue-600",
    trend: {
      value: 12.3,
      isPositive: true,
    },
  },
];

const SkeletonLoader = () => (
  <div className="space-y-2">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex animate-pulse items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3"
      >
        <div className="h-10 w-10 rounded-lg bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded bg-slate-800" />
          <div className="h-2 w-1/2 rounded bg-slate-800" />
        </div>
        <div className="h-4 w-16 rounded bg-slate-800" />
      </div>
    ))}
  </div>
);

export const AssetListingWidget = ({
  assets = defaultAssets,
  isLoading = false,
  onAssetClick,
  onViewAll,
}: AssetListingWidgetProps) => {
  // Calculate total value
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
            <span
              className="material-symbols-outlined text-base text-indigo-400"
              style={{
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              account_balance_wallet
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">My Assets</h3>
            <p className="text-xs text-slate-400">
              {assets.length} item{assets.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            View All →
          </button>
        )}
      </div>

      {/* Total Value Summary */}
      <div className="mb-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-3 ring-1 ring-indigo-500/20">
        <p className="text-xs font-medium text-slate-400">Total Value</p>
        <p className="mt-1 text-2xl font-bold text-white">
          ${totalValue.toLocaleString("en-US")}
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Asset List */}
          <div className="space-y-2">
            {assets.slice(0, 6).map((asset) => (
              <div
                key={asset.id}
                onClick={() => onAssetClick?.(asset.id)}
                className="group flex cursor-pointer items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 transition-all hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-md"
              >
                {/* Icon */}
                <div
                  className={[
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform group-hover:scale-110",
                    asset.iconBg,
                  ].join(" ")}
                >
                  <span
                    className="material-symbols-outlined text-lg text-white"
                    style={{
                      fontVariationSettings:
                        "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {asset.icon}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 overflow-hidden">
                  <h4 className="truncate text-sm font-semibold text-white">
                    {asset.name}
                  </h4>
                  {asset.subtitle && (
                    <p className="truncate text-xs text-slate-400">
                      {asset.subtitle}
                    </p>
                  )}
                </div>

                {/* Value & Trend */}
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    ${(asset.value / 1000).toFixed(0)}K
                  </p>
                  {asset.trend && (
                    <div
                      className={[
                        "flex items-center justify-end gap-0.5 text-xs font-medium",
                        asset.trend.isPositive
                          ? "text-emerald-400"
                          : "text-red-400",
                      ].join(" ")}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "12px" }}
                      >
                        {asset.trend.isPositive
                          ? "arrow_upward"
                          : "arrow_downward"}
                      </span>
                      <span>{Math.abs(asset.trend.value).toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More Indicator */}
          {assets.length > 6 && (
            <div className="mt-3 text-center">
              <button
                onClick={onViewAll}
                className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-300"
              >
                +{assets.length - 6} more assets
              </button>
            </div>
          )}

          {/* Empty State */}
          {assets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
                <span className="material-symbols-outlined text-2xl text-slate-500">
                  account_balance_wallet
                </span>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-slate-300">
                No Assets Yet
              </h4>
              <p className="text-xs text-slate-500">
                Start adding your assets to track them
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AssetListingWidget;
