import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  useToast
} from '../../component';
import {
  ShieldCheck,
  Check,
  X,
  Save,
  RotateCcw,
  Users,
  KeyRound
} from 'lucide-react';

// The 8 Granular Permissions specified by user
export const PERMISSIONS_LIST = [
  { id: 'view_cameras', label: 'View Cameras', category: 'Surveillance' },
  { id: 'view_anpr', label: 'View ANPR', category: 'ANPR & OCR' },
  { id: 'search_vehicles', label: 'Search Vehicles', category: 'Registry' },
  { id: 'view_tracking', label: 'View Tracking', category: 'Tracking' },
  { id: 'view_analytics', label: 'View Analytics', category: 'Intelligence' },
  { id: 'manage_cameras', label: 'Manage Cameras', category: 'Administration' },
  { id: 'manage_users', label: 'Manage Users', category: 'Administration' },
  { id: 'generate_reports', label: 'Generate Reports', category: 'Compliance' }
];

// Initial default RBAC mapping for the 5 User Roles
const INITIAL_ROLES_DATA = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Unrestricted superuser access to all telemetry, hardware provisioning, user accounts, and system configuration.',
    badgeVariant: 'danger',
    userCount: 3,
    permissions: {
      view_cameras: true,
      view_anpr: true,
      search_vehicles: true,
      view_tracking: true,
      view_analytics: true,
      manage_cameras: true,
      manage_users: true,
      generate_reports: true
    }
  },
  {
    id: 'traffic_police',
    name: 'Traffic Police',
    description: 'Enforcement authority managing active violations, vehicle interceptions, traffic tracking, and summons generation.',
    badgeVariant: 'warning',
    userCount: 14,
    permissions: {
      view_cameras: true,
      view_anpr: true,
      search_vehicles: true,
      view_tracking: true,
      view_analytics: true,
      manage_cameras: false,
      manage_users: false,
      generate_reports: true
    }
  },
  {
    id: 'operator',
    name: 'Operator',
    description: 'Surveillance console operator monitoring live CCTV feeds, ANPR match streams, and roadway congestion.',
    badgeVariant: 'info',
    userCount: 22,
    permissions: {
      view_cameras: true,
      view_anpr: true,
      search_vehicles: true,
      view_tracking: true,
      view_analytics: false,
      manage_cameras: false,
      manage_users: false,
      generate_reports: true
    }
  },
  {
    id: 'analyst',
    name: 'Analyst',
    description: 'Data intelligence specialist reviewing corridor density curves, violation trends, and generating periodic reports.',
    badgeVariant: 'purple',
    userCount: 6,
    permissions: {
      view_cameras: true,
      view_anpr: true,
      search_vehicles: true,
      view_tracking: true,
      view_analytics: true,
      manage_cameras: false,
      manage_users: false,
      generate_reports: true
    }
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only municipal partner access for executive dashboards, city overview map, and high-level traffic metrics.',
    badgeVariant: 'neutral',
    userCount: 8,
    permissions: {
      view_cameras: true,
      view_anpr: true,
      search_vehicles: false,
      view_tracking: false,
      view_analytics: true,
      manage_cameras: false,
      manage_users: false,
      generate_reports: false
    }
  }
];

export const AdminRoles = () => {
  const toast = useToast();
  const [rolesData, setRolesData] = useState(INITIAL_ROLES_DATA);
  const [hasChanges, setHasChanges] = useState(false);

  // Toggle individual permission for a role
  const handleTogglePermission = (roleId, permId) => {
    // Prevent unchecking everything for Admin
    if (roleId === 'admin' && permId === 'manage_users') {
      toast.addToast({
        type: 'warning',
        title: 'Safety Constraint',
        message: 'Admin must retain Manage Users privilege to prevent administrative lockout.'
      });
      return;
    }

    setRolesData((prev) =>
      prev.map((role) => {
        if (role.id === roleId) {
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [permId]: !role.permissions[permId]
            }
          };
        }
        return role;
      })
    );
    setHasChanges(true);
  };

  // Save changes handler
  const handleSaveChanges = () => {
    setHasChanges(false);
    toast.addToast({
      type: 'success',
      title: 'RBAC Policy Committed',
      message: 'Role permissions matrix synchronized across authentication nodes.'
    });
  };

  // Reset to default handler
  const handleResetDefaults = () => {
    setRolesData(INITIAL_ROLES_DATA);
    setHasChanges(false);
    toast.addToast({
      type: 'info',
      title: 'Permissions Restored',
      message: 'Default system RBAC permissions have been reapplied.'
    });
  };

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------------------
          Header Bar with SIH 2026 RBAC Status
      ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[var(--color-text)] tracking-tight">
                  Role-Based Access Control (RBAC) Matrix
                </h1>
                <Badge variant="purple" size="sm" dot={true}>
                  5 ROLES • 8 PERMISSIONS
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Granular security matrix governing operator authorities, law enforcement powers, and administrative control
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />}
            onClick={handleResetDefaults}
          >
            Reset Defaults
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          >
            {hasChanges ? 'Commit Changes' : 'Saved'}
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Role Definition Overview Cards
      ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {rolesData.map((role) => {
          const grantedCount = Object.values(role.permissions).filter(Boolean).length;
          return (
            <div
              key={role.id}
              className="p-3.5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant={role.badgeVariant} size="xs">
                    {role.name}
                  </Badge>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                    <Users className="w-3 h-3 text-[var(--color-amber)]" />
                    {role.userCount}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[var(--color-text-muted)]">Granted:</span>
                <span className="text-[var(--color-amber)] font-bold">
                  {grantedCount} / {PERMISSIONS_LIST.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* -------------------------------------------------------------
          Master Interactive Permissions Matrix Table
      ------------------------------------------------------------- */}
      <Card variant="default">
        <CardHeader className="p-4 border-b border-[var(--color-border)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--color-amber)]" />
              Granular Privilege Assignment Matrix
            </CardTitle>
            <CardDescription className="text-xs">
              Click any cell to toggle access permissions for that designated role
            </CardDescription>
          </div>
          {hasChanges && (
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg animate-pulse">
              ● Unsaved matrix modifications
            </span>
          )}
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4 min-w-[200px]">System Permission</th>
                <th className="p-4 min-w-[120px]">Category</th>
                {rolesData.map((role) => (
                  <th key={role.id} className="p-4 text-center min-w-[110px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[var(--color-text)] text-xs font-bold">{role.name}</span>
                      <Badge variant={role.badgeVariant} size="xs">
                        {role.userCount} Users
                      </Badge>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]/70">
              {PERMISSIONS_LIST.map((perm) => (
                <tr
                  key={perm.id}
                  className="hover:bg-[var(--color-background)]/40 transition-colors"
                >
                  <td className="p-4 font-semibold text-[var(--color-text)]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{perm.label}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--color-text-muted)] font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[var(--color-background)] text-[var(--color-text-secondary)]">
                      {perm.category}
                    </span>
                  </td>
                  {rolesData.map((role) => {
                    const isGranted = Boolean(role.permissions[perm.id]);
                    return (
                      <td key={role.id} className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePermission(role.id, perm.id)}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-xl border transition-all cursor-pointer ${
                            isGranted
                              ? 'bg-emerald-500/20 text-emerald-400 border-[rgba(25,135,84,0.3)] hover:bg-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.25)]'
                              : 'bg-[var(--color-charcoal)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-[var(--color-text-muted)] hover:border-[var(--color-border)]'
                          }`}
                          title={`${isGranted ? 'Revoke' : 'Grant'} ${perm.label} for ${role.name}`}
                        >
                          {isGranted ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <X className="w-3.5 h-3.5 opacity-60" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRoles;
