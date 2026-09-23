import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Modal,
  Table,
  Dropdown,
  SearchBar,
  DatePicker,
  Pagination,
  useToast,
  Chart,
  StatusIndicator
} from '../component';

import {
  Activity,
  AlertTriangle,
  Camera,
  Car,
  CheckCircle2,
  Download,
  Flame,
  Radio,
  RefreshCw,
  Volume2,
  TrendingUp
} from 'lucide-react';
import { Search, User } from 'lucide-react';
import playAlert from '../component/alert';

const initialTrafficLogs = [
  {
    id: 'TRF-1092',
    plate: 'DL 01 AB 1234',
    vehicleType: 'Car (Sedan)',
    speed: '78 km/h',
    limit: '60 km/h',
    camera: 'CAM-04 (Ring Road North)',
    status: 'online',
    violation: 'Overspeeding',
    violationSeverity: 'danger',
    time: '14:32:10'
  },
  {
    id: 'TRF-1093',
    plate: 'MH 12 CD 5678',
    vehicleType: 'Heavy Truck',
    speed: '42 km/h',
    limit: '50 km/h',
    camera: 'CAM-01 (Highway Junction A)',
    status: 'online',
    violation: 'None',
    violationSeverity: 'success',
    time: '14:32:45'
  },
  {
    id: 'TRF-1094',
    plate: 'KA 03 EF 9012',
    vehicleType: 'Motorcycle',
    speed: '65 km/h',
    limit: '50 km/h',
    camera: 'CAM-07 (Outer Bypass)',
    status: 'warning',
    violation: 'No Helmet / Signal Jump',
    violationSeverity: 'danger',
    time: '14:33:02'
  },
  {
    id: 'TRF-1095',
    plate: 'UP 16 GH 3456',
    vehicleType: 'Bus',
    speed: '48 km/h',
    limit: '50 km/h',
    camera: 'CAM-02 (Central Expressway)',
    status: 'online',
    violation: 'Lane Violation',
    violationSeverity: 'warning',
    time: '14:33:40'
  },
  {
    id: 'TRF-1096',
    plate: 'HR 26 IJ 7890',
    vehicleType: 'Car (SUV)',
    speed: '52 km/h',
    limit: '60 km/h',
    camera: 'CAM-09 (Metro Corridor)',
    status: 'online',
    violation: 'None',
    violationSeverity: 'success',
    time: '14:34:15'
  }
];

const trafficChartData = [
  { time: '08:00', vehicles: 420, violations: 18 },
  { time: '10:00', vehicles: 890, violations: 45 },
  { time: '12:00', vehicles: 760, violations: 28 },
  { time: '14:00', vehicles: 940, violations: 52 },
  { time: '16:00', vehicles: 1250, violations: 84 },
  { time: '18:00', vehicles: 1480, violations: 96 },
  { time: '20:00', vehicles: 1100, violations: 62 },
  { time: '22:00', vehicles: 620, violations: 22 }
];

export const Dashboard = () => {
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCameraFilter, setSelectedCameraFilter] = useState('all');
  const [timePreset, setTimePreset] = useState('today');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [chartType, setChartType] = useState('bar');

  const filteredData = initialTrafficLogs.filter((item) => {
    const matchesSearch =
      item.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.violation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCamera =
      selectedCameraFilter === 'all' || item.camera.includes(selectedCameraFilter);

    return matchesSearch && matchesCamera;
  });

  const tableColumns = [
    {
      key: 'plate',
      label: 'License Plate (ANPR)',
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-[var(--color-amber)] bg-[rgba(91,103,112,0.06)] px-2 py-0.5 rounded border border-[var(--color-amber)]/30">
          {val}
        </span>
      )
    },
    {
      key: 'vehicleType',
      label: 'Classification',
      render: (val) => <span className="text-[var(--color-text-secondary)]">{val}</span>
    },
    {
      key: 'speed',
      label: 'Speed / Limit',
      render: (_, row) => (
        <span className="font-medium text-[var(--color-text)]">
          {row.speed} <span className="text-[var(--color-text-muted)] text-[10px]">({row.limit})</span>
        </span>
      )
    },
    {
      key: 'camera',
      label: 'CCTV Node',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <StatusIndicator status={row.status} size="sm" pulse={row.status !== 'offline'} />
          <span className="text-[var(--color-text-secondary)] truncate max-w-[160px]">{val}</span>
        </div>
      )
    },
    {
      key: 'violation',
      label: 'AI Status',
      render: (val, row) => (
        <Badge
          variant={row.violationSeverity}
          dot={true}
          pulse={row.violationSeverity === 'danger'}
        >
          {val}
        </Badge>
      )
    },
    {
      key: 'time',
      label: 'Timestamp',
      align: 'right',
      render: (val) => <span className="font-mono text-[var(--color-text-muted)]">{val}</span>
    }
  ];

  const handleSimulateAlert = () => {
    setBtnLoading(true);
    playAlert();
    toast.addToast({
      type: 'danger',
      title: 'Emergency Violation Detected!',
      message: 'Vehicle DL 01 AB 1234 exceeded 78 km/h on Ring Road North.'
    });
    setTimeout(() => setBtnLoading(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
            Dashboard
            <Badge variant="info" size="sm" dot={true} pulse={true}>
              Live
            </Badge>
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Live traffic monitoring overview
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Flame className="w-4 h-4" />}
            isLoading={btnLoading}
            onClick={handleSimulateAlert}
          >
            Trigger Sound Alert
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'Data Exported',
                message: 'Traffic stream downloaded in CSV format.'
              });
            }}
          >
            Export
          </Button>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'info',
                title: 'Refreshed',
                message: 'All sensor nodes synced.'
              });
            }}
          >
            Sync
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">Vehicles Monitored</p>
              <h3 className="text-2xl font-extrabold text-[var(--color-text)] mt-1">18,492</h3>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs peak hour
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[rgba(245,166,35,0.06)] text-[var(--color-amber)] border border-[var(--color-amber)]/20">
              <Car className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="alert">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">Active Violations</p>
              <h3 className="text-2xl font-extrabold text-red-400 mt-1">142</h3>
              <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping inline-block" />
                3 Red Light Jumps Flagged
              </span>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="metric">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">Online CCTV Streams</p>
              <h3 className="text-2xl font-extrabold text-[var(--color-text)] mt-1">48 / 50</h3>
              <div className="mt-1 flex items-center gap-1.5">
                <StatusIndicator status="online" size="sm" />
                <span className="text-[11px] text-[var(--color-text-muted)]">96% network health</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Camera className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">Congestion</p>
              <h3 className="text-2xl font-extrabold text-amber-400 mt-1">64%</h3>
              <span className="text-[11px] text-amber-400/90 flex items-center gap-1 mt-1 font-medium">
                Moderate congestion detected
              </span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Activity className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart with Switcher */}
      <Card variant="default">
        <CardHeader>
          <div>
            <CardTitle>
              Traffic & Violations
            </CardTitle>
            <CardDescription>
              Hourly count across intersections
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Chart
            type={chartType}
            data={trafficChartData}
            xAxisKey="time"
            height={260}
            series={[
              { key: 'vehicles', name: 'Vehicle Count', color: '#F5A623', strokeWidth: 2 },
              { key: 'violations', name: 'Violations Detected', color: '#ef4444', strokeWidth: 2 }
            ]}
          />
        </CardContent>
      </Card>

      {/* Live ANPR Telemetry Table */}
      <Card variant="default">
        <CardHeader>
          <div>
            <CardTitle>Recent Detections</CardTitle>
            <CardDescription>
              Click a row for details
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <DatePicker value={timePreset} onChange={(val) => setTimePreset(val)} />
            <Dropdown
              value={selectedCameraFilter}
              onChange={(val) => setSelectedCameraFilter(val)}
              options={[
                { label: 'All CCTV Nodes', value: 'all', icon: <Camera className="w-3.5 h-3.5" /> },
                { divider: true },
                { label: 'CAM-01 (Highway)', value: 'CAM-01' },
                { label: 'CAM-02 (Central)', value: 'CAM-02' },
                { label: 'CAM-04 (Ring Road)', value: 'CAM-04' },
                { label: 'CAM-07 (Outer)', value: 'CAM-07' },
                { label: 'CAM-09 (Metro)', value: 'CAM-09' }
              ]}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <SearchBar
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Search plate (e.g. DL 01), camera, or violation type..."
              className="max-w-md"
            />
          </div>

          <Table
            columns={tableColumns}
            data={filteredData}
            onRowClick={(row) => {
              setSelectedVehicle(row);
              setIsModalOpen(true);
            }}
            emptyMessage="No vehicles matching current filter criteria."
          />

          <Pagination
            currentPage={currentPage}
            totalPages={3}
            totalItems={15}
            pageSize={pageSize}
            onPageChange={(p) => setCurrentPage(p)}
            onPageSizeChange={(s) => setPageSize(s)}
          />
        </CardContent>
      </Card>

      {/* Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Vehicle Details"
        subtitle={selectedVehicle ? `Record: ${selectedVehicle.id}` : ''}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="danger"
              leftIcon={<Volume2 className="w-4 h-4" />}
              onClick={() => {
                playAlert();
                toast.addToast({
                  type: 'danger',
                  title: 'Challan Issued',
                  message: `Citation dispatched to registered owner of ${selectedVehicle?.plate}.`
                });
                setIsModalOpen(false);
              }}
            >
              Issue Violation Challan
            </Button>
          </>
        }
      >
        {selectedVehicle && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
              <div>
                <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
                  Identified Plate
                </span>
                <p className="text-xl font-mono font-bold text-[var(--color-amber)]">
                  {selectedVehicle.plate}
                </p>
              </div>
              <Badge
                variant={selectedVehicle.violationSeverity}
                dot={true}
                pulse={selectedVehicle.violationSeverity === 'danger'}
              >
                {selectedVehicle.violation}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[var(--color-background)]/60 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Classification:</span>
                <p className="font-semibold text-[var(--color-text)] mt-0.5">{selectedVehicle.vehicleType}</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-background)]/60 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Captured Speed:</span>
                <p className="font-semibold text-[var(--color-text)] mt-0.5">
                  {selectedVehicle.speed}{' '}
                  <span className="text-[var(--color-text-muted)] font-normal">
                    (Limit: {selectedVehicle.limit})
                  </span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-background)]/60 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Location Node:</span>
                <p className="font-semibold text-[var(--color-text)] mt-0.5">{selectedVehicle.camera}</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-background)]/60 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Capture Timestamp:</span>
                <p className="font-mono text-[var(--color-text)] mt-0.5">{selectedVehicle.time}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-amber)]/20 text-xs text-[var(--color-amber)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--color-amber)]" />
              <span>
                Confidence: <strong>99.4%</strong>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
