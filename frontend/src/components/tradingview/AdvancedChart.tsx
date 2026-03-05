import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

interface AdvancedChartProps {
  symbol?: string;
  className?: string;
}

export const AdvancedChart = memo(
  ({ symbol = 'NASDAQ:AAPL', className = '' }: AdvancedChartProps) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
      config={{
        autosize: true,
        symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        allow_symbol_change: true,
        calendar: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        support_host: 'https://www.tradingview.com',
      }}
    />
  )
);

AdvancedChart.displayName = 'AdvancedChart';
