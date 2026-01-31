import { useAuth } from "../../providers/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

type HeaderBarProps = {
  onMenuClick: () => void;
  onMobileMenuClick?: () => void;
  isSidebarOpen?: boolean;
};

// Navigation items for header with icons
const headerNavItems = [
  { label: "Dashboard", to: "/", icon: "dashboard" },
  { label: "Expenses", to: "/expenses", icon: "payments" },
  { label: "Stocks & ETF", to: "/stocks", icon: "trending_up" },
  { label: "Mutual Funds", to: "/mutual-funds", icon: "pie_chart" },
  { label: "Crypto", to: "/crypto", icon: "currency_bitcoin" },
  { label: "Other", to: "/other", icon: "more_horiz" },
];

export const HeaderBar = ({ onMenuClick, onMobileMenuClick, isSidebarOpen = true }: HeaderBarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-black backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6">
        {/* Sidebar Toggle Button - Desktop */}
        <button
          type="button"
          onClick={onMenuClick}
          className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/50 bg-indigo-500/20 text-indigo-300 transition hover:bg-indigo-500/30 hover:text-white hover:border-indigo-400"
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
            {isSidebarOpen ? "menu_open" : "menu"}
          </span>
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMobileMenuClick || onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-black text-slate-300 transition hover:text-white lg:hidden"
          aria-label="Toggle navigation menu"
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
              d="M4 7h16M4 12h16M4 17h16"
            />
          </svg>
        </button>

        {/* PN Portfolio Nexus Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
            PN
          </div>
          <span className="hidden text-base font-semibold text-white sm:block">Portfolio Nexus</span>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium lg:flex">
          {headerNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-slate-400 hover:text-white hover:bg-slate-800",
                ].join(" ")
              }
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden min-w-[240px] items-center gap-3 rounded-full border border-slate-700 bg-black px-4 py-2 text-sm text-slate-200 sm:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.6-4.65a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0z"
              />
            </svg>
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-black text-slate-200 transition hover:border-slate-600"
              aria-label="My account"
            >
              <span className="material-symbols-outlined text-xl">account_circle</span>
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-xl">
                  <div className="p-2">
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                        person
                      </span>
                      My Account
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                        settings
                      </span>
                      Settings
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-500"
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                        logout
                      </span>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
