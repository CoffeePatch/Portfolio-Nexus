import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/", icon: "dashboard" },
  { label: "Expenses", to: "/expenses", icon: "payments" },
  { label: "Stocks & ETF", to: "/stocks", icon: "trending_up" },
  { label: "Mutual Funds", to: "/mutual-funds", icon: "pie_chart" },
  { label: "Crypto", to: "/crypto", icon: "currency_bitcoin" },
  { label: "Fixed Deposits", to: "/fixed-deposits", icon: "savings" },
  { label: "Gold & Silver", to: "/precious-metals", icon: "diamond" },
  { label: "Real Estate", to: "/real-estate", icon: "apartment" },
  { label: "Other", to: "/other", icon: "more_horiz" },
];

const toolsItems = [
  { label: "Portfolio", to: "/portfolio", icon: "account_balance" },
  { label: "Transactions", to: "/transactions", icon: "receipt_long" },
  { label: "Analysis", to: "/analysis", icon: "analytics" },
  { label: "Market", to: "/market", icon: "monitoring" },
];

const supportItems = [
  { label: "Community", to: "/community", icon: "groups" },
  { label: "Help & Support", to: "/support", icon: "help" },
];

type SideNavProps = {
  isMobileOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
};

const navLinkBase =
  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors";

const navLinkActive =
  "bg-indigo-500/20 text-indigo-200 ring-1 ring-inset ring-indigo-400";

const navLinkInactive = "text-slate-300 hover:bg-slate-800 hover:text-white";

const NavSectionTitle = ({ title }: { title: string }) => (
  <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
    {title}
  </p>
);

export const SideNav = ({ isMobileOpen, onClose, isCollapsed = false }: SideNavProps) => {
  return (
    <>
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-black backdrop-blur-xl transition-all duration-300 ease-in-out",
          "lg:relative lg:z-auto lg:flex lg:bg-black lg:transform-none",
          isCollapsed ? "lg:w-0 lg:overflow-hidden lg:opacity-0 lg:p-0" : "lg:w-64 lg:opacity-100",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <nav className="flex h-full w-64 flex-col justify-between px-6 py-8">
          <div>
            <NavSectionTitle title="Main" />
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      navLinkBase,
                      isActive ? navLinkActive : navLinkInactive,
                    ].join(" ")
                  }
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-6">
              <NavSectionTitle title="Tools" />
              <div className="space-y-1">
                {toolsItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        navLinkBase,
                        isActive ? navLinkActive : navLinkInactive,
                      ].join(" ")
                    }
                    onClick={onClose}
                  >
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <NavSectionTitle title="Support" />
            <div className="space-y-1">
              {supportItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      navLinkBase,
                      isActive ? navLinkActive : navLinkInactive,
                    ].join(" ")
                  }
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <button
          type="button"
          aria-label="Close navigation"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:text-white lg:hidden"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        </button>
      </div>

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Dismiss navigation overlay"
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default SideNav;
