import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Table,
  Modal,
  SearchBar,
  useToast
} from '../component';
import {
  ShieldAlert,
  AlertTriangle,
  Volume2,
  VolumeX,
  Camera,
  Car,
  Clock,
  Send,
  Eye,
  Flame,
  WifiOff,
  ScanLine,
  Navigation,
  AlertOctagon,
  ArrowRightLeft,
  Gauge
} from 'lucide-react';
import playAlert from '../component/alert';

export const Alerts = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [isSirenMuted, setIsSirenMuted] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Master Alerts Telemetry Dataset covering all requested categories
  const [alertsList, setAlertsList] = useState([
    {
      id: 'ALT-1001',
      title: 'Vehicle detected in restricted zone',
      category: 'Restricted Zone',
      severity: 'critical',
      severityLabel: 'HIGH PRIORITY',
      plate: 'HP01AB1234',
      camera: 'CAM-07',
      cameraName: 'ISBT Bus Terminal Interchange',
      time: '10:42 AM',
      rawTimestamp: '2026-09-21 10:42:18',
      speed: '34 km/h',
      confidence: '99.4%',
      status: 'Action Required',
      description: 'Vehicle entered a restricted zone without permission.',
      evidenceSnapshot: 'White Sedan detected in bus bay area.',
      fineAmount: '₹5,000',
      actionTaken: 'Pending Dispatch'
    },
    {
      id: 'ALT-1002',
      title: 'Blacklisted Vehicle Flagged',
      category: 'Blacklisted Vehicle',
      severity: 'critical',
      severityLabel: 'HIGH PRIORITY',
      plate: 'HR 26 DQ 8821',
      camera: 'CAM-01',
      cameraName: 'Shimla Entry (North Gateway)',
      time: '10:38 AM',
      rawTimestamp: '2026-09-21 10:38:05',
      speed: '62 km/h',
      confidence: '98.8%',
      status: 'Interception Active',
      description: 'Vehicle matched against stolen vehicle database (FIR #2026/8912).',
      evidenceSnapshot: 'Grey SUV detected at North toll checkpoint.',
      fineAmount: 'Impound Warrant',
      actionTaken: 'Patrol Car PCR-02 Dispatched'
    },
    {
      id: 'ALT-1003',
      title: 'Accident Detected - Multi-Vehicle Collision',
      category: 'Accident Detected',
      severity: 'critical',
      severityLabel: 'HIGH PRIORITY',
      plate: 'ACC-01 (Multiple)',
      camera: 'CAM-04',
      cameraName: 'Mall Road Commercial Corridor',
      time: '10:31 AM',
      rawTimestamp: '2026-09-21 10:31:40',
      speed: '0 km/h (Impact)',
      confidence: '96.2%',
      status: 'Emergency Units Enroute',
      description: 'Two-vehicle collision detected, Lane 2 blocked.',
      evidenceSnapshot: 'Collision between sedan and delivery vehicle.',
      fineAmount: 'N/A (Accident)',
      actionTaken: 'Ambulance AMB-03 & PCR-04 Dispatched'
    },
    {
      id: 'ALT-1004',
      title: 'Wrong Direction Driving Detected',
      category: 'Wrong Direction',
      severity: 'critical',
      severityLabel: 'HIGH PRIORITY',
      plate: 'UP 16 GH 3456',
      camera: 'CAM-09',
      cameraName: 'Sanjauli East Tunnel Ramp',
      time: '10:25 AM',
      rawTimestamp: '2026-09-21 10:25:12',
      speed: '38 km/h (Reverse Flow)',
      confidence: '97.5%',
      status: 'Urgent Intercept',
      description: 'Vehicle driving the wrong way on a one-way ramp.',
      evidenceSnapshot: 'Black Hatchback going against traffic on ramp.',
      fineAmount: '₹5,000',
      actionTaken: 'Overhead VMS Warning Triggered'
    },
    {
      id: 'ALT-1005',
      title: 'Severe Speed Violation (88 in 50)',
      category: 'Speed Violation',
      severity: 'danger',
      severityLabel: 'HIGH PRIORITY',
      plate: 'DL 01 AB 1234',
      camera: 'CAM-02',
      cameraName: 'Ridge Vista Radial Junction',
      time: '10:19 AM',
      rawTimestamp: '2026-09-21 10:19:44',
      speed: '88 km/h',
      confidence: '99.1%',
      status: 'Challan Queued',
      description: 'Vehicle detected 38 km/h over the speed limit.',
      evidenceSnapshot: 'Dark Blue Sedan captured at speed checkpoint.',
      fineAmount: '₹2,000',
      actionTaken: 'Automated E-Challan Pending'
    },
    {
      id: 'ALT-1006',
      title: 'Red Light Signal Violation',
      category: 'Red Light Violation',
      severity: 'danger',
      severityLabel: 'HIGH PRIORITY',
      plate: 'KA 03 EF 9012',
      camera: 'CAM-04',
      cameraName: 'Mall Road Commercial Corridor',
      time: '10:14 AM',
      rawTimestamp: '2026-09-21 10:14:22',
      speed: '46 km/h',
      confidence: '98.0%',
      status: 'Challan Auto-Issued',
      description: 'Vehicle crossed stop-line 3.4 seconds after red signal.',
      evidenceSnapshot: 'White Van crossing zebra marking during red light.',
      fineAmount: '₹1,000',
      actionTaken: 'Challan #ECH-9042 Issued'
    },
    {
      id: 'ALT-1007',
      title: 'Heavy Traffic Congestion & Gridlock Warning',
      category: 'Traffic Congestion',
      severity: 'warning',
      severityLabel: 'ELEVATED ALERT',
      plate: 'ZONE-A (Bottleneck)',
      camera: 'CAM-04',
      cameraName: 'Mall Road Choke Zone',
      time: '10:05 AM',
      rawTimestamp: '2026-09-21 10:05:00',
      speed: '14 km/h',
      confidence: '99.9%',
      status: 'Signal Timing Adaptive',
      description: 'Road density above 90%; queue length 380m, 18 min delay.',
      evidenceSnapshot: 'Stationary queue from Mall Road to Ridge area.',
      fineAmount: 'N/A (Congestion)',
      actionTaken: 'Green Signal Cycle Extended +35s'
    },
    {
      id: 'ALT-1008',
      title: 'Surveillance Camera Offline / Stream Loss',
      category: 'Camera Offline',
      severity: 'warning',
      severityLabel: 'HARDWARE FAULT',
      plate: 'N/A (Hardware)',
      camera: 'CAM-08',
      cameraName: 'Industrial Corridor Gate 4',
      time: '09:52 AM',
      rawTimestamp: '2026-09-21 09:52:10',
      speed: 'N/A',
      confidence: '0%',
      status: 'Technician Assigned',
      description: 'Camera stream lost; 3 consecutive health checks failed.',
      evidenceSnapshot: 'No signal from IP 192.168.10.108.',
      fineAmount: 'N/A (Hardware)',
      actionTaken: 'Technician Ticket #TCK-881 Created'
    },
    {
      id: 'ALT-1009',
      title: 'Low ANPR Confidence Score (61%)',
      category: 'Low ANPR Confidence',
      severity: 'info',
      severityLabel: 'OCR AUDIT REQUIRED',
      plate: 'DL 04 B? 9?11',
      camera: 'CAM-07',
      cameraName: 'ISBT Bus Terminal Interchange',
      time: '09:41 AM',
      rawTimestamp: '2026-09-21 09:41:33',
      speed: '28 km/h',
      confidence: '61.4%',
      status: 'Manual Review Required',
      description: 'Plate characters 6-8 unclear due to dirt or glare.',
      evidenceSnapshot: 'Rear plate partially obscured on commercial vehicle.',
      fineAmount: 'Pending Review',
      actionTaken: 'Queued for Manual Operator Verification'
    }
  ]);

  // Handle Acknowledge Action
  const handleAcknowledge = (alertId) => {
    setAlertsList((prev) =>
      prev.map((item) =>
        item.id === alertId ? { ...item, status: 'Acknowledged' } : item
      )
    );
    toast.addToast({
      type: 'success',
      title: `Alert ${alertId} Acknowledged`,
      message: 'Alert acknowledged and logged.'
    });
  };

  // Handle Patrol Dispatch
  const handleDispatch = (alertItem) => {
    setAlertsList((prev) =>
      prev.map((item) =>
        item.id === alertItem.id ? { ...item, status: 'Patrol Dispatched' } : item
      )
    );
    toast.addToast({
      type: 'danger',
      title: `Patrol Dispatched for ${alertItem.id}`,
      message: `Unit dispatched to ${alertItem.camera}.`
    });
  };

  // Filter and search logic
  const filteredAlerts = alertsList.filter((item) => {
    // Severity Filter
    if (severityFilter !== 'all' && item.severity !== severityFilter) {
      return false;
    }
    // Category Filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      return false;
    }
    // Search Query (Plate, Camera, Alert ID, Title)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchPlate = item.plate.toLowerCase().includes(q);
      const matchCam = item.camera.toLowerCase().includes(q);
      const matchId = item.id.toLowerCase().includes(q);
      const matchTitle = item.title.toLowerCase().includes(q);
      return matchPlate || matchCam || matchId || matchTitle;
    }
    return true;
  });

  // Category Icon Resolver
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Restricted Zone':
        return <AlertOctagon className="w-4 h-4 text-red-400" />;
      case 'Blacklisted Vehicle':
        return <ShieldAlert className="w-4 h-4 text-red-400" />;
      case 'Accident Detected':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'Wrong Direction':
        return <ArrowRightLeft className="w-4 h-4 text-amber-400" />;
      case 'Speed Violation':
        return <Gauge className="w-4 h-4 text-amber-400" />;
      case 'Red Light Violation':
        return <Flame className="w-4 h-4 text-red-400" />;
      case 'Traffic Congestion':
        return <Navigation className="w-4 h-4 text-amber-400" />;
      case 'Camera Offline':
        return <WifiOff className="w-4 h-4 text-purple-400" />;
      case 'Low ANPR Confidence':
        return <ScanLine className="w-4 h-4 text-[var(--color-amber)]" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-[var(--color-amber)]" />;
    }
  };

  // Featured High-Priority Alert (Matching User Example: HP01AB1234, CAM-07, 10:42 AM)
  const heroAlert = alertsList.find((a) => a.id === 'ALT-1001') || alertsList[0];

  // Table Columns Setup
  const columns = [
    {
      key: 'id',
      label: 'Alert ID',
      render: (val) => <span className="font-mono text-[var(--color-amber)] font-bold">{val}</span>
    },
    {
      key: 'title',
      label: 'Incident Type',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          {getCategoryIcon(row.category)}
          <div>
            <div className="font-semibold text-[var(--color-text)]">{val}</div>
            <span className="text-[10px] text-[var(--color-text-muted)]">{row.category}</span>
          </div>
        </div>
      )
    },
    {
      key: 'plate',
      label: 'Plate / Identifier',
      render: (val) => (
        <span className="font-mono font-bold text-xs text-[var(--color-text)] bg-[var(--color-background)]/90 border border-[var(--color-border)] px-2 py-1 rounded-lg">
          {val}
        </span>
      )
    },
    {
      key: 'camera',
      label: 'Camera Node',
      render: (val, row) => (
        <div className="text-xs">
          <span className="font-mono font-bold text-[var(--color-amber)]">{val}</span>
          <p className="text-[10px] text-[var(--color-text-muted)] truncate max-w-[140px]">{row.cameraName}</p>
        </div>
      )
    },
    {
      key: 'time',
      label: 'Time',
      render: (val) => <span className="font-mono text-xs text-[var(--color-text-secondary)]">{val}</span>
    },
    {
      key: 'severity',
      label: 'Priority',
      render: (val, row) => (
        <Badge
          variant={val === 'critical' ? 'danger' : val === 'danger' ? 'danger' : val === 'warning' ? 'warning' : 'info'}
          dot={true}
          pulse={val === 'critical' || val === 'danger'}
          size="sm"
        >
          {row.severityLabel}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span
          className={`text-xs font-medium ${
            val.includes('Dispatched') || val.includes('Issued')
              ? 'text-emerald-400'
              : val.includes('Required') || val.includes('Active')
              ? 'text-amber-400'
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          {val}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Action',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              setSelectedAlert(row);
              setIsDetailModalOpen(true);
            }}
          >
            Inspect
          </Button>
          <Button
            variant="danger"
            size="xs"
            onClick={() => handleDispatch(row)}
          >
            Dispatch
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------------------
          Header Bar with SIH 2026 Alarm Actuator
      ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[var(--color-text)] tracking-tight">
                  Alerts
                </h1>
                <Badge variant="danger" size="sm" dot={true} pulse={true}>
                  {alertsList.filter((a) => a.severity === 'critical').length} CRITICAL
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Real-time alerts from cameras and ANPR
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={isSirenMuted ? 'outline' : 'danger'}
            size="sm"
            leftIcon={isSirenMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            onClick={() => {
              if (!isSirenMuted) {
                playAlert();
                toast.addToast({
                  type: 'danger',
                  title: 'Siren Activated',
                  message: 'Alert tone playing.'
                });
              } else {
                toast.addToast({
                  type: 'info',
                  title: 'Siren Muted',
                  message: 'Siren notifications muted.'
                });
              }
              setIsSirenMuted(!isSirenMuted);
            }}
          >
            {isSirenMuted ? 'Unmute Audio Siren' : 'Test Console Siren'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Navigation className="w-3.5 h-3.5" />}
            onClick={() => navigate('/traffic')}
          >
            Open Traffic Map
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Top HUD Quick Telemetry Metrics
      ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[rgba(220,53,69,0.06)] border border-red-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider block">
              High Priority Alerts
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black font-mono text-red-400">
                {alertsList.filter((a) => a.severity === 'critical').length}
              </span>
              <span className="text-[10px] text-red-300 font-semibold">● Immediate Action</span>
            </div>
          </div>
          <AlertOctagon className="w-7 h-7 text-red-400 opacity-80" />
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
              Dispatches Active
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black font-mono text-amber-400">4 Units</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">PCR & Tow Trucks</span>
            </div>
          </div>
          <Send className="w-7 h-7 text-amber-400 opacity-80" />
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
              Hardware Outages
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black font-mono text-[var(--color-text)]">1 Node</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">CAM-08 Offline</span>
            </div>
          </div>
          <WifiOff className="w-7 h-7 text-[var(--color-text-secondary)] opacity-80" />
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
              Average Response Time
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black font-mono text-[var(--color-amber)]">1.8 min</span>
              <span className="text-[10px] text-[var(--color-text-muted)] font-semibold">● Optimal</span>
            </div>
          </div>
          <Clock className="w-7 h-7 text-[var(--color-amber)] opacity-80" />
        </div>
      </div>

      {/* -------------------------------------------------------------
          HERO LIVE ALERT BANNER: The Exact User Example
          🔴 HIGH PRIORITY: Vehicle detected in restricted zone
          Plate: HP01AB1234 | Camera: CAM-07 | Time: 10:42 AM
      ------------------------------------------------------------- */}
      <Card variant="alert" className="border-2 border-red-500/60 shadow-sm relative overflow-hidden">
        {/* Background Glowing Watermark & Scanline */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />

        <div className="p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Column: Severity & Incident Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 text-[var(--color-text)] text-xs font-black tracking-wider uppercase shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
                  HIGH PRIORITY
                </span>
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wide">
                  Active Alert • #{heroAlert.id}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)] tracking-tight flex items-center gap-2">
                  <AlertOctagon className="w-6 h-6 text-red-500 shrink-0" />
                  {heroAlert.title}
                </h2>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 max-w-2xl">
                  {heroAlert.description}
                </p>
              </div>

              {/* Exact User Parameters: Plate, Camera, Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Plate Card */}
                <div className="p-2.5 rounded-xl bg-[var(--color-charcoal)]/80 border border-[var(--color-border)] flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[rgba(245,166,35,0.06)] text-[var(--color-amber)]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold block">Plate</span>
                    <span className="text-sm font-mono font-black text-[var(--color-text)] tracking-wider">
                      {heroAlert.plate}
                    </span>
                  </div>
                </div>

                {/* Camera Card */}
                <div className="p-2.5 rounded-xl bg-[var(--color-charcoal)]/80 border border-[var(--color-border)] flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold block">Camera</span>
                    <span className="text-sm font-mono font-black text-[var(--color-amber)]">
                      {heroAlert.camera}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] block truncate">({heroAlert.cameraName})</span>
                  </div>
                </div>

                {/* Time Card */}
                <div className="p-2.5 rounded-xl bg-[var(--color-charcoal)]/80 border border-[var(--color-border)] flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[rgba(245,166,35,0.06)] text-[var(--color-amber)]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold block">Time</span>
                    <span className="text-sm font-mono font-black text-[var(--color-text)]">
                      {heroAlert.time}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] block font-mono">Today, 21 Sep</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Incident Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center">
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Send className="w-4 h-4" />}
                onClick={() => handleDispatch(heroAlert)}
                className="w-full sm:w-auto"
              >
                Dispatch
              </Button>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<Navigation className="w-4 h-4" />}
                onClick={() => navigate(`/tracking/${heroAlert.plate}`)}
                className="w-full sm:w-auto"
              >
                Track on Map
              </Button>

              <Button
                variant="outline"
                size="sm"
                leftIcon={<Eye className="w-4 h-4" />}
                onClick={() => {
                  setSelectedAlert(heroAlert);
                  setIsDetailModalOpen(true);
                }}
                className="w-full sm:w-auto"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* -------------------------------------------------------------
          Filter Bar & Category Tabs
      ------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[var(--color-card)]/60 p-3 rounded-2xl border border-[var(--color-border)]">
          {/* Search Box */}
          <div className="w-full md:w-80">
            <SearchBar
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Search plate (HP01AB1234), camera, or alert..."
            />
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {/* Severity selector */}
            <div className="flex items-center gap-1 bg-[var(--color-charcoal)] p-1 rounded-xl border border-[var(--color-border)] mr-2">
              {[
                { id: 'all', label: 'All Severities' },
                { id: 'critical', label: '🔴 Critical' },
                { id: 'danger', label: '🟠 High' },
                { id: 'warning', label: '🟡 Warning' }
              ].map((sev) => (
                <button
                  key={sev.id}
                  onClick={() => setSeverityFilter(sev.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    severityFilter === sev.id
                      ? 'bg-red-500/20 text-red-300 border border-[rgba(220,53,69,0.3)] font-bold'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {sev.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {[
              { id: 'all', label: 'All Alerts' },
              { id: 'Restricted Zone', label: 'Restricted Zone' },
              { id: 'Speed Violation', label: 'Speeding' },
              { id: 'Red Light Violation', label: 'Red Light' },
              { id: 'Wrong Direction', label: 'Wrong Direction' },
              { id: 'Blacklisted Vehicle', label: 'Blacklisted' },
              { id: 'Accident Detected', label: 'Accidents' },
              { id: 'Traffic Congestion', label: 'Congestion' },
              { id: 'Camera Offline', label: 'Hardware' },
              { id: 'Low ANPR Confidence', label: 'ANPR Audit' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 ${
                  categoryFilter === cat.id
                    ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)] font-bold shadow-sm'
                    : 'bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-[var(--color-charcoal)] p-1 rounded-xl border border-[var(--color-border)] shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'cards'
                  ? 'bg-[var(--color-amber)]/20 text-[var(--color-amber)] border border-[var(--color-amber)]/30 font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              Cards View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-[var(--color-amber)]/20 text-[var(--color-amber)] border border-[var(--color-amber)]/30 font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              Telemetry Table
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Alerts Feed: Cards View or Table View
      ------------------------------------------------------------- */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAlerts.map((item) => {
            const isCritical = item.severity === 'critical';
            const isDanger = item.severity === 'danger';
            const isWarning = item.severity === 'warning';

            return (
              <Card
                key={item.id}
                variant={isCritical ? 'alert' : isDanger ? 'glow' : 'default'}
                className="flex flex-col justify-between hover:border-[var(--color-amber)] transition-all duration-200 group"
              >
                <CardHeader className="p-4 pb-2 border-b border-[var(--color-border)]/80">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-[var(--color-amber)]">{item.id}</div>
                        <span className="text-[10px] text-[var(--color-text-muted)]">{item.category}</span>
                      </div>
                    </div>
                    <Badge
                      variant={isCritical || isDanger ? 'danger' : isWarning ? 'warning' : 'info'}
                      dot={true}
                      pulse={isCritical}
                      size="sm"
                    >
                      {item.severityLabel}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-3 text-xs flex-1">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-xs mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Core Telemetry Strip */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]/80 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase block font-sans">Plate</span>
                      <span className="font-bold text-[var(--color-text)] tracking-wide">{item.plate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase block font-sans">Camera</span>
                      <span className="font-bold text-[var(--color-amber)]">{item.camera}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase block font-sans">Speed</span>
                      <span className="font-bold text-[var(--color-text)]">{item.speed}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase block font-sans">Time</span>
                      <span className="font-bold text-[var(--color-text-secondary)]">{item.time}</span>
                    </div>
                  </div>

                  {/* Action Taken & Status Badge */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[var(--color-text-muted)]">Current Status:</span>
                    <span
                      className={`font-semibold ${
                        item.status.includes('Dispatched') || item.status.includes('Issued')
                          ? 'text-emerald-400'
                          : item.status.includes('Required') || item.status.includes('Active')
                          ? 'text-red-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </CardContent>

                {/* Footer Buttons */}
                <div className="p-3 pt-0 border-t border-[var(--color-border)]/50 mt-auto flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="xs"
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => {
                      setSelectedAlert(item);
                      setIsDetailModalOpen(true);
                    }}
                    className="flex-1"
                  >
                    Inspect
                  </Button>

                  <Button
                    variant={isCritical ? 'danger' : 'primary'}
                    size="xs"
                    onClick={() => handleAcknowledge(item.id)}
                    className="flex-1"
                  >
                    Acknowledge
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card variant="default">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Alerts Table</CardTitle>
            <CardDescription className="text-xs">
              Showing {filteredAlerts.length} alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table columns={columns} data={filteredAlerts} />
          </CardContent>
        </Card>
      )}

      {/* -------------------------------------------------------------
          Detailed Alert Inspection Modal
      ------------------------------------------------------------- */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={selectedAlert ? `Alert Details: ${selectedAlert.id}` : 'Alert Details'}
        size="lg"
      >
        {selectedAlert && (
          <div className="space-y-4 text-xs">
            {/* Modal Header Strip */}
            <div className="p-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getCategoryIcon(selectedAlert.category)}
                <div>
                  <h4 className="font-bold text-sm text-[var(--color-text)]">{selectedAlert.title}</h4>
                  <span className="text-[11px] text-[var(--color-text-muted)]">Category: {selectedAlert.category}</span>
                </div>
              </div>
              <Badge
                variant={
                  selectedAlert.severity === 'critical' || selectedAlert.severity === 'danger'
                    ? 'danger'
                    : selectedAlert.severity === 'warning'
                    ? 'warning'
                    : 'info'
                }
              >
                {selectedAlert.severityLabel}
              </Badge>
            </div>

            {/* AI Evidence View Snapshot Mockup */}
            <div className="relative aspect-video rounded-xl bg-black border border-[var(--color-border)] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

              {/* Bounding box simulation */}
              <div className="relative z-10 p-3 rounded-lg border-2 border-red-500 bg-red-500/10 text-center space-y-1">
                <span className="font-mono text-sm font-black text-red-300 block">
                  {selectedAlert.plate}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                  CONFIDENCE: {selectedAlert.confidence}
                </span>
                <span className="text-[10px] text-[var(--color-text-secondary)] block">
                  TRIGGER: {selectedAlert.camera} ({selectedAlert.time})
                </span>
              </div>

              <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-[var(--color-text)]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>CAMERA FEED • {selectedAlert.camera}</span>
              </div>

              <div className="absolute bottom-2 left-2 z-20 text-[10px] font-mono text-[var(--color-text-muted)]">
                {selectedAlert.evidenceSnapshot}
              </div>
            </div>

            {/* Incident Specification Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Plate</span>
                <span className="font-mono font-bold text-[var(--color-text)] text-xs mt-0.5 block">
                  {selectedAlert.plate}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Camera</span>
                <span className="font-mono font-bold text-[var(--color-amber)] text-xs mt-0.5 block">
                  {selectedAlert.camera}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Time</span>
                <span className="font-mono font-bold text-[var(--color-text)] text-xs mt-0.5 block">
                  {selectedAlert.time}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Fine</span>
                <span className="font-mono font-bold text-amber-400 text-xs mt-0.5 block">
                  {selectedAlert.fineAmount}
                </span>
              </div>
            </div>

            {/* Narrative & Audit */}
            <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/50 border border-[var(--color-border)] space-y-1.5">
              <span className="font-bold text-[var(--color-text-secondary)] block text-xs">Details:</span>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-xs">
                {selectedAlert.description} Logged at {selectedAlert.rawTimestamp}.
              </p>
              <div className="text-[11px] text-[var(--color-amber)] font-mono mt-1">
                Action Executed: {selectedAlert.actionTaken}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Dismiss
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Navigation className="w-3.5 h-3.5" />}
                onClick={() => {
                  setIsDetailModalOpen(false);
                  navigate(`/traffic`);
                }}
              >
                Track On Traffic Map
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() => {
                  handleDispatch(selectedAlert);
                  setIsDetailModalOpen(false);
                }}
              >
                Confirm Dispatch
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Alerts;
