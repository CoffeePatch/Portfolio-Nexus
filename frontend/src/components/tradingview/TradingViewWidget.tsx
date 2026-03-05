import { useEffect, useRef, useState, memo } from 'react';

interface TradingViewWidgetProps {
  scriptSrc: string;
  config: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Generic TradingView widget wrapper.
 * Uses IntersectionObserver to lazily inject the TradingView embed script
 * only when the widget scrolls near the viewport (200px margin).
 * This prevents 15+ heavy scripts from loading simultaneously on Explorer pages.
 */
export const TradingViewWidget = memo(
  ({ scriptSrc, config, className = '', style }: TradingViewWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Observe when the container is near the viewport
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Only need to trigger once
          }
        },
        { rootMargin: '200px' } // Start loading 200px before visible
      );

      observer.observe(container);
      return () => observer.disconnect();
    }, []);

    // Inject the TradingView script once visible
    useEffect(() => {
      if (!isVisible) return;

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
    }, [isVisible]);

    return (
      <div
        className={`tradingview-widget-container ${className}`}
        ref={containerRef}
        style={{ width: '100%', height: '100%', ...style }}
      >
        {/* Skeleton placeholder while waiting to enter viewport */}
        {!isVisible && (
          <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-slate-400" />
          </div>
        )}
      </div>
    );
  }
);

TradingViewWidget.displayName = 'TradingViewWidget';
