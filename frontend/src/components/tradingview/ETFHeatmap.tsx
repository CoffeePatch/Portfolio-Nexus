import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const ETFHeatmap = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js"
      config={{
        dataSource: 'AllUSEtf',
        blockSize: 'aum',
        blockColor: 'change',
        grouping: 'asset_class',
        locale: 'en',
        symbolUrl: '',
        colorTheme: 'dark',
        hasTopBar: true,
        isDataSetEnabled: true,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
        width: '100%',
        height: '100%',
      }}
    />
  )
);

ETFHeatmap.displayName = 'ETFHeatmap';
