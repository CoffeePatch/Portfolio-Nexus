type DuePayment = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  dueDate: string;
  status: "upcoming" | "due-soon" | "overdue";
  category: "property-tax" | "locker-fee" | "maintenance" | "insurance" | "other";
  icon: string;
  iconBg: string;
};

type PropertyDuesWidgetProps = {
  dues?: DuePayment[];
  isLoading?: boolean;
  onPaymentClick?: (dueId: string) => void;
  onViewAll?: () => void;
};

const defaultDues: DuePayment[] = [
  {
    id: "1",
    title: "Property Tax",
    subtitle: "Sunset Villa - Annual",
    amount: 12500,
    dueDate: "Dec 31, 2024",
    status: "due-soon",
    category: "property-tax",
    icon: "account_balance",
    iconBg: "bg-indigo-500",
  },
  {
    id: "2",
    title: "Bank Locker Fee",
    subtitle: "Gold Storage - Quarterly",
    amount: 850,
    dueDate: "Jan 15, 2025",
    status: "upcoming",
    category: "locker-fee",
    icon: "lock",
    iconBg: "bg-yellow-600",
  },
  {
    id: "3",
    title: "Maintenance Charge",
    subtitle: "Downtown Loft - Monthly",
    amount: 450,
    dueDate: "Jan 5, 2025",
    status: "upcoming",
    category: "maintenance",
    icon: "home_repair_service",
    iconBg: "bg-blue-500",
  },
  {
    id: "4",
    title: "Property Insurance",
    subtitle: "Beach House - Annual",
    amount: 3200,
    dueDate: "Feb 1, 2025",
    status: "upcoming",
    category: "insurance",
    icon: "shield",
    iconBg: "bg-emerald-500",
  },
];

const getStatusConfig = (status: DuePayment["status"]) => {
  switch (status) {
    case "overdue":
      return {
        badge: "Overdue",
        badgeClass: "bg-red-500/20 text-red-400 ring-1 ring-red-500/30",
        dateClass: "text-red-400",
      };
    case "due-soon":
      return {
        badge: "Due Soon",
        badgeClass: "bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/30",
        dateClass: "text-orange-400",
      };
    case "upcoming":
      return {
        badge: "Upcoming",
        badgeClass: "bg-slate-500/20 text-slate-400 ring-1 ring-slate-500/30",
        dateClass: "text-slate-400",
      };
  }
};

const SkeletonLoader = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex animate-pulse items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4"
      >
        <div className="h-12 w-12 rounded-xl bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-slate-800" />
          <div className="h-3 w-48 rounded bg-slate-800" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-4 w-20 rounded bg-slate-800" />
          <div className="h-3 w-16 rounded bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export const PropertyDuesWidget = ({
  dues = defaultDues,
  isLoading = false,
  onPaymentClick,
  onViewAll,
}: PropertyDuesWidgetProps) => {
  // Calculate summary
  const totalUpcoming = dues.reduce((sum, due) => sum + due.amount, 0);
  const dueSoonCount = dues.filter((d) => d.status === "due-soon").length;
  const overdueCount = dues.filter((d) => d.status === "overdue").length;

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 ring-1 ring-orange-500/30">
            <span
              className="material-symbols-outlined text-xl text-orange-400"
              style={{
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              calendar_month
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Upcoming Dues</h3>
            <p className="text-sm text-slate-400">
              {dues.length} scheduled payment{dues.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
          >
            View All →
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-800/30 p-3">
          <p className="text-xs font-medium text-slate-500">Total Upcoming</p>
          <p className="mt-1 text-lg font-bold text-white">
            ${totalUpcoming.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg bg-orange-500/10 p-3">
          <p className="text-xs font-medium text-orange-400">Due Soon</p>
          <p className="mt-1 text-lg font-bold text-orange-300">
            {dueSoonCount}
          </p>
        </div>
        <div className="rounded-lg bg-red-500/10 p-3">
          <p className="text-xs font-medium text-red-400">Overdue</p>
          <p className="mt-1 text-lg font-bold text-red-300">{overdueCount}</p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Dues List */}
          <div className="space-y-3">
            {dues.map((due) => {
              const statusConfig = getStatusConfig(due.status);
              return (
                <div
                  key={due.id}
                  onClick={() => onPaymentClick?.(due.id)}
                  className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={[
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-md transition-transform group-hover:scale-110",
                        due.iconBg,
                      ].join(" ")}
                    >
                      <span
                        className="material-symbols-outlined text-2xl text-white"
                        style={{
                          fontVariationSettings:
                            "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        {due.icon}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white">
                          {due.title}
                        </h4>
                        <span
                          className={[
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            statusConfig.badgeClass,
                          ].join(" ")}
                        >
                          {statusConfig.badge}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-slate-400">
                        {due.subtitle}
                      </p>
                    </div>

                    {/* Amount & Date */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        ${due.amount.toLocaleString()}
                      </p>
                      <p
                        className={[
                          "mt-1 text-xs font-medium",
                          statusConfig.dateClass,
                        ].join(" ")}
                      >
                        {due.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {dues.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                <span className="material-symbols-outlined text-4xl text-slate-500">
                  check_circle
                </span>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-slate-300">
                All Clear!
              </h4>
              <p className="text-sm text-slate-500">
                No upcoming dues at the moment
              </p>
            </div>
          )}

          {/* Action Button */}
          {dues.length > 0 && (
            <div className="mt-6">
              <button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-orange-500/20">
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">payments</span>
                  <span>Pay All Dues</span>
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyDuesWidget;
