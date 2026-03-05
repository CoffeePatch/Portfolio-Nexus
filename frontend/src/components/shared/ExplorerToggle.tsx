/**
 * Shared minimal toggle switch for Explorer / My Portfolio views.
 * Used across Dashboard, Stocks, Crypto, MutualFunds, PreciousMetals, etc.
 *
 * This is a small, professional iOS-style toggle — not bulky buttons.
 */

export type ActiveView = 'explorer' | 'portfolio';

interface ExplorerToggleProps {
  active: ActiveView;
  onChange: (view: ActiveView) => void;
}

export const ExplorerToggle = ({ active, onChange }: ExplorerToggleProps) => {
  const isExplorer = active === 'explorer';

  return (
    <div className="flex items-center gap-2.5">
      {/* Label */}
      <span
        className={`text-[11px] font-semibold tracking-wide transition-colors ${
          !isExplorer ? 'text-slate-300' : 'text-slate-500'
        }`}
      >
        Portfolio
      </span>

      {/* Toggle track */}
      <button
        type="button"
        role="switch"
        aria-checked={isExplorer}
        onClick={() => onChange(isExplorer ? 'portfolio' : 'explorer')}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
          border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-indigo-500/50
          ${
            isExplorer
              ? 'border-indigo-500/40 bg-indigo-500/20 shadow-inner shadow-indigo-500/10'
              : 'border-slate-600 bg-slate-800 shadow-inner shadow-black/30'
          }
        `}
      >
        {/* Sliding knob */}
        <span
          className={`
            pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg
            ring-0 transition-all duration-300
            ${
              isExplorer
                ? 'translate-x-[22px] bg-gradient-to-br from-indigo-400 to-purple-500'
                : 'translate-x-[3px] bg-slate-400'
            }
          `}
        />
      </button>

      {/* Label */}
      <span
        className={`text-[11px] font-semibold tracking-wide transition-colors ${
          isExplorer ? 'text-indigo-300' : 'text-slate-500'
        }`}
      >
        Explorer
      </span>

      {/* Live dot when Explorer is active */}
      {isExplorer && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
      )}
    </div>
  );
};
