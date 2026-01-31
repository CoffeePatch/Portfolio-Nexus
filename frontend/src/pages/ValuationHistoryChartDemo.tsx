import { ValuationHistoryChart } from "../components/widgets/ValuationHistoryChart";

/**
 * ValuationHistoryChart Demo
 * 
 * This component demonstrates the Net Worth Growth chart showing:
 * - Solid Line: Market Value (current worth of hard assets)
 * - Dashed Line: Purchase Cost (what you paid)
 * - The gap between them shows appreciation
 */

export const ValuationHistoryChartDemo = () => {
  // Example 1: Strong growth scenario
  const strongGrowthData = [
    { date: "2015", marketValue: 1000000, purchaseCost: 1000000 },
    { date: "2016", marketValue: 1200000, purchaseCost: 1000000 },
    { date: "2017", marketValue: 1500000, purchaseCost: 1200000 },
    { date: "2018", marketValue: 1850000, purchaseCost: 1400000 },
    { date: "2019", marketValue: 2200000, purchaseCost: 1600000 },
    { date: "2020", marketValue: 2800000, purchaseCost: 1900000 },
    { date: "2021", marketValue: 3600000, purchaseCost: 2200000 },
    { date: "2022", marketValue: 4200000, purchaseCost: 2500000 },
    { date: "2023", marketValue: 5100000, purchaseCost: 2800000 },
    { date: "2024", marketValue: 6200000, purchaseCost: 3200000 },
    { date: "2025", marketValue: 7500000, purchaseCost: 3500000 },
  ];

  // Example 2: Moderate growth scenario
  const moderateGrowthData = [
    { date: "2020", marketValue: 2500000, purchaseCost: 2500000 },
    { date: "2021", marketValue: 2750000, purchaseCost: 2600000 },
    { date: "2022", marketValue: 3100000, purchaseCost: 2800000 },
    { date: "2023", marketValue: 3500000, purchaseCost: 3000000 },
    { date: "2024", marketValue: 3850000, purchaseCost: 3200000 },
    { date: "2025", marketValue: 4200000, purchaseCost: 3400000 },
  ];

  // Example 3: Recent investments scenario
  const recentInvestmentsData = [
    { date: "Jan 2024", marketValue: 1500000, purchaseCost: 1500000 },
    { date: "Mar 2024", marketValue: 1580000, purchaseCost: 1500000 },
    { date: "May 2024", marketValue: 1720000, purchaseCost: 1650000 },
    { date: "Jul 2024", marketValue: 1890000, purchaseCost: 1750000 },
    { date: "Sep 2024", marketValue: 2100000, purchaseCost: 1900000 },
    { date: "Nov 2024", marketValue: 2350000, purchaseCost: 2050000 },
    { date: "Dec 2024", marketValue: 2500000, purchaseCost: 2150000 },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Net Worth Growth Chart Demo
          </h1>
          <p className="mt-2 text-slate-400">
            Money Flow-inspired line chart showing hard asset appreciation
          </p>
        </div>

        {/* Example 1: Default Data (10 Years) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Default Configuration (10-Year View)
            </h2>
            <p className="text-sm text-slate-400">
              Built-in dummy data showing strong long-term growth
            </p>
          </div>
          <ValuationHistoryChart />
        </section>

        {/* Example 2: Strong Growth */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Strong Growth Scenario
            </h2>
            <p className="text-sm text-slate-400">
              Exceptional appreciation - 7.5M market value from 3.5M investment
            </p>
          </div>
          <ValuationHistoryChart data={strongGrowthData} />
        </section>

        {/* Example 3: Moderate Growth */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Moderate Growth (5-Year View)
            </h2>
            <p className="text-sm text-slate-400">
              Steady appreciation over shorter time period
            </p>
          </div>
          <ValuationHistoryChart data={moderateGrowthData} />
        </section>

        {/* Example 4: Recent Investments */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Recent Investments (Monthly View)
            </h2>
            <p className="text-sm text-slate-400">
              Tracking new investments month by month
            </p>
          </div>
          <ValuationHistoryChart data={recentInvestmentsData} />
        </section>

        {/* Example 5: Loading State */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Loading State</h2>
            <p className="text-sm text-slate-400">
              Skeleton loader while fetching historical data
            </p>
          </div>
          <ValuationHistoryChart isLoading={true} />
        </section>

        {/* Chart Details */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Chart Components
          </h3>
          <div className="space-y-4">
            {/* Solid Line */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                <h4 className="font-semibold text-emerald-400">
                  Solid Line: Market Value
                </h4>
              </div>
              <p className="ml-14 text-sm text-slate-300">
                Shows the current market value of your hard assets (Real Estate, Gold, 
                Crypto). This represents what your investments are worth today.
              </p>
            </div>

            {/* Dashed Line */}
            <div className="rounded-lg border border-slate-500/20 bg-slate-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-1 w-12 rounded-full border-2 border-dashed border-slate-400"></div>
                <h4 className="font-semibold text-slate-300">
                  Dashed Line: Purchase Cost
                </h4>
              </div>
              <p className="ml-14 text-sm text-slate-300">
                Shows your total investment cost - what you actually paid for these 
                assets over time. This is your cost basis.
              </p>
            </div>

            {/* The Gap */}
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400">
                  vertical_align_center
                </span>
                <h4 className="font-semibold text-yellow-400">The Gap = Appreciation</h4>
              </div>
              <p className="ml-14 text-sm text-slate-300">
                The space between the two lines represents your wealth growth. The wider 
                the gap, the more your assets have appreciated. This is the satisfying 
                part—seeing your investments grow over time!
              </p>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">Features</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Dual-line chart (solid vs dashed)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Interactive tooltips with gain calculation
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Time period filters (1Y, 3Y, 5Y, 10Y, ALL)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Total appreciation display
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Smooth animations on load
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Responsive design (mobile to desktop)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Custom legend with visual examples
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Informative context box
              </p>
            </div>
          </div>
        </section>

        {/* Data Structure */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Data Structure
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-slate-300">
            <code>{`type ValuationDataPoint = {
  date: string;        // "2015", "Jan 2024", etc.
  marketValue: number; // Current market value
  purchaseCost: number; // What you paid
};

const exampleData = [
  { date: "2015", marketValue: 1500000, purchaseCost: 1500000 },
  { date: "2016", marketValue: 1650000, purchaseCost: 1500000 },
  { date: "2017", marketValue: 1950000, purchaseCost: 1700000 },
  // ... more data points
];`}</code>
          </pre>
        </section>

        {/* Usage Example */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Usage Example
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-slate-300">
            <code>{`import { ValuationHistoryChart } from "./components/widgets/ValuationHistoryChart";

// With default data
<ValuationHistoryChart />

// With custom data
const valuationHistory = [
  { date: "2020", marketValue: 2500000, purchaseCost: 2500000 },
  { date: "2021", marketValue: 2750000, purchaseCost: 2600000 },
  { date: "2022", marketValue: 3100000, purchaseCost: 2800000 },
  { date: "2023", marketValue: 3500000, purchaseCost: 3000000 },
  { date: "2024", marketValue: 3850000, purchaseCost: 3200000 },
];

<ValuationHistoryChart data={valuationHistory} />

// With loading state
<ValuationHistoryChart isLoading={true} />`}</code>
          </pre>
        </section>

        {/* Why This Chart Matters */}
        <section className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
              <span className="material-symbols-outlined text-2xl text-emerald-400">
                lightbulb
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Why This Chart Matters
              </h3>
              <p className="mt-2 text-slate-300">
                Hard assets like Real Estate and Gold are long-term investments. Unlike 
                stocks that fluctuate daily, these assets appreciate steadily over years. 
                This chart gives you the satisfaction of seeing the growing gap between 
                what you paid and what your assets are worth today.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    arrow_right
                  </span>
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Visual Motivation:</strong> Seeing 
                    growth over time reinforces smart investment decisions
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    arrow_right
                  </span>
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Long-term Perspective:</strong> Focus 
                    on years, not days—perfect for hard assets
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400">
                    arrow_right
                  </span>
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Wealth Building:</strong> Track real 
                    appreciation, not just market noise
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

export default ValuationHistoryChartDemo;
