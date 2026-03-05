import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const Ticker = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"
      config={{
        symbols: [
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
          { proName: 'FOREXCOM:NSXUSD', title: 'US 100' },
          { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
          { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
          { description: 'Gold', proName: 'COMEX:GC1!' },
        ],
        isTransparent: false,
        showSymbolLogo: true,
        colorTheme: 'dark',
        locale: 'en',
      }}
    />
  )
);

Ticker.displayName = 'Ticker';
