import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const TickerTape = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      config={{
        symbols: [
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
          { proName: 'FOREXCOM:NSXUSD', title: 'US 100' },
          { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
          { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
          { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
          { description: 'Dow Jones', proName: 'FOREXCOM:DJI' },
          { description: 'DAX', proName: 'PEPPERSTONE:GER40' },
          { description: 'Gold', proName: 'COMEX:GC1!' },
          { description: 'Crude Oil', proName: 'NYMEX:CL1!' },
          { description: 'Apple', proName: 'NASDAQ:AAPL' },
          { description: 'Tesla', proName: 'NASDAQ:TSLA' },
          { description: 'Microsoft', proName: 'NASDAQ:MSFT' },
          { description: 'Amazon', proName: 'NASDAQ:AMZN' },
          { description: 'Meta', proName: 'NASDAQ:META' },
          { description: 'Nvidia', proName: 'NASDAQ:NVDA' },
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: 'adaptive',
        colorTheme: 'dark',
        locale: 'en',
      }}
    />
  )
);

TickerTape.displayName = 'TickerTape';
