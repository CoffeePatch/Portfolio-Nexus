import { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  scriptSrc: string;
  config: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Generic TradingView widget wrapper.
 * Injects the TradingView embed script into a container div.
 * Mounts once and cleans up on unmount.
 */
export const TradingViewWidget = memo(
  ({ scriptSrc, config, className = '', style }: TradingViewWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // Clear any previous content
      container.innerHTML = '';

      // Create the widget target div
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      widgetDiv.style.width = '100%';
      widgetDiv.style.height = '100%';
      container.appendChild(widgetDiv);

      // Inject the TradingView script
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify(config);
      container.appendChild(script);

      return () => {
        if (container) {
          container.innerHTML = '';
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        className={`tradingview-widget-container ${className}`}
        ref={containerRef}
        style={{ width: '100%', height: '100%', ...style }}
      />
    );
  }
);

TradingViewWidget.displayName = 'TradingViewWidget';
