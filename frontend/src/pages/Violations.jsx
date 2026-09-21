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
  Pagination,
  Modal,
  useToast
} from '../component';
import { ShieldAlert, Eye, Send, Download, Image as ImageIcon } from 'lucide-react';
import playAlert from '../component/alert';

export const Violations = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [previewViolation, setPreviewViolation] = useState(null);

  const violations = [
    {
      id: 'VIO-2026-101',
      plate: 'DL 01 AB 1234',
      infraction: 'Overspeeding (78 km/h in 60 km/h zone)',
      location: 'Ring Road Interchange',
      amount: '₹2,000',
      timestamp: '2026-09-21 14:32:10',
      status: 'Pending Dispatch',
      severity: 'danger'
    },
    {
      id: 'VIO-2026-102',
      plate: 'MH 12 CD 5678',
      infraction: 'Red Light Signal Jump',
      location: 'Junction 4 Central',
      amount: '₹1,000',
      timestamp: '2026-09-21 14:28:40',
      status: 'Notice Dispatched',
      severity: 'warning'
    },
    {
      id: 'VIO-2026-103',
      plate: 'KA 03 EF 9012',
      infraction: 'Helmetless Riding / Triple Riding',
      location: 'Metro Corridor South',
      amount: '₹1,000',
      timestamp: '2026-09-21 14:15:02',
      status: 'Paid Online',
      severity: 'success'
    },
    {
      id: 'VIO-2026-104',
      plate: 'UP 16 GH 3456',
      infraction: 'Wrong-Way Driving on Radial Arterial',
      location: 'Radial Flyover Bay 3',
      amount: '₹5,000',
      timestamp: '2026-09-21 13:58:22',
      status: 'Court Summons',
      severity: 'danger'
    }
  ];

  const columns = [
    {
      key: 'id',
      label: 'Citation ID',
      render: (val) => <span className="font-mono font-bold text-cyan-300">{val}</span>
    },
    {
      key: 'plate',
      label: 'License Plate',
      render: (val) => (
        <span className="font-mono font-bold text-slate-100 bg-slate-850 px-2 py-0.5 rounded border border-slate-700">
          {val}
        </span>
      )
    },
    { key: 'infraction', label: 'Infraction Details' },
    { key: 'location', label: 'Intersection' },
    {
      key: 'amount',
      label: 'Statutory Penalty',
      render: (val) => <span className="font-mono font-bold text-white">{val}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (val, row) => (
        <Badge variant={row.severity} dot={row.severity === 'danger'}>
          {val}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="xs"
            leftIcon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => setPreviewViolation(row)}
          >
            Evidence
          </Button>
          <Button
            variant="outline"
            size="xs"
            leftIcon={<Send className="w-3.5 h-3.5" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'success',
                title: 'E-Challan Dispatched',
                message: `SMS & DigiLocker notice pushed for ${row.plate}.`
              });
            }}
          >
            Dispatch
          </Button>
        </div>
      )
    }
  ];

  const filtered = violations.filter((v) => {
    const matchesQuery =
      v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.infraction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            Statutory E-Challan & Violation Enforcement
            <Badge variant="danger" size="sm">
              142 Active
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated optical evidence gathering and multi-channel notice issuance
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'Report Downloaded',
                message: 'Daily E-Challan ledger exported to CSV.'
              });
            }}
          >
            Export Ledger
          </Button>
        </div>
      </div>

      <Card variant="default">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <SearchBar
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
              placeholder="Filter by plate, violation type, or location..."
              className="max-w-xs"
              size="sm"
            />
            <Dropdown
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={[
                { label: 'All Violations', value: 'all' },
                { label: 'Pending Dispatch', value: 'pending' },
                { label: 'Dispatched', value: 'dispatched' },
                { label: 'Paid', value: 'paid' }
              ]}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={filtered} />
          <Pagination currentPage={1} totalPages={6} totalItems={24} />
        </CardContent>
      </Card>

      {/* Evidence Snapshot Modal */}
      <Modal
        isOpen={Boolean(previewViolation)}
        onClose={() => setPreviewViolation(null)}
        title={`Optical Evidence: ${previewViolation?.plate}`}
        subtitle={`Citation ID: ${previewViolation?.id} | ${previewViolation?.timestamp}`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setPreviewViolation(null)}>
              Close
            </Button>
            <Button
              variant="danger"
              leftIcon={<Send className="w-4 h-4" />}
              onClick={() => {
                playAlert();
                toast.addToast({
                  type: 'success',
                  title: 'Notice Dispatched',
                  message: `Evidence dossier transmitted to DigiLocker for ${previewViolation?.plate}.`
                });
                setPreviewViolation(null);
              }}
            >
              Confirm & Issue Citation
            </Button>
          </>
        }
      >
        {previewViolation && (
          <div className="space-y-4">
            {/* Simulated Evidence Frame */}
            <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="text-center p-4">
                <ImageIcon className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-80" />
                <p className="text-xs font-mono font-bold text-white">
                  HIGH-RESOLUTION EVIDENCE FRAME CAPTURE
                </p>
                <p className="text-[11px] text-cyan-300 font-mono mt-0.5">
                  Plate: {previewViolation.plate} | 4K Optical Zoom 2.4x
                </p>
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                {previewViolation.infraction}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Violation:</span>
                <span className="font-semibold text-red-400">{previewViolation.infraction}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Captured Location:</span>
                <span className="text-slate-200">{previewViolation.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Statutory Fine:</span>
                <span className="font-mono font-bold text-white">{previewViolation.amount}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Violations;
