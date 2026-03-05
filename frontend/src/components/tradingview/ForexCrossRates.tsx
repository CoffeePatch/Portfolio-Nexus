import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const ForexCrossRates = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js"
      config={{
        width: '100%',
        height: '100%',
        currencies: [
          'EUR',
          'USD',
          'JPY',
          'GBP',
          'CHF',
          'AUD',
          'CAD',
          'NZD',
          'INR',
        ],
        isTransparent: false,
        colorTheme: 'dark',
        locale: 'en',
      }}
    />
  )
);

ForexCrossRates.displayName = 'ForexCrossRates';
