/**
 * Real Estate Explorer – TradingView widgets for real estate market analysis.
 * Shows REITs, real estate ETFs, related indices, mortgage rate proxies & news.
 */

import {
  TickerTape,
  AdvancedChart,
  ETFHeatmap,
  MarketOverviewWidget,
  TopStories,
  SingleTicker,
  MiniChart,
} from '../../components/tradingview';
import { WidgetSection } from '../../components/shared/WidgetSection';

const RealEstateExplorer = () => (
  <div className="min-h-screen bg-black">
    {/* Ticker tape */}
    <div className="sticky top-0 z-20 border-b border-slate-800/50 bg-black/80 backdrop-blur-sm">
      <div style={{ height: 46 }}>
        <TickerTape />
      </div>
    </div>

    <div className="mx-auto max-w-[1600px] space-y-6 p-6">
      {/* Header */}
      <header className="mb-2">
        <div className="mb-1 flex items-center gap-3">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-500">
            Live REIT & Real Estate Data
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Real Estate Explorer
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time REITs, real estate ETFs & property market benchmarks
        </p>
      </header>

      {/* Key single tickers – REITs & related */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          'AMEX:VNQ',
          'AMEX:IYR',
          'NYSE:O',
          'NYSE:AMT',
          'NYSE:PLD',
        ].map((symbol) => (
          <div
            key={symbol}
            className="overflow-hidden rounded-xl border border-slate-800/50 bg-[#0a0a0a] p-1"
            style={{ height: 104 }}
          >
            <SingleTicker symbol={symbol} />
          </div>
        ))}
      </div>

      {/* REIT Chart + Market Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <WidgetSection
          title="VNQ — Real Estate ETF"
          subtitle="Vanguard Real Estate ETF — full interactive chart"
          icon="candlestick_chart"
          accentFrom="from-sky-500/20"
          accentTo="to-blue-500/20"
          className="xl:col-span-2"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <AdvancedChart symbol="AMEX:VNQ" />
          </div>
        </WidgetSection>

        <WidgetSection
          title="Market Overview"
          subtitle="Global indices & fixed income context"
          icon="public"
          accentFrom="from-sky-500/20"
          accentTo="to-cyan-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <MarketOverviewWidget />
          </div>
        </WidgetSection>
      </div>

      {/* ETF Heatmap (filtered by context – user can drill into real estate etfs) */}
      <WidgetSection
        title="ETF Heatmap"
        subtitle="US ETF performance — explore real estate sector"
        icon="grid_view"
        accentFrom="from-sky-500/20"
        accentTo="to-indigo-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
          <ETFHeatmap />
        </div>
      </WidgetSection>

      {/* News + Mini charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WidgetSection
          title="Real Estate & REIT News"
          subtitle="Latest property market & REIT updates"
          icon="newspaper"
          accentFrom="from-sky-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <TopStories />
          </div>
        </WidgetSection>

        <div className="grid grid-cols-2 gap-4">
          {[
            { symbol: 'NYSE:O', label: 'Realty Income' },
            { symbol: 'NYSE:AMT', label: 'American Tower' },
            { symbol: 'NYSE:PLD', label: 'Prologis' },
            { symbol: 'NYSE:SPG', label: 'Simon Property' },
          ].map((item) => (
            <div
              key={item.symbol}
              className="overflow-hidden rounded-xl border border-slate-800/50 bg-[#0a0a0a]"
              style={{ height: 200 }}
            >
              <MiniChart symbol={item.symbol} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800/50 pt-4 pb-2">
        <p className="text-center text-[10px] text-slate-600">
          REIT & real estate data provided by TradingView. Prices may be delayed.
        </p>
      </div>
    </div>
  </div>
);

export default RealEstateExplorer;
