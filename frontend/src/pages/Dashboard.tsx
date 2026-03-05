import { AssetClassCarousel } from "../components/widgets/AssetClassCarousel";
import { PortfolioPerformanceChart } from "../components/widgets/PortfolioPerformanceChart";
import { NetWorthSummary } from "../components/widgets/NetWorthSummary";
import { AssetAllocationWidget } from "../components/widgets/AssetAllocationWidget";
import { RecentTransactions } from "../components/widgets/RecentTransactions";
import { AssetPageShell } from "../components/shared/AssetPageShell";
import Explorer from "./Explorer";

/* ------------------------------------------------------------------ */
/*  Original dashboard content (My Portfolio)                          */
/* ------------------------------------------------------------------ */
const PortfolioDashboard = () => (
  <div className="space-y-4 px-6 py-6">
    {/* Top Row - 3 Columns Grid */}
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <NetWorthSummary />

      <div className="lg:col-span-2">
        <div className="group relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-4 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
              <span
                className="material-symbols-outlined text-lg text-indigo-400"
                style={{
                  fontVariationSettings:
                    "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                }}
              >
                dashboard
              </span>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white">
                My Portfolio
              </h2>
              <p className="text-xs text-slate-500">
                Asset breakdown by class
              </p>
            </div>
          </div>
          <div className="relative">
            <AssetClassCarousel />
          </div>
        </div>
      </div>
    </div>

    <PortfolioPerformanceChart />

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <AssetAllocationWidget className="lg:col-span-2" />
      <RecentTransactions className="lg:col-span-1" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Dashboard – wraps Explorer + My Portfolio with toggle               */
/* ------------------------------------------------------------------ */
const Dashboard = () => (
  <AssetPageShell
    explorerView={<Explorer />}
    portfolioView={<PortfolioDashboard />}
    explorerTitle="Explorer"
    portfolioTitle="Dashboard"
    explorerSubtitle="Real-time global market data & analysis"
    portfolioSubtitle="Portfolio performance overview"
  />
);

export default Dashboard;
