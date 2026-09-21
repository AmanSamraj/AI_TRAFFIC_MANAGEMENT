import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { ToastProvider } from '../component/Toast';

export const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#060e1a] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Top Navbar */}
        <Navbar
          isSidebarOpen={isMobileSidebarOpen}
          onToggleSidebar={toggleMobileSidebar}
        />

        <div className="flex-1 flex w-full">
          {/* Left Navigation Sidebar */}
          <Sidebar
            isOpen={isMobileSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebarCollapse}
            onCloseMobile={closeMobileSidebar}
          />

          {/* Main Dashboard Content Area */}
          <main
            className={`flex-1 min-w-0 transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 mt-0 ${
              isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
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
