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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(e.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1, type: 'danger',
      title: 'Overspeeding Alert',
      desc: 'Vehicle DL 01 AB 1234 reached 82 km/h on Ring Road',
      time: '2m ago',
      icon: <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-danger)' }} />
    },
    {
      id: 2, type: 'warning',
      title: 'Signal Violation Detected',
      desc: 'MH 12 CD 5678 jumped red light at Junction 4',
      time: '8m ago',
      icon: <Car className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
    },
    {
      id: 3, type: 'info',
      title: 'CAM-04 Reconnected',
      desc: 'CCTV Node 04 4K stream synchronized at 60 FPS',
      time: '15m ago',
      icon: <Camera className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
    }
  ];

  /* ── shared style objects ── */
  const navbarStyle = {
    background: 'var(--color-card)',
    borderBottom: '1px solid var(--color-border)',
  };

  const dropdownStyle = {
    background: 'var(--color-card)',
    border: '1px solid var(--color-border-dark)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  };

  return (
    <header
      className="sticky top-0 z-40 w-full h-14 px-4 sm:px-6 flex items-center justify-between gap-4"
      style={navbarStyle}
    >
      {/* LEFT: Hamburger + Logo */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-md transition-colors cursor-pointer lg:hidden"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-background)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-md font-black text-xs"
            style={{
              background: 'var(--color-amber)',
              color: 'var(--color-charcoal)',
            }}
          >
            <Activity className="w-4 h-4 stroke-[2.5]" />
          </div>

          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                Traffic<span style={{ color: 'var(--color-amber)' }}>AI</span>
              </span>
              <span
                className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest rounded"
                style={{
                  color: 'var(--color-amber-dark)',
                  background: 'rgba(245,166,35,0.12)',
                  border: '1px solid rgba(245,166,35,0.3)'
                }}
              >
                SIH
              </span>
            </div>
            <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
              Intelligent Command Center
            </span>
          </div>
        </div>
      </div>

      {/* CENTER: Search */}
      <div className="flex-1 max-w-md mx-2 sm:mx-6 hidden md:block">
        <SearchBar
          onSearch={onSearch}
          placeholder="Search plates, cameras, violations..."
          shortcut="⌘K"
          size="sm"
        />
      </div>

      {/* RIGHT: Status + Bell + Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* AI Online status */}
        <div
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium select-none"
          style={{
            background: 'rgba(25,135,84,0.08)',
            border: '1px solid rgba(25,135,84,0.2)',
            color: 'var(--color-success)'
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: 'var(--color-success)', animation: 'pulse-dot 2s infinite' }}
          />
          AI Engine Online
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
            className="relative p-2 rounded-md transition-colors cursor-pointer"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-background)'; e.currentTarget.style.color = 'var(--color-text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
            aria-label="View notifications"
          >
            <Bell className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: 'var(--color-danger)', border: '2px solid var(--color-card)' }}
            />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 z-50 p-0 overflow-hidden" style={dropdownStyle}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Notifications</h4>
                  <Badge variant="danger" size="sm">3 New</Badge>
                </div>
                <button type="button" className="text-xs font-medium cursor-pointer" style={{ color: 'var(--color-amber-dark)' }}>
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-background)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="shrink-0 mt-0.5 p-1.5 rounded-md" style={{ background: 'var(--color-background)' }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold truncate" style={{ color: 'var(--color-text)' }}>{item.title}</span>
                        <span className="text-[10px] whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{item.time}</span>
                      </div>
                      <p className="text-[11px] mt-0.5 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2.5 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
                <a href="/alerts" className="text-xs font-semibold" style={{ color: 'var(--color-amber-dark)' }}>
                  View All Alerts →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all cursor-pointer"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-background)'
            }}
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
            {/* Avatar */}
            <div
              className="w-6 h-6 rounded flex items-center justify-center font-bold text-[10px]"
              style={{ background: 'var(--color-amber)', color: 'var(--color-charcoal)' }}
            >
              AS
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{userName}</span>
              <span className="text-[10px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>Admin</span>
            </div>
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform duration-200"
              style={{ color: 'var(--color-text-muted)', transform: isProfileOpen ? 'rotate(180deg)' : 'none' }}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 z-50 overflow-hidden" style={dropdownStyle}>
              <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{userName}</p>
                <p className="text-[11px] mt-0.5 flex items-center gap-1" style={{ color: 'var(--color-amber-dark)' }}>
                  <Shield className="w-3 h-3" />
                  {userRole}
                </p>
              </div>

              <div className="py-1">
                {[
                  { icon: <User className="w-3.5 h-3.5" />, label: 'Operator Profile' },
                  { icon: <Activity className="w-3.5 h-3.5" />, label: 'Activity Logs' },
                  { icon: <Settings className="w-3.5 h-3.5" />, label: 'System Preferences' }
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    className="w-full px-3 py-2 flex items-center gap-2.5 text-xs transition-colors cursor-pointer text-left"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-background)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                  >
                    <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              <div className="py-1" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-2.5 text-xs transition-colors cursor-pointer text-left font-medium"
                  style={{ color: 'var(--color-danger)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(220,53,69,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
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
