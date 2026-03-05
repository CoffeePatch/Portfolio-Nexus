/**
 * Stocks Explorer – TradingView widgets curated for stock/equity analysis.
 * Shows S&P 500 heatmap, advanced chart (AAPL default), stock tickers, news, etc.
 */

import {
  TickerTape,
  AdvancedChart,
  SymbolOverview,
  StockHeatmap,
  MarketOverviewWidget,
  TopStories,
  SingleTicker,
  MiniChart,
} from '../../components/tradingview';
import { WidgetSection } from '../../components/shared/WidgetSection';

const StocksExplorer = () => (
  <div className="min-h-screen bg-black">
    {/* Ticker tape – stock-focused symbols */}
    <div className="sticky top-0 z-20 border-b border-slate-800/50 bg-black/80 backdrop-blur-sm">
      <div style={{ height: 46 }}>
        <TickerTape />
      </div>
    </div>

    <div className="mx-auto max-w-[1600px] space-y-6 p-6">
      {/* Header */}
      <header className="mb-2">
        <div className="mb-1 flex items-center gap-3">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-green-500">
            Live Stock Data
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Stocks & ETF Explorer
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time equity markets powered by TradingView
        </p>
      </header>

      {/* Key single tickers – top stocks */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          'NASDAQ:AAPL',
          'NASDAQ:MSFT',
          'NASDAQ:GOOGL',
          'NASDAQ:AMZN',
          'NASDAQ:NVDA',
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

      {/* Advanced Chart + Market Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <WidgetSection
          title="Advanced Stock Chart"
          subtitle="Full interactive chart — search any stock, switch timeframes"
          icon="candlestick_chart"
          accentFrom="from-blue-500/20"
          accentTo="to-indigo-500/20"
          className="xl:col-span-2"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <AdvancedChart symbol="NASDAQ:AAPL" />
          </div>
        </WidgetSection>

        <WidgetSection
          title="Market Overview"
          subtitle="Global indices, futures & bonds"
          icon="public"
          accentFrom="from-blue-500/20"
          accentTo="to-cyan-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <MarketOverviewWidget />
          </div>
        </WidgetSection>
      </div>

      {/* Symbol Overview — popular equities */}
      <WidgetSection
        title="Symbol Comparison"
        subtitle="Live price comparison of major tech stocks"
        icon="monitoring"
        accentFrom="from-blue-500/20"
        accentTo="to-indigo-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
          <SymbolOverview />
        </div>
      </WidgetSection>

      {/* Stock Heatmap */}
      <WidgetSection
        title="S&P 500 Heatmap"
        subtitle="Color-coded performance by sector"
        icon="grid_view"
        accentFrom="from-emerald-500/20"
        accentTo="to-blue-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
          <StockHeatmap />
        </div>
      </WidgetSection>

      {/* Top Stories + Mini charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WidgetSection
          title="Stock News"
          subtitle="Latest financial news & earnings updates"
          icon="newspaper"
          accentFrom="from-blue-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <TopStories />
          </div>
        </WidgetSection>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { symbol: 'NASDAQ:TSLA', label: 'Tesla' },
              { symbol: 'NASDAQ:META', label: 'Meta' },
              { symbol: 'NYSE:JPM', label: 'JP Morgan' },
              { symbol: 'NYSE:V', label: 'Visa' },
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

export default StocksExplorer;
