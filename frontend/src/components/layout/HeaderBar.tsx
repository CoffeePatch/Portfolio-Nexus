import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type HeaderBarProps = {
  onMenuClick: () => void;
};

export const HeaderBar = ({ onMenuClick }: HeaderBarProps) => {
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
        <button
          type="button"
          onClick={onMenuClick}
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

        <div className="flex flex-1 items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-slate-700 bg-black px-4 py-2 text-sm text-slate-200">
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
              placeholder="Ask Nexus.ai anything"
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-black text-slate-300 transition hover:text-white"
              aria-label="View notifications"
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
                  d="M10 21h4m-7-6a7 7 0 0 1 14 0v2l1 1v1H6v-1l1-1v-2Zm3-7a2 2 0 1 1 4 0"
                />
              </svg>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-black px-3 py-2 transition hover:border-slate-600"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                  AL
                </div>
                <div className="hidden text-sm leading-tight sm:block">
                  <p className="font-semibold text-slate-100">Alyssa Stone</p>
                  <p className="text-xs text-slate-400">alyssa@stovest.ai</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4 text-slate-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-16 z-50 w-56 rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
                    <div className="p-2">
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                      >
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                          person
                        </span>
                        Profile Settings
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
      </div>
    </header>
  );
};

export default HeaderBar;
