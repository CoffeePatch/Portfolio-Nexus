import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

interface SingleTickerProps {
  symbol?: string;
  className?: string;
}

export const SingleTicker = memo(
  ({ symbol = 'NASDAQ:AAPL', className = '' }: SingleTickerProps) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js"
      config={{
        symbol,
        width: '100%',
        isTransparent: false,
        colorTheme: 'dark',
        locale: 'en',
      }}
    />
  )
);

SingleTicker.displayName = 'SingleTicker';
