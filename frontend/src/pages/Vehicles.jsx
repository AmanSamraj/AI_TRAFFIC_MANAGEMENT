import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Badge,
  Button,
  Table,
  useToast
} from '../component';
import {
  Search,
  Car,
  Truck,
  Bike,
  Clock,
  Camera,
  MapPin,
  ArrowRight,
  Download,
  Navigation,
  Layers,
  Sparkles
} from 'lucide-react';

// Comprehensive vehicle database with exact SIH wireframe demo vehicle: HP01AB1234
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
  },
  'MH12CD5678': {
    plate: 'MH12CD5678',
    vehicle: 'Truck',
    vehicleDetail: 'Tata Signa 4825.T Heavy Freight',
    firstSeen: '04:10',
    lastSeen: '17:05',
    totalDetections: 18,
    owner: 'National Freight Carriers',
    registrationState: 'Maharashtra (MH-12)',
    status: 'Active Transit',
    compliance: 'Compliant',
    detectionHistory: [
      { camera: 'CAM-01', time: '04:10', location: 'Toll Gate South', speed: '35 km/h', confidence: '95%' },
      { camera: 'CAM-09', time: '09:25', location: 'Industrial Zone', speed: '40 km/h', confidence: '96%' },
      { camera: 'CAM-12', time: '10:42', location: 'Highway', speed: '44 km/h', confidence: '96%' }
    ]
  },
  'KA03EF9012': {
    plate: 'KA03EF9012',
    vehicle: 'Motorcycle',
    vehicleDetail: 'Yamaha R15 V4 (Racing Blue)',
    firstSeen: '06:50',
    lastSeen: '16:20',
    totalDetections: 31,
    owner: 'Private Commuter',
    registrationState: 'Karnataka (KA-03)',
    status: 'Helmetless Flagged',
    compliance: 'Violation Notice',
    detectionHistory: [
      { camera: 'CAM-03', time: '06:50', location: 'Tech Park Blvd', speed: '55 km/h', confidence: '93%' },
      { camera: 'CAM-04', time: '08:15', location: 'Mall Road', speed: '48 km/h', confidence: '91%' },
      { camera: 'CAM-12', time: '10:42', location: 'Highway', speed: '65 km/h', confidence: '92%' }
    ]
  }
};

export const Vehicles = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Search input state - defaults to the requested HP01AB1234
  const [searchQuery, setSearchQuery] = useState('HP01AB1234');
  const [activePlate, setActivePlate] = useState('HP01AB1234');

  // Normalize search query
  const cleanPlate = (plateStr) => plateStr.replace(/[\s\-_]/g, '').toUpperCase();

  // Look up vehicle or generate dynamic record
  const getVehicleProfile = (plateStr) => {
    const norm = cleanPlate(plateStr);
    if (VEHICLES_DATABASE[norm]) {
      return VEHICLES_DATABASE[norm];
    }
    // Dynamic fallback for any user input
    return {
      plate: norm || 'HP01AB1234',
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
  };

  const currentProfile = getVehicleProfile(activePlate);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      toast.addToast({
        type: 'warning',
        title: 'Search Empty',
        message: 'Please enter a vehicle license plate number.'
      });
      return;
    }
    const clean = cleanPlate(searchQuery);
    setActivePlate(clean);
    toast.addToast({
      type: 'info',
      title: 'Vehicle Found',
      message: `Loaded profile for plate ${clean}`
    });
  };

  const handleSelectQuickPlate = (plate) => {
    setSearchQuery(plate);
    setActivePlate(plate);
    toast.addToast({
      type: 'info',
      title: 'Profile Switched',
      message: `Displaying vehicle profile for ${plate}`
    });
  };

  // Detection History Columns matching wireframe: Camera | Time | Location
  const detectionColumns = [
    {
      key: 'camera',
      label: 'Camera',
      render: (val) => (
        <span className="font-mono font-bold text-[var(--color-amber)] flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
          {val}
        </span>
      )
    },
    {
      key: 'time',
      label: 'Time',
      render: (val) => (
        <span className="font-mono text-[var(--color-text)] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
          {val}
        </span>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (val) => (
        <span className="text-[var(--color-text)] font-medium flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          {val}
        </span>
      )
    },
    {
      key: 'speed',
      label: 'Recorded Speed',
      render: (val) => <span className="font-mono text-xs text-[var(--color-text-secondary)]">{val}</span>
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ────────────────────────────────────────────
          PAGE HEADER
      ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[var(--color-text)] uppercase flex items-center gap-2">
            <Car className="w-6 h-6 text-[var(--color-amber)]" />
            VEHICLE SEARCH & PROFILE
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Real-time multi-camera plate intelligence, checkpoint timeline, and Vahan 4.0 cross-reference
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'Dossier Downloaded',
                message: `Exported search report for ${currentProfile.plate}.`
              });
            }}
          >
            Export Dossier
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Navigation className="w-4 h-4" />}
            onClick={() => navigate(`/tracking/${currentProfile.plate}`)}
          >
            Track on Live Map
          </Button>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          USER ENTERS: SEARCH INPUT BAR
      ──────────────────────────────────────────── */}
      <Card variant="default" className="bg-[var(--color-card)] border-[var(--color-border)] p-5 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-3">
          <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-[var(--color-amber)]" />
            Enter License Plate Number:
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. HP01AB1234, DL05XY7788"
                className="w-full bg-[#040810] border-2 border-[var(--color-border)] focus:border-[var(--color-amber)] rounded-xl px-4 py-3 font-mono text-lg font-bold text-[var(--color-text)] tracking-widest placeholder:text-[var(--color-text-muted)] uppercase transition-all outline-hidden shadow-inner"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-muted)] hidden sm:inline-block">
                PRESS ENTER ↵
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              leftIcon={<Search className="w-5 h-5" />}
              className="px-8 font-bold"
            >
              Search
            </Button>
          </div>

          {/* Demo Quick Select Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-[var(--color-text-muted)] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-amber)]" />
              Quick Demo Plates:
            </span>
            {['HP01AB1234', 'DL05XY7788', 'MH12CD5678', 'KA03EF9012'].map((plate) => (
              <button
                key={plate}
                type="button"
                onClick={() => handleSelectQuickPlate(plate)}
                className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  activePlate === plate
                    ? 'bg-[var(--color-amber)]/20 text-[var(--color-amber)] border-[var(--color-amber)] shadow-sm font-bold'
                    : 'bg-[var(--color-card)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-slate-500 hover:text-[var(--color-text)]'
                }`}
              >
                {plate}
                {plate === 'HP01AB1234' && (
                  <span className="ml-1 text-[10px] text-[var(--color-amber)] font-sans font-normal">(Wireframe)</span>
                )}
              </button>
            ))}
          </div>
        </form>
      </Card>

      {/* ────────────────────────────────────────────
          FRONTEND DISPLAYS: VEHICLE PROFILE BOX
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
          <h2 className="text-sm font-black text-[var(--color-amber)] uppercase tracking-widest flex items-center gap-2">
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

        <Card variant="default" className="bg-[var(--color-card)] border-2 border-[var(--color-amber)] p-6 shadow-sm rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Embossed Indian High Security Registration Plate Visualization */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[#050b14] rounded-xl border border-[var(--color-border)] shadow-inner">
              <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2.5">
                Official Registration Plate
              </div>
              <div className="relative w-full max-w-xs px-4 py-2.5 bg-gradient-to-r bg-[var(--color-surface)] border border-[var(--color-border-dark)] rounded-lg shadow-sm flex items-center justify-between gap-3 select-all">
                {/* Blue IND Badge */}
                <div className="flex flex-col items-center justify-center text-blue-900 pr-2 border-r-2 border-slate-300 select-none">
                  <div className="w-3.5 h-3.5 rounded-full border border-blue-900 flex items-center justify-center text-[7px] font-black">
                    🇮🇳
                  </div>
                  <span className="text-[9px] font-black font-sans leading-none mt-0.5">IND</span>
                </div>

                {/* License Plate String */}
                <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-[var(--color-charcoal)]">
                  {currentProfile.plate}
                </span>

                {/* Chakra Hologram */}
                <div className="w-4 h-4 rounded-full border border-blue-800/40 bg-blue-100 flex items-center justify-center text-[7px] text-blue-900 opacity-80">
                  ⚙
                </div>
              </div>

              <div className="text-[11px] font-mono text-[var(--color-text-muted)] mt-3 text-center">
                {currentProfile.vehicleDetail}
              </div>
            </div>

            {/* Right: Exact Wireframe Key-Value Specification Grid */}
            <div className="lg:col-span-8">
              {/* Styled Wireframe Box Representation */}
              <div className="p-5 rounded-xl bg-[var(--color-charcoal)]/80 border border-[var(--color-border)] font-mono space-y-3.5 text-sm">
                <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]/80">
                  <span className="text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-xs">
                    Vehicle:
                  </span>
                  <span className="text-[var(--color-text)] font-bold text-base flex items-center gap-2">
                    {currentProfile.vehicle === 'Car' && <Car className="w-4 h-4 text-[var(--color-amber)]" />}
                    {currentProfile.vehicle === 'SUV' && <Car className="w-4 h-4 text-[var(--color-amber)]" />}
                    {currentProfile.vehicle === 'Truck' && <Truck className="w-4 h-4 text-amber-400" />}
                    {currentProfile.vehicle === 'Motorcycle' && <Bike className="w-4 h-4 text-blue-400" />}
                    {currentProfile.vehicle}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]/80">
                  <span className="text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-xs">
                    Plate:
                  </span>
                  <span className="text-[var(--color-amber)] font-black text-lg tracking-widest">
                    {currentProfile.plate}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]/80">
                  <span className="text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-xs">
                    First Seen:
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    {currentProfile.firstSeen}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]/80">
                  <span className="text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-xs">
                    Last Seen:
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {currentProfile.lastSeen}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-xs">
                    Total Detections:
                  </span>
                  <span className="text-[var(--color-text)] font-black text-lg bg-[var(--color-charcoal-light)] border border-[var(--color-amber)]/50 px-3 py-0.5 rounded-lg text-[var(--color-amber)]">
                    {currentProfile.totalDetections}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ────────────────────────────────────────────
          DETECTION HISTORY (AS SPECIFIED IN WIREFRAME)
          Camera       Time       Location
          CAM-01       08:31      Shimla
          CAM-04       09:12      Mall Road
          CAM-07       09:45      ISBT
          CAM-12       10:20      Highway
      ──────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-amber)]" />
              Detection History
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Chronological surveillance logs and checkpoint captures for {currentProfile.plate}
            </p>
          </div>

          <Badge variant="info" size="sm">
            {currentProfile.detectionHistory.length} Checkpoints Logged
          </Badge>
        </div>

        {/* Visual Route Corridor Progression Bar */}
        <Card variant="default" className="bg-[var(--color-card)] border-[var(--color-border)] p-4">
          <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
            Corridor Movement Progression:
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs">
            {currentProfile.detectionHistory.map((step, idx) => (
              <React.Fragment key={step.camera + step.time}>
                <div className="flex items-center gap-2 bg-[var(--color-card)] border border-[var(--color-border)] px-3 py-1.5 rounded-xl shadow">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-amber)] animate-pulse" />
                  <span className="font-bold text-[var(--color-amber)]">{step.camera}</span>
                  <span className="text-[var(--color-text-muted)]">|</span>
                  <span className="text-[var(--color-text)]">{step.location}</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">({step.time})</span>
                </div>

                {idx < currentProfile.detectionHistory.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Detection History Table */}
        <Card variant="default" className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardContent className="p-0">
            <Table columns={detectionColumns} data={currentProfile.detectionHistory} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vehicles;
