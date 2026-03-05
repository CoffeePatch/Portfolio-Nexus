import { useState } from 'react';
import {
  TickerTape,
  AdvancedChart,
  SymbolOverview,
  MarketOverviewWidget,
  StockHeatmap,
  CryptoHeatmap,
  ETFHeatmap,
  ForexCrossRates,
  TopStories,
  SingleTicker,
  Ticker,
  MiniChart,
} from '../components/tradingview';

/* ------------------------------------------------------------------ */
/*  Reusable section wrapper – consistent card styling across widgets  */
/* ------------------------------------------------------------------ */
const WidgetSection = ({
  title,
  subtitle,
  icon,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] shadow-2xl ${className}`}
  >
    {/* Hover shimmer */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-purple-500/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    <div className="relative p-5">
      {/* Section header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
          <span
            className="material-symbols-outlined text-lg text-indigo-400"
            style={{
              fontVariationSettings:
                "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
            }}
          >
            {icon}
          </span>
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[11px] text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>

      {children}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Explorer page                                                      */
/* ------------------------------------------------------------------ */
const Explorer = () => {
  const [activeHeatmap, setActiveHeatmap] = useState<
    'stocks' | 'crypto' | 'etf'
  >('stocks');

  return (
    <div className="min-h-screen bg-black">
      {/* ── Sticky Ticker Tape ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-slate-800/50 bg-black/80 backdrop-blur-sm">
        <div style={{ height: 46 }}>
          <TickerTape />
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] space-y-6 p-6">
        {/* ── Page header ──────────────────────────────────────── */}
        <header className="mb-2">
          <div className="mb-1 flex items-center gap-3">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-green-500">
              Live Market Data
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Market Explorer
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time global market analysis powered by TradingView
          </p>
        </header>

        {/* ── Key single tickers ───────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { symbol: 'FOREXCOM:SPXUSD' },
            { symbol: 'AMEX:SPY' },
            { symbol: 'BITSTAMP:BTCUSD' },
            { symbol: 'BITSTAMP:ETHUSD' },
            { symbol: 'OANDA:XAUUSD' },
          ].map((t) => (
            <div
              key={t.symbol}
              className="overflow-hidden rounded-xl border border-slate-800/50 bg-[#0a0a0a] p-1"
              style={{ height: 104 }}
            >
              <SingleTicker symbol={t.symbol} />
            </div>
          ))}
        </div>

        {/* ── Advanced Chart  +  Market Overview ───────────────── */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <WidgetSection
            title="Advanced Chart"
            subtitle="Full interactive chart — search symbols, switch timeframes"
            icon="candlestick_chart"
            className="xl:col-span-2"
          >
            <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
              <AdvancedChart symbol="NASDAQ:AAPL" />
            </div>
          </WidgetSection>

          <WidgetSection
            title="Market Overview"
            subtitle="Global indices, futures, bonds & forex"
            icon="public"
          >
            <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
              <MarketOverviewWidget />
            </div>
          </WidgetSection>
        </div>

        {/* ── Symbol Overview ──────────────────────────────────── */}
        <WidgetSection
          title="Symbol Overview"
          subtitle="Live price comparison across popular instruments"
          icon="monitoring"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <SymbolOverview />
          </div>
        </WidgetSection>

        {/* ── Heatmaps with tab switching ──────────────────────── */}
        <WidgetSection
          title="Market Heatmap"
          subtitle="Color-coded performance snapshot by sector"
          icon="grid_view"
        >
          {/* Tab bar */}
          <div className="mb-4 flex w-fit gap-1 rounded-lg bg-slate-900/50 p-1">
            {(
              [
                { key: 'stocks', label: 'Stocks', icon: 'trending_up' },
                { key: 'crypto', label: 'Crypto', icon: 'currency_bitcoin' },
                { key: 'etf', label: 'ETFs', icon: 'account_balance' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveHeatmap(tab.key)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-all ${
                  activeHeatmap === tab.key
                    ? 'bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-sm"
                  style={{
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            {activeHeatmap === 'stocks' && <StockHeatmap />}
            {activeHeatmap === 'crypto' && <CryptoHeatmap />}
            {activeHeatmap === 'etf' && <ETFHeatmap />}
          </div>
        </WidgetSection>

        {/* ── Forex Cross Rates  +  Top Stories ────────────────── */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <WidgetSection
            title="Forex Cross Rates"
            subtitle="Live currency exchange matrix"
            icon="currency_exchange"
          >
            <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
              <ForexCrossRates />
            </div>
          </WidgetSection>

          <WidgetSection
            title="Top Stories"
            subtitle="Latest financial news & market updates"
            icon="newspaper"
          >
            <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
              <TopStories />
            </div>
          </WidgetSection>
        </div>

        {/* ── Tickers bar ──────────────────────────────────────── */}
        <WidgetSection
          title="Market Tickers"
          subtitle="Quick glance at key market prices"
          icon="speed"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 84 }}>
            <Ticker />
          </div>
        </WidgetSection>

        {/* ── Mini charts row ──────────────────────────────────── */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
              <span
                className="material-symbols-outlined text-lg text-indigo-400"
                style={{
                  fontVariationSettings:
                    "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                }}
              >
                insert_chart
              </span>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white">
                Quick Charts
              </h2>
              <p className="text-[11px] text-slate-500">
                Compact mini charts for popular instruments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { symbol: 'NASDAQ:AAPL', label: 'Apple' },
              { symbol: 'NASDAQ:GOOGL', label: 'Google' },
              { symbol: 'NASDAQ:TSLA', label: 'Tesla' },
              { symbol: 'BITSTAMP:BTCUSD', label: 'Bitcoin' },
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
        </div>

        {/* ── Footer disclaimer ────────────────────────────────── */}
        <div className="border-t border-slate-800/50 pt-4 pb-2">
          <p className="text-center text-[10px] text-slate-600">
            Market data provided by TradingView. Prices may be delayed. Not
            financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
