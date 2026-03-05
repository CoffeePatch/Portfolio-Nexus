/**
 * Reusable card wrapper for TradingView widget sections.
 * Provides consistent glass-card styling across all Explorer views.
 */

interface WidgetSectionProps {
  title: string;
  subtitle?: string;
  icon: string;
  accentFrom?: string; // gradient start color class
  accentTo?: string;   // gradient end color class
  children: React.ReactNode;
  className?: string;
}

export const WidgetSection = ({
  title,
  subtitle,
  icon,
  accentFrom = 'from-indigo-500/20',
  accentTo = 'to-purple-500/20',
  children,
  className = '',
}: WidgetSectionProps) => (
  <section
    className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] shadow-2xl ${className}`}
  >
    {/* Hover shimmer */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-purple-500/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    <div className="relative p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentFrom} ${accentTo} ring-1 ring-white/10`}
        >
          <span
            className="material-symbols-outlined text-lg text-white/80"
            style={{
              fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
            }}
          >
            {icon}
          </span>
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-tight text-white">{title}</h2>
          {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
        </div>
      </div>

      {children}
    </div>
  </section>
);
