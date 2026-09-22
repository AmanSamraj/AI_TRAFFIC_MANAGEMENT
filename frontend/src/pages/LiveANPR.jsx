import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Badge,
  Button,
  useToast
} from '../component';
import {
  ScanLine,
  Camera,
  Car,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RefreshCw,
  Clock,
  ArrowRight,
  Radio,
  Wifi
} from 'lucide-react';
import playAlert from '../component/alert';

// Sample sequence of detected vehicles matching SIH demonstration
const VEHICLE_STREAM = [
  {
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleDetail: 'White Sedan (Hyundai Verna)',
    confidence: 94,
    time: '10:42:21',
    camera: 'CAM-12',
    cameraLocation: 'North Highway Interchange, Mile 28',
    speed: '58 km/h',
    status: 'Verified Clean'
  },
  {
    plate: 'DL05XY7788',
    vehicle: 'SUV',
    vehicleDetail: 'Black Mahindra Scorpio-N',
    confidence: 98,
    time: '10:42:26',
    camera: 'CAM-12',
    cameraLocation: 'North Highway Interchange, Mile 28',
    speed: '76 km/h',
    status: 'Overspeed Warning'
  },
  {
    plate: 'MH12CD5678',
    vehicle: 'Truck',
    vehicleDetail: 'Tata Signa Commercial Freight',
    confidence: 96,
    time: '10:42:31',
    camera: 'CAM-12',
    cameraLocation: 'North Highway Interchange, Mile 28',
    speed: '44 km/h',
    status: 'Verified Clean'
  },
  {
    plate: 'KA03EF9012',
    vehicle: 'Motorcycle',
    vehicleDetail: 'Yamaha R15 V4',
    confidence: 92,
    time: '10:42:36',
    camera: 'CAM-12',
    cameraLocation: 'North Highway Interchange, Mile 28',
    speed: '65 km/h',
    status: 'Helmetless Rider'
  }
];

export const LiveANPR = () => {
  const toast = useToast();

  // Playback & Audio Controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeCam, setActiveCam] = useState('CAM-12');
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);

  const currentVehicle = VEHICLE_STREAM[activeVehicleIndex];

  // Automated live OCR detection loop every 4.5 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveVehicleIndex((prev) => {
        const nextIndex = (prev + 1) % VEHICLE_STREAM.length;
        // Trigger sound alert on overspeed/warning detection if sound is enabled
        if (soundEnabled && VEHICLE_STREAM[nextIndex].status.includes('Warning')) {
          playAlert(0.6);
        }
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, soundEnabled]);

  // Generate ASCII-like block representation of confidence: ██████████████████░░ 94%
  const getAsciiBar = (percent) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  const handleNextDetection = () => {
    const nextIdx = (activeVehicleIndex + 1) % VEHICLE_STREAM.length;
    setActiveVehicleIndex(nextIdx);
    if (soundEnabled) playAlert(0.5);
    toast.addToast({
      type: 'info',
      title: 'Vehicle Detected',
      message: `ANPR Plate scan: ${VEHICLE_STREAM[nextIdx].plate}`
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ────────────────────────────────────────────
          HEADER: LIVE ANPR
      ──────────────────────────────────────────── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <ScanLine className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[var(--color-text)] uppercase flex items-center gap-2">
                LIVE ANPR
                <Badge variant="danger" size="sm" dot={true} pulse={true}>
                  60 FPS STREAM
                </Badge>
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Real-Time Optical Character Recognition & Neural Plate Alignment (SIH Core)
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause Feed' : 'Resume Feed'}
            </Button>

            <Button
              variant={soundEnabled ? 'danger' : 'outline'}
              size="sm"
              leftIcon={soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playAlert();
              }}
            >
              {soundEnabled ? 'Alarm Sound: ON' : 'Alarm Sound: MUTE'}
            </Button>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<RefreshCw className="w-4 h-4" />}
              onClick={handleNextDetection}
            >
              Simulate Pass
            </Button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          MAIN GRID: VIDEO STREAM + DETECTION TELEMETRY
      ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (7 COLS): CAMERA VIDEO */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="glow" className="overflow-hidden bg-[#070e1c] border-[var(--color-border)] shadow-2xl">
            {/* Camera Viewport Header */}
            <CardHeader className="p-3.5 bg-[var(--color-card)] border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="font-bold text-xs text-[var(--color-text)] uppercase tracking-wider">
                  CAMERA VIDEO — {currentVehicle.camera}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-[var(--color-amber)]">1080p 60 FPS</span>
                <span className="text-[var(--color-text-muted)]">|</span>
                <span className="text-emerald-400">LIVE</span>
              </div>
            </CardHeader>

            {/* VIDEO CANVAS / CAMERA VIEWPORT */}
            <div className="relative aspect-video bg-[#040810] flex items-center justify-center overflow-hidden select-none border-b border-[var(--color-border)]">
              {/* Traffic Highway Background Simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(#132644_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-35" />

              {/* Road Perspective Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="20%" y1="100%" x2="45%" y2="40%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
                <line x1="80%" y1="100%" x2="55%" y2="40%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
                <line x1="50%" y1="100%" x2="50%" y2="40%" stroke="#eab308" strokeWidth="3" strokeDasharray="12 8" />
              </svg>

              {/* Live Laser Scanning Line Beam */}
              {isPlaying && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--color-amber)] to-transparent shadow-sm opacity-80" />
              )}

              {/* Vehicle Graphical Sprite with YOLO Bounding Box */}
              <div className="relative z-10 flex flex-col items-center justify-center p-4 border-2 border-[var(--color-amber)] rounded-xl bg-[var(--color-surface)]  shadow-sm transition-all duration-300">
                {/* Bounding Box Label */}
                <div className="absolute -top-3.5 left-2 bg-[var(--color-amber)] text-[var(--color-charcoal)] text-[10px] font-mono font-black px-2 py-0.5 rounded shadow">
                  {currentVehicle.vehicle} {currentVehicle.confidence}%
                </div>

                {/* Vehicle SVG / Emoji Graphic */}
                <div className="my-2 p-3 text-[var(--color-amber)]">
                  <Car className="w-20 h-20 text-[var(--color-amber)] stroke-[1.3] filter drop-shadow-sm" />
                </div>

                {/* Sub-label under vehicle */}
                <div className="text-[11px] font-mono text-[var(--color-text-secondary)] bg-black/70 px-2 py-0.5 rounded border border-[var(--color-border)]">
                  Speed: {currentVehicle.speed}
                </div>
              </div>

              {/* HUD Overlays */}
              <div className="absolute top-3 left-3 bg-black/75  px-2.5 py-1 rounded-md text-xs font-mono text-red-400 font-bold flex items-center gap-1.5 border border-red-500/30">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                REC ● {currentVehicle.camera}
              </div>

              <div className="absolute top-3 right-3 bg-black/75  px-2.5 py-1 rounded-md text-xs font-mono text-[var(--color-amber)] border border-[var(--color-border)]">
                {currentVehicle.time}
              </div>

              <div className="absolute bottom-3 left-3 bg-black/75  px-2.5 py-1 rounded-md text-xs font-mono text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                AI Tracking: <span className="text-emerald-400 font-bold">LOCKED</span>
              </div>
            </div>

            {/* Video Controls & Camera Switcher */}
            <CardContent className="p-3.5 bg-[var(--color-card)]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-muted)] font-medium">Switch Active Node:</span>
                {['CAM-12', 'CAM-08', 'CAM-01', 'CAM-04'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCam(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                      activeCam === c
                        ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)] shadow-md shadow-[rgba(245,166,35,0.15)]'
                        : 'bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                <Radio className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                <span>RTSP Low-Latency WebRTC Stream</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN (5 COLS): TELEMETRY CARDS MATCHING EXACT WIREFRAME */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="default" className="bg-[#0c182b] border-[var(--color-border)] shadow-2xl p-6 space-y-5">
            {/* 1. DETECTED PLATE */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <ScanLine className="w-4 h-4 text-[var(--color-amber)]" />
                Detected Plate
              </label>

              {/* Embossed High-Security Indian License Plate Box */}
              <div className="p-4 rounded-xl bg-[#040810] border border-[var(--color-border)] flex items-center justify-center shadow-inner">
                <div className="relative w-full max-w-xs px-4 py-2.5 bg-gradient-to-r from-slate-100 via-white to-slate-200 border-3 border-slate-900 rounded-lg shadow-xl flex items-center justify-between gap-3">
                  {/* Blue IND Badge */}
                  <div className="flex flex-col items-center justify-center text-blue-900 pr-2.5 border-r-2 border-slate-300 select-none">
                    <div className="w-3.5 h-3.5 rounded-full border border-blue-900 flex items-center justify-center text-[7px] font-black">
                      🇮🇳
                    </div>
                    <span className="text-[9px] font-black font-sans leading-none mt-0.5">IND</span>
                  </div>

                  {/* License Plate String */}
                  <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-[var(--color-charcoal)] select-all">
                    {currentVehicle.plate}
                  </span>

                  {/* Ashoka Chakra Hologram Stamp */}
                  <div className="w-4 h-4 rounded-full border border-blue-800/40 bg-blue-100 flex items-center justify-center text-[7px] text-blue-900 opacity-80">
                    ⚙
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CONFIDENCE WITH ASCII & VISUAL BAR */}
            <div className="space-y-2 pt-2 border-t border-[var(--color-border)]/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                  Confidence
                </label>
                <span className="text-sm font-mono font-extrabold text-emerald-400">
                  {currentVehicle.confidence}%
                </span>
              </div>

              {/* ASCII Block Bar as specified in wireframe */}
              <div className="font-mono text-xs text-[var(--color-amber)] tracking-wider bg-[var(--color-charcoal)] p-2 rounded-lg border border-[var(--color-border)] select-none truncate">
                {getAsciiBar(currentVehicle.confidence)} {currentVehicle.confidence}%
              </div>

              {/* Smooth Animated Visual Gradient Bar */}
              <div className="w-full h-2.5 rounded-full bg-[var(--color-charcoal)] border border-[var(--color-border)] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-amber)] to-emerald-400 transition-all duration-500 shadow-sm"
                  style={{ width: `${currentVehicle.confidence}%` }}
                />
              </div>
            </div>

            {/* 3. VEHICLE */}
            <div className="pt-2 border-t border-[var(--color-border)]/80">
              <label className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">
                Vehicle
              </label>
              <div className="p-3 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)]/90 flex items-center justify-between">
                <span className="text-base font-bold text-[var(--color-text)] flex items-center gap-2">
                  <Car className="w-4 h-4 text-[var(--color-amber)]" />
                  {currentVehicle.vehicle}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium">
                  {currentVehicle.vehicleDetail}
                </span>
              </div>
            </div>

            {/* 4. TIME */}
            <div className="pt-2 border-t border-[var(--color-border)]/80">
              <label className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">
                Time
              </label>
              <div className="p-3 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)]/90 flex items-center justify-between">
                <span className="font-mono text-base font-bold text-[var(--color-amber)] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
                  {currentVehicle.time}
                </span>
                <Badge variant="info" size="sm">
                  UTC+05:30
                </Badge>
              </div>
            </div>

            {/* 5. CAMERA */}
            <div className="pt-2 border-t border-[var(--color-border)]/80">
              <label className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">
                Camera
              </label>
              <div className="p-3 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)]/90 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-base text-[var(--color-text)] flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[var(--color-amber)]" />
                    {currentVehicle.camera}
                  </span>
                  <Badge
                    variant={currentVehicle.status.includes('Clean') ? 'success' : 'warning'}
                    dot={true}
                  >
                    {currentVehicle.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] pl-6">
                  {currentVehicle.cameraLocation}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          ARCHITECTURE PIPELINE FLOW BADGE (AS IN WIREFRAME)
          Camera → Backend → AI Model → WebSocket → React
      ──────────────────────────────────────────── */}
      <Card variant="default" className="p-4 bg-[#070e1c] border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)]">
            <Radio className="w-4 h-4 text-[var(--color-amber)] animate-pulse" />
            <span className="uppercase tracking-wider">SIH Production Architecture Pipeline:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold">
            <span className="px-3 py-1 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] shadow">
              Camera
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-amber)]" />

            <span className="px-3 py-1 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] shadow">
              Backend
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-amber)]" />

            <span className="px-3 py-1 rounded-lg bg-[var(--color-charcoal-light)] border border-[var(--color-amber)]/50 text-[var(--color-amber)] shadow">
              AI Model (YOLOv8)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-amber)]" />

            <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 shadow flex items-center gap-1.5">
              <Wifi className="w-3 h-3" />
              WebSocket
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-amber)]" />

            <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-dark)] text-[var(--color-charcoal)] shadow-md">
              React UI
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveANPR;
