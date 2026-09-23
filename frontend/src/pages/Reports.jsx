import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Dropdown,
  Table,
  useToast
} from '../component';
import {
  FileText,
  Download,
  FileSpreadsheet,
  Printer,
  Calendar,
  Camera,
  Car,
  ShieldAlert,
  BarChart3,
  ScanLine,
  Navigation,
  Flame,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

// -------------------------------------------------------------
// The 6 Standardized SIH Report Types
// -------------------------------------------------------------
const REPORT_TYPES = [
  {
    id: 'daily-traffic',
    title: 'Daily Traffic Report',
    icon: <BarChart3 className="w-5 h-5 text-[var(--color-amber)]" />,
    description: 'Hourly vehicle counts, speeds, and peak hours.',
    coverage: '24-Hour Operating Cycle',
    defaultMetrics: {
      primaryLabel: 'Total Vehicles Recorded',
      primaryValue: '48,240',
      secondaryLabel: 'Mean Network Velocity',
      secondaryValue: '46.2 km/h',
      tertiaryLabel: 'Peak Demand Window',
      tertiaryValue: '08:30 - 10:15 AM'
    }
  },
  {
    id: 'weekly-anpr',
    title: 'Weekly ANPR Report',
    icon: <ScanLine className="w-5 h-5 text-emerald-400" />,
    description: 'Plate recognition accuracy and hotlist matches.',
    coverage: 'Rolling 7-Day Cycle',
    defaultMetrics: {
      primaryLabel: 'Plates Digitized',
      primaryValue: '312,890',
      secondaryLabel: 'OCR Confidence Score',
      secondaryValue: '99.2%',
      tertiaryLabel: 'Hotlist Matches',
      tertiaryValue: '18 Flagged'
    }
  },
  {
    id: 'camera-performance',
    title: 'Camera Performance Report',
    icon: <Camera className="w-5 h-5 text-purple-400" />,
    description: 'Camera uptime, stream quality, latency, and hardware health.',
    coverage: 'Hardware Operations',
    defaultMetrics: {
      primaryLabel: 'Network Sensor Uptime',
      primaryValue: '99.8%',
      secondaryLabel: 'Mean Stream Latency',
      secondaryValue: '14 ms',
      tertiaryLabel: 'Active Surveillance Nodes',
      tertiaryValue: '48 of 48 Online'
    }
  },
  {
    id: 'violation-report',
    title: 'Violation Report',
    icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
    description: 'E-Challan records, speed breaches, red light violations, and fine recovery.',
    coverage: 'Enforcement Division',
    defaultMetrics: {
      primaryLabel: 'Total Citations Issued',
      primaryValue: '1,420',
      secondaryLabel: 'Statutory Fine Levied',
      secondaryValue: '₹18,40,000',
      tertiaryLabel: 'Online Payment Recovery',
      tertiaryValue: '72.4%'
    }
  },
  {
    id: 'vehicle-movement',
    title: 'Vehicle Movement Report',
    icon: <Navigation className="w-5 h-5 text-amber-400" />,
    description: 'Vehicle routes, travel times between cameras, and checkpoint data.',
    coverage: 'Spatial Intelligence',
    defaultMetrics: {
      primaryLabel: 'Monitored Trajectories',
      primaryValue: '18,450',
      secondaryLabel: 'Mean Transit Duration',
      secondaryValue: '28.4 min',
      tertiaryLabel: 'Corridor Adherence',
      tertiaryValue: '94.6%'
    }
  },
  {
    id: 'traffic-density',
    title: 'Traffic Density Report',
    icon: <Flame className="w-5 h-5 text-red-500" />,
    description: 'Congestion heatmaps, lane usage, queue delays, and signal efficiency.',
    coverage: 'Smart City Operations',
    defaultMetrics: {
      primaryLabel: 'Arterial Congestion Index',
      primaryValue: '34.2 (Moderate)',
      secondaryLabel: 'Queue Choke Delay',
      secondaryValue: '+18 min (Mall Rd)',
      tertiaryLabel: 'Signal Cycle Savings',
      tertiaryValue: '-14% Wait Time'
    }
  }
];

export const Reports = () => {
  const toast = useToast();

  // Selected Report Type
  const [selectedReportId, setSelectedReportId] = useState('daily-traffic');

  // Filter Form State: Date Range, Camera, Vehicle Type, Violation Type
  const [dateRange, setDateRange] = useState('past-7-days');
  const [selectedCamera, setSelectedCamera] = useState('all');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [selectedViolationType, setSelectedViolationType] = useState('all');

  // Generation & Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(REPORT_TYPES[0]);
  const [lastGeneratedTime, setLastGeneratedTime] = useState('Today, 11:05 AM');

  // Active Report Object
  const currentSelectedConfig =
    REPORT_TYPES.find((r) => r.id === selectedReportId) || REPORT_TYPES[0];

  // Options for Dropdowns
  const dateRangeOptions = [
    { label: 'Today (Past 24 Hours)', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Past 7 Days (Weekly)', value: 'past-7-days' },
    { label: 'Last 30 Days (Monthly)', value: 'last-30-days' },
    { label: 'Year to Date (2026)', value: 'ytd' }
  ];

  const cameraOptions = [
    { label: 'All Cameras (Master Grid)', value: 'all' },
    { label: 'CAM-01: Shimla Entry (North Gateway)', value: 'CAM-01' },
    { label: 'CAM-02: Ridge Vista Radial Junction', value: 'CAM-02' },
    { label: 'CAM-04: Mall Road Commercial Corridor', value: 'CAM-04' },
    { label: 'CAM-07: ISBT Bus Terminal Interchange', value: 'CAM-07' },
    { label: 'CAM-08: Industrial Corridor Gate 4', value: 'CAM-08' },
    { label: 'CAM-09: Sanjauli Tunnel East', value: 'CAM-09' },
    { label: 'CAM-12: South Bypass Expressway Link', value: 'CAM-12' }
  ];

  const vehicleTypeOptions = [
    { label: 'All Vehicle Classes', value: 'all' },
    { label: 'Sedan / Private Hatchback', value: 'sedan' },
    { label: 'SUV / MUV / Light Commercial', value: 'suv' },
    { label: 'Heavy Commercial Truck / Freight', value: 'truck' },
    { label: 'Public Transit Bus / Carrier', value: 'bus' },
    { label: 'Two-Wheeler (Motorcycle / Scooter)', value: 'two-wheeler' },
    { label: 'Auto-Rickshaw / Para-Transit', value: 'auto' }
  ];

  const violationTypeOptions = [
    { label: 'All Violation Categories', value: 'all' },
    { label: 'Speed Violation (Overspeeding)', value: 'speed' },
    { label: 'Red Light Signal Jump', value: 'red-light' },
    { label: 'Wrong Way / Counter-Flow Breach', value: 'wrong-way' },
    { label: 'Restricted Zone Perimeter Intrusion', value: 'restricted-zone' },
    { label: 'Triple Riding / Helmetless Infraction', value: 'helmetless' }
  ];

  // -------------------------------------------------------------
  // Dynamic Table Data Generator based on Report Type
  // -------------------------------------------------------------
  const getReportTableData = () => {
    switch (generatedReport.id) {
      case 'daily-traffic':
        return {
          columns: [
            { key: 'interval', label: 'Time Window' },
            { key: 'cam', label: 'Primary Node' },
            { key: 'volume', label: 'Vehicle Volume' },
            { key: 'speed', label: 'Average Velocity' },
            { key: 'density', label: 'Lane Density' },
            { key: 'status', label: 'Flow Condition' }
          ],
          rows: [
            { id: 1, interval: '08:00 - 09:00 AM', cam: 'CAM-01', volume: '4,280 veh', speed: '54 km/h', density: '38%', status: 'Free Flow' },
            { id: 2, interval: '09:00 - 10:00 AM', cam: 'CAM-04', volume: '6,420 veh', speed: '14 km/h', density: '92%', status: 'Heavy Choke' },
            { id: 3, interval: '10:00 - 11:00 AM', cam: 'CAM-07', volume: '5,180 veh', speed: '32 km/h', density: '68%', status: 'Moderate Flow' },
            { id: 4, interval: '11:00 - 12:00 PM', cam: 'CAM-12', volume: '3,840 veh', speed: '62 km/h', density: '29%', status: 'Free Flow' }
          ]
        };

      case 'weekly-anpr':
        return {
          columns: [
            { key: 'date', label: 'Date' },
            { key: 'reads', label: 'Total Plates Read' },
            { key: 'confidence', label: 'OCR Confidence' },
            { key: 'unique', label: 'Unique Vehicles' },
            { key: 'hotlist', label: 'Hotlist Matches' },
            { key: 'status', label: 'Data Quality' }
          ],
          rows: [
            { id: 1, date: '2026-09-21 (Today)', reads: '48,240', confidence: '99.4%', unique: '38,120', hotlist: '3 Flagged', status: 'Optimal' },
            { id: 2, date: '2026-09-20', reads: '51,480', confidence: '99.1%', unique: '41,200', hotlist: '2 Flagged', status: 'Optimal' },
            { id: 3, date: '2026-09-19', reads: '49,820', confidence: '98.9%', unique: '39,450', hotlist: '4 Flagged', status: 'Optimal' },
            { id: 4, date: '2026-09-18', reads: '46,120', confidence: '99.2%', unique: '36,890', hotlist: '1 Flagged', status: 'Optimal' }
          ]
        };

      case 'camera-performance':
        return {
          columns: [
            { key: 'cam', label: 'Camera ID' },
            { key: 'location', label: 'Installation Node' },
            { key: 'uptime', label: 'Stream Uptime' },
            { key: 'latency', label: 'Mean Latency' },
            { key: 'fps', label: 'FPS Delivery' },
            { key: 'health', label: 'Hardware Health' }
          ],
          rows: [
            { id: 1, cam: 'CAM-01', location: 'Shimla Entry (North)', uptime: '100%', latency: '12 ms', fps: '60 FPS', health: 'Healthy' },
            { id: 2, cam: 'CAM-04', location: 'Mall Road Commercial', uptime: '99.9%', latency: '18 ms', fps: '30 FPS', health: 'Healthy' },
            { id: 3, cam: 'CAM-07', location: 'ISBT Bus Terminal', uptime: '99.8%', latency: '24 ms', fps: '45 FPS', health: 'Healthy' },
            { id: 4, cam: 'CAM-08', location: 'Industrial Corridor Gate 4', uptime: '94.2%', latency: '110 ms', fps: '0 FPS', health: 'Offline Fault' }
          ]
        };

      case 'violation-report':
        return {
          columns: [
            { key: 'citation', label: 'Citation ID' },
            { key: 'plate', label: 'License Plate' },
            { key: 'type', label: 'Violation Type' },
            { key: 'cam', label: 'Camera' },
            { key: 'amount', label: 'Statutory Fine' },
            { key: 'status', label: 'Enforcement Status' }
          ],
          rows: [
            { id: 1, citation: 'VIO-2026-001', plate: 'HP01AB1234', type: 'Speed (78 in 50)', cam: 'CAM-04', amount: '₹2,000', status: 'Pending Dispatch' },
            { id: 2, citation: 'VIO-2026-002', plate: 'DL05XY7788', type: 'Red Light Jump', cam: 'CAM-07', amount: '₹1,000', status: 'Notice Dispatched' },
            { id: 3, citation: 'VIO-2026-003', plate: 'HR26CD9911', type: 'Wrong Way Counter', cam: 'CAM-02', amount: '₹5,000', status: 'Summons Queued' },
            { id: 4, citation: 'VIO-2026-004', plate: 'UP16GH3456', type: 'Speed (86 in 60)', cam: 'CAM-01', amount: '₹2,000', status: 'Paid Online' }
          ]
        };

      case 'vehicle-movement':
        return {
          columns: [
            { key: 'route', label: 'Corridor Route' },
            { key: 'volume', label: 'Vehicles Tracked' },
            { key: 'avgTime', label: 'Avg Travel Duration' },
            { key: 'freeFlowTime', label: 'Free Flow Target' },
            { key: 'delay', label: 'Delay Variance' },
            { key: 'rating', label: 'Corridor Efficiency' }
          ],
          rows: [
            { id: 1, route: 'CAM-01 ➔ CAM-04', volume: '14,280', avgTime: '34 min', freeFlowTime: '18 min', delay: '+16 min', rating: 'Choked' },
            { id: 2, route: 'CAM-04 ➔ CAM-07', volume: '12,650', avgTime: '22 min', freeFlowTime: '14 min', delay: '+8 min', rating: 'Moderate' },
            { id: 3, route: 'CAM-07 ➔ CAM-12', volume: '9,840', avgTime: '16 min', freeFlowTime: '15 min', delay: '+1 min', rating: 'Optimal' }
          ]
        };

      case 'traffic-density':
      default:
        return {
          columns: [
            { key: 'zone', label: 'Congestion Zone' },
            { key: 'arterial', label: 'Arterial Corridor' },
            { key: 'capacity', label: 'Road Saturation' },
            { key: 'speed', label: 'Mean Velocity' },
            { key: 'queue', label: 'Queue Length' },
            { key: 'mitigation', label: 'Adaptive Signal' }
          ],
          rows: [
            { id: 1, zone: 'ZONE-A', arterial: 'Mall Road Central', capacity: '94% (Critical)', speed: '14 km/h', queue: '380 m', mitigation: '+35s Green Extension' },
            { id: 2, zone: 'ZONE-B', arterial: 'ISBT Terminal Ramp', capacity: '68% (Elevated)', speed: '32 km/h', queue: '160 m', mitigation: '+15s Green Extension' },
            { id: 3, zone: 'ZONE-C', arterial: 'North Highway Link', capacity: '32% (Free)', speed: '58 km/h', queue: '0 m', mitigation: 'Standard Cycle' }
          ]
        };
    }
  };

  const tableData = getReportTableData();

  // -------------------------------------------------------------
  // Actions: Generate, Export CSV, Export PDF
  // -------------------------------------------------------------
  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedReport(currentSelectedConfig);
      setLastGeneratedTime('Just now (Live)');
      setIsGenerating(false);
      toast.addToast({
        type: 'success',
        title: 'Report Generated',
        message: `${currentSelectedConfig.title} compiled with selected filters.`
      });
    }, 600);
  };

  const handleExportCSV = () => {
    // Generate real CSV content
    const headers = tableData.columns.map((c) => c.label).join(',');
    const rows = tableData.rows
      .map((r) => tableData.columns.map((c) => `"${r[c.key]}"`).join(','))
      .join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${generatedReport.id}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.addToast({
      type: 'success',
      title: 'CSV Export Initiated',
      message: `${generatedReport.title} exported to local filesystem.`
    });
  };

  const handleExportPDF = () => {
    window.print();
    toast.addToast({
      type: 'info',
      title: 'PDF Print Console Opened',
      message: 'Generated audit dossier prepared for PDF export.'
    });
  };

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------------------
          Header Bar with SIH 2026 Government Audit Badges
      ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[var(--color-text)] tracking-tight uppercase">
                  REPORTS
                </h1>
                <Badge variant="info" size="sm" dot={true}>
                  REPORTS
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Generate and export traffic reports
              </p>
            </div>
          </div>
        </div>

        {/* Global Export Buttons: [ Export CSV ] [ Export PDF ] */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Printer className="w-4 h-4 text-[var(--color-amber)]" />}
            onClick={handleExportPDF}
          >
            Export PDF
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          THE 6 REPORT TYPES SELECTOR CARDS
      ------------------------------------------------------------- */}
      <div>
        <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[var(--color-amber)]" />
          Report Types
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {REPORT_TYPES.map((rep) => {
            const isSelected = selectedReportId === rep.id;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReportId(rep.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[rgba(91,103,112,0.06)] border-[var(--color-amber)]/60 shadow-sm ring-1 ring-[var(--color-amber)]/50'
                    : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border)] hover:bg-[var(--color-background)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)]">
                      {rep.icon}
                    </div>
                    <Badge variant={isSelected ? 'info' : 'neutral'} size="xs">
                      {rep.coverage}
                    </Badge>
                  </div>

                  <h3 className="font-extrabold text-sm text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors">
                    {rep.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                    {rep.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--color-border)]/80 flex items-center justify-between text-[11px]">
                  <span className="text-[var(--color-text-muted)] font-mono font-medium">Click to Select</span>
                  {isSelected ? (
                    <span className="text-[var(--color-amber)] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                    </span>
                  ) : (
                    <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">
                      Select
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------
          FILTER CONSOLE: Date Range | Camera | Vehicle Type | Violation Type
          Trigger: [ Generate Report ]
      ------------------------------------------------------------- */}
      <Card variant="default">
        <CardHeader className="p-4 pb-2 border-b border-[var(--color-border)]/80">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-amber)]" />
              Configure Filters for: <span className="text-[var(--color-amber)]">{currentSelectedConfig.title}</span>
            </CardTitle>
            <span className="text-xs font-mono text-[var(--color-text-muted)]"></span>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Date Range */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                Date Range
              </label>
              <Dropdown
                value={dateRange}
                onChange={(val) => setDateRange(val)}
                options={dateRangeOptions}
              />
            </div>

            {/* 2. Camera */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1.5 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                Surveillance Camera
              </label>
              <Dropdown
                value={selectedCamera}
                onChange={(val) => setSelectedCamera(val)}
                options={cameraOptions}
              />
            </div>

            {/* 3. Vehicle Type */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1.5 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-emerald-400" />
                Vehicle Type
              </label>
              <Dropdown
                value={selectedVehicleType}
                onChange={(val) => setSelectedVehicleType(val)}
                options={vehicleTypeOptions}
              />
            </div>

            {/* 4. Violation Type */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                Violation Type
              </label>
              <Dropdown
                value={selectedViolationType}
                onChange={(val) => setSelectedViolationType(val)}
                options={violationTypeOptions}
              />
            </div>
          </div>

          {/* Action Bar: [ Generate Report ] [ Export CSV ] [ Export PDF ] */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--color-border)]">
            <div className="text-xs text-[var(--color-text-muted)] font-medium">
              Filter Active: <span className="text-[var(--color-text)] font-semibold">{dateRange}</span> • Camera:{' '}
              <span className="text-[var(--color-amber)] font-mono font-semibold">{selectedCamera}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />}
                onClick={handleExportCSV}
              >
                Export CSV
              </Button>

              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="w-3.5 h-3.5 text-[var(--color-amber)]" />}
                onClick={handleExportPDF}
              >
                Export PDF
              </Button>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                isLoading={isGenerating}
                onClick={handleGenerateReport}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* -------------------------------------------------------------
          LIVE GENERATED REPORT DOSSIER PREVIEW
      ------------------------------------------------------------- */}
      <Card variant="default">
        <CardHeader className="p-4 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="purple" size="sm">
                REPORT
              </Badge>
              <span className="text-xs font-mono text-[var(--color-text-muted)]"></span>
            </div>
            <CardTitle className="text-base mt-1 text-[var(--color-text)] flex items-center gap-2">
              {generatedReport.title}
            </CardTitle>
            <CardDescription className="text-xs">
              Compiled at {lastGeneratedTime} • Scope: {dateRange} • Node: {selectedCamera}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={handleExportCSV}
            >
              CSV Data
            </Button>
            <Button
              variant="outline"
              size="xs"
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              onClick={handleExportPDF}
            >
              Print / PDF
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Executive KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                {generatedReport.defaultMetrics.primaryLabel}
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[var(--color-text)] mt-0.5 block">
                {generatedReport.defaultMetrics.primaryValue}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                {generatedReport.defaultMetrics.secondaryLabel}
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[var(--color-amber)] mt-0.5 block">
                {generatedReport.defaultMetrics.secondaryValue}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                {generatedReport.defaultMetrics.tertiaryLabel}
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-0.5 block">
                {generatedReport.defaultMetrics.tertiaryValue}
              </span>
            </div>
          </div>

          {/* Generated Data Table */}
          <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
            <Table columns={tableData.columns} data={tableData.rows} />
          </div>

          {/* Statutory Verification Footer Stamp */}
          <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)]/50 border border-[var(--color-border)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] font-mono">
            <div>
              <span className="text-[var(--color-text-secondary)] font-semibold">Government of India / Smart Cities Mission</span>
              <span className="block text-[11px] text-[var(--color-text-muted)]">Verified Report</span>
            </div>
            <div className="text-right text-[var(--color-amber)] font-bold">
              Traffic Management System
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
