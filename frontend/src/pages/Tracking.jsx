import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  useToast
} from '../component';
import {
  Navigation,
  Camera,
  Clock,
  ArrowDown,
  Play,
  Pause,
  RotateCcw,
  Siren,
  Car,
  Compass,
  Radio,
  Search,
  Sparkles,
  Layers
} from 'lucide-react';
import playAlert from '../component/alert';

// Multi-Camera Trajectory Dataset with exact SIH wireframe: HP01AB1234
const TRAJECTORY_DATA = {
  'HP01AB1234': {
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleDetail: 'White Sedan (Hyundai Verna)',
    speedAvg: '52 km/h',
    totalDistance: '24.6 km',
    elapsedTime: '1 hr 49 min',
    status: 'Active Pursuit / Monitored',
    riskLevel: 'Moderate',
    nodes: [
      {
        id: 'CAM-01',
        time: '08:31',
        location: 'Shimla Entry',
        speed: '42 km/h',
        confidence: '99%',
        x: 260,
        y: 60,
        description: 'Initial entry detection at Shimla North Gateway'
      },
      {
        id: 'CAM-04',
        time: '09:12',
        location: 'Mall Road',
        speed: '28 km/h',
        confidence: '97%',
        x: 310,
        y: 160,
        description: 'Transit through tourist commercial corridor'
      },
      {
        id: 'CAM-07',
        time: '09:45',
        location: 'ISBT',
        speed: '36 km/h',
        confidence: '98%',
        x: 230,
        y: 270,
        description: 'Passage through Inter-State Bus Terminal interchange'
      },
      {
        id: 'CAM-12',
        time: '10:20',
        location: 'Highway',
        speed: '58 km/h',
        confidence: '94%',
        x: 280,
        y: 380,
        description: 'Exited municipal limits heading northbound on Highway'
      }
    ],
    currentLocation: {
      location: 'Highway Mile 31 (Heading North)',
      time: 'Live Now',
      speed: '62 km/h',
      x: 300,
      y: 470
    }
  },
  'DL05XY7788': {
    plate: 'DL05XY7788',
    vehicle: 'SUV',
    vehicleDetail: 'Black Mahindra Scorpio-N',
    speedAvg: '68 km/h',
    totalDistance: '38.2 km',
    elapsedTime: '2 hr 15 min',
    status: 'Overspeed Intercept Triggered',
    riskLevel: 'High',
    nodes: [
      {
        id: 'CAM-02',
        time: '07:15',
        location: 'Outer Ring',
        speed: '62 km/h',
        confidence: '98%',
        x: 240,
        y: 70,
        description: 'Detected on Outer Ring Expressway'
      },
      {
        id: 'CAM-05',
        time: '08:02',
        location: 'West Flyover',
        speed: '74 km/h',
        confidence: '95%',
        x: 320,
        y: 170,
        description: 'Speed radar trigger at West Elevated Flyover'
      },
      {
        id: 'CAM-08',
        time: '08:40',
        location: 'Bypass Jn',
        speed: '76 km/h',
        confidence: '96%',
        x: 210,
        y: 280,
        description: 'Overspeed violation recorded at bypass junction'
      },
      {
        id: 'CAM-12',
        time: '10:42',
        location: 'Highway',
        speed: '78 km/h',
        confidence: '98%',
        x: 270,
        y: 390,
        description: 'Approaching highway checkpoint with alert flag'
      }
    ],
    currentLocation: {
      location: 'Highway Intercept Zone',
      time: 'Live Now',
      speed: '78 km/h',
      x: 290,
      y: 480
    }
  }
};

export const Tracking = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [searchPlate, setSearchPlate] = useState('HP01AB1234');
  const [selectedPlate, setSelectedPlate] = useState('HP01AB1234');
  const [activeStep, setActiveStep] = useState(4); // 0-4 for animated path steps
  const [isAnimating, setIsAnimating] = useState(true);

  // Active target vehicle data
  const currentTarget = TRAJECTORY_DATA[selectedPlate] || TRAJECTORY_DATA['HP01AB1234'];

  // Animation cycle through trajectory nodes
  useEffect(() => {
    if (!isAnimating) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= currentTarget.nodes.length ? 0 : prev + 1));
    }, 2800);

    return () => clearInterval(timer);
  }, [isAnimating, currentTarget.nodes.length]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const clean = searchPlate.replace(/[\s\-_]/g, '').toUpperCase();
    if (TRAJECTORY_DATA[clean]) {
      setSelectedPlate(clean);
      setActiveStep(TRAJECTORY_DATA[clean].nodes.length);
      toast.addToast({
        type: 'info',
        title: 'Trajectory Loaded',
        message: `Tracking vector updated for ${clean}`
      });
    } else {
      setSelectedPlate('HP01AB1234');
      toast.addToast({
        type: 'info',
        title: 'Sample Target Selected',
        message: `Showing demo multi-camera trajectory for HP01AB1234`
      });
    }
  };

  const handleQuickSelect = (plate) => {
    setSearchPlate(plate);
    setSelectedPlate(plate);
    setActiveStep(TRAJECTORY_DATA[plate].nodes.length);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ────────────────────────────────────────────
          PAGE HEADER: MULTI-CAMERA TRACKING
      ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <Navigation className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[var(--color-text)] uppercase flex items-center gap-2">
                MULTI-CAMERA TRACKING
                <Badge variant="danger" size="sm" dot={true} pulse={true}>
                  AI TRAJECTORY ENGINE
                </Badge>
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Automated camera-to-camera optical handoff, velocity vectoring, and spatial trajectory map
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            onClick={() => setIsAnimating(!isAnimating)}
          >
            {isAnimating ? 'Pause Timeline' : 'Animate Path'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={() => {
              setActiveStep(0);
              setIsAnimating(true);
            }}
          >
            Replay
          </Button>

          <Button
            variant="danger"
            size="sm"
            leftIcon={<Siren className="w-4 h-4" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'danger',
                title: 'PCR Intercept Dispatched',
                message: `Highway patrol dispatched to intercept ${currentTarget.plate} at Mile 31.`
              });
            }}
          >
            Alert Intercept Unit
          </Button>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          TARGET SELECTOR & TELEMETRY STRIP
      ──────────────────────────────────────────── */}
      <Card variant="glow" className="bg-[#070e1c] border-[var(--color-border)] p-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search / Target Input */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchPlate}
                onChange={(e) => setSearchPlate(e.target.value)}
                placeholder="Enter Plate (e.g. HP01AB1234)"
                className="w-full bg-[#040810] border-2 border-[var(--color-border)] focus:border-[var(--color-amber)] rounded-xl px-3 py-2 font-mono text-sm font-bold text-[var(--color-text)] uppercase placeholder:text-[var(--color-text-muted)] outline-hidden"
              />
            </div>
            <Button type="submit" variant="primary" size="sm" leftIcon={<Search className="w-4 h-4" />}>
              Track
            </Button>
          </form>

          {/* Quick Demo Target Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-muted)] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-amber)]" />
              Targets:
            </span>
            {['HP01AB1234', 'DL05XY7788'].map((plate) => (
              <button
                key={plate}
                type="button"
                onClick={() => handleQuickSelect(plate)}
                className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedPlate === plate
                    ? 'bg-[var(--color-amber)]/20 text-[var(--color-amber)] border-[var(--color-amber)] font-bold shadow-sm'
                    : 'bg-[var(--color-card)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]'
                }`}
              >
                {plate}
                {plate === 'HP01AB1234' && (
                  <span className="ml-1 text-[10px] text-[var(--color-amber)] font-sans font-normal">(Wireframe)</span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono border-t md:border-t-0 md:border-l border-[var(--color-border)] pt-2 md:pt-0 md:pl-4">
            <div>
              <span className="text-[var(--color-text-muted)] block text-[10px]">AVG SPEED</span>
              <span className="text-[var(--color-text)] font-bold">{currentTarget.speedAvg}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] block text-[10px]">DISTANCE</span>
              <span className="text-[var(--color-amber)] font-bold">{currentTarget.totalDistance}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] block text-[10px]">STATUS</span>
              <span className="text-emerald-400 font-bold">{currentTarget.status.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* ────────────────────────────────────────────
          MAIN GRID: VISUAL TIMELINE (LEFT) + MAP (RIGHT)
      ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================
            LEFT COLUMN (5 COLS):
            VISUAL CAMERA PROGRESSION (MATCHING EXACT WIREFRAME)
            CAM-01
              │
              │ 08:31
              ↓
            CAM-04
              │
              │ 09:12
              ↓
            CAM-07
              │
              │ 09:45
              ↓
            CAM-12
              │
              │ 10:20
              ↓
            CURRENT LOCATION
        ============================================================ */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="glow" className="bg-[#0c182b] border-[var(--color-border)] p-5 shadow-2xl">
            <CardHeader className="p-0 pb-4 border-b border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm uppercase tracking-wider text-[var(--color-amber)] flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    CAMERA DETECTION CHAIN
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Optical handoff timeline for <span className="font-mono text-[var(--color-text)] font-bold">{currentTarget.plate}</span>
                  </CardDescription>
                </div>
                <Badge variant="info" size="sm">
                  {currentTarget.nodes.length} CAMERAS
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-5">
              {/* Vertical Wireframe Pipeline */}
              <div className="relative font-mono text-sm space-y-1">
                {currentTarget.nodes.map((node, index) => {
                  const isNodeActive = index <= activeStep;
                  const isCurrentStep = index === activeStep;

                  return (
                    <div key={node.id} className="relative">
                      {/* CAMERA NODE CARD */}
                      <div
                        className={`p-3.5 rounded-xl border transition-all duration-300 ${
                          isCurrentStep
                            ? 'bg-[rgba(91,103,112,0.06)] border-[var(--color-amber)] shadow-sm ring-1 ring-[var(--color-amber)]'
                            : isNodeActive
                            ? 'bg-[var(--color-card)] border-[var(--color-border)]'
                            : 'bg-[var(--color-charcoal)]/50 border-[var(--color-border)]/80 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isNodeActive
                                  ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)] shadow-md'
                                  : 'bg-[var(--color-background)] text-[var(--color-text-muted)]'
                              }`}
                            >
                              <Camera className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-black text-base text-[var(--color-text)] tracking-wider">
                                {node.id}
                              </span>
                              <span className="text-xs text-[var(--color-text-muted)] block font-sans">
                                {node.location}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-[var(--color-text)] bg-[var(--color-surface)] px-2 py-0.5 rounded border border-[var(--color-border)] block">
                              {node.speed}
                            </span>
                            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5 block">
                              OCR {node.confidence}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* DOWNWARD CONNECTOR (EXACT WIREFRAME │ │ timestamp ↓) */}
                      <div className="py-2.5 px-6 flex items-center gap-3 select-none">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-0.5 h-6 transition-all duration-300 ${
                              index < activeStep ? 'bg-[var(--color-amber)] shadow-sm' : 'bg-slate-700'
                            }`}
                          />
                          <ArrowDown
                            className={`w-4 h-4 -my-0.5 transition-all duration-300 ${
                              index < activeStep ? 'text-[var(--color-amber)] animate-bounce' : 'text-[var(--color-text-muted)]'
                            }`}
                          />
                        </div>

                        {/* Timestamp tag matching wireframe: │ 08:31 ↓ */}
                        <div
                          className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-all ${
                            index < activeStep
                              ? 'bg-[rgba(245,166,35,0.06)] border-[var(--color-amber)]/30 text-[var(--color-amber)] font-bold'
                              : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-text-muted)]'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                          <span>{node.time}</span>
                          <span className="text-[10px] text-[var(--color-text-muted)] font-sans">
                            ({node.location})
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* FINAL TERMINAL: CURRENT LOCATION */}
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    activeStep >= currentTarget.nodes.length
                      ? 'bg-gradient-to-r from-red-950/40 via-amber-950/20 to-red-950/40 border-red-500 shadow-sm'
                      : 'bg-[var(--color-background)] border-[var(--color-border)] opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500" />
                      </span>
                      <div>
                        <h4 className="font-black text-sm text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                          CURRENT LOCATION
                        </h4>
                        <p className="text-xs font-mono text-[var(--color-text-secondary)] mt-0.5">
                          {currentTarget.currentLocation.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <Badge variant="danger" size="sm" pulse={true}>
                        LIVE NOW
                      </Badge>
                      <span className="text-[10px] text-[var(--color-text-muted)] block mt-1">
                        Est: {currentTarget.currentLocation.speed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ============================================================
            RIGHT COLUMN (7 COLS):
            MAP WITH MULTI-CAMERA TRAJECTORY (MATCHING EXACT WIREFRAME)
                    CAM-01
                      ●
                      │
                      │
                   CAM-04
                      ●
                      │
                      │
                   CAM-07
                      ●
                      │
                      │
                   CAM-12
                      ●
                      │
                      ▼
                   [🚗 CURRENT LOCATION]
        ============================================================ */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="glow" className="bg-[#070e1c] border-[var(--color-border)] overflow-hidden shadow-2xl">
            {/* Map Header */}
            <CardHeader className="p-4 bg-[var(--color-card)] border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[var(--color-amber)] animate-spin" style={{ animationDuration: '12s' }} />
                <span className="font-bold text-xs text-[var(--color-text)] uppercase tracking-wider">
                  GIS SPATIAL CORRIDOR MAP — MULTI-CAMERA VECTOR
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-[var(--color-text-muted)]">COORDINATE GRID:</span>
                <span className="text-[var(--color-amber)]">NH-44 SPATIAL REEF</span>
              </div>
            </CardHeader>

            {/* HIGH-TECH VECTOR MAP CANVAS */}
            <div className="relative aspect-4/3 bg-[#040810] flex items-center justify-center overflow-hidden select-none p-4">
              {/* Radar Grid Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#0e2238_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-40" />

              {/* Concentric Radar Rings */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <circle cx="50%" cy="50%" r="30%" stroke="#F5A623" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="48%" stroke="#F5A623" strokeWidth="1" fill="none" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#F5A623" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#F5A623" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>

              {/* Dynamic SVG Trajectory Network Overlay */}
              <svg
                viewBox="0 0 540 540"
                className="w-full h-full max-h-[460px] drop-shadow-sm"
              >
                <defs>
                  {/* Neon Glow Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gradient for trajectory path */}
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F5A623" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#F5A623" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Trajectory Connecting Vectors between Camera Nodes */}
                {currentTarget.nodes.map((node, idx) => {
                  if (idx === currentTarget.nodes.length - 1) {
                    // Connect CAM-12 to CURRENT LOCATION
                    const curr = currentTarget.currentLocation;
                    return (
                      <g key={`path-${node.id}-curr`}>
                        <line
                          x1={node.x}
                          y1={node.y}
                          x2={curr.x}
                          y2={curr.y}
                          stroke="#ef4444"
                          strokeWidth="3.5"
                          strokeDasharray="6 4"
                          className="animate-pulse"
                          filter="url(#glow)"
                        />
                      </g>
                    );
                  }

                  const nextNode = currentTarget.nodes[idx + 1];
                  const isSegmentActive = idx < activeStep;

                  return (
                    <g key={`path-${node.id}-${nextNode.id}`}>
                      {/* Background Guide Line */}
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={nextNode.x}
                        y2={nextNode.y}
                        stroke="#1e293b"
                        strokeWidth="3"
                      />
                      {/* Illuminated Active Vector Line */}
                      {isSegmentActive && (
                        <line
                          x1={node.x}
                          y1={node.y}
                          x2={nextNode.x}
                          y2={nextNode.y}
                          stroke="#F5A623"
                          strokeWidth="3.5"
                          filter="url(#glow)"
                          strokeDasharray="8 4"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Camera Nodes (CAM-01, CAM-04, CAM-07, CAM-12) */}
                {currentTarget.nodes.map((node, idx) => {
                  const isNodeActive = idx <= activeStep;
                  const isCurrent = idx === activeStep;

                  return (
                    <g key={`map-node-${node.id}`}>
                      {/* Outer Pulse Ring */}
                      {isCurrent && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="18"
                          fill="none"
                          stroke="#F5A623"
                          strokeWidth="1.5"
                          className="animate-ping"
                          opacity="0.75"
                        />
                      )}

                      {/* Node Circle ● */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="10"
                        fill={isNodeActive ? '#F5A623' : '#1e293b'}
                        stroke={isCurrent ? '#ffffff' : '#F5A623'}
                        strokeWidth="2.5"
                        filter={isNodeActive ? 'url(#glow)' : undefined}
                      />

                      {/* Inner Dot */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="3.5"
                        fill={isNodeActive ? '#050c18' : '#64748b'}
                      />

                      {/* Camera Label Box (e.g. CAM-01 (08:31)) */}
                      <g transform={`translate(${node.x + 16}, ${node.y - 12})`}>
                        <rect
                          x="0"
                          y="0"
                          width="120"
                          height="28"
                          rx="6"
                          fill="#091424"
                          stroke={isNodeActive ? '#F5A623' : '#334155'}
                          strokeWidth="1"
                          opacity="0.9"
                        />
                        <text
                          x="8"
                          y="13"
                          fill="#ffffff"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {node.id}
                        </text>
                        <text
                          x="60"
                          y="13"
                          fill="#F5A623"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {node.time}
                        </text>
                        <text
                          x="8"
                          y="23"
                          fill="#918B80"
                          fontSize="8"
                          fontFamily="sans-serif"
                        >
                          {node.location}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* CURRENT LOCATION LIVE BEACON (TERMINAL) */}
                <g transform={`translate(${currentTarget.currentLocation.x}, ${currentTarget.currentLocation.y})`}>
                  {/* Ping Rings */}
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                  <circle cx="0" cy="0" r="14" fill="#ef4444" opacity="0.25" />

                  {/* Center Dot */}
                  <circle cx="0" cy="0" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2" filter="url(#glow)" />

                  {/* Car / Target Pin Badge */}
                  <g transform="translate(-85, 14)">
                    <rect
                      x="0"
                      y="0"
                      width="170"
                      height="38"
                      rx="8"
                      fill="#1a0b12"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      filter="url(#glow)"
                    />
                    <text
                      x="10"
                      y="16"
                      fill="#ef4444"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="black"
                    >
                      ● CURRENT LOCATION
                    </text>
                    <text
                      x="10"
                      y="30"
                      fill="#fca5a5"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {currentTarget.plate} ({currentTarget.currentLocation.speed})
                    </text>
                  </g>
                </g>
              </svg>

              {/* HUD OVERLAYS */}
              <div className="absolute top-3 left-3 bg-black/80  px-3 py-1.5 rounded-lg text-xs font-mono border border-[var(--color-border)] space-y-0.5">
                <div className="text-[var(--color-text-muted)] text-[10px]">CORRIDOR TRAJECTORY</div>
                <div className="text-[var(--color-text)] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {currentTarget.nodes[0].id} → {currentTarget.nodes[currentTarget.nodes.length - 1].id}
                </div>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/80  px-3 py-1.5 rounded-lg text-xs font-mono border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">TARGET: </span>
                <span className="text-[var(--color-amber)] font-bold">{currentTarget.plate}</span>
                <span className="text-[var(--color-text-muted)] mx-1.5">|</span>
                <span className="text-emerald-400">TRACKING LOCKED</span>
              </div>
            </div>

            {/* Trajectory Navigation Footer */}
            <CardContent className="p-4 bg-[var(--color-card)]/60 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-muted)] font-medium">Trajectory Actions:</span>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Car className="w-3.5 h-3.5 text-[var(--color-amber)]" />}
                  onClick={() => navigate(`/vehicles/${currentTarget.plate}`)}
                >
                  View Vehicle Dossier
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Radio className="w-3.5 h-3.5" />}
                  onClick={() => navigate('/anpr/live')}
                >
                  Live ANPR Stream
                </Button>
              </div>

              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] font-mono text-[11px]">
                <span>Corridor: NH-44 Northward Intercept Trajectory</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
