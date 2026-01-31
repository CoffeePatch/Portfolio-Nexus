type AssetBucket = {
  id: string;
  label: string;
  value: number;
  trend: number;
  trendLabel: string;
  icon: string;
  color: "green" | "gold" | "blue";
  subtext?: string;
};

type AssetBucketCardProps = {
  bucket: AssetBucket;
  onClick?: () => void;
};

const colorConfig = {
  green: {
    gradient: "from-emerald-500/20 to-green-600/20",
    ring: "ring-emerald-500/30",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    textAccent: "text-emerald-400",
    hoverShadow: "hover:shadow-emerald-500/20",
    borderHover: "hover:border-emerald-500/30",
  },
  gold: {
    gradient: "from-yellow-500/20 to-amber-600/20",
    ring: "ring-yellow-500/30",
    iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
    textAccent: "text-yellow-400",
    hoverShadow: "hover:shadow-yellow-500/20",
    borderHover: "hover:border-yellow-500/30",
  },
  blue: {
    gradient: "from-blue-500/20 to-indigo-600/20",
    ring: "ring-blue-500/30",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    textAccent: "text-blue-400",
    hoverShadow: "hover:shadow-blue-500/20",
    borderHover: "hover:border-blue-500/30",
  },
};

export const AssetBucketCard = ({ bucket, onClick }: AssetBucketCardProps) => {
  const config = colorConfig[bucket.color];
  const isPositiveTrend = bucket.trend >= 0;
  const trendColorClass = isPositiveTrend
    ? "text-emerald-400"
    : "text-red-400";
  const trendPrefix = isPositiveTrend ? "+" : "";

  return (
    <div
      onClick={onClick}
      className={[
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800",
        "bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all duration-300",
        config.hoverShadow,
        config.borderHover,
        "hover:scale-[1.02] hover:shadow-xl",
      ].join(" ")}
    >
      {/* Decorative gradient background */}
      <div
        className={[
          "absolute right-0 top-0 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-50",
          config.gradient,
        ].join(" ")}
      />

      <div className="relative space-y-5">
        {/* Header with Icon */}
        <div className="flex items-center justify-between">
          <div
            className={[
              "flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-110",
              config.iconBg,
            ].join(" ")}
          >
            <span
              className="material-symbols-outlined text-3xl text-white"
              style={{
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
              }}
            >
              {bucket.icon}
            </span>
          </div>

          {/* Trend Badge */}
          <div className="rounded-lg bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {bucket.trendLabel}
            </p>
            <div className="flex items-center gap-1">
              <span
                className={`material-symbols-outlined text-sm ${trendColorClass}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPositiveTrend ? "trending_up" : "trending_down"}
              </span>
              <p className={`text-sm font-bold ${trendColorClass}`}>
                {trendPrefix}
                {Math.abs(bucket.trend).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Label */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {bucket.label}
          </h3>
          {bucket.subtext && (
            <p className="mt-1 text-xs text-slate-600">{bucket.subtext}</p>
          )}
        </div>

        {/* Value Display */}
        <div>
          <p className="text-4xl font-black tracking-tight text-white">
            $
            {bucket.value.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="flex items-center gap-2 pt-3">
          <div
            className={[
              "h-1 flex-1 rounded-full transition-all group-hover:h-1.5",
              config.gradient,
              config.ring,
              "ring-1",
            ].join(" ")}
          />
          <span
            className={`text-xs font-medium transition-colors ${config.textAccent}`}
          >
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssetBucketCard;
