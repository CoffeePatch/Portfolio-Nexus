/**
 * Crypto Explorer – TradingView widgets curated for cryptocurrency analysis.
 * Shows crypto heatmap, BTC/ETH/SOL charts, crypto tickers, news, etc.
 */

import {
  TickerTape,
  AdvancedChart,
  CryptoHeatmap,
  TopStories,
  SingleTicker,
  MiniChart,
} from '../../components/tradingview';
import { WidgetSection } from '../../components/shared/WidgetSection';

const CryptoExplorer = () => (
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
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">
            Live Crypto Data
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Crypto Explorer
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time cryptocurrency markets powered by TradingView
        </p>
      </header>

      {/* Key single tickers – top crypto */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          'BITSTAMP:BTCUSD',
          'BITSTAMP:ETHUSD',
          'BINANCE:SOLUSDT',
          'BINANCE:BNBUSDT',
          'BINANCE:XRPUSDT',
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

      {/* Advanced Chart – Bitcoin */}
      <WidgetSection
        title="Advanced Crypto Chart"
        subtitle="Full interactive chart — search any crypto pair"
        icon="candlestick_chart"
        accentFrom="from-orange-500/20"
        accentTo="to-amber-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
          <AdvancedChart symbol="BITSTAMP:BTCUSD" />
        </div>
      </WidgetSection>

      {/* Crypto Heatmap */}
      <WidgetSection
        title="Crypto Heatmap"
        subtitle="Market-cap weighted performance across all coins"
        icon="grid_view"
        accentFrom="from-orange-500/20"
        accentTo="to-red-500/20"
      >
        <div className="overflow-hidden rounded-lg" style={{ height: 500 }}>
          <CryptoHeatmap />
        </div>
      </WidgetSection>

      {/* Crypto News + Mini charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WidgetSection
          title="Crypto News"
          subtitle="Latest blockchain & crypto market updates"
          icon="newspaper"
          accentFrom="from-orange-500/20"
          accentTo="to-slate-500/20"
        >
          <div className="overflow-hidden rounded-lg" style={{ height: 400 }}>
            <TopStories />
          </div>
        </WidgetSection>

        <div className="grid grid-cols-2 gap-4">
          {[
            { symbol: 'BITSTAMP:ETHUSD', label: 'Ethereum' },
            { symbol: 'BINANCE:SOLUSDT', label: 'Solana' },
            { symbol: 'BINANCE:ADAUSDT', label: 'Cardano' },
            { symbol: 'BINANCE:DOGEUSDT', label: 'Dogecoin' },
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
          Crypto data provided by TradingView. Prices may be delayed.
        </p>
      </div>
    </div>
  </div>
);

export default CryptoExplorer;
