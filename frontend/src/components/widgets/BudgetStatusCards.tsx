import type { BudgetCard } from '../../data/expenseDummyData';

interface BudgetStatusCardsProps {
  cards: BudgetCard[];
}

export const BudgetStatusCards = ({ cards }: BudgetStatusCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/10"
        >
          {/* Icon Section */}
          <div className="flex items-start justify-between mb-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105`}>
              <span
                className="material-symbols-outlined text-2xl"
                style={{
                  fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                  color: card.change > 0 ? '#10b981' : card.change < 0 ? '#ef4444' : '#3b82f6',
                }}
              >
                {card.icon}
              </span>
            </div>
            
            {/* Change Badge */}
            <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              card.change > 0 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : card.change < 0 
                ? 'bg-red-500/10 text-red-400'
                : 'bg-blue-500/10 text-blue-400'
            }`}>
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                {card.change > 0 ? 'arrow_upward' : card.change < 0 ? 'arrow_downward' : 'remove'}
              </span>
              {Math.abs(card.change).toFixed(1)}%
            </div>
          </div>

          {/* Title */}
          <p className="text-xs font-medium text-slate-400 mb-1">{card.title}</p>

          {/* Amount */}
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
            ₹{card.amount.toLocaleString('en-IN')}
          </h3>

          {/* Mini Trend Chart */}
          <div className="flex items-end gap-0.5 h-8">
            {card.trend.map((value, i) => {
              const maxValue = Math.max(...card.trend);
              const height = (value / maxValue) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-300"
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
