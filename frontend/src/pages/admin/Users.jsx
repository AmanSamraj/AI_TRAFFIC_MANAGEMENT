import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Badge,
  Button,
  SearchBar,
  Dropdown,
  Table,
  Modal,
  useToast
} from '../../component';
import {
  Users as UsersIcon,
  UserPlus,
  Check
} from 'lucide-react';
import { PERMISSIONS_LIST } from './AdminRoles';

export const Users = () => {
  const toast = useToast();

  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Traffic Police');
  const [newUserBadge, setNewUserBadge] = useState('');

  // Initial user list covering all 5 roles
  const [officers, setOfficers] = useState([
    {
      id: 'USR-01',
      name: 'Aman Samraj',
      email: 'aman.samraj@traffic.gov.in',
      role: 'Admin',
      roleVariant: 'danger',
      badge: 'DEL-HQ-001',
      status: 'Active',
      lastLogin: '2 mins ago',
      permissionsCount: 8
    },
    {
      id: 'USR-02',
      name: 'Inspector Vikram Sharma',
      email: 'v.sharma@traffic.gov.in',
      role: 'Traffic Police',
      roleVariant: 'warning',
      badge: 'DEL-PCR-14',
      status: 'Active',
      lastLogin: '18 mins ago',
      permissionsCount: 6
    },
    {
      id: 'USR-03',
      name: 'Priya Nair',
      email: 'p.nair@traffic.gov.in',
      role: 'Operator',
      roleVariant: 'info',
      badge: 'DEL-OPS-08',
      status: 'Active',
      lastLogin: '1 hour ago',
      permissionsCount: 5
    },
    {
      id: 'USR-04',
      name: 'Dr. Arjun Verma',
      email: 'a.verma@traffic.gov.in',
      role: 'Analyst',
      roleVariant: 'purple',
      badge: 'DEL-DATA-03',
      status: 'Active',
      lastLogin: '3 hours ago',
      permissionsCount: 6
    },
    {
      id: 'USR-05',
      name: 'Sunita Rao',
      email: 's.rao@traffic.gov.in',
      role: 'Viewer',
      roleVariant: 'neutral',
      badge: 'DEL-AUDIT-12',
      status: 'Active',
      lastLogin: 'Yesterday',
      permissionsCount: 3
    },
    {
      id: 'USR-06',
      name: 'Sub-Inspector Rohit Das',
      email: 'r.das@traffic.gov.in',
      role: 'Traffic Police',
      roleVariant: 'warning',
      badge: 'DEL-PCR-22',
      status: 'Offline',
      lastLogin: '2 days ago',
      permissionsCount: 6
    }
  ]);

  // Role Options
  const roleOptions = [
    { label: 'Admin (Full Superuser)', value: 'Admin' },
    { label: 'Traffic Police (Enforcement & Intercept)', value: 'Traffic Police' },
    { label: 'Operator (Surveillance & ANPR)', value: 'Operator' },
    { label: 'Analyst (Intelligence & Reports)', value: 'Analyst' },
    { label: 'Viewer (Read-Only Executive)', value: 'Viewer' }
  ];

  // Provisioning User Handler
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Name and official email are required.'
      });
      return;
    }

    const roleVariantMap = {
      Admin: 'danger',
      'Traffic Police': 'warning',
      Operator: 'info',
      Analyst: 'purple',
      Viewer: 'neutral'
    };

    const permCountMap = {
      Admin: 8,
      'Traffic Police': 6,
      Operator: 5,
      Analyst: 6,
      Viewer: 3
    };

    const newOfficer = {
      id: `USR-0${officers.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      roleVariant: roleVariantMap[newUserRole] || 'info',
      badge: newUserBadge.trim() || `DEL-OPS-${Math.floor(10 + Math.random() * 90)}`,
      status: 'Active',
      lastLogin: 'Never',
      permissionsCount: permCountMap[newUserRole] || 5
    };

    setOfficers([newOfficer, ...officers]);
    setIsAddModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserBadge('');

    toast.addToast({
      type: 'success',
      title: 'Officer Provisioned',
      message: `${newOfficer.name} onboarded as ${newOfficer.role} with credential dispatch.`
    });
  };

  // Toggle user status
  const handleToggleStatus = (userId) => {
    setOfficers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u
      )
    );
    toast.addToast({
      type: 'info',
      title: 'Status Updated',
      message: 'User authentication state modified.'
    });
  };

  // Filter logic
  const filteredOfficers = officers.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchBadge = u.badge.toLowerCase().includes(q);
      return matchName || matchEmail || matchBadge;
    }
    return true;
  });

  const columns = [
    {
      key: 'name',
      label: 'Officer / Identity',
      render: (val, row) => (
        <div>
          <p className="font-bold text-[var(--color-text)] text-xs">{val}</p>
          <span className="text-[11px] text-[var(--color-text-muted)] font-mono">{row.email}</span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Assigned Role',
      render: (val, row) => (
        <Badge variant={row.roleVariant} dot={true} size="sm">
          {val}
        </Badge>
      )
    },
    {
      key: 'badge',
      label: 'Badge / Service ID',
      render: (val) => (
        <span className="font-mono text-xs text-[var(--color-amber)] bg-[var(--color-card)] px-2 py-0.5 rounded border border-[var(--color-border)]">
          {val}
        </span>
      )
    },
    {
      key: 'permissionsCount',
      label: 'Privileges',
      render: (val) => (
        <span className="font-mono text-xs text-emerald-400 font-bold">
          {val} / 8 Granted
        </span>
      )
    },
    {
      key: 'status',
      label: 'Account Status',
      render: (val) => (
        <Badge
          variant={val === 'Active' ? 'success' : val === 'Suspended' ? 'danger' : 'neutral'}
          size="xs"
        >
          {val}
        </Badge>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Session',
      render: (val) => <span className="font-mono text-xs text-[var(--color-text-muted)]">{val}</span>
    },
    {
      key: 'action',
      label: 'Action',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setSelectedUser(row)}
          >
            Inspect
          </Button>
          <Button
            variant={row.status === 'Active' ? 'ghost' : 'primary'}
            size="xs"
            onClick={() => handleToggleStatus(row.id)}
          >
            {row.status === 'Active' ? 'Suspend' : 'Activate'}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------------------
          Header Bar
      ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <UsersIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[var(--color-text)] tracking-tight">
                  User Accounts & Role Directory
                </h1>
                <Badge variant="info" size="sm">
                  {officers.length} Registered
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Provision law enforcement officers, assign RBAC access authorities, and manage credentials
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Provision User
        </Button>
      </div>

      {/* -------------------------------------------------------------
          Quick Role Counts Strip
      ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        {['Admin', 'Traffic Police', 'Operator', 'Analyst', 'Viewer'].map((r) => {
          const count = officers.filter((o) => o.role === r).length;
          const isSelected = roleFilter === r;
          return (
            <div
              key={r}
              onClick={() => setRoleFilter(isSelected ? 'all' : r)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[rgba(91,103,112,0.06)] border-[var(--color-amber)]/60 shadow-sm'
                  : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border)]'
              }`}
            >
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] block">{r}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xl font-bold font-mono text-[var(--color-text)]">{count}</span>
                <span className="text-[10px] text-[var(--color-text-muted)] font-mono">Users</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* -------------------------------------------------------------
          Users Table Card with Filters
      ------------------------------------------------------------- */}
      <Card variant="default">
        <CardHeader className="p-4 border-b border-[var(--color-border)]/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-80">
              <SearchBar
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                placeholder="Search by name, email, or badge..."
                size="sm"
              />
            </div>

            {/* Role Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {['all', 'Admin', 'Traffic Police', 'Operator', 'Analyst', 'Viewer'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 ${
                    roleFilter === r
                      ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)] font-bold shadow-sm'
                      : 'bg-[var(--color-background)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-slate-700'
                  }`}
                >
                  {r === 'all' ? 'All Roles' : r}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table columns={columns} data={filteredOfficers} />
        </CardContent>
      </Card>

      {/* -------------------------------------------------------------
          MODAL: Provision New User Account
      ------------------------------------------------------------- */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision Operator / Officer Account"
        size="md"
      >
        <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
          <div>
            <label className="block text-[var(--color-text-secondary)] font-bold mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="e.g. Inspector R. K. Sen"
              className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-amber)]"
            />
          </div>

          <div>
            <label className="block text-[var(--color-text-secondary)] font-bold mb-1">
              Official Police / Govt Email
            </label>
            <input
              type="email"
              required
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="e.g. rk.sen@traffic.gov.in"
              className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-amber)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[var(--color-text-secondary)] font-bold mb-1">
                Designated Role
              </label>
              <Dropdown
                value={newUserRole}
                onChange={(val) => setNewUserRole(val)}
                options={roleOptions}
              />
            </div>
            <div>
              <label className="block text-[var(--color-text-secondary)] font-bold mb-1">
                Badge / Service Number
              </label>
              <input
                type="text"
                value={newUserBadge}
                onChange={(e) => setNewUserBadge(e.target.value)}
                placeholder="e.g. DEL-PCR-42"
                className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-amber)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)] space-y-1">
            <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
              Default Permissions Granted for {newUserRole}:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PERMISSIONS_LIST.map((p) => {
                const isAdmin = newUserRole === 'Admin';
                const isPolice = newUserRole === 'Traffic Police' && p.id !== 'manage_cameras' && p.id !== 'manage_users';
                const isOp = newUserRole === 'Operator' && (p.id.startsWith('view_') || p.id === 'search_vehicles' || p.id === 'generate_reports') && p.id !== 'view_analytics';
                const isAnalyst = newUserRole === 'Analyst' && p.id !== 'manage_cameras' && p.id !== 'manage_users';
                const isViewer = newUserRole === 'Viewer' && (p.id === 'view_cameras' || p.id === 'view_anpr' || p.id === 'view_analytics');
                const hasPerm = isAdmin || isPolice || isOp || isAnalyst || isViewer;

                if (!hasPerm) return null;
                return (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1 text-[10px] bg-[var(--color-charcoal-light)] border border-[var(--color-amber)]/30 text-[var(--color-amber)] px-2 py-0.5 rounded"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    {p.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Provision Account
            </Button>
          </div>
        </form>
      </Modal>

      {/* -------------------------------------------------------------
          MODAL: Inspect User Dossier
      ------------------------------------------------------------- */}
      <Modal
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        title={selectedUser ? `User Profile: ${selectedUser.name}` : 'User Details'}
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text)]">{selectedUser.name}</h3>
                <span className="text-[var(--color-text-muted)] font-mono text-[11px]">{selectedUser.email}</span>
              </div>
              <Badge variant={selectedUser.roleVariant} size="sm">
                {selectedUser.role}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] text-[10px] uppercase block">Service Badge</span>
                <span className="font-mono text-[var(--color-amber)] font-bold mt-0.5 block">
                  {selectedUser.badge}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] text-[10px] uppercase block">Account Status</span>
                <span className="text-emerald-400 font-bold mt-0.5 block">
                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/50 border border-[var(--color-border)] space-y-1.5">
              <span className="text-[var(--color-text-secondary)] font-bold block text-xs">Active Security Privileges:</span>
              <div className="flex flex-wrap gap-1.5">
                {PERMISSIONS_LIST.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1 text-[10px] bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] px-2 py-0.5 rounded"
                  >
                    <Check className="w-3 h-3 text-[var(--color-amber)]" />
                    {p.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  handleToggleStatus(selectedUser.id);
                  setSelectedUser(null);
                }}
              >
                {selectedUser.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;
