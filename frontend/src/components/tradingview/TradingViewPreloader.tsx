import { useEffect } from 'react';

/**
 * All TradingView embed script URLs used across the application.
 * Injected as `<link rel="prefetch">` on app mount so
 * the browser downloads & caches them before any Explorer view opens.
 */
const TV_SCRIPT_URLS = [
  'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js',
];

/**
 * Invisible component — mounts once in App, prefetches every
 * TradingView script so they live in the browser cache.
 *
 * Uses `<link rel="prefetch">` (low-priority background fetch)
 * which does NOT block page rendering or compete with critical resources.
 */
export const TradingViewPreloader = () => {
  useEffect(() => {
    // Small delay so we don't compete with the initial page render
    const timer = setTimeout(() => {
      TV_SCRIPT_URLS.forEach((url) => {
        // Skip if we already injected a prefetch for this URL
        if (document.querySelector(`link[href="${url}"]`)) return;

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'script';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    }, 1500); // 1.5 s after mount — page has settled

    return () => clearTimeout(timer);
  }, []);

  return null; // renders nothing
};
