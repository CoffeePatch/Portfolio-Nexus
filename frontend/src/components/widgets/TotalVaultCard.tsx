import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

type VaultData = {
  totalValue: number;
  cryptoValue: number;
  goldValue: number;
  realEstateValue: number;
  yearReturn: number;
  yearReturnPercent: number;
  chartData: number[];
};

type TotalVaultCardProps = {
  data?: VaultData;
  isLoading?: boolean;
  onAddAsset?: () => void;
  onUpdateValue?: () => void;
};

const defaultData: VaultData = {
  totalValue: 5847230.5,
  cryptoValue: 1247230.5,
  goldValue: 850000.0,
  realEstateValue: 3750000.0,
  yearReturn: 584723.05,
  yearReturnPercent: 11.12,
  chartData: [
    4800000, 4900000, 4850000, 5000000, 5100000, 5300000, 5200000, 5400000,
    5500000, 5650000, 5800000, 5847230,
  ],
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6">
    <div className="space-y-2">
      <div className="h-6 w-32 rounded bg-slate-800"></div>
      <div className="h-14 w-64 rounded bg-slate-800"></div>
    </div>
    <div className="h-32 rounded-lg bg-slate-800"></div>
    <div className="flex gap-3">
      <div className="h-12 flex-1 rounded-xl bg-slate-800"></div>
      <div className="h-12 flex-1 rounded-xl bg-slate-800"></div>
    </div>
  </div>
);

export const TotalVaultCard = ({
  data = defaultData,
  isLoading = false,
  onAddAsset,
  onUpdateValue,
}: TotalVaultCardProps) => {
  const [activeButton, setActiveButton] = useState<"deposit" | "withdraw" | null>(null);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl">
        <SkeletonLoader />
      </div>
    );
  }

  const isPositiveReturn = data.yearReturn >= 0;
  const returnColorClass = isPositiveReturn
    ? "text-emerald-400"
    : "text-red-400";
  const returnPrefix = isPositiveReturn ? "+" : "";

  // Chart configuration
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: data.chartData,
        borderColor: isPositiveReturn ? "#10b981" : "#ef4444",
        backgroundColor: isPositiveReturn
          ? "rgba(16, 185, 129, 0.1)"
          : "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: isPositiveReturn ? "#10b981" : "#ef4444",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(99, 102, 241, 0.5)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) =>
            `$${context.parsed.y.toLocaleString("en-US")}`,
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: false,
        grid: { display: false },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl transition-all hover:border-slate-700">
      {/* Decorative background gradient */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50 blur-3xl"></div>

      <div className="relative space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <span className="material-symbols-outlined text-xl text-white">
                  account_balance_wallet
                </span>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Vault Value
              </h3>
            </div>
          </div>

          {/* 1-Year Return Badge */}
          <div className="rounded-lg bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-medium text-slate-400">1Y Return</p>
            <p className={`text-sm font-bold ${returnColorClass}`}>
              {returnPrefix}
              {data.yearReturnPercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Total Value Display */}
        <div className="space-y-2">
          <p className="text-6xl font-bold tracking-tight text-white">
            $
            {data.totalValue.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className={`text-lg font-semibold ${returnColorClass}`}>
            {returnPrefix}${Math.abs(data.yearReturn).toLocaleString("en-US")}{" "}
            <span className="text-sm text-slate-400">this year</span>
          </p>
        </div>

        {/* Asset Breakdown */}
        <div className="grid grid-cols-3 gap-3 rounded-xl bg-slate-800/30 p-4 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <p className="text-xs font-medium text-slate-400">Crypto</p>
            </div>
            <p className="text-sm font-semibold text-white">
              ${(data.cryptoValue / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <p className="text-xs font-medium text-slate-400">Gold</p>
            </div>
            <p className="text-sm font-semibold text-white">
              ${(data.goldValue / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
              <p className="text-xs font-medium text-slate-400">Real Estate</p>
            </div>
            <p className="text-sm font-semibold text-white">
              ${(data.realEstateValue / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        {/* Mini Chart - 1 Year Appreciation Trend */}
        <div className="relative h-32 rounded-xl bg-slate-800/20 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">
              12-Month Trend
            </p>
            <div className="flex items-center gap-1">
              <span
                className={`material-symbols-outlined text-sm ${returnColorClass}`}
              >
                {isPositiveReturn ? "trending_up" : "trending_down"}
              </span>
            </div>
          </div>
          <div className="h-20">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setActiveButton("deposit");
              onAddAsset?.();
              setTimeout(() => setActiveButton(null), 200);
            }}
            className={[
              "group/btn flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all",
              activeButton === "deposit"
                ? "scale-95 bg-emerald-500 text-white shadow-lg"
                : "bg-emerald-500/90 text-white shadow-lg hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20",
            ].join(" ")}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover/btn:scale-110">
              add_circle
            </span>
            <span className="text-sm">Add Asset</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveButton("withdraw");
              onUpdateValue?.();
              setTimeout(() => setActiveButton(null), 200);
            }}
            className={[
              "group/btn flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all",
              activeButton === "withdraw"
                ? "scale-95 bg-indigo-500 text-white shadow-lg"
                : "bg-indigo-500/90 text-white shadow-lg hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20",
            ].join(" ")}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover/btn:scale-110">
              update
            </span>
            <span className="text-sm">Update Value</span>
          </button>
        </div>

        {/* Quick Info */}
        <div className="flex items-center justify-between rounded-lg border border-slate-800/50 bg-slate-800/20 px-4 py-2.5">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-base">info</span>
            <span className="text-xs">Last updated: Today, 9:00 AM</span>
          </div>
          <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalVaultCard;
