import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { ToastProvider } from '../component/Toast';

export const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar  = () => setIsMobileSidebarOpen(false);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}>
        <Navbar
          isSidebarOpen={isMobileSidebarOpen}
          onToggleSidebar={toggleMobileSidebar}
        />

        <div className="flex-1 flex w-full">
          <Sidebar
            isOpen={isMobileSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebarCollapse}
            onCloseMobile={closeMobileSidebar}
          />

          {/* Main Content Area */}
          <main
            className={`flex-1 min-w-0 transition-all duration-300 ease-in-out p-5 sm:p-6 lg:p-7 ${
              isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default DashboardLayout;
