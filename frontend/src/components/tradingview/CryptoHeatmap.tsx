import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const CryptoHeatmap = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js"
      config={{
        dataSource: 'Crypto',
        blockSize: 'market_cap_calc',
        blockColor: 'change',
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

CryptoHeatmap.displayName = 'CryptoHeatmap';
