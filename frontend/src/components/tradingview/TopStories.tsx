import { memo } from 'react';
import { TradingViewWidget } from './TradingViewWidget';

export const TopStories = memo(
  ({ className = '' }: { className?: string }) => (
    <TradingViewWidget
      className={className}
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
      config={{
        feedMode: 'all_symbols',
        isTransparent: false,
        displayMode: 'regular',
        width: '100%',
        height: '100%',
        colorTheme: 'dark',
        locale: 'en',
      }}
    />
  )
);

TopStories.displayName = 'TopStories';
