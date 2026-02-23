import { Link } from "react-router-dom";

type EndpointItem = {
  label: string;
  to: string;
  icon: string;
  description: string;
};

const assetEndpoints: EndpointItem[] = [
  {
    label: "Stocks & ETF",
    to: "/stocks",
    icon: "trending_up",
    description: "Equity and ETF holdings",
  },
  {
    label: "Mutual Funds",
    to: "/mutual-funds",
    icon: "pie_chart",
    description: "Fund portfolio and analytics",
  },
  {
    label: "Crypto",
    to: "/crypto",
    icon: "currency_bitcoin",
    description: "Crypto asset tracking",
  },
  {
    label: "Fixed Deposits",
    to: "/fixed-deposits",
    icon: "savings",
    description: "FD and fixed-income instruments",
  },
  {
    label: "Gold & Silver",
    to: "/precious-metals",
    icon: "diamond",
    description: "Precious metals portfolio",
  },
  {
    label: "Real Estate",
    to: "/real-estate",
    icon: "apartment",
    description: "Property and real estate assets",
  },
];

const platformEndpoints: EndpointItem[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: "dashboard",
    description: "Portfolio overview",
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    icon: "account_balance",
    description: "Holdings and summary",
  },
  {
    label: "Expenses",
    to: "/expenses",
    icon: "payments",
    description: "Expense management",
  },
  {
    label: "Transactions",
    to: "/transactions",
    icon: "receipt_long",
    description: "Transaction records",
  },
  {
    label: "Analysis",
    to: "/analysis",
    icon: "analytics",
    description: "Insights and trends",
  },
  {
    label: "Market",
    to: "/market",
    icon: "monitoring",
    description: "Market data and movement",
  },
  {
    label: "Community",
    to: "/community",
    icon: "groups",
    description: "Community features",
  },
  {
    label: "Support",
    to: "/support",
    icon: "help",
    description: "Help and support center",
  },
];

const EndpointSection = ({
  title,
  items,
}: {
  title: string;
  items: EndpointItem[];
}) => (
  <section>
    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
      {title}
    </h2>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="group rounded-xl border border-slate-800 bg-black/60 p-4 transition-all hover:border-slate-600 hover:bg-slate-900/70"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-200">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
            >
              {item.icon}
            </span>
          </div>
          <p className="text-sm font-semibold text-white group-hover:text-slate-100">
            {item.label}
          </p>
          <p className="mt-1 text-xs text-slate-500">{item.description}</p>
          <p className="mt-3 text-xs text-slate-400">Endpoint: {item.to}</p>
        </Link>
      ))}
    </div>
  </section>
);

const Other = () => {
  return (
    <div className="min-h-screen bg-black px-6 py-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <header className="rounded-2xl border border-slate-800 bg-black p-6">
          <h1 className="text-2xl font-bold text-white">All Endpoints</h1>
          <p className="mt-2 text-sm text-slate-400">
            Quick navigation hub for all available routes, including endpoints that are easy to miss from header shortcuts.
          </p>
        </header>

        <EndpointSection title="Asset Endpoints" items={assetEndpoints} />
        <EndpointSection title="Platform Endpoints" items={platformEndpoints} />
      </div>
    </div>
  );
};

export default Other;
