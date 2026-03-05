/**
 * Fixed Deposits Explorer – TradingView widgets for bond, yield & interest rate analysis.
 * Shows government bond charts, bond yields, forex for currency comparison, news, etc.
 */

import {
  TickerTape,
  AdvancedChart,
  ForexCrossRates,
  MarketOverviewWidget,
  TopStories,
  SingleTicker,
  MiniChart,
} from '../../components/tradingview';
import { WidgetSection } from '../../components/shared/WidgetSection';

const FixedDepositsExplorer = () => (
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
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-pink-500">
            Live Bond & Rate Data
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Fixed Income Explorer
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time government bonds, yields & interest rate benchmarks
        </p>
      </header>

      {/* Key single tickers – bonds & yields */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          'TVC:US10Y',
          'TVC:US02Y',
          'TVC:US30Y',
          'CBOT:ZB1!',
          'TVC:IN10Y',
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

      {/* Bond Chart + Market Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <WidgetSection
          title="US 10Y Treasury — Advanced Chart"
          subtitle="Full interactive chart — benchmark yield curve"
          icon="candlestick_chart"
          accentFrom="from-pink-500/20"
          accentTo="to-rose-500/20"
          className="xl:col-span-2"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <AdvancedChart symbol="TVC:US10Y" />
          </div>
        </WidgetSection>

        <WidgetSection
          title="Market Overview"
          subtitle="Bonds, forex & global rates"
          icon="public"
          accentFrom="from-pink-500/20"
          accentTo="to-cyan-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
            <MarketOverviewWidget />
          </div>
        </WidgetSection>
      </div>

      {/* Forex (important for FD investors comparing currencies) + News */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WidgetSection
          title="Currency Rates"
          subtitle="Forex cross rates — relevant for international FD rates"
          icon="currency_exchange"
          accentFrom="from-pink-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <ForexCrossRates />
          </div>
        </WidgetSection>

        <WidgetSection
          title="Economic News"
          subtitle="Latest bond market & RBI rate updates"
          icon="newspaper"
          accentFrom="from-rose-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <TopStories />
          </div>
        </WidgetSection>
      </div>

      {/* Mini charts – yield comparison */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { symbol: 'TVC:US10Y', label: 'US 10Y' },
          { symbol: 'TVC:US02Y', label: 'US 2Y' },
          { symbol: 'TVC:IN10Y', label: 'India 10Y' },
          { symbol: 'TVC:GB10Y', label: 'UK 10Y' },
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
          Bond & yield data provided by TradingView. Prices may be delayed.
        </p>
      </div>
    </div>
  </div>
);

export default FixedDepositsExplorer;
