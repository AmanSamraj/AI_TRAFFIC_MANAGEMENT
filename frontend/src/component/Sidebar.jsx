import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  Video,
  Car,
  Navigation,
  Map,
  BarChart3,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Settings,
  Users,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Radio,
  SlidersHorizontal
} from 'lucide-react';
import { Badge } from './Badge';

export const Sidebar = ({
  isOpen = true,
  isCollapsed = false,
  onToggleCollapse,
  onCloseMobile
}) => {
  const mainNavItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />
    },
    {
      to: '/anpr',
      label: 'ANPR',
      icon: <ScanLine className="w-4 h-4 shrink-0" />,
      badge: (
        <Badge variant="danger" size="sm" dot={true} pulse={true}>
          LIVE
        </Badge>
      )
    },
    {
      to: '/cameras',
      label: 'Cameras',
      icon: <Video className="w-4 h-4 shrink-0" />,
      count: '48'
    },
    {
      to: '/vehicles',
      label: 'Vehicles',
      icon: <Car className="w-4 h-4 shrink-0" />
    },
    {
      to: '/tracking',
      label: 'Tracking',
      icon: <Navigation className="w-4 h-4 shrink-0" />
    },
    {
      to: '/traffic',
      label: 'Traffic Map',
      icon: <Map className="w-4 h-4 shrink-0" />
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4 shrink-0" />
    },
    {
      to: '/alerts',
      label: 'Alerts',
      icon: <AlertTriangle className="w-4 h-4 shrink-0" />,
      badge: (
        <Badge variant="warning" size="sm">
          14
        </Badge>
      )
    },
    {
      to: '/violations',
      label: 'Violations',
      icon: <ShieldAlert className="w-4 h-4 shrink-0" />
    },
    {
      to: '/reports',
      label: 'Reports',
      icon: <FileText className="w-4 h-4 shrink-0" />
    }
  ];

  const adminNavItems = [
    {
      to: '/admin/users',
      label: 'User Accounts',
      icon: <Users className="w-4 h-4 shrink-0" />
    },
    {
      to: '/admin/cameras',
      label: 'Hardware Provision',
      icon: <Sliders className="w-4 h-4 shrink-0" />
    },
    {
      to: '/admin/settings',
      label: 'Global Settings',
      icon: <Settings className="w-4 h-4 shrink-0" />
    }
  ];

  const renderLink = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={onCloseMobile}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group relative cursor-pointer ${
          isActive
            ? 'bg-cyan-500/15 text-cyan-300 font-semibold shadow-inner border border-cyan-500/30'
            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850/80 border border-transparent'
        } ${isCollapsed ? 'justify-center px-0' : 'justify-between'}`
      }
      title={isCollapsed ? item.label : undefined}
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`transition-colors ${
                isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
              }`}
            >
              {item.icon}
            </span>

            {!isCollapsed && <span className="truncate tracking-wide">{item.label}</span>}
          </div>

          {!isCollapsed && (
            <div className="shrink-0 flex items-center gap-1.5">
              {item.badge}
              {item.count && (
                <span className="text-[10px] font-mono text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
                  {item.count}
                </span>
              )}
            </div>
          )}

          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 flex flex-col bg-[#070e1c] border-r border-slate-800/80 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
          {/* Main Navigation */}
          {mainNavItems.map(renderLink)}

          {/* Admin Management Section */}
          <div className="pt-3 mt-3 border-t border-slate-800/80">
            {!isCollapsed && (
              <span className="block px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Administration
              </span>
            )}
            {adminNavItems.map(renderLink)}
          </div>
        </div>

        {/* AI TELEMETRY STATUS CARD */}
        {!isCollapsed && (
          <div className="p-2.5 mx-3 mb-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Edge YOLOv8
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                60 FPS
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
              <span className="text-slate-500">Latency:</span>
              <span className="text-cyan-300">14 ms</span>
            </div>
          </div>
        )}

        {/* FOOTER: Collapse Toggle */}
        <div className="p-2.5 border-t border-slate-800/80 hidden lg:flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>SIH 2026 Core</span>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            className={`p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ${
              isCollapsed ? 'mx-auto' : ''
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar width"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
