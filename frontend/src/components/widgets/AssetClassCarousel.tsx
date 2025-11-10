import { useAssetClassSummary } from "../../hooks/useAssetClassSummary";
import { AssetClassCard } from "./AssetClassCard";

const SkeletonLoader = () => (
  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex-shrink-0 w-64 animate-pulse rounded-xl border border-slate-800 bg-slate-900/50 p-6"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-slate-800" />
            <div className="flex-1">
              <div className="h-5 w-24 rounded bg-slate-800 mb-2" />
              <div className="h-3 w-16 rounded bg-slate-800" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-slate-800" />
            <div className="h-8 w-32 rounded bg-slate-800" />
          </div>
          <div className="flex justify-between pt-2">
            <div className="h-4 w-16 rounded bg-slate-800" />
            <div className="h-4 w-16 rounded bg-slate-800" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
      <span className="material-symbols-outlined text-4xl text-slate-500">
        account_balance_wallet
      </span>
    </div>
    <h3 className="mb-2 text-lg font-semibold text-slate-300">
      No Assets Yet
    </h3>
    <p className="text-sm text-slate-500">
      Start building your portfolio by adding your first asset
    </p>
  </div>
);

const ErrorState = () => (
  <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-red-400">error</span>
      <div>
        <p className="font-medium text-red-200">Error Loading Asset Classes</p>
        <p className="text-sm text-red-300/80">
          Could not load portfolio data
        </p>
      </div>
    </div>
  </div>
);

export const AssetClassCarousel = () => {
  const { data: assetSummaries, isLoading, isError } = useAssetClassSummary();

  // Loading state
  if (isLoading) {
    return <SkeletonLoader />;
  }

  // Error state
  if (isError) {
    return <ErrorState />;
  }

  // Empty state
  if (!assetSummaries || assetSummaries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {assetSummaries.map((summary, index) => (
          <div key={`${summary.type}-${index}`} className="snap-start">
            <AssetClassCard summary={summary} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetClassCarousel;
