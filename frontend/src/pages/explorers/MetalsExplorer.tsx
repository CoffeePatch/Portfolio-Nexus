/**
 * Precious Metals Explorer – TradingView widgets for Gold, Silver & Platinum.
 * Advanced charts for each metal, forex cross rates (INR), commodity news, etc.
 */

import {
  TickerTape,
  AdvancedChart,
  ForexCrossRates,
  TopStories,
  SingleTicker,
  MiniChart,
} from '../../components/tradingview';
import { WidgetSection } from '../../components/shared/WidgetSection';

const MetalsExplorer = () => (
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
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-yellow-500">
            Live Metals Data
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Precious Metals Explorer
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time Gold, Silver & Platinum prices powered by TradingView
        </p>
      </header>

      {/* Key single tickers – metals spot prices */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          'OANDA:XAUUSD',
          'OANDA:XAGUSD',
          'OANDA:XPTUSD',
          'TVC:GOLD',
          'TVC:SILVER',
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

      {/* Gold Advanced Chart – full width */}
      <WidgetSection
        title="Gold — Advanced Chart"
        subtitle="Gold spot price (XAU/USD) — full interactive analysis"
        icon="candlestick_chart"
        accentFrom="from-yellow-500/20"
        accentTo="to-amber-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
          <AdvancedChart symbol="OANDA:XAUUSD" />
        </div>
      </WidgetSection>

      {/* Silver + Platinum side-by-side */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WidgetSection
          title="Silver — Advanced Chart"
          subtitle="Silver spot price (XAG/USD)"
          icon="candlestick_chart"
          accentFrom="from-slate-400/20"
          accentTo="to-zinc-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 420 }}>
            <AdvancedChart symbol="OANDA:XAGUSD" />
          </div>
        </WidgetSection>

        <WidgetSection
          title="Platinum — Advanced Chart"
          subtitle="Platinum spot price (XPT/USD)"
          icon="candlestick_chart"
          accentFrom="from-sky-400/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 420 }}>
            <AdvancedChart symbol="OANDA:XPTUSD" />
          </div>
        </WidgetSection>
      </div>

      {/* Forex Cross Rates (useful for metals priced in multiple currencies) + News */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WidgetSection
          title="Currency Rates"
          subtitle="Cross rates for metals priced in different currencies"
          icon="currency_exchange"
          accentFrom="from-yellow-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <ForexCrossRates />
          </div>
        </WidgetSection>

        <WidgetSection
          title="Commodity News"
          subtitle="Latest precious metals & commodity market updates"
          icon="newspaper"
          accentFrom="from-amber-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <TopStories />
          </div>
        </WidgetSection>
      </div>

      {/* Mini charts – metals overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { symbol: 'OANDA:XAUUSD', label: 'Gold Spot' },
          { symbol: 'OANDA:XAGUSD', label: 'Silver Spot' },
          { symbol: 'OANDA:XPTUSD', label: 'Platinum Spot' },
          { symbol: 'TVC:PALLADIUM', label: 'Palladium' },
        ].map((item) => (
          <div
            key={item.symbol}
            className="overflow-hidden rounded-xl border border-slate-800/50 bg-[#0a0a0a]"
            style={{ height: 220 }}
          >
            <MiniChart symbol={item.symbol} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800/50 pt-4 pb-2">
        <p className="text-center text-[10px] text-slate-600">
          Commodity data provided by TradingView. Prices may be delayed.
        </p>
      </div>
    </div>
  </div>
);

export default MetalsExplorer;
