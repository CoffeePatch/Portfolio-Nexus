import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const StockHeatmap = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
      config={{
        exchanges: [],
        dataSource: 'SPX500',
        grouping: 'sector',
        blockSize: 'market_cap_basic',
        blockColor: 'change',
        locale: 'en',
        symbolUrl: '',
        colorTheme: 'dark',
        hasTopBar: true,
        isDataSetEnabled: true,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
        isMonoSize: false,
        width: '100%',
        height: '100%',
      }}
    />
  )
);

StockHeatmap.displayName = 'StockHeatmap';
