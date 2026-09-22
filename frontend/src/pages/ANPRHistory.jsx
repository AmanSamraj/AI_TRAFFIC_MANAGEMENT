import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Badge,
  Button,
  SearchBar,
  DatePicker,
  Dropdown,
  Table,
  Pagination,
  useToast
} from '../component';
import { History, Download } from 'lucide-react';

export const ANPRHistory = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [timeframe, setTimeframe] = useState('7d');
  const [violationFilter, setViolationFilter] = useState('all');

  const historyRecords = [
    {
      id: 'REC-9401',
      plate: 'DL 01 AB 1234',
      vehicle: 'Honda City (White)',
      location: 'CAM-04 (Ring Road)',
      speed: '78 km/h',
      limit: '60 km/h',
      violation: 'Overspeeding',
      date: '2026-09-21 14:32:10'
    },
    {
      id: 'REC-9402',
      plate: 'MH 12 CD 5678',
      vehicle: 'Heavy 10-Wheeler Truck',
      location: 'CAM-01 (Highway Junction A)',
      speed: '42 km/h',
      limit: '50 km/h',
      violation: 'None',
      date: '2026-09-21 14:15:22'
    },
    {
      id: 'REC-9403',
      plate: 'KA 03 EF 9012',
      vehicle: 'Yamaha R15 (Black)',
      location: 'CAM-07 (Outer Bypass)',
      speed: '65 km/h',
      limit: '50 km/h',
      violation: 'Red Signal Jump',
      date: '2026-09-20 18:22:45'
    },
    {
      id: 'REC-9404',
      plate: 'UP 16 GH 3456',
      vehicle: 'Transit Bus (Green)',
      location: 'CAM-02 (Central Expressway)',
      speed: '48 km/h',
      limit: '50 km/h',
      violation: 'Lane Drift',
      date: '2026-09-20 09:14:10'
    },
    {
      id: 'REC-9405',
      plate: 'DL 08 BK 2244',
      vehicle: 'Hero Splendor (Black)',
      location: 'CAM-09 (Metro Corridor)',
      speed: '58 km/h',
      limit: '50 km/h',
      violation: 'Triple Riding / No Helmet',
      date: '2026-09-19 16:40:32'
    }
  ];

  const columns = [
    {
      key: 'plate',
      label: 'License Plate',
      render: (val) => (
        <span className="font-mono font-bold text-[var(--color-amber)] bg-[rgba(91,103,112,0.06)] px-2 py-0.5 rounded border border-[var(--color-amber)]/30">
          {val}
        </span>
      )
    },
    { key: 'vehicle', label: 'Vehicle Model' },
    { key: 'location', label: 'Capture Camera' },
    {
      key: 'speed',
      label: 'Speed / Limit',
      render: (_, r) => (
        <span className="font-medium text-[var(--color-text)]">
          {r.speed} <span className="text-[var(--color-text-muted)] text-[10px]">({r.limit})</span>
        </span>
      )
    },
    {
      key: 'violation',
      label: 'Infraction',
      render: (val) => (
        <Badge
          variant={val === 'None' ? 'success' : 'danger'}
          dot={val !== 'None'}
        >
          {val}
        </Badge>
      )
    },
    {
      key: 'date',
      label: 'Date & Time',
      align: 'right',
      render: (val) => <span className="font-mono text-[var(--color-text-muted)]">{val}</span>
    }
  ];

  const filtered = historyRecords.filter((r) => {
    const matchesQuery =
      r.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesViolation =
      violationFilter === 'all' ||
      (violationFilter === 'violation' ? r.violation !== 'None' : r.violation === 'None');
    return matchesQuery && matchesViolation;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <History className="w-5 h-5 text-[var(--color-amber)]" />
            Historical ANPR Detections & Plate Archive
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Query across historical optical recognition logs with multi-parameter filtering
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <DatePicker value={timeframe} onChange={(val) => setTimeframe(val)} />
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'Archive Exported',
                message: 'ANPR history CSV generated and downloaded.'
              });
            }}
          >
            Export CSV
          </Button>
        </div>
      </div>

      <Card variant="default">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <SearchBar
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
              placeholder="Search by plate, vehicle, or camera location..."
              className="max-w-xs"
              size="sm"
            />
            <Dropdown
              value={violationFilter}
              onChange={(val) => setViolationFilter(val)}
              options={[
                { label: 'All Records', value: 'all' },
                { label: 'Violations Only', value: 'violation' },
                { label: 'Clean Detections', value: 'clean' }
              ]}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={filtered} />
          <Pagination currentPage={1} totalPages={8} totalItems={40} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ANPRHistory;
