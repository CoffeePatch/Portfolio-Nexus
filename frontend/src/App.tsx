import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "./components/layout/SideNav";
import { HeaderBar } from "./components/layout/HeaderBar";
import { FloatingActionButton } from "./components/shared/FloatingActionButton";
import { AddTransactionModal } from "./components/modals/AddTransactionModal";

export const App = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((prev) => !prev);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const handleCloseNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-slate-100">
      {/* Header spans full width at the top */}
      <HeaderBar 
        onMenuClick={handleToggleSidebar} 
        onMobileMenuClick={handleToggleMobileNav}
        isSidebarOpen={!isSidebarCollapsed}
      />
      
      {/* Sidebar and main content below header */}
      <div className="flex flex-1 overflow-hidden">
        <SideNav 
          isMobileOpen={isMobileNavOpen} 
          onClose={handleCloseNav} 
          isCollapsed={isSidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto bg-black">
          <Outlet />
        </main>
      </div>
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;
