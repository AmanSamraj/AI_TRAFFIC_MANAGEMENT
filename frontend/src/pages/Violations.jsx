import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Badge,
  Button,
  SearchBar,
  Table,
  Pagination,
  Modal,
  useToast
} from '../component';
import {
  ShieldAlert,
  Gauge,
  Flame,
  ArrowRightLeft,
  Send,
  Eye,
  Download,
  Navigation
} from 'lucide-react';
import playAlert from '../component/alert';

export const Violations = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Active Tab: 'All' | 'Speed' | 'Red Light' | 'Wrong Way'
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Master Violations Dataset containing exact prompt records
  const masterViolations = [
    {
      id: 'VIO-2026-001',
      plate: 'HP01AB1234',
      violation: 'Speed',
      camera: 'CAM-04',
      cameraLocation: 'Mall Road Commercial Corridor',
      time: '10:21',
      rawTime: '2026-09-21 10:21:42',
      speedRecorded: '78 km/h',
      speedLimit: '50 km/h',
      fineAmount: '₹2,000',
      status: 'Pending Dispatch',
      badgeVariant: 'danger',
      vehicleMake: 'White Sedan (Hyundai Verna)',
      lane: 'Lane 1 (Northbound)',
      description: 'Vehicle exceeded maximum urban corridor speed ceiling by +28 km/h captured via Doppler radar.'
    },
    {
      id: 'VIO-2026-002',
      plate: 'DL05XY7788',
      violation: 'Red Light',
      camera: 'CAM-07',
      cameraLocation: 'ISBT Bus Terminal Interchange',
      time: '10:32',
      rawTime: '2026-09-21 10:32:15',
      speedRecorded: '42 km/h',
      speedLimit: 'Stop Line (Red 3.2s)',
      fineAmount: '₹1,000',
      status: 'Notice Dispatched',
      badgeVariant: 'warning',
      vehicleMake: 'Dark Grey SUV (Mahindra XUV700)',
      lane: 'Lane 2 (Zebra Crossing)',
      description: 'Vehicle crossed virtual stop line 3.2 seconds after signal transitioned to solid red phase.'
    },
    {
      id: 'VIO-2026-003',
      plate: 'HR26CD9911',
      violation: 'Wrong Way',
      camera: 'CAM-02',
      cameraLocation: 'Ridge Vista Radial Junction',
      time: '11:02',
      rawTime: '2026-09-21 11:02:08',
      speedRecorded: '36 km/h',
      speedLimit: 'One-Way Flow Counter-Flow',
      fineAmount: '₹5,000',
      status: 'Urgent Intercept Queued',
      badgeVariant: 'danger',
      vehicleMake: 'Silver Hatchback (Maruti Swift)',
      lane: 'Counter-Flow Exit Bay',
      description: 'Vehicle detected traveling in reverse direction against mandatory one-way traffic signage.'
    },
    {
      id: 'VIO-2026-004',
      plate: 'UP16GH3456',
      violation: 'Speed',
      camera: 'CAM-01',
      cameraLocation: 'Shimla Entry (North Gateway)',
      time: '09:48',
      rawTime: '2026-09-21 09:48:20',
      speedRecorded: '86 km/h',
      speedLimit: '60 km/h',
      fineAmount: '₹2,000',
      status: 'Paid Online',
      badgeVariant: 'success',
      vehicleMake: 'Black Sedan (Honda City)',
      lane: 'Lane 1 (Highway Corridor)',
      description: 'Over-speed infraction recorded at northern entry corridor.'
    },
    {
      id: 'VIO-2026-005',
      plate: 'KA03EF9012',
      violation: 'Red Light',
      camera: 'CAM-04',
      cameraLocation: 'Mall Road Commercial Corridor',
      time: '09:15',
      rawTime: '2026-09-21 09:15:33',
      speedRecorded: '39 km/h',
      speedLimit: 'Stop Line (Red 2.8s)',
      fineAmount: '₹1,000',
      status: 'Notice Dispatched',
      badgeVariant: 'warning',
      vehicleMake: 'White Commercial Van',
      lane: 'Lane 3 (Transit Bay)',
      description: 'Intersection stop line breach during active pedestrian crossing phase.'
    },
    {
      id: 'VIO-2026-006',
      plate: 'MH12TR4422',
      violation: 'Wrong Way',
      camera: 'CAM-09',
      cameraLocation: 'Sanjauli Tunnel Exit Ramp',
      time: '08:50',
      rawTime: '2026-09-21 08:50:11',
      speedRecorded: '31 km/h',
      speedLimit: 'One-Way Ramp',
      fineAmount: '₹5,000',
      status: 'Notice Dispatched',
      badgeVariant: 'danger',
      vehicleMake: 'Red Compact SUV (Tata Nexon)',
      lane: 'Ramp Lane B (Descending)',
      description: 'Entered one-way tunnel descending ramp against opposing vehicle flow.'
    },
    {
      id: 'VIO-2026-007',
      plate: 'DL01AB8899',
      violation: 'Speed',
      camera: 'CAM-12',
      cameraLocation: 'South Bypass Expressway Link',
      time: '08:24',
      rawTime: '2026-09-21 08:24:55',
      speedRecorded: '94 km/h',
      speedLimit: '70 km/h',
      fineAmount: '₹2,000',
      status: 'Pending Dispatch',
      badgeVariant: 'danger',
      vehicleMake: 'Blue Sedan (Skoda Slavia)',
      lane: 'Fast Lane (Southbound)',
      description: 'Automated ANPR trigger recorded sustained over-speeding.'
    }
  ];

  // Filtering by Tab & Search Query
  const filteredViolations = masterViolations.filter((item) => {
    // Tab Filter
    if (activeTab !== 'All' && item.violation !== activeTab) {
      return false;
    }
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchPlate = item.plate.toLowerCase().includes(q);
      const matchCam = item.camera.toLowerCase().includes(q);
      const matchVio = item.violation.toLowerCase().includes(q);
      return matchPlate || matchCam || matchVio;
    }
    return true;
  });

  // Violation Icon & Color Resolver
  const getViolationBadge = (violation) => {
    switch (violation) {
      case 'Speed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-xs">
            <Gauge className="w-3.5 h-3.5" />
            Speed
          </span>
        );
      case 'Red Light':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-semibold text-xs">
            <Flame className="w-3.5 h-3.5" />
            Red Light
          </span>
        );
      case 'Wrong Way':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 font-semibold text-xs">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Wrong Way
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-background)] text-[var(--color-text-secondary)] font-semibold text-xs">
            {violation}
          </span>
        );
    }
  };

  // Table Columns Setup directly matching: Plate | Violation | Camera | Time
  const columns = [
    {
      key: 'plate',
      label: 'Plate',
      render: (val) => (
        <span className="font-mono font-bold text-xs text-[var(--color-text)] bg-[var(--color-background)]/90 border border-[var(--color-border)] px-2.5 py-1 rounded-lg shadow-inner">
          {val}
        </span>
      )
    },
    {
      key: 'violation',
      label: 'Violation',
      render: (val) => getViolationBadge(val)
    },
    {
      key: 'camera',
      label: 'Camera',
      render: (val, row) => (
        <div className="text-xs">
          <span className="font-mono font-bold text-[var(--color-amber)]">{val}</span>
          <span className="text-[11px] text-[var(--color-text-muted)] block truncate max-w-[160px]">
            {row.cameraLocation}
          </span>
        </div>
      )
    },
    {
      key: 'time',
      label: 'Time',
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-[var(--color-text)]">
          {val}
        </span>
      )
    },
    {
      key: 'action',
      label: 'Action',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="outline"
          size="xs"
          leftIcon={<Eye className="w-3.5 h-3.5 text-[var(--color-amber)]" />}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedViolation(row);
          }}
        >
          Details
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------------------
          Header Bar with SIH 2026 Enforcement Badges
      ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[var(--color-text)] tracking-tight uppercase">
                  VIOLATIONS
                </h1>
                <Badge variant="danger" size="sm" dot={true}>
                  E-CHALLAN ACTIVE
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Automated optical infraction detection, legal evidence capture, and digital summons issuance
              </p>
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4 text-[var(--color-amber)]" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'Ledger Exported',
                message: 'Violation log exported to CSV for National Traffic Portal.'
              });
            }}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Navigation className="w-4 h-4" />}
            onClick={() => navigate('/traffic')}
          >
            View Live Map
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Quick Category Counter Cards
      ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveTab('All')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            activeTab === 'All'
              ? 'bg-cyan-950/30 border-[var(--color-amber)]/50 shadow-[0_0_12px_rgba(0,210,255,0.2)]'
              : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border)]'
          }`}
        >
          <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
            Total Violations
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black font-mono text-[var(--color-text)]">
              {masterViolations.length}
            </span>
            <span className="text-[10px] text-[var(--color-amber)] font-semibold">● Active Log</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('Speed')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            activeTab === 'Speed'
              ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border)]'
          }`}
        >
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" /> Speed Breaches
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black font-mono text-amber-400">
              {masterViolations.filter((v) => v.violation === 'Speed').length}
            </span>
            <span className="text-[10px] text-amber-300">Radar Trigger</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('Red Light')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            activeTab === 'Red Light'
              ? 'bg-red-950/30 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
              : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border)]'
          }`}
        >
          <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> Red Light Jumps
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black font-mono text-red-400">
              {masterViolations.filter((v) => v.violation === 'Red Light').length}
            </span>
            <span className="text-[10px] text-red-300">Stop Line Breach</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('Wrong Way')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            activeTab === 'Wrong Way'
              ? 'bg-purple-950/30 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
              : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border)]'
          }`}
        >
          <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block flex items-center gap-1">
            <ArrowRightLeft className="w-3.5 h-3.5" /> Wrong Way
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black font-mono text-purple-400">
              {masterViolations.filter((v) => v.violation === 'Wrong Way').length}
            </span>
            <span className="text-[10px] text-purple-300">Vector Breach</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          REQUIRED FILTER TABS: [ All ] [ Speed ] [ Red Light ] [ Wrong Way ]
      ------------------------------------------------------------- */}
      <Card variant="default">
        <CardHeader className="p-4 border-b border-[var(--color-border)]/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Tabs matching exact prompt: [ All ] [ Speed ] [ Red Light ] [ Wrong Way ] */}
            <div className="flex items-center gap-1.5 bg-[var(--color-charcoal)] p-1.5 rounded-2xl border border-[var(--color-border)] shrink-0">
              {['All', 'Speed', 'Red Light', 'Wrong Way'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,210,255,0.4)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-background)]'
                    }`}
                  >
                    {tab === 'All' && <span>[ All ]</span>}
                    {tab === 'Speed' && (
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5" /> [ Speed ]
                      </span>
                    )}
                    {tab === 'Red Light' && (
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> [ Red Light ]
                      </span>
                    )}
                    {tab === 'Wrong Way' && (
                      <span className="flex items-center gap-1">
                        <ArrowRightLeft className="w-3.5 h-3.5" /> [ Wrong Way ]
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-72">
              <SearchBar
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                placeholder="Search plate (HP01AB1234), camera..."
                size="sm"
              />
            </div>
          </div>
        </CardHeader>

        {/* -------------------------------------------------------------
            VIOLATIONS TABLE: Plate | Violation | Camera | Time
            Row Click -> Opens Violation Details
        ------------------------------------------------------------- */}
        <CardContent className="p-0">
          <div className="cursor-pointer">
            <Table
              columns={columns}
              data={filteredViolations}
              onRowClick={(row) => setSelectedViolation(row)}
            />
          </div>

          <div className="p-4 border-t border-[var(--color-border)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
            <span>
              Showing {filteredViolations.length} violations for tab <b>[{activeTab}]</b>
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={1}
              totalItems={filteredViolations.length}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </CardContent>
      </Card>

      {/* -------------------------------------------------------------
          VIOLATION DETAILS MODAL: Triggered by "Click → violation details"
      ------------------------------------------------------------- */}
      <Modal
        isOpen={Boolean(selectedViolation)}
        onClose={() => setSelectedViolation(null)}
        title={selectedViolation ? `Violation Details: ${selectedViolation.plate}` : 'Details'}
        size="lg"
      >
        {selectedViolation && (
          <div className="space-y-4 text-xs">
            {/* Modal Header Badge */}
            <div className="p-3.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)]">
                  {selectedViolation.violation === 'Speed' && (
                    <Gauge className="w-5 h-5 text-amber-400" />
                  )}
                  {selectedViolation.violation === 'Red Light' && (
                    <Flame className="w-5 h-5 text-red-400" />
                  )}
                  {selectedViolation.violation === 'Wrong Way' && (
                    <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[var(--color-text)]">
                    {selectedViolation.violation} Infraction Detected
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-xs">
                    Citation ID: <span className="font-mono text-[var(--color-amber)] font-bold">{selectedViolation.id}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <Badge
                  variant={
                    selectedViolation.status.includes('Paid')
                      ? 'success'
                      : selectedViolation.status.includes('Dispatch')
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {selectedViolation.status}
                </Badge>
              </div>
            </div>

            {/* High-Resolution Optical Evidence Frame Simulation */}
            <div className="relative aspect-video rounded-xl bg-black border border-[var(--color-border)] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#00d2ff_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-20" />

              {/* Vehicle & Plate Target Box */}
              <div className="relative z-10 p-3 rounded-xl border-2 border-red-500 bg-red-500/10 text-center space-y-1">
                <span className="font-mono text-base font-black text-[var(--color-text)] bg-[var(--color-charcoal)]/80 px-2.5 py-1 rounded border border-[rgba(220,53,69,0.3)] tracking-wider block">
                  {selectedViolation.plate}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                  OPTICAL RECOGNITION CONFIDENCE: 99.2%
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-secondary)] block">
                  {selectedViolation.camera} • {selectedViolation.time}
                </span>
              </div>

              {/* Camera Feed Watermark */}
              <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-[var(--color-text)]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>EVIDENCE CAM {selectedViolation.camera}</span>
              </div>

              <div className="absolute bottom-2 left-2 z-20 text-[10px] font-mono text-[var(--color-text-secondary)]">
                {selectedViolation.cameraLocation} • {selectedViolation.lane}
              </div>

              <div className="absolute bottom-2 right-2 z-20 text-[10px] font-mono text-amber-400 font-bold">
                {selectedViolation.speedRecorded}
              </div>
            </div>

            {/* Infraction Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Vehicle Plate</span>
                <span className="font-mono font-bold text-[var(--color-text)] text-xs mt-0.5 block">
                  {selectedViolation.plate}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Camera Location</span>
                <span className="font-mono font-bold text-[var(--color-amber)] text-xs mt-0.5 block">
                  {selectedViolation.camera}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Recorded Speed</span>
                <span className="font-mono font-bold text-red-400 text-xs mt-0.5 block">
                  {selectedViolation.speedRecorded}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Statutory Penalty</span>
                <span className="font-mono font-bold text-amber-400 text-xs mt-0.5 block">
                  {selectedViolation.fineAmount}
                </span>
              </div>
            </div>

            {/* Vehicle Dossier & Audit Log */}
            <div className="p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Vehicle Make & Model:</span>
                <span className="font-semibold text-[var(--color-text)]">{selectedViolation.vehicleMake}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Enforcement Zone:</span>
                <span className="text-[var(--color-text)]">{selectedViolation.cameraLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Speed / Flow Limit:</span>
                <span className="font-mono text-emerald-400">{selectedViolation.speedLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Infraction Timestamp:</span>
                <span className="font-mono text-[var(--color-text-secondary)]">{selectedViolation.rawTime}</span>
              </div>
              <p className="text-[var(--color-text-muted)] pt-1 border-t border-slate-850">
                <b>Officer Audit:</b> {selectedViolation.description}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedViolation(null)}
              >
                Close
              </Button>

              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Navigation className="w-3.5 h-3.5" />}
                onClick={() => {
                  setSelectedViolation(null);
                  navigate(`/tracking/${selectedViolation.plate}`);
                }}
              >
                Track Trajectory
              </Button>

              <Button
                variant="danger"
                size="sm"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() => {
                  playAlert();
                  toast.addToast({
                    type: 'success',
                    title: 'Digital E-Challan Dispatched',
                    message: `Statutory notice (${selectedViolation.fineAmount}) pushed to DigiLocker and SMS for ${selectedViolation.plate}.`
                  });
                  setSelectedViolation(null);
                }}
              >
                Issue Citation ({selectedViolation.fineAmount})
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Violations;
