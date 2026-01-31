import { AssetBucketCard } from "./AssetBucketCard";

type VaultAssetData = {
  crypto: {
    value: number;
    trend24h: number;
  };
  preciousMetals: {
    value: number;
    dailyChange: number;
    grams: number;
    pricePerGram: number;
  };
  realEstate: {
    value: number;
    yearlyAppreciation: number;
  };
};

type AssetBucketCardsProps = {
  data?: VaultAssetData;
  isLoading?: boolean;
  onCryptoClick?: () => void;
  onMetalsClick?: () => void;
  onRealEstateClick?: () => void;
};

const defaultData: VaultAssetData = {
  crypto: {
    value: 1247230.5,
    trend24h: 5.67,
  },
  preciousMetals: {
    value: 850000.0,
    dailyChange: -1.23,
    grams: 13500,
    pricePerGram: 62.96,
  },
  realEstate: {
    value: 3750000.0,
    yearlyAppreciation: 9.8,
  },
};

const SkeletonLoader = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="h-14 w-14 rounded-xl bg-slate-800" />
            <div className="h-12 w-20 rounded-lg bg-slate-800" />
          </div>
          <div className="h-4 w-32 rounded bg-slate-800" />
          <div className="h-10 w-40 rounded bg-slate-800" />
          <div className="h-1 w-full rounded bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export const AssetBucketCards = ({
  data = defaultData,
  isLoading = false,
  onCryptoClick,
  onMetalsClick,
  onRealEstateClick,
}: AssetBucketCardsProps) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  const buckets = [
    {
      id: "crypto",
      label: "Crypto Holdings",
      value: data.crypto.value,
      trend: data.crypto.trend24h,
      trendLabel: "24h Change",
      icon: "currency_bitcoin",
      color: "green" as const,
      subtext: "Live API-fetched",
      onClick: onCryptoClick,
    },
    {
      id: "metals",
      label: "Gold & Silver",
      value: data.preciousMetals.value,
      trend: data.preciousMetals.dailyChange,
      trendLabel: "Daily Rate",
      icon: "stacks",
      color: "gold" as const,
      subtext: `${data.preciousMetals.grams.toLocaleString()}g × $${data.preciousMetals.pricePerGram}`,
      onClick: onMetalsClick,
    },
    {
      id: "realestate",
      label: "Properties",
      value: data.realEstate.value,
      trend: data.realEstate.yearlyAppreciation,
      trendLabel: "YoY Growth",
      icon: "home_work",
      color: "blue" as const,
      subtext: "Manual estimates",
      onClick: onRealEstateClick,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {buckets.map((bucket) => (
        <AssetBucketCard key={bucket.id} bucket={bucket} onClick={bucket.onClick} />
      ))}
    </div>
  );
};

export default AssetBucketCards;
