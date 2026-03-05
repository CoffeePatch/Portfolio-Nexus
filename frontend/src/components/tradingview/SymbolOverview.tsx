import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const SymbolOverview = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
      config={{
        symbols: [
          ['Apple', 'AAPL|1D'],
          ['Google', 'GOOGL|1D'],
          ['Microsoft', 'MSFT|1D'],
          ['S&P 500', 'FOREXCOM:SPXUSD|1D'],
          ['Bitcoin', 'BINANCE:BTCUSDT|1D'],
          ['Tesla', 'TSLA|1D'],
          ['Amazon', 'AMZN|1D'],
        ],
        chartOnly: false,
        width: '100%',
        height: '100%',
        locale: 'en',
        colorTheme: 'dark',
        autosize: true,
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: 'right',
        scaleMode: 'Normal',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
        fontSize: '10',
        noTimeScale: false,
        valuesTracking: '1',
        changeMode: 'price-and-percent',
        chartType: 'area',
        headerFontSize: 'medium',
        lineWidth: 2,
        lineType: 0,
        dateRanges: [
          '1d|1',
          '1m|30',
          '3m|60',
          '12m|1D',
          '60m|1W',
          'all|1M',
        ],
      }}
    />
  )
);

SymbolOverview.displayName = 'SymbolOverview';
