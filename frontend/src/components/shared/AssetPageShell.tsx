import { useState, type ReactNode } from 'react';
import { ExplorerToggle, type ActiveView } from './ExplorerToggle';

/**
 * Shared shell for every asset-class page.
 *
 * Simple conditional rendering — shows Explorer OR Portfolio.
 * The TradingViewPreloader (in App.tsx) ensures all TradingView
 * script files are already in the browser cache, so widget init
 * is as fast as the network allows (scripts come from cache).
 */

interface AssetPageShellProps {
  explorerView: ReactNode;
  portfolioView: ReactNode;
  explorerTitle: string;
  portfolioTitle: string;
  explorerSubtitle: string;
  portfolioSubtitle: string;
  defaultView?: ActiveView;
}

export const AssetPageShell = ({
  explorerView,
  portfolioView,
  explorerTitle,
  portfolioTitle,
  explorerSubtitle,
  portfolioSubtitle,
  defaultView = 'explorer',
}: AssetPageShellProps) => {
  const [view, setView] = useState<ActiveView>(defaultView);
  const isExplorer = view === 'explorer';

  return (
    <div className="min-h-screen">
      {/* ── Sticky header with toggle ───────────────────────── */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800/30 bg-black/60 px-6 py-3 backdrop-blur-lg">
        <div>
          <h1 className="text-lg font-bold text-slate-100">
            {isExplorer ? explorerTitle : portfolioTitle}
          </h1>
          <p className="text-[11px] text-slate-500">
            {isExplorer ? explorerSubtitle : portfolioSubtitle}
          </p>
        </div>
        <ExplorerToggle active={view} onChange={setView} />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      {isExplorer ? explorerView : portfolioView}
    </div>
  );
};
