import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  KeyRound,
  Lock,
  Unlock,
  ShieldCheck
} from 'lucide-react';
import { Badge } from './Badge';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from './Toast';

export const Sidebar = ({
  isOpen = true,
  isCollapsed = false,
  onToggleCollapse,
  onCloseMobile
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAdminUnlocked, unlockAdmin, lockAdmin } = useAdminAuth();
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const mainNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
    {
      to: '/anpr', label: 'ANPR', icon: <ScanLine className="w-4 h-4 shrink-0" />,
      badge: <Badge variant="danger" size="sm" dot={true} pulse={true}>LIVE</Badge>
    },
    { to: '/cameras', label: 'Cameras', icon: <Video className="w-4 h-4 shrink-0" />, count: '48' },
    { to: '/vehicles', label: 'Vehicles', icon: <Car className="w-4 h-4 shrink-0" /> },
    { to: '/tracking', label: 'Tracking', icon: <Navigation className="w-4 h-4 shrink-0" /> },
    { to: '/traffic', label: 'Traffic Map', icon: <Map className="w-4 h-4 shrink-0" /> },
    { to: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4 shrink-0" /> },
    {
      to: '/alerts', label: 'Alerts', icon: <AlertTriangle className="w-4 h-4 shrink-0" />,
      badge: <Badge variant="warning" size="sm">14</Badge>
    },
    { to: '/violations', label: 'Violations', icon: <ShieldAlert className="w-4 h-4 shrink-0" /> },
    { to: '/reports', label: 'Reports', icon: <FileText className="w-4 h-4 shrink-0" /> }
  ];

  const adminNavItems = [
    { to: '/admin/users', label: 'User Accounts', icon: <Users className="w-4 h-4 shrink-0" /> },
    { to: '/admin/roles', label: 'Role Permissions', icon: <KeyRound className="w-4 h-4 shrink-0" /> },
    { to: '/admin/cameras', label: 'Hardware Provision', icon: <Sliders className="w-4 h-4 shrink-0" /> },
    { to: '/admin/settings', label: 'Global Settings', icon: <Settings className="w-4 h-4 shrink-0" /> }
  ];

  const handleSidebarUnlock = (e) => {
    e.preventDefault();
    const res = unlockAdmin(passwordInput);
    if (res.success) {
      setErrorMsg('');
      setPasswordInput('');
      toast.addToast({
        type: 'success',
        title: 'Admin Access Unlocked',
        message: 'Administration routes are now active.'
      });
    } else {
      setErrorMsg('Incorrect Password');
      toast.addToast({
        type: 'danger',
        title: 'Authentication Failed',
        message: 'Please enter the correct admin passcode to continue.'
      });
    }
  };

  const handleAdminNavClick = (e, item) => {
    if (!isAdminUnlocked) {
      e.preventDefault();
      toast.addToast({
        type: 'warning',
        title: 'Admin Area Locked',
        message: 'Please enter the admin passcode in the sidebar to unlock.'
      });
    } else {
      onCloseMobile?.();
    }
  };

  const renderLink = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={onCloseMobile}
      title={isCollapsed ? item.label : undefined}
      className="block"
    >
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer relative ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
          style={
            isActive
              ? {
                  background: 'var(--color-amber)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 600
                }
              : {
                  color: 'var(--sidebar-text)',
                }
          }
          onMouseEnter={(e) => {
            if (!isActive) e.currentTarget.style.background = 'var(--sidebar-bg-hover)';
          }}
          onMouseLeave={(e) => {
            if (!isActive) e.currentTarget.style.background = 'transparent';
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span style={{ color: isActive ? 'var(--color-charcoal)' : 'var(--sidebar-text)', opacity: isActive ? 1 : 0.8 }}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="truncate tracking-wide">{item.label}</span>
            )}
          </div>

          {!isCollapsed && (
            <div className="shrink-0 flex items-center gap-1.5">
              {item.badge}
              {item.count && (
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    color: isActive ? 'var(--color-charcoal)' : 'var(--sidebar-muted)',
                    background: isActive ? 'rgba(28,28,26,0.15)' : 'rgba(255,255,255,0.06)'
                  }}
                >
                  {item.count}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </NavLink>
  );

  const renderAdminLink = (item) => (
    <NavLink
      key={item.to}
      to={isAdminUnlocked ? item.to : '#'}
      onClick={(e) => handleAdminNavClick(e, item)}
      title={isCollapsed ? item.label : undefined}
      className="block"
    >
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer relative ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
          style={
            isActive && isAdminUnlocked
              ? {
                  background: 'var(--color-amber)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 600
                }
              : {
                  color: isAdminUnlocked ? 'var(--sidebar-text)' : 'rgba(255,255,255,0.4)',
                }
          }
          onMouseEnter={(e) => {
            if (!isActive && isAdminUnlocked) e.currentTarget.style.background = 'var(--sidebar-bg-hover)';
          }}
          onMouseLeave={(e) => {
            if (!isActive) e.currentTarget.style.background = 'transparent';
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span style={{ color: isActive && isAdminUnlocked ? 'var(--color-charcoal)' : 'inherit', opacity: isAdminUnlocked ? 0.8 : 0.4 }}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="truncate tracking-wide">{item.label}</span>
            )}
          </div>

          {!isCollapsed && (
            <div className="shrink-0 flex items-center">
              {!isAdminUnlocked && (
                <Lock className="w-3 h-3 text-[var(--sidebar-muted)] opacity-60" />
              )}
            </div>
          )}
        </div>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(28,28,26,0.5)' }}
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-[72px]' : 'w-64'}`}
        style={{
          background: 'var(--sidebar-bg)',
          borderRight: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        {/* Nav Links Container */}
        <div className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
          {/* Main Operational Links */}
          {mainNavItems.map(renderLink)}

          {/* ─── ADMINISTRATION SECTION WITH AMAN@1234 PASSWORD AUTH ─── */}
          <div className="pt-4 mt-2" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
            {!isCollapsed ? (
              <div className="px-3 pb-2 flex items-center justify-between">
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5"
                  style={{ color: 'var(--sidebar-muted)' }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                  Administration
                </span>

                {isAdminUnlocked ? (
                  <button
                    onClick={lockAdmin}
                    className="text-[10px] text-[var(--color-success)] hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
                    title="Click to lock admin session"
                  >
                    <Unlock className="w-3 h-3" />
                    Unlocked
                  </button>
                ) : (
                  <span className="text-[10px] text-[var(--sidebar-muted)] flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3 text-[var(--color-amber)]" />
                    Locked
                  </span>
                )}
              </div>
            ) : (
              <div className="flex justify-center pb-2">
                {isAdminUnlocked ? (
                  <Unlock className="w-3.5 h-3.5 text-[var(--color-success)]" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                )}
              </div>
            )}

            {/* Inline Password Unlock Box in Sidebar when Locked */}
            {!isAdminUnlocked && !isCollapsed && (
              <form onSubmit={handleSidebarUnlock} className="mx-2 mb-2.5 p-2 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="Enter admin passcode"
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[var(--color-amber)] font-mono"
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] text-[var(--color-charcoal)] font-bold text-[10px] rounded transition-all cursor-pointer shrink-0"
                  >
                    Unlock
                  </button>
                </div>
                {errorMsg && (
                  <span className="text-[9px] text-[var(--color-danger)] block">{errorMsg}</span>
                )}
              </form>
            )}

            {/* Admin Nav Items (User Accounts, Role Permissions, Hardware Provision, Global Settings) */}
            <div className="space-y-0.5">
              {adminNavItems.map(renderAdminLink)}
            </div>
          </div>
        </div>

        {/* AI Telemetry Widget */}
        {!isCollapsed && (
          <div
            className="mx-2.5 mb-2 px-3 py-2.5 rounded-md text-xs"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)'
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-[10px] uppercase tracking-wider" style={{ color: 'var(--sidebar-muted)' }}>
                <Cpu className="w-3 h-3" style={{ color: 'var(--color-amber)' }} />
                Edge YOLOv8
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: 'var(--color-success)' }}>
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: 'var(--color-success)', animation: 'pulse-dot 2s infinite' }}
                />
                60 FPS
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span style={{ color: 'var(--sidebar-muted)' }}>Latency</span>
              <span style={{ color: 'var(--color-amber)' }}>14 ms</span>
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <div
          className="p-2.5 hidden lg:flex items-center justify-between"
          style={{ borderTop: '1px solid var(--sidebar-border)' }}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--sidebar-muted)' }}>
              <Radio className="w-3.5 h-3.5" style={{ color: 'var(--color-amber)' }} />
              <span>SIH 2026 Core</span>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${isCollapsed ? 'mx-auto' : ''}`}
            style={{ color: 'var(--sidebar-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--color-amber)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sidebar-muted)'; }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar width"
          >
            {isCollapsed
              ? <ChevronRight className="w-4 h-4" />
              : <ChevronLeft className="w-4 h-4" />
            }
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
