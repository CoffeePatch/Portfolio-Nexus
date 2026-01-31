type AssetAction = {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  category: "crypto" | "property" | "gold" | "other";
  onClick?: () => void;
};

type QuickAssetActionsProps = {
  actions?: AssetAction[];
  onActionClick?: (actionId: string, category: string) => void;
};

const defaultActions: AssetAction[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "currency_bitcoin",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
    category: "crypto",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "currency_exchange",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    category: "crypto",
  },
  {
    id: "property1",
    name: "Sunset Villa",
    icon: "home",
    iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    category: "property",
  },
  {
    id: "property2",
    name: "Downtown",
    icon: "apartment",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    category: "property",
  },
  {
    id: "gold",
    name: "Gold Bars",
    icon: "stacks",
    iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
    category: "gold",
  },
  {
    id: "silver",
    name: "Silver",
    icon: "copyright",
    iconBg: "bg-gradient-to-br from-slate-400 to-slate-500",
    category: "other",
  },
];

export const QuickAssetActions = ({
  actions = defaultActions,
  onActionClick,
}: QuickAssetActionsProps) => {
  const handleActionClick = (action: AssetAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (onActionClick) {
      onActionClick(action.id, action.category);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
            <span
              className="material-symbols-outlined text-xl text-indigo-400"
              style={{
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              bolt
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Quick Actions</h3>
            <p className="text-sm text-slate-400">Access your assets</p>
          </div>
        </div>
        <button className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300">
          View All →
        </button>
      </div>

      {/* Asset Action Circles */}
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
        {actions.map((action) => (
          <div
            key={action.id}
            className="flex flex-col items-center gap-2"
          >
            <button
              onClick={() => handleActionClick(action)}
              className="group relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl"
            >
              {/* Gradient Background */}
              <div
                className={[
                  "absolute inset-0 rounded-full transition-all",
                  action.iconBg,
                  "group-hover:scale-110",
                ].join(" ")}
              />

              {/* Icon */}
              <span
                className="material-symbols-outlined relative z-10 text-3xl text-white transition-transform group-hover:scale-110"
                style={{
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                }}
              >
                {action.icon}
              </span>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 blur-md transition-opacity group-hover:opacity-20" />
            </button>

            {/* Label */}
            <p className="text-center text-xs font-medium text-slate-300 transition-colors group-hover:text-white">
              {action.name}
            </p>
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="mt-6 rounded-lg border border-slate-800/50 bg-slate-800/20 px-4 py-3">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="material-symbols-outlined text-base">info</span>
          <p className="text-xs">
            Tap any asset to view details, transaction history, or manage settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickAssetActions;
