import type { BudgetCard } from '../../data/expenseDummyData';

interface BudgetStatusCardsProps {
  cards: BudgetCard[];
}

export const BudgetStatusCards = ({ cards }: BudgetStatusCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] p-6 shadow-2xl transition-all duration-300 hover:border-slate-700/50 hover:shadow-[0_0_30px_rgba(100,100,255,0.1)]"
        >
          {/* Icon Section */}
          <div className="flex items-start justify-between mb-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110`}>
              <span
                className="material-symbols-outlined text-3xl"
                style={{
                  fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48",
                  color: card.change > 0 ? '#10b981' : card.change < 0 ? '#ef4444' : '#3b82f6',
                }}
              >
                {card.icon}
              </span>
            </div>
            
            {/* Change Badge */}
            <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              card.change > 0 
                ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20' 
                : card.change < 0 
                ? 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20'
                : 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20'
            }`}>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                {card.change > 0 ? 'arrow_upward' : card.change < 0 ? 'arrow_downward' : 'remove'}
              </span>
              {Math.abs(card.change)}%
            </div>
          </div>

          {/* Title */}
          <div className="mb-2">
            <p className="text-sm font-medium text-slate-400">{card.title}</p>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <h3 className="text-3xl font-bold tracking-tight text-white">
              ₹{card.amount.toLocaleString('en-IN')}
            </h3>
          </div>

          {/* Mini Trend Chart */}
          <div className="flex items-end gap-1 h-12">
            {card.trend.map((value, i) => {
              const maxValue = Math.max(...card.trend);
              const height = (value / maxValue) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-300 hover:opacity-75"
                  style={{
                    height: `${height}%`,
                    background: card.change > 0 
                      ? 'linear-gradient(to top, #10b981, #34d399)' 
                      : card.change < 0 
                      ? 'linear-gradient(to top, #ef4444, #f87171)'
                      : 'linear-gradient(to top, #3b82f6, #60a5fa)',
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
