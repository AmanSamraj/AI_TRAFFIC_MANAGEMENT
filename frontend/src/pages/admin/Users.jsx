import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Table,
  useToast
} from '../../component';
import { Users as UsersIcon, UserPlus, Shield, Key, CheckCircle2, Lock } from 'lucide-react';

export const Users = () => {
  const toast = useToast();

  const officers = [
    {
      id: 'USR-01',
      name: 'Aman Samraj',
      email: 'aman.samraj@traffic.gov.in',
      role: 'Chief Traffic Controller',
      badge: 'DEL-HQ-001',
      status: 'Active',
      lastLogin: '2 mins ago'
    },
    {
      id: 'USR-02',
      name: 'Vikram Sharma',
      email: 'v.sharma@traffic.gov.in',
      role: 'Patrol Intercept Commander',
      badge: 'DEL-PCR-14',
      status: 'Active',
      lastLogin: '18 mins ago'
    },
    {
      id: 'USR-03',
      name: 'Priya Nair',
      email: 'p.nair@traffic.gov.in',
      role: 'ANPR Surveillance Officer',
      badge: 'DEL-OPS-08',
      status: 'Active',
      lastLogin: '1 hour ago'
    },
    {
      id: 'USR-04',
      name: 'Rajesh Kumar',
      email: 'r.kumar@traffic.gov.in',
      role: 'Hardware Node Technician',
      badge: 'DEL-ENG-22',
      status: 'Offline',
      lastLogin: 'Yesterday'
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Officer / Operator',
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white">{val}</p>
          <span className="text-[11px] text-slate-400">{row.email}</span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Designated Role',
      render: (val) => (
        <span className="text-cyan-300 font-medium text-xs flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          {val}
        </span>
      )
    },
    {
      key: 'badge',
      label: 'Badge Number',
      render: (val) => <span className="font-mono text-slate-300">{val}</span>
    },
    {
      key: 'status',
      label: 'Console Status',
      render: (val) => (
        <Badge variant={val === 'Active' ? 'success' : 'neutral'} dot={val === 'Active'}>
          {val}
        </Badge>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login Session',
      align: 'right',
      render: (val) => <span className="font-mono text-slate-400">{val}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-cyan-400" />
            Operator Access Control & User Roles
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage law enforcement console privileges, badge numbers, and audit permissions
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => {
            toast.addToast({
              type: 'info',
              title: 'Add Officer Account',
              message: 'Officer onboarding portal initiated.'
            });
          }}
        >
          Provision New Officer
        </Button>
      </div>

      <Card variant="default">
        <CardHeader>
          <CardTitle>Authenticated System Operators</CardTitle>
          <CardDescription>Role-based access control (RBAC) enforced via multi-factor authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={officers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
