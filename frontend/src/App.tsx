import { useCallback, useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SideNav } from "./components/layout/SideNav";
import { HeaderBar } from "./components/layout/HeaderBar";
import { FloatingActionButton } from "./components/shared/FloatingActionButton";
import { AddTransactionModal } from "./components/modals/AddTransactionModal";
import { PageTransition } from "./components/layout/PageTransition";

// Gradient configurations for each route
const routeGradients: Record<string, string> = {
  '/stocks': `linear-gradient(90deg, #1e3a5f 0%, #2563eb 25%, #3b82f6 50%, #6366f1 75%, #1e1b4b 100%)`,
  '/mutual-funds': `linear-gradient(90deg, #A8C2AE 0%, #5EC5AD 12%, #2AA19B 25%, #306F77 37%, #675651 50%, #F44F2E 62%, #DC374A 75%, #75254E 87%, #241D3F 100%)`,
  '/crypto': `linear-gradient(90deg, #7c2d12 0%, #c2410c 25%, #f97316 50%, #fbbf24 75%, #422006 100%)`,
  '/expenses': `linear-gradient(90deg, #064e3b 0%, #047857 25%, #10b981 50%, #34d399 75%, #1e3a5f 100%)`,
  '/fixed-deposits': `linear-gradient(90deg, #78350f 0%, #b45309 25%, #f59e0b 50%, #fbbf24 75%, #451a03 100%)`,
};

export const App = () => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get gradient for current route
  const currentGradient = useMemo(() => {
    return routeGradients[location.pathname] || null;
  }, [location.pathname]);

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
      {/* Global Gradient Strip - Behind header */}
      {currentGradient && (
        <div 
          className="pointer-events-none fixed inset-x-0 top-0 transition-opacity duration-300"
          style={{
            height: 'calc(2in + 80px)',
            background: currentGradient,
            opacity: 0.85,
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          }}
        />
      )}
      
      {/* Header spans full width at the top */}
      <HeaderBar 
        onMenuClick={handleToggleSidebar} 
        onMobileMenuClick={handleToggleMobileNav}
        isSidebarOpen={!isSidebarCollapsed}
      />
      
      {/* Sidebar and main content below header */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        <SideNav 
          isMobileOpen={isMobileNavOpen} 
          onClose={handleCloseNav} 
          isCollapsed={isSidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-transparent">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
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
