import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

interface MiniChartProps {
  symbol?: string;
  className?: string;
}

export const MiniChart = memo(
  ({ symbol = 'NASDAQ:AAPL', className = '' }: MiniChartProps) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
      config={{
        symbol,
        width: '100%',
        height: '100%',
        locale: 'en',
        dateRange: '12M',
        colorTheme: 'dark',
        isTransparent: false,
        autosize: true,
        largeChartUrl: '',
      }}
    />
  )
);

MiniChart.displayName = 'MiniChart';
