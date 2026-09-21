import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  SearchBar,
  Table,
  useToast
} from '../component';
import { ScanLine, AlertTriangle, Eye, ShieldCheck, RefreshCw } from 'lucide-react';

export const ANPR = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const anprFeeds = [
    {
      id: 'ANPR-801',
      plate: 'DL 01 AB 1234',
      confidence: '99.4%',
      vehicleType: 'White Honda City (Sedan)',
      lane: 'Lane 1 - Northbound',
      speed: '78 km/h',
      status: 'Flagged (Overspeed)',
      severity: 'danger',
      time: '14:41:22'
    },
    {
      id: 'ANPR-802',
      plate: 'MH 02 BG 9988',
      confidence: '98.7%',
      vehicleType: 'Black Hyundai Creta (SUV)',
      lane: 'Lane 2 - Northbound',
      speed: '54 km/h',
      status: 'Verified Clear',
      severity: 'success',
      time: '14:41:19'
    },
    {
      id: 'ANPR-803',
      plate: 'KA 05 MN 4455',
      confidence: '97.2%',
      vehicleType: 'Red Maruti Swift',
      lane: 'Lane 1 - Southbound',
      speed: '58 km/h',
      status: 'Verified Clear',
      severity: 'success',
      time: '14:41:10'
    },
    {
      id: 'ANPR-804',
      plate: 'UP 14 XY 0001',
      confidence: '99.9%',
      vehicleType: 'Emergency Ambulance',
      lane: 'Priority Corridor',
      speed: '82 km/h',
      status: 'Priority Green Wave Active',
      severity: 'info',
      time: '14:40:55'
    }
  ];

  const columns = [
    {
      key: 'plate',
      label: 'Detected Plate',
      render: (val) => (
        <span className="font-mono font-bold text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
          {val}
        </span>
      )
    },
    { key: 'vehicleType', label: 'Vehicle Model' },
    { key: 'lane', label: 'Detection Lane' },
    {
      key: 'confidence',
      label: 'OCR Confidence',
      render: (val) => (
        <span className="text-emerald-400 font-mono font-medium">{val}</span>
      )
    },
    {
      key: 'status',
      label: 'Enforcement Status',
      render: (val, row) => (
        <Badge variant={row.severity} dot={true} pulse={row.severity === 'danger'}>
          {val}
        </Badge>
      )
    },
    {
      key: 'time',
      label: 'Timestamp',
      align: 'right',
      render: (val) => <span className="font-mono text-slate-400">{val}</span>
    }
  ];

  const filteredFeeds = anprFeeds.filter(
    (f) =>
      f.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-cyan-400" />
            Automatic Number Plate Recognition (ANPR)
            <Badge variant="danger" size="sm" dot={true} pulse={true}>
              LIVE SCANNER
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time optical character recognition powered by YOLOv8 deep learning
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={() => {
            toast.addToast({
              type: 'info',
              title: 'ANPR Stream Synced',
              message: 'OCR optical sensor buffer cleared and synced.'
            });
          }}
        >
          Refresh Feed
        </Button>
      </div>

      {/* OCR Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Plates Scanned (Last 1h)</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">3,420</h3>
              <p className="text-[11px] text-emerald-400 mt-0.5">99.2% OCR accuracy</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Eye className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Stolen / Hotlist Hits</p>
              <h3 className="text-2xl font-bold text-red-400 mt-0.5">1 Match</h3>
              <p className="text-[11px] text-red-400 mt-0.5">Alert dispatched to PCR unit</p>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">State Database Connectivity</p>
              <h3 className="text-2xl font-bold text-emerald-400 mt-0.5">Vahan 4.0</h3>
              <p className="text-[11px] text-emerald-400 mt-0.5">API Latency 32ms</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Detections Table */}
      <Card variant="default">
        <CardHeader>
          <div>
            <CardTitle>Recent Plate Recognition Logs</CardTitle>
            <CardDescription>Live telemetry stream from active intersection nodes</CardDescription>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={(val) => setSearchTerm(val)}
            placeholder="Filter plate or model..."
            className="max-w-xs"
            size="sm"
          />
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={filteredFeeds} emptyMessage="No plates matched search." />
        </CardContent>
      </Card>
    </div>
  );
};

export default ANPR;
