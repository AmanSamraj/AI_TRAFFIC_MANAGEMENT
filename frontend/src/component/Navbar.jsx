import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  Shield,
  Activity,
  User,
  Settings,
  LogOut,
  AlertTriangle,
  Car,
  Camera,
  Menu,
  X
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Badge } from './Badge';

export const Navbar = ({
  onToggleSidebar,
  isSidebarOpen = true,
  onSearch,
  userName = 'Aman Samraj',
  userRole = 'Chief Traffic Controller'
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'danger',
      title: 'Overspeeding Alert',
      desc: 'Vehicle DL 01 AB 1234 reached 82 km/h on Ring Road',
      time: '2m ago',
      icon: <AlertTriangle className="w-4 h-4 text-red-400" />
    },
    {
      id: 2,
      type: 'warning',
      title: 'Signal Violation Detected',
      desc: 'MH 12 CD 5678 jumped red light at Junction 4',
      time: '8m ago',
      icon: <Car className="w-4 h-4 text-amber-400" />
    },
    {
      id: 3,
      type: 'info',
      title: 'CAM-04 Reconnected',
      desc: 'CCTV Node 04 4K stream synchronized at 60 FPS',
      time: '15m ago',
      icon: <Camera className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#070e1c]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* LEFT SECTION: Hamburger Toggle + Logo */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/70 transition-colors cursor-pointer lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20 border border-cyan-400/40">
            <Activity className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>

          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-wider text-white uppercase">
                TRAFFIC<span className="text-cyan-400">AI</span>
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold tracking-widest text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 rounded">
                SIH
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 tracking-tight">
              Intelligent Command Center
            </span>
          </div>
        </div>
      </div>

      {/* CENTER SECTION: Global Search */}
      <div className="flex-1 max-w-md mx-2 sm:mx-6 hidden md:block">
        <SearchBar
          onSearch={onSearch}
          placeholder="Search plates, cameras, violations, road nodes..."
          shortcut="⌘K"
          size="sm"
        />
      </div>

      {/* RIGHT SECTION: Telemetry status + Notification Bell + Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Live Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] text-slate-300 font-medium select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-wide">AI Engine Online</span>
        </div>

        {/* NOTIFICATIONS DROPDOWN */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-slate-700"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl shadow-black/60 p-4 text-xs z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-100 text-sm">Notifications</h4>
                  <Badge variant="danger" size="sm" pill={true}>
                    3 New
                  </Badge>
                </div>
                <button
                  type="button"
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto my-2">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="py-2.5 px-1.5 flex items-start gap-3 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="shrink-0 p-1.5 rounded-lg bg-slate-800/80 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-slate-200 truncate">{item.title}</span>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-center">
                <a
                  href="/alerts"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-block"
                >
                  View All Telemetry Alerts →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ADMIN PROFILE DROPDOWN */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 transition-all cursor-pointer"
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-slate-950 font-extrabold text-xs shadow-md">
              AS
            </div>

            {/* Name & Role */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-200 leading-tight">
                {userName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-tight">
                Admin
              </span>
            </div>

            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180 text-cyan-400' : ''
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl shadow-black/60 p-2 text-xs z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="font-semibold text-slate-200">{userName}</p>
                <p className="text-[11px] text-cyan-400 flex items-center gap-1 mt-0.5">
                  <Shield className="w-3 h-3" />
                  {userRole}
                </p>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-left"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Operator Profile</span>
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-left"
                >
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  <span>Activity Logs</span>
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>System Preferences</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <button
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
