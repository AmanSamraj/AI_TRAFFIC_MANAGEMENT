import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '../component';
import {
  Car,
  Truck,
  Bike,
  ArrowLeft,
  Clock,
  Camera,
  MapPin,
  ArrowRight,
  CreditCard,
  Layers,
  Navigation
} from 'lucide-react';
import playAlert from '../component/alert';

// Database lookup for parameterized route /vehicles/:plate
const VEHICLES_DATABASE = {
  'HP01AB1234': {
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleDetail: 'White Sedan (Hyundai Verna 1.5)',
    firstSeen: '08:31',
    lastSeen: '18:42',
    totalDetections: 27,
    owner: 'Himachal State Transport / Private',
    registrationState: 'Himachal Pradesh (HP-01)',
    status: 'Active Transit',
    compliance: 'Compliant',
    detectionHistory: [
      { camera: 'CAM-01', time: '08:31', location: 'Shimla', speed: '42 km/h', confidence: '99%' },
      { camera: 'CAM-04', time: '09:12', location: 'Mall Road', speed: '28 km/h', confidence: '97%' },
      { camera: 'CAM-07', time: '09:45', location: 'ISBT', speed: '36 km/h', confidence: '98%' },
      { camera: 'CAM-12', time: '10:20', location: 'Highway', speed: '58 km/h', confidence: '94%' }
    ]
  },
  'DL05XY7788': {
    plate: 'DL05XY7788',
    vehicle: 'SUV',
    vehicleDetail: 'Black Mahindra Scorpio-N',
    firstSeen: '07:15',
    lastSeen: '19:30',
    totalDetections: 42,
    owner: 'Northern Fleet Logistics',
    registrationState: 'Delhi NCT (DL-05)',
    status: 'Overspeed Warning',
    compliance: 'Pending Citation',
    detectionHistory: [
      { camera: 'CAM-02', time: '07:15', location: 'Ring Road', speed: '62 km/h', confidence: '98%' },
      { camera: 'CAM-08', time: '08:40', location: 'Outer Bypass', speed: '76 km/h', confidence: '96%' },
      { camera: 'CAM-12', time: '10:42', location: 'Highway', speed: '78 km/h', confidence: '98%' }
    ]
  }
};

export const VehicleDetails = () => {
  const { plate = 'HP01AB1234' } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const clean = plate.replace(/[\s\-_]/g, '').toUpperCase();
  const currentProfile = VEHICLES_DATABASE[clean] || {
    plate: clean || 'HP01AB1234',
    vehicle: 'Car',
    vehicleDetail: 'Automated ANPR Tracked Passenger Vehicle',
    firstSeen: '08:31',
    lastSeen: '18:42',
    totalDetections: 27,
    owner: 'Registered Citizen / Vahan 4.0 Telemetry',
    registrationState: 'State Transit Grid',
    status: 'Active Transit',
    compliance: 'Compliant',
    detectionHistory: [
      { camera: 'CAM-01', time: '08:31', location: 'Shimla', speed: '42 km/h', confidence: '99%' },
      { camera: 'CAM-04', time: '09:12', location: 'Mall Road', speed: '28 km/h', confidence: '97%' },
      { camera: 'CAM-07', time: '09:45', location: 'ISBT', speed: '36 km/h', confidence: '98%' },
      { camera: 'CAM-12', time: '10:20', location: 'Highway', speed: '58 km/h', confidence: '94%' }
    ]
  };

  const violationsHistory = [
    {
      id: 'CHL-8821',
      date: '2026-09-21 14:32',
      violation: 'Overspeeding (78 in 60 km/h)',
      location: 'Highway Mile 28',
      penalty: '₹2,000',
      status: 'Unpaid'
    },
    {
      id: 'CHL-7640',
      date: '2026-08-14 18:10',
      violation: 'Red Light Jump',
      location: 'ISBT Crossing',
      penalty: '₹1,000',
      status: 'Paid'
    }
  ];

  const detectionColumns = [
    {
      key: 'camera',
      label: 'Camera',
      render: (val) => (
        <span className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-slate-400" />
          {val}
        </span>
      )
    },
    {
      key: 'time',
      label: 'Time',
      render: (val) => (
        <span className="font-mono text-slate-200 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {val}
        </span>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (val) => (
        <span className="text-white font-medium flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          {val}
        </span>
      )
    },
    {
      key: 'speed',
      label: 'Recorded Speed',
      render: (val) => <span className="font-mono text-xs text-slate-300">{val}</span>
    },
    {
      key: 'confidence',
      label: 'OCR Confidence',
      render: (val) => (
        <Badge variant="success" size="sm">
          {val}
        </Badge>
      )
    }
  ];

  const violationColumns = [
    {
      key: 'id',
      label: 'Challan ID',
      render: (val) => <span className="font-mono text-cyan-300 font-semibold">{val}</span>
    },
    { key: 'date', label: 'Timestamp' },
    { key: 'violation', label: 'Infraction' },
    { key: 'location', label: 'Location Node' },
    {
      key: 'penalty',
      label: 'Fine Amount',
      render: (val) => <span className="font-mono font-bold text-white">{val}</span>
    },
    {
      key: 'status',
      label: 'Payment Status',
      render: (val) => (
        <Badge variant={val === 'Paid' ? 'success' : 'danger'} dot={val === 'Unpaid'}>
          {val}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/vehicles')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Search
          </Button>

          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-cyan-400" />
              Dossier: {currentProfile.plate}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Integrated National Vahan 4.0 Telemetry & Traffic Enforcement Profile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Navigation className="w-4 h-4" />}
            onClick={() => navigate(`/tracking/${currentProfile.plate}`)}
          >
            Track Route
          </Button>
          <Button
            variant="danger"
            size="sm"
            leftIcon={<CreditCard className="w-4 h-4" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'danger',
                title: 'Notice Dispatched',
                message: `Statutory payment notice sent to registered owner of ${currentProfile.plate}.`
              });
            }}
          >
            Issue Challan Notice
          </Button>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          VEHICLE PROFILE (EXACT WIREFRAME MATCH)
          ┌────────────────────────────────────────┐
          │ Vehicle: Car                           │
          │ Plate: HP01AB1234                      │
          │ First Seen: 08:31                      │
          │ Last Seen: 18:42                       │
          │ Total Detections: 27                   │
          └────────────────────────────────────────┘
      ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4" />
            VEHICLE PROFILE
          </h2>
          <Badge
            variant={currentProfile.compliance === 'Compliant' ? 'success' : 'warning'}
            dot={true}
          >
            {currentProfile.compliance}
          </Badge>
        </div>

        <Card variant="glow" className="bg-[#0c182b] border-2 border-cyan-500/40 p-6 shadow-2xl rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Embossed Number Plate */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[#050b14] rounded-xl border border-slate-800 shadow-inner">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Official Registration Plate
              </div>
              <div className="relative w-full max-w-xs px-4 py-2.5 bg-gradient-to-r from-slate-100 via-white to-slate-200 border-3 border-slate-950 rounded-lg shadow-2xl flex items-center justify-between gap-3 select-all">
                <div className="flex flex-col items-center justify-center text-blue-900 pr-2 border-r-2 border-slate-300 select-none">
                  <div className="w-3.5 h-3.5 rounded-full border border-blue-900 flex items-center justify-center text-[7px] font-black">
                    🇮🇳
                  </div>
                  <span className="text-[9px] font-black font-sans leading-none mt-0.5">IND</span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-slate-950">
                  {currentProfile.plate}
                </span>
                <div className="w-4 h-4 rounded-full border border-blue-800/40 bg-blue-100 flex items-center justify-center text-[7px] text-blue-900 opacity-80">
                  ⚙
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-3 text-center">
                {currentProfile.vehicleDetail}
              </div>
            </div>

            {/* Wireframe Box */}
            <div className="lg:col-span-8">
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono space-y-3.5 text-sm">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Vehicle:</span>
                  <span className="text-white font-bold text-base flex items-center gap-2">
                    {currentProfile.vehicle === 'Car' && <Car className="w-4 h-4 text-cyan-400" />}
                    {currentProfile.vehicle === 'SUV' && <Car className="w-4 h-4 text-cyan-400" />}
                    {currentProfile.vehicle === 'Truck' && <Truck className="w-4 h-4 text-amber-400" />}
                    {currentProfile.vehicle === 'Motorcycle' && <Bike className="w-4 h-4 text-blue-400" />}
                    {currentProfile.vehicle}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Plate:</span>
                  <span className="text-cyan-300 font-black text-lg tracking-widest">
                    {currentProfile.plate}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">First Seen:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    {currentProfile.firstSeen}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Last Seen:</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {currentProfile.lastSeen}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Total Detections:</span>
                  <span className="text-white font-black text-lg bg-cyan-950/80 border border-cyan-500/50 px-3 py-0.5 rounded-lg text-cyan-300">
                    {currentProfile.totalDetections}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ────────────────────────────────────────────
          DETECTION HISTORY
          Camera       Time       Location
          CAM-01       08:31      Shimla
          CAM-04       09:12      Mall Road
          CAM-07       09:45      ISBT
          CAM-12       10:20      Highway
      ──────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Detection History
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Chronological surveillance logs and checkpoint captures for {currentProfile.plate}
            </p>
          </div>

          <Badge variant="info" size="sm">
            {currentProfile.detectionHistory.length} Checkpoints Logged
          </Badge>
        </div>

        {/* Visual Route Corridor Progression Bar */}
        <Card variant="default" className="bg-[#070e1c] border-slate-800 p-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Corridor Movement Progression:
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs">
            {currentProfile.detectionHistory.map((step, idx) => (
              <React.Fragment key={step.camera + step.time}>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 px-3 py-1.5 rounded-xl shadow">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-bold text-cyan-300">{step.camera}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-200">{step.location}</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">({step.time})</span>
                </div>

                {idx < currentProfile.detectionHistory.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Detection History Table */}
        <Card variant="default" className="bg-[#070e1c] border-slate-800">
          <CardContent className="p-0">
            <Table columns={detectionColumns} data={currentProfile.detectionHistory} />
          </CardContent>
        </Card>
      </div>

      {/* Violation History Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Historical E-Challan & Enforcement Records</CardTitle>
          <CardDescription>Automated optical citations issued across state corridors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table columns={violationColumns} data={violationsHistory} />
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleDetails;
