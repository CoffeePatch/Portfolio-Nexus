/**
 * MutualFunds Explorer – TradingView widgets for index funds, ETFs & market analysis.
 * Shows ETF heatmap, major index charts, market overview, news, etc.
 */

import {
  TickerTape,
  AdvancedChart,
  SymbolOverview,
  ETFHeatmap,
  MarketOverviewWidget,
  TopStories,
  SingleTicker,
  MiniChart,
} from '../../components/tradingview';
import { WidgetSection } from '../../components/shared/WidgetSection';

const MutualFundsExplorer = () => (
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
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
            Live Index & ETF Data
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Mutual Funds & ETF Explorer
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time index, ETF & fund benchmark data powered by TradingView
        </p>
      </header>

      {/* Key single tickers – major indices */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          'AMEX:SPY',
          'NASDAQ:QQQ',
          'AMEX:VTI',
          'AMEX:IWM',
          'AMEX:DIA',
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

      {/* Advanced Chart (NIFTY) + Market Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <WidgetSection
          title="Index Chart"
          subtitle="Track NIFTY 50 — switch to any index or ETF"
          icon="candlestick_chart"
          accentFrom="from-emerald-500/20"
          accentTo="to-teal-500/20"
          className="xl:col-span-2"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <AdvancedChart symbol="NSE:NIFTY" />
          </div>
        </WidgetSection>

        <WidgetSection
          title="Market Overview"
          subtitle="Global indices, futures & bonds"
          icon="public"
          accentFrom="from-emerald-500/20"
          accentTo="to-cyan-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <MarketOverviewWidget />
          </div>
        </WidgetSection>
      </div>

      {/* Symbol Overview — key indices */}
      <WidgetSection
        title="Index Comparison"
        subtitle="Live performance comparison of major benchmark indices"
        icon="monitoring"
        accentFrom="from-emerald-500/20"
        accentTo="to-indigo-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
          <SymbolOverview />
        </div>
      </WidgetSection>

      {/* ETF Heatmap */}
      <WidgetSection
        title="ETF Heatmap"
        subtitle="Performance snapshot of major US ETFs by asset class"
        icon="grid_view"
        accentFrom="from-teal-500/20"
        accentTo="to-emerald-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
          <ETFHeatmap />
        </div>
      </WidgetSection>

      {/* News + Mini charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WidgetSection
          title="Fund & Market News"
          subtitle="Latest financial news & market analysis"
          icon="newspaper"
          accentFrom="from-emerald-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <TopStories />
          </div>
        </WidgetSection>

        <div className="grid grid-cols-2 gap-4">
          {[
            { symbol: 'AMEX:SPY', label: 'S&P 500 ETF' },
            { symbol: 'AMEX:QQQ', label: 'Nasdaq 100 ETF' },
            { symbol: 'AMEX:VTI', label: 'Total Market ETF' },
            { symbol: 'AMEX:IWM', label: 'Russell 2000 ETF' },
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
          Market data provided by TradingView. Prices may be delayed.
        </p>
      </div>
    </div>
  </div>
);

export default MutualFundsExplorer;
