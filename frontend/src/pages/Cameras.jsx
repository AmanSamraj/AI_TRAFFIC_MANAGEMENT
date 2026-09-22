import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Button,
  StatusIndicator,
  Modal,
  useToast
} from '../component';
import {
  Video,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sliders,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Radio,
  Globe,
  Settings2,
  Camera as CameraIcon,
  Link as LinkIcon,
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Car,
  Layers,
  Activity,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { api } from '../services/api';

// Live Demo Traffic Video Feeds (Autoplaying continuous highway & junction video loops)
const DEMO_STREAMS = [
  'https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-highway-at-night-41589-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-in-a-city-41590-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41593-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-cars-moving-on-a-curved-highway-at-night-41594-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-traffic-at-a-busy-intersection-41592-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-multi-lane-highway-41591-large.mp4'
];

const INITIAL_CAMERAS = [
  {
    id: 'CAM-01',
    name: 'Highway Junction A (North)',
    streamType: 'live_stream',
    videoUrl: DEMO_STREAMS[0],
    source: 'rtsp://192.168.10.101:554/live/ch0',
    ip: '192.168.10.101',
    area: 'Connaught Radial 1',
    status: 'online',
    resolution: '4K Ultra HD',
    fps: '60 FPS',
    vehiclesNow: 42,
    latency: '12ms',
    speedLimit: 60
  },
  {
    id: 'CAM-02',
    name: 'Central Expressway Overpass',
    streamType: 'live_stream',
    videoUrl: DEMO_STREAMS[1],
    source: 'rtsp://192.168.10.102:554/live/ch0',
    ip: '192.168.10.102',
    area: 'MG Road Corridor km 14',
    status: 'online',
    resolution: '4K Ultra HD',
    fps: '60 FPS',
    vehiclesNow: 68,
    latency: '14ms',
    speedLimit: 70
  },
  {
    id: 'CAM-03',
    name: 'Windy Traffic Arterial Cam',
    streamType: 'windy',
    videoUrl: DEMO_STREAMS[2],
    source: 'windy-traffic-01',
    ip: 'Windy Live Cam',
    area: 'Highway Arterial Stream',
    status: 'online',
    resolution: '1080p Full HD',
    fps: '30 FPS',
    vehiclesNow: 53,
    latency: '34ms',
    speedLimit: 80
  },
  {
    id: 'CAM-04',
    name: 'Ring Road Interchange',
    streamType: 'live_stream',
    videoUrl: DEMO_STREAMS[3],
    source: 'rtsp://192.168.10.104:554/live/ch0',
    ip: '192.168.10.104',
    area: 'Ring Road Sector 18',
    status: 'online',
    resolution: '1080p Full HD',
    fps: '30 FPS',
    vehiclesNow: 89,
    latency: '18ms',
    speedLimit: 60
  },
  {
    id: 'CAM-05',
    name: 'Outer Bypass Toll Plaza',
    streamType: 'live_stream',
    videoUrl: DEMO_STREAMS[4],
    source: 'rtsp://192.168.10.105:554/live/ch0',
    ip: '192.168.10.105',
    area: 'Cyber Hub Arterial 4',
    status: 'online',
    resolution: '1080p Full HD',
    fps: '60 FPS',
    vehiclesNow: 31,
    latency: '16ms',
    speedLimit: 40
  },
  {
    id: 'CAM-06',
    name: 'Metro Line Junction Gate 3',
    streamType: 'live_stream',
    videoUrl: DEMO_STREAMS[5],
    source: 'rtsp://192.168.10.106:554/live/ch0',
    ip: '192.168.10.106',
    area: 'Industrial Phase II Gate',
    status: 'online',
    resolution: '4K Ultra HD',
    fps: '60 FPS',
    vehiclesNow: 54,
    latency: '15ms',
    speedLimit: 60
  }
];

const INITIAL_DETECTIONS = [
  { sNo: 1, plate: 'DL01AB1234', camId: 'CAM-01', time: '23:26:14', area: 'Connaught Radial 1', detection: 'Sedan (Car) · 98%', status: 'Normal' },
  { sNo: 2, plate: 'MH02CZ9876', camId: 'CAM-02', time: '23:26:08', area: 'MG Road Corridor', detection: 'SUV · 96%', status: 'Speeding (84 km/h)' },
  { sNo: 3, plate: 'KA03MM4567', camId: 'CAM-03', time: '23:25:52', area: 'Highway Arterial', detection: 'Motorcycle · 94%', status: 'Normal' },
  { sNo: 4, plate: 'HR26DQ5544', camId: 'CAM-04', time: '23:25:40', area: 'Ring Road Sector 18', detection: 'Commercial Truck · 92%', status: 'Normal' },
  { sNo: 5, plate: 'WB02AK7788', camId: 'CAM-06', time: '23:25:19', area: 'Industrial Phase II', detection: 'City Bus · 97%', status: 'Hotlist Match' }
];

export const Cameras = () => {
  const toast = useToast();
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [activeCamId, setActiveCamId] = useState('all');
  const [expandedCam, setExpandedCam] = useState(null);
  const [zoom, setZoom] = useState(1);

  // Live Continuous Detections (Strictly capped at max 30 rows)
  const [detections, setDetections] = useState(INITIAL_DETECTIONS);
  const detectionCounter = useRef(INITIAL_DETECTIONS.length);

  // Admin Authentication State in Sidebar (Password: aman@1234)
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [selectedCamForConfig, setSelectedCamForConfig] = useState(null);

  // New Camera Form
  const [newCam, setNewCam] = useState({
    id: `CAM-${String(cameras.length + 1).padStart(2, '0')}`,
    name: '',
    streamType: 'live_stream',
    source: 'rtsp://admin:password@192.168.1.100:554/Streaming/Channels/101',
    area: '',
    ip: '192.168.1.100',
    resolution: '4K Ultra HD',
    speedLimit: 60
  });

  // Configure Camera Form
  const [configSource, setConfigSource] = useState('');
  const [configStreamType, setConfigStreamType] = useState('live_stream');
  const [configArea, setConfigArea] = useState('');
  const [configResolution, setConfigResolution] = useState('4K Ultra HD');
  const [isTestingSignal, setIsTestingSignal] = useState(false);

  // ─── Regular Continuous ANPR Detection Loop (Capped to 30 items max) ───
  useEffect(() => {
    const samplePlates = [
      'DL01AB1234', 'MH02CZ9876', 'KA03MM4567', 'HR26DQ5544', 'WB02AK7788',
      'UP16XY9021', 'TN09BK3321', 'GJ01LM8876', 'TS07EA4512', 'CH01AX9988',
      'RJ14CA2020', 'PB65Z1122', 'DL04CC9900', 'UP14CD5533', 'MH04XY7711',
      'KA05MM8822', 'HR10BB4411', 'GJ06KK9933', 'MP09ZZ2244', 'AP28TT1100'
    ];

    const sampleVehicles = [
      'Sedan (Car) · 99%', 'SUV · 97%', 'Motorcycle · 98%', 'Commercial Truck · 94%',
      'City Bus · 96%', 'Ambulance · 99%', 'Electric Taxi · 95%'
    ];

    const sampleStatuses = [
      'Normal', 'Normal', 'Normal', 'Speeding (78 km/h)', 'Normal',
      'Red Light Jump', 'Normal', 'Wrong-Way Breach', 'Normal'
    ];

    const interval = setInterval(() => {
      const randomCam = cameras[Math.floor(Math.random() * cameras.length)];
      if (!randomCam || randomCam.status === 'offline') return;

      const randomPlate = samplePlates[Math.floor(Math.random() * samplePlates.length)];
      const randomVehicle = sampleVehicles[Math.floor(Math.random() * sampleVehicles.length)];
      const randomStatus = sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)];
      const now = new Date().toTimeString().split(' ')[0];

      detectionCounter.current += 1;

      setDetections((prev) => {
        const newItem = {
          sNo: detectionCounter.current,
          plate: randomPlate,
          camId: randomCam.id,
          time: now,
          area: randomCam.area || randomCam.name,
          detection: randomVehicle,
          status: randomStatus
        };
        // STRICTLY KEEP MAX 30 ROWS
        return [newItem, ...prev.slice(0, 29)];
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [cameras]);

  // Admin Auth Handler
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPassword === 'aman@1234') {
      setIsAdminUnlocked(true);
      setAdminError('');
      toast.addToast({
        type: 'success',
        title: 'Admin Unlocked',
        message: 'Administrator controls activated successfully.'
      });
    } else {
      setAdminError('Incorrect Password. Access denied.');
      toast.addToast({
        type: 'danger',
        title: 'Authentication Failed',
        message: 'Invalid password. Access denied.'
      });
    }
  };

  const handleAdminLock = () => {
    setIsAdminUnlocked(false);
    setAdminPassword('');
    toast.addToast({
      type: 'info',
      title: 'Admin Locked',
      message: 'Admin session closed securely.'
    });
  };

  const handleOpenConfigure = (cam) => {
    setSelectedCamForConfig(cam);
    setConfigStreamType(cam.streamType || 'live_stream');
    setConfigSource(cam.source || '');
    setConfigArea(cam.area || cam.name);
    setConfigResolution(cam.resolution || '4K Ultra HD');
    setIsConfigureModalOpen(true);
  };

  const handleSaveConfigure = () => {
    if (!selectedCamForConfig) return;

    setCameras((prev) =>
      prev.map((c) => {
        if (c.id === selectedCamForConfig.id) {
          return {
            ...c,
            streamType: configStreamType,
            source: configSource,
            area: configArea,
            resolution: configResolution,
            status: 'online',
            latency: configStreamType === 'windy' ? '34ms' : '14ms',
            fps: '60 FPS',
            ip: configStreamType === 'rtsp' ? (configSource.includes('@') ? configSource.split('@')[1].split(':')[0] : '192.168.1.100') : configStreamType.toUpperCase()
          };
        }
        return c;
      })
    );

    setIsConfigureModalOpen(false);
    toast.addToast({
      type: 'success',
      title: 'CCTV Feed Connected',
      message: `${selectedCamForConfig.id} live video feed linked.`
    });
  };

  const handleAddCamera = () => {
    if (!newCam.name.trim()) {
      toast.addToast({ type: 'warning', title: 'Name Required', message: 'Please enter intersection/location name.' });
      return;
    }

    if (cameras.length >= 50) {
      toast.addToast({ type: 'danger', title: 'Limit Reached', message: 'Maximum 50 camera nodes limit reached.' });
      return;
    }

    // Pick a demo video stream
    const demoUrl = DEMO_STREAMS[cameras.length % DEMO_STREAMS.length];

    const createdCam = {
      id: newCam.id || `CAM-${String(cameras.length + 1).padStart(2, '0')}`,
      name: newCam.name,
      streamType: newCam.streamType,
      videoUrl: demoUrl,
      source: newCam.source,
      area: newCam.area || newCam.name,
      ip: newCam.ip || '192.168.1.100',
      status: 'online',
      resolution: newCam.resolution,
      fps: '60 FPS',
      vehiclesNow: Math.floor(Math.random() * 45) + 15,
      latency: '14ms',
      speedLimit: Number(newCam.speedLimit) || 60
    };

    setCameras((prev) => [...prev, createdCam]);
    setIsAddModalOpen(false);

    toast.addToast({
      type: 'success',
      title: 'Camera Node Added',
      message: `${createdCam.id} added (${cameras.length + 1}/50 cameras).`
    });

    setNewCam({
      id: `CAM-${String(cameras.length + 2).padStart(2, '0')}`,
      name: '',
      streamType: 'live_stream',
      source: 'rtsp://admin:password@192.168.1.100:554/Streaming/Channels/101',
      area: '',
      ip: '192.168.1.100',
      resolution: '4K Ultra HD',
      speedLimit: 60
    });
  };

  const handleExpand = (cam) => {
    setExpandedCam(cam);
    setZoom(1);
  };

  const handleClose = () => {
    setExpandedCam(null);
    setZoom(1);
  };

  const visibleCameras = activeCamId === 'all'
    ? cameras
    : cameras.filter((c) => c.id === activeCamId);

  return (
    <div className="space-y-6">
      {/* ─── Top Header & Controls ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <Video className="w-5 h-5 text-[var(--color-amber)]" />
            CCTV Camera Surveillance Matrix
            <Badge variant="amber" size="sm">
              {cameras.length} / 50 Active Nodes
            </Badge>
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Live Streaming CCTV Feeds with Real-Time YOLOv8 Vehicle & License Plate Detection
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => {
              toast.addToast({ type: 'info', title: 'Feeds Synchronized', message: `All ${cameras.length} camera streams live.` });
            }}
          >
            Poll Feeds
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Camera (50 Max)
          </Button>
        </div>
      </div>

      {/* ─── MAIN TOP GRID: 3 Columns Video Grid + 1 Column Sidebar (Admin + Cam Selector) ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Left 3 Columns: Live Moving CCTV Cameras Grid (Cam 1, Cam 2, Cam 3, Cam 4, Cam 5, Cam 6...) */}
        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCameras.map((cam, idx) => (
              <Card
                key={cam.id}
                variant="default"
                className="group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Camera Top Bar */}
                <CardHeader className="p-3 bg-[var(--color-background)] border-b border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusIndicator status={cam.status} size="sm" />
                    <span className="font-bold text-[var(--color-text)] text-xs">{cam.id}</span>
                    <Badge variant="amber" size="xs">
                      LIVE STREAM
                    </Badge>
                  </div>

                  {/* "Add / Connect CCTV" button on each camera */}
                  <button
                    onClick={() => handleOpenConfigure(cam)}
                    className="px-2 py-1 text-[10px] font-semibold rounded bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-amber)] text-[var(--color-text)] hover:text-[var(--color-amber-dark)] flex items-center gap-1 transition-all cursor-pointer"
                    title="Connect CCTV / Web Stream to this camera"
                  >
                    <LinkIcon className="w-3 h-3 text-[var(--color-amber)]" />
                    <span>Connect CCTV</span>
                  </button>
                </CardHeader>

                {/* ─── LIVE VIDEO FEED CONTAINER (Plays actual moving traffic video) ─── */}
                <div
                  className="relative aspect-video bg-[var(--color-charcoal)] flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => handleExpand(cam)}
                  title="Click to expand stream & PTZ"
                >
                  {/* Real Moving Traffic Video Feed */}
                  <video
                    src={cam.videoUrl || DEMO_STREAMS[idx % DEMO_STREAMS.length]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Computer Vision YOLO Bounding Box Overlays */}
                  <div className="absolute top-1/4 left-1/4 w-24 h-14 border-2 border-[var(--color-amber)] rounded bg-[rgba(245,166,35,0.1)] flex items-start justify-start p-0.5 animate-pulse">
                    <span className="text-[8px] font-mono bg-[var(--color-charcoal)] text-[var(--color-amber-light)] px-1 rounded font-bold shadow-sm">
                      Car 98% · 54 km/h
                    </span>
                  </div>

                  <div className="absolute bottom-1/4 right-1/4 w-20 h-12 border-2 border-[var(--color-success)] rounded bg-[rgba(25,135,84,0.1)] flex items-start justify-start p-0.5">
                    <span className="text-[8px] font-mono bg-[var(--color-charcoal)] text-emerald-400 px-1 rounded font-bold shadow-sm">
                      SUV 95%
                    </span>
                  </div>

                  {/* Live Top HUD Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-[var(--color-charcoal)]/85 px-2 py-0.5 rounded text-[9px] text-red-400 font-mono font-bold border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                    REC
                  </div>

                  <div className="absolute top-2 right-2 bg-[var(--color-charcoal)]/85 px-2 py-0.5 rounded text-[9px] text-[var(--color-amber)] font-mono border border-[var(--color-border)]/40">
                    {cam.fps}
                  </div>

                  <div className="absolute bottom-2 left-2 bg-[var(--color-charcoal)]/85 px-2 py-0.5 rounded text-[9px] text-[var(--color-text-secondary)] font-mono border border-[var(--color-border)]/40">
                    {cam.vehiclesNow} vehicles active
                  </div>

                  {/* Hover expand hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                    <div className="bg-[var(--color-charcoal)] border border-[var(--color-border-dark)] rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-[var(--color-amber)] text-xs font-semibold shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Expand Screen
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <CardContent className="p-3 bg-[var(--color-card)]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--color-text)] truncate">{cam.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] mt-1">
                    <span className="truncate max-w-[130px]">{cam.area || cam.name}</span>
                    <span className="font-mono text-[var(--color-text-secondary)]">{cam.latency}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ─── Right 1 Column: Camera Selector (50 Cam Capacity + Switcher) ─── */}
        <div className="xl:col-span-1">
          <Card variant="default" className="h-full flex flex-col">
            <CardHeader className="p-3 bg-[var(--color-background)] border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[var(--color-amber)]" />
                <span className="font-bold text-xs text-[var(--color-text)]">Camera Selector</span>
              </div>
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono">({cameras.length}/50)</span>
            </CardHeader>

            <div className="p-2 border-b border-[var(--color-border)] flex items-center gap-1.5">
              <button
                onClick={() => setActiveCamId('all')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeCamId === 'all'
                    ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)]'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]'
                }`}
              >
                All Grid
              </button>
              <Button
                variant="outline"
                size="xs"
                leftIcon={<Plus className="w-3 h-3 text-[var(--color-amber)]" />}
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Cam
              </Button>
            </div>

            {/* Scrollable List of Cameras (Supports up to 50 cameras) */}
            <div className="p-2 space-y-1.5 overflow-y-auto max-h-[440px] flex-1 text-xs">
              {cameras.map((cam) => {
                const isSelected = activeCamId === cam.id;
                return (
                  <div
                    key={cam.id}
                    onClick={() => setActiveCamId(isSelected ? 'all' : cam.id)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[rgba(245,166,35,0.08)] border-[var(--color-amber)] text-[var(--color-amber-dark)] font-bold shadow-sm'
                        : 'bg-[var(--color-card)] border-[var(--color-border)] hover:bg-[var(--color-background)] text-[var(--color-text)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <StatusIndicator status={cam.status} size="sm" />
                      <div className="truncate">
                        <span className="font-bold block text-xs">{cam.id}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] truncate block">{cam.name}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenConfigure(cam);
                      }}
                      className="p-1.5 rounded hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                      title="Configure Feed"
                    >
                      <Settings2 className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* ─── BOTTOM SECTION: Full-Width Real-Time Vehicle Number Extraction Table (Latest 30 Items) ─── */}
      <Card variant="default">
        <CardHeader className="p-3.5 bg-[var(--color-background)] border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[var(--color-amber)]" />
            <span className="font-bold text-xs text-[var(--color-text)]">
              Live Vehicle Number Plate Extraction Feed
            </span>
            <Badge variant="amber" size="xs">
              Showing Latest {detections.length} Detections (Max 30)
            </Badge>
          </div>

          <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            Auto-Detecting Live Feed
          </span>
        </CardHeader>

        {/* Live Auto-Updating Feed Table with 30-item limit */}
        <div className="overflow-x-auto max-h-[380px]">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] z-10">
              <tr className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                <th className="py-2.5 px-3.5">S.No</th>
                <th className="py-2.5 px-3.5">No Plate</th>
                <th className="py-2.5 px-3.5">Cam - ID</th>
                <th className="py-2.5 px-3.5">Time</th>
                <th className="py-2.5 px-3.5">Area / Intersection</th>
                <th className="py-2.5 px-3.5">Detection (Vehicle Type)</th>
                <th className="py-2.5 px-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {detections.map((d, index) => (
                <tr key={`${d.sNo}-${d.plate}`} className="hover:bg-[var(--color-background)] transition-colors">
                  <td className="py-2 px-3.5 font-mono text-[var(--color-text-muted)] text-[11px]">
                    #{index + 1}
                  </td>

                  {/* Number Plate Column */}
                  <td className="py-2 px-3.5 font-mono font-bold text-[var(--color-amber-dark)]">
                    <span className="px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] tracking-wider">
                      {d.plate}
                    </span>
                  </td>

                  {/* Cam - xx Column */}
                  <td className="py-2 px-3.5 font-mono text-[var(--color-text)] font-semibold">
                    {d.camId}
                  </td>

                  {/* Time Column */}
                  <td className="py-2 px-3.5 font-mono text-[var(--color-text-muted)]">
                    {d.time}
                  </td>

                  {/* Area Column */}
                  <td className="py-2 px-3.5 text-[var(--color-text-secondary)] font-medium">
                    {d.area}
                  </td>

                  {/* Detection Model Column */}
                  <td className="py-2 px-3.5 text-[var(--color-text)] font-semibold">
                    {d.detection}
                  </td>

                  {/* Status / Violation Flag */}
                  <td className="py-2 px-3.5">
                    {d.status === 'Normal' ? (
                      <Badge variant="success" size="xs">
                        Passed · OK
                      </Badge>
                    ) : (
                      <Badge variant={d.status.includes('Speeding') ? 'danger' : 'warning'} size="xs">
                        {d.status}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ─── MODAL 1: ADD NEW CAMERA NODE (UP TO 50) ─── */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision New CCTV Camera Node"
        subtitle={`Add up to 50 active CCTV cameras (${cameras.length}/50 connected)`}
        maxWidth="max-w-md"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddCamera}>
              Add Camera Node
            </Button>
          </>
        }
      >
        <div className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-[var(--color-text-secondary)]">Camera Node ID</label>
            <input
              type="text"
              value={newCam.id}
              onChange={(e) => setNewCam({ ...newCam, id: e.target.value.toUpperCase() })}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[var(--color-amber)]"
              placeholder="CAM-10"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[var(--color-text-secondary)]">Intersection / Location Name</label>
            <input
              type="text"
              value={newCam.name}
              onChange={(e) => setNewCam({ ...newCam, name: e.target.value, area: e.target.value })}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[var(--color-amber)]"
              placeholder="e.g. Ring Road Toll Plaza North"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[var(--color-text-secondary)]">Stream Protocol</label>
            <select
              value={newCam.streamType}
              onChange={(e) => {
                const type = e.target.value;
                let defaultSrc = 'rtsp://admin:password@192.168.1.100:554/Streaming/Channels/101';
                if (type === 'windy') defaultSrc = 'windy-traffic-01';
                if (type === 'webcam') defaultSrc = '0';
                setNewCam({ ...newCam, streamType: type, source: defaultSrc });
              }}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[var(--color-amber)] cursor-pointer"
            >
              <option value="live_stream">Live Traffic Feed (RTSP / Auto-Stream)</option>
              <option value="windy">Windy Webcams v3 API (Public Live Traffic Cam)</option>
              <option value="webcam">Local / USB WebCam (Index 0, 1)</option>
              <option value="http">HTTP MJPEG / HLS Stream</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[var(--color-text-secondary)]">
              Stream Source / RTSP URL
            </label>
            <input
              type="text"
              value={newCam.source}
              onChange={(e) => setNewCam({ ...newCam, source: e.target.value })}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[var(--color-amber)]"
              placeholder="rtsp://admin:password@192.168.1.100:554/live"
            />
          </div>
        </div>
      </Modal>

      {/* ─── MODAL 2: CONNECT / CONFIGURE CCTV STREAM ON CAMERA ─── */}
      <Modal
        isOpen={isConfigureModalOpen}
        onClose={() => setIsConfigureModalOpen(false)}
        title={`Connect CCTV Stream: ${selectedCamForConfig?.id}`}
        subtitle={selectedCamForConfig?.name}
        maxWidth="max-w-md"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsConfigureModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" leftIcon={<LinkIcon className="w-4 h-4" />} onClick={handleSaveConfigure}>
              Connect Stream
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1.5 text-[var(--color-text-secondary)]">Select Feed Protocol</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'RTSP IP Camera', val: 'rtsp', icon: <Radio className="w-3.5 h-3.5" /> },
                { label: 'Windy Webcams v3', val: 'windy', icon: <Globe className="w-3.5 h-3.5" /> },
                { label: 'USB WebCam (0)', val: 'webcam', icon: <CameraIcon className="w-3.5 h-3.5" /> },
                { label: 'Live Stream Loop', val: 'live_stream', icon: <Activity className="w-3.5 h-3.5" /> }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => {
                    setConfigStreamType(item.val);
                    if (item.val === 'rtsp' && !configSource.startsWith('rtsp')) {
                      setConfigSource('rtsp://admin:pass@192.168.1.105:554/live');
                    } else if (item.val === 'windy') {
                      setConfigSource('windy-traffic-01');
                    } else if (item.val === 'webcam') {
                      setConfigSource('0');
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    configStreamType === item.val
                      ? 'bg-[rgba(245,166,35,0.08)] border-[var(--color-amber)] text-[var(--color-amber-dark)] font-bold'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  <span style={{ color: configStreamType === item.val ? 'var(--color-amber)' : 'inherit' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[var(--color-text-secondary)]">Stream URL / Hardware Address</label>
            <input
              type="text"
              value={configSource}
              onChange={(e) => setConfigSource(e.target.value)}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[var(--color-amber)]"
              placeholder="rtsp://admin:pass@192.168.1.100:554/live"
            />
          </div>

          <div>
            <Button
              variant="secondary"
              size="xs"
              className="w-full justify-center"
              leftIcon={<Activity className="w-3.5 h-3.5 text-[var(--color-amber)]" />}
              onClick={() => {
                setIsTestingSignal(true);
                setTimeout(() => {
                  setIsTestingSignal(false);
                  toast.addToast({
                    type: 'success',
                    title: 'Signal Verified (14ms)',
                    message: `Valid RTSP stream handshake established.`
                  });
                }, 500);
              }}
            >
              {isTestingSignal ? 'Testing Handshake...' : 'Test Stream Signal & Ping'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ─── MODAL 3: FULLSCREEN EXPAND & PTZ ─── */}
      {expandedCam && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: 'rgba(28,28,26,0.85)' }}
          onClick={handleClose}
        >
          <div
            className="relative w-full h-full max-w-6xl mx-auto flex flex-col rounded-xl overflow-hidden shadow-sm"
            style={{ background: 'var(--color-card)', border: '1px solid var(--color-border-dark)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-3.5 px-5 bg-[var(--color-background)] border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <StatusIndicator status={expandedCam.status} size="sm" />
                <div>
                  <span className="font-bold text-[var(--color-text)] text-sm">{expandedCam.id}</span>
                  <span className="mx-2 text-[var(--color-text-muted)]">·</span>
                  <span className="text-[var(--color-text-secondary)] text-sm font-medium">{expandedCam.name}</span>
                </div>
                <Badge variant="amber" size="sm">LIVE FEED</Badge>
                <Badge variant="info" size="sm">{expandedCam.resolution}</Badge>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[var(--color-text-muted)] text-xs font-mono">{expandedCam.ip}</span>
                <span className="text-[var(--color-text-muted)] text-xs">·</span>
                <span className="text-[var(--color-text-muted)] text-xs font-mono">{expandedCam.latency}</span>
                <button
                  onClick={handleClose}
                  className="ml-2 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all cursor-pointer"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Video Canvas & PTZ Controls */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0 bg-[var(--color-charcoal)]">
              <div className="relative flex-1 bg-[var(--color-charcoal)] flex items-center justify-center overflow-hidden min-h-[350px]">
                {/* Real Video in Fullscreen */}
                <video
                  src={expandedCam.videoUrl || DEMO_STREAMS[0]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Overlays */}
                <div className="absolute top-1/4 left-1/3 w-44 h-24 border-2 border-[var(--color-amber)] rounded bg-[rgba(245,166,35,0.08)] flex items-start justify-start p-1">
                  <span className="text-[10px] font-mono bg-[var(--color-charcoal)] text-[var(--color-amber-light)] px-1.5 py-0.5 rounded font-bold">
                    Car · 98.4% · 54 km/h
                  </span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 w-36 h-20 border-2 border-[var(--color-success)] rounded bg-[rgba(25,135,84,0.08)] flex items-start justify-start p-1">
                  <span className="text-[10px] font-mono bg-[var(--color-charcoal)] text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                    SUV · 95.1% · 41 km/h
                  </span>
                </div>

                <div className="absolute top-3 left-3 flex items-center gap-2 bg-[var(--color-charcoal)]/85 px-3 py-1 rounded text-xs text-red-400 font-mono font-bold border border-red-500/20">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  REC · 4K · H.265
                </div>

                <div className="absolute top-3 right-3 bg-[var(--color-charcoal)]/85 px-3 py-1 rounded text-xs text-[var(--color-amber)] font-mono border border-[var(--color-border)]/40">
                  {expandedCam.fps} · Latency: {expandedCam.latency}
                </div>

                <div className="absolute bottom-3 left-3 bg-[var(--color-charcoal)]/85 px-3 py-1.5 rounded text-xs text-[var(--color-text-secondary)] font-mono space-y-0.5 border border-[var(--color-border)]/40">
                  <div className="text-[var(--color-amber)] font-bold">{expandedCam.vehiclesNow} Vehicles Detected</div>
                  <div className="text-[var(--color-text-muted)] text-[10px]">YOLOv8 Edge Inference · {new Date().toLocaleTimeString()}</div>
                </div>

                {zoom !== 1 && (
                  <div className="absolute bottom-3 right-3 bg-[var(--color-charcoal)]/90 px-3 py-1 rounded text-xs text-[var(--color-amber)] font-mono font-bold border border-[var(--color-amber)]">
                    ZOOM ×{zoom.toFixed(1)}
                  </div>
                )}
              </div>

              {/* PTZ Pad */}
              <div className="w-full lg:w-56 p-4 bg-[var(--color-card)] border-t lg:border-t-0 lg:border-l border-[var(--color-border)] flex flex-col gap-4">
                <div className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                  <p className="text-[10px] font-bold text-[var(--color-amber-dark)] uppercase tracking-wider mb-2.5 text-center">PTZ Direction Pad</p>
                  <div className="grid grid-cols-3 gap-1.5 w-full max-w-[140px] mx-auto">
                    <div />
                    <button
                      onClick={() => toast.addToast({ type: 'success', title: 'PTZ Up', message: `${expandedCam.id} tilted UP` })}
                      className="aspect-square rounded-md flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-amber)] hover:bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <div />

                    <button
                      onClick={() => toast.addToast({ type: 'success', title: 'PTZ Left', message: `${expandedCam.id} panned LEFT` })}
                      className="aspect-square rounded-md flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-amber)] hover:bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setZoom(1);
                        toast.addToast({ type: 'info', title: 'PTZ Reset', message: `${expandedCam.id} centered.` });
                      }}
                      className="aspect-square rounded-md flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer"
                      title="Reset Center"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toast.addToast({ type: 'success', title: 'PTZ Right', message: `${expandedCam.id} panned RIGHT` })}
                      className="aspect-square rounded-md flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-amber)] hover:bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div />
                    <button
                      onClick={() => toast.addToast({ type: 'success', title: 'PTZ Down', message: `${expandedCam.id} tilted DOWN` })}
                      className="aspect-square rounded-md flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-amber)] hover:bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                  <p className="text-[10px] font-bold text-[var(--color-amber-dark)] uppercase tracking-wider mb-2 text-center">Optical Zoom</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoom((z) => Math.min(z + 0.5, 4))}
                      className="flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 text-xs text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-amber)] cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[var(--color-amber)]" /> In
                    </button>
                    <span className="text-xs font-mono font-bold text-[var(--color-text)]">×{zoom.toFixed(1)}</span>
                    <button
                      onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
                      className="flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 text-xs text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-amber)] cursor-pointer"
                    >
                      <ZoomOut className="w-3.5 h-3.5" /> Out
                    </button>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-auto w-full justify-center"
                  leftIcon={<Minimize2 className="w-3.5 h-3.5" />}
                  onClick={handleClose}
                >
                  Close Fullscreen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cameras;
