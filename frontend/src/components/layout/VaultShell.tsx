import { ReactNode, useState } from "react";
import { SideNav } from "./SideNav";
import { HeaderBar } from "./HeaderBar";

type VaultShellProps = {
  children: ReactNode;
  rightSidebarContent?: ReactNode;
  showRightSidebar?: boolean;
};

export const VaultShell = ({
  children,
  rightSidebarContent,
  showRightSidebar = true,
}: VaultShellProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const handleCloseNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-black text-slate-100">
      {/* Left Sidebar - Standard Portfolio Nexus Navigation */}
      <SideNav isMobileOpen={isMobileNavOpen} onClose={handleCloseNav} />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <HeaderBar onMenuClick={handleToggleNav} />
        <main className="flex flex-1 overflow-hidden">
          {/* Center Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>

          {/* Right Sidebar - Properties/Coins Listing */}
          {showRightSidebar && (
            <aside className="hidden w-80 border-l border-slate-800 bg-slate-950 lg:block">
              <div className="h-full overflow-y-auto p-6">
                {rightSidebarContent || (
                  <div className="text-center text-slate-500">
                    <p className="text-sm">No items to display</p>
                  </div>
                )}
              </div>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
};

export default VaultShell;
