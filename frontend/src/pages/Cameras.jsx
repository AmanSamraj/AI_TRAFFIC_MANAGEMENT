import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Button,
  StatusIndicator,
  Dropdown,
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
  ChevronRight
} from 'lucide-react';

export const Cameras = () => {
  const toast = useToast();
  const [filter, setFilter] = useState('all');
  const [expandedCam, setExpandedCam] = useState(null);
  const [zoom, setZoom] = useState(1);

  const camerasList = [
    {
      id: 'CAM-01',
      name: 'Highway Junction A (North)',
      ip: '192.168.10.101',
      status: 'online',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      vehiclesNow: 42,
      latency: '12ms'
    },
    {
      id: 'CAM-02',
      name: 'Central Expressway Overpass',
      ip: '192.168.10.102',
      status: 'online',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      vehiclesNow: 68,
      latency: '14ms'
    },
    {
      id: 'CAM-04',
      name: 'Ring Road Interchange',
      ip: '192.168.10.104',
      status: 'online',
      resolution: '1080p Full HD',
      fps: '30 FPS',
      vehiclesNow: 89,
      latency: '18ms'
    },
    {
      id: 'CAM-07',
      name: 'Outer Bypass Toll Plaza',
      ip: '192.168.10.107',
      status: 'warning',
      resolution: '1080p Full HD',
      fps: '24 FPS',
      vehiclesNow: 31,
      latency: '120ms (High)'
    },
    {
      id: 'CAM-08',
      name: 'South Industrial Corridor',
      ip: '192.168.10.108',
      status: 'offline',
      resolution: 'No Signal',
      fps: '0 FPS',
      vehiclesNow: 0,
      latency: 'Disconnected'
    },
    {
      id: 'CAM-09',
      name: 'Metro Line Junction Gate 3',
      ip: '192.168.10.109',
      status: 'online',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      vehiclesNow: 54,
      latency: '15ms'
    }
  ];

  const filtered = camerasList.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  // ESC key to close expanded modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && expandedCam) {
        setExpandedCam(null);
        setZoom(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedCam]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (expandedCam) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [expandedCam]);

  const handleExpand = (cam) => {
    if (cam.status === 'offline') {
      toast.addToast({
        type: 'danger',
        title: 'Stream Unavailable',
        message: `${cam.id} is offline. Cannot expand stream.`
      });
      return;
    }
    setExpandedCam(cam);
    setZoom(1);
  };

  const handleClose = () => {
    setExpandedCam(null);
    setZoom(1);
  };

  const handlePTZ = (direction) => {
    toast.addToast({
      type: 'success',
      title: `PTZ → ${direction}`,
      message: `Camera ${expandedCam?.id} panning ${direction}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <Video className="w-5 h-5 text-[var(--color-amber)]" />
            CCTV Camera Surveillance Matrix
            <Badge variant="info" size="sm">
              48 Active
            </Badge>
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Real-time RTSP/WebRTC feeds with edge AI vehicle detection overlays
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Dropdown
            value={filter}
            onChange={(val) => setFilter(val)}
            options={[
              { label: 'All Cameras', value: 'all' },
              { label: 'Online Only', value: 'online' },
              { label: 'High Latency / Warning', value: 'warning' },
              { label: 'Offline', value: 'offline' }
            ]}
          />

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'info',
                title: 'Camera RTSP Synced',
                message: 'All 48 stream feeds successfully polled.'
              });
            }}
          >
            Poll Feeds
          </Button>
        </div>
      </div>

      {/* Video Stream Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cam) => (
          <Card
            key={cam.id}
            variant={cam.status === 'offline' ? 'default' : 'glow'}
            className="group"
          >
            <CardHeader className="p-3.5">
              <div className="flex items-center gap-2">
                <StatusIndicator status={cam.status} size="sm" />
                <span className="font-bold text-[var(--color-text)] text-xs">{cam.id}</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">{cam.ip}</span>
            </CardHeader>

            {/* Simulated Live Video Screen */}
            <div
              className="relative aspect-video bg-[var(--color-charcoal)] flex flex-col items-center justify-center border-y border-[var(--color-border)]/80 overflow-hidden cursor-pointer"
              onClick={() => handleExpand(cam)}
              title="Click to expand stream"
            >
              {cam.status === 'offline' ? (
                <div className="text-center p-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-background)] flex items-center justify-center mx-auto mb-2 text-[var(--color-text-muted)]">
                    <Video className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-[var(--color-text-muted)]">NO SIGNAL</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Stream disconnected</p>
                </div>
              ) : (
                <>
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#162b4c_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  {/* Hover expand hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-black/70  rounded-lg px-3 py-2 flex items-center gap-2 text-[var(--color-amber)] text-xs font-semibold">
                      <Maximize2 className="w-4 h-4" />
                      Click to Expand
                    </div>
                  </div>

                  {/* Simulated Bounding Boxes */}
                  <div className="absolute top-1/4 left-1/3 w-20 h-12 border-2 border-cyan-400/80 rounded bg-[rgba(245,166,35,0.06)] flex items-start justify-start p-0.5 animate-pulse">
                    <span className="text-[8px] font-mono bg-cyan-900/90 text-cyan-200 px-1 rounded">
                      Car 98%
                    </span>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-16 h-10 border-2 border-emerald-400/80 rounded bg-[rgba(25,135,84,0.08)] flex items-start justify-start p-0.5">
                    <span className="text-[8px] font-mono bg-emerald-900/90 text-emerald-200 px-1 rounded">
                      SUV 95%
                    </span>
                  </div>

                  {/* Live HUD Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60  px-2 py-0.5 rounded text-[10px] text-red-400 font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    REC
                  </div>

                  <div className="absolute top-2 right-2 bg-black/60  px-2 py-0.5 rounded text-[10px] text-[var(--color-amber)] font-mono">
                    {cam.fps}
                  </div>

                  <div className="absolute bottom-2 left-2 bg-black/60  px-2 py-0.5 rounded text-[10px] text-[var(--color-text-secondary)] font-mono">
                    {cam.vehiclesNow} vehicles detected
                  </div>
                </>
              )}
            </div>

            <CardContent className="p-3.5 space-y-1.5">
              <p className="text-xs font-semibold text-[var(--color-text)] truncate">{cam.name}</p>
              <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
                <span>{cam.resolution}</span>
                <span className="font-mono text-[var(--color-text-secondary)]">{cam.latency}</span>
              </div>
            </CardContent>

            <CardFooter className="p-2.5 px-3.5 bg-[var(--color-background)]">
              <Button
                variant="ghost"
                size="xs"
                leftIcon={<Maximize2 className="w-3.5 h-3.5" />}
                onClick={() => handleExpand(cam)}
              >
                Expand Stream
              </Button>
              <Button
                variant="outline"
                size="xs"
                leftIcon={<Sliders className="w-3.5 h-3.5" />}
                onClick={() => {
                  toast.addToast({
                    type: 'success',
                    title: `PTZ Calibration`,
                    message: `Calibration parameters verified for ${cam.id}`
                  });
                }}
              >
                PTZ Control
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* ─── Fullscreen Expand Modal ─── */}
      {expandedCam && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={handleClose}
        >
          {/* Modal Content — stop propagation so clicking inside doesn't close */}
          <div
            className="relative w-full h-full max-w-7xl mx-auto flex flex-col"
            style={{ padding: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between mb-3 px-2"
              style={{
                background: 'rgba(6,14,26,0.95)',
                border: '1px solid rgba(0,210,255,0.2)',
                borderRadius: '10px',
                padding: '10px 16px'
              }}
            >
              <div className="flex items-center gap-3">
                <StatusIndicator status={expandedCam.status} size="sm" />
                <div>
                  <span className="font-bold text-[var(--color-text)] text-sm">{expandedCam.id}</span>
                  <span className="mx-2 text-[var(--color-text-muted)]">·</span>
                  <span className="text-[var(--color-text-secondary)] text-sm">{expandedCam.name}</span>
                </div>
                <Badge variant="info" size="sm">{expandedCam.resolution}</Badge>
                <span
                  className="font-mono text-[11px] px-2 py-0.5 rounded"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
                >
                  ● LIVE {expandedCam.fps}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-muted)] text-xs font-mono">{expandedCam.ip}</span>
                <span className="text-[var(--color-text-muted)] text-xs">·</span>
                <span className="text-[var(--color-text-muted)] text-xs font-mono">{expandedCam.latency}</span>
                <button
                  onClick={handleClose}
                  className="ml-3 w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-red-500/20 transition-all"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Video Area + PTZ Sidebar */}
            <div className="flex gap-4 flex-1 min-h-0">
              {/* Expanded Video Canvas */}
              <div
                className="relative flex-1 rounded-xl overflow-hidden"
                style={{
                  background: '#020812',
                  border: '1px solid rgba(0,210,255,0.25)',
                  boxShadow: '0 0 40px rgba(0,210,255,0.08)'
                }}
              >
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#162b4c_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

                {/* Bounding boxes — larger scale */}
                <div className="absolute top-1/4 left-1/3 w-40 h-24 border-2 border-cyan-400/80 rounded bg-[rgba(245,166,35,0.06)] flex items-start justify-start p-1"
                  style={{ boxShadow: '0 0 12px rgba(0,210,255,0.3)' }}>
                  <span className="text-[10px] font-mono bg-cyan-900/90 text-cyan-200 px-1.5 py-0.5 rounded">
                    Car · 98.4% · 54 km/h
                  </span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 w-32 h-20 border-2 border-emerald-400/80 rounded bg-[rgba(25,135,84,0.08)] flex items-start justify-start p-1"
                  style={{ boxShadow: '0 0 12px rgba(16,185,129,0.3)' }}>
                  <span className="text-[10px] font-mono bg-emerald-900/90 text-emerald-200 px-1.5 py-0.5 rounded">
                    SUV · 95.1% · 41 km/h
                  </span>
                </div>
                <div className="absolute top-1/2 left-1/5 w-24 h-16 border-2 border-yellow-400/80 rounded bg-yellow-500/10 flex items-start justify-start p-1">
                  <span className="text-[10px] font-mono bg-yellow-900/90 text-yellow-200 px-1.5 py-0.5 rounded">
                    Truck · 91.3%
                  </span>
                </div>

                {/* HUD overlays */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70  px-3 py-1 rounded text-xs text-red-400 font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  REC · 4K · H.265
                </div>

                <div className="absolute top-3 right-3 bg-black/70  px-3 py-1 rounded text-xs text-[var(--color-amber)] font-mono">
                  {expandedCam.fps} · Latency: {expandedCam.latency}
                </div>

                <div className="absolute bottom-3 left-3 bg-black/70  px-3 py-1.5 rounded text-xs text-[var(--color-text-secondary)] font-mono space-y-0.5">
                  <div className="text-[var(--color-amber)] font-bold">{expandedCam.vehiclesNow} Vehicles Detected</div>
                  <div className="text-[var(--color-text-muted)] text-[10px]">YOLOv8 · {new Date().toLocaleTimeString()}</div>
                </div>

                {/* Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-6 h-6 border border-[var(--color-amber)]/30 rounded-full" />
                  <div className="absolute w-12 h-px bg-cyan-500/20" />
                  <div className="absolute h-12 w-px bg-cyan-500/20" />
                </div>

                {/* Zoom indicator */}
                {zoom !== 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/70  px-3 py-1 rounded text-xs text-yellow-300 font-mono font-bold">
                    ZOOM ×{zoom.toFixed(1)}
                  </div>
                )}

                {/* Close hint */}
                <div className="absolute bottom-3 right-3 text-[10px] text-[var(--color-text-muted)] font-mono">
                  Press ESC to close
                </div>
              </div>

              {/* PTZ Control Panel */}
              <div
                className="w-48 flex flex-col gap-3 shrink-0"
              >
                {/* PTZ Direction Pad */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(6,14,26,0.95)',
                    border: '1px solid rgba(0,210,255,0.15)'
                  }}
                >
                  <p className="text-[10px] font-bold text-[var(--color-amber)] uppercase tracking-widest mb-3 text-center">PTZ Control</p>
                  <div className="grid grid-cols-3 gap-1.5 w-full">
                    <div />
                    <button
                      onClick={() => handlePTZ('Up')}
                      className="aspect-square rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] hover:bg-[rgba(245,166,35,0.06)] transition-all border border-[var(--color-border)]/60 hover:border-[var(--color-amber)]"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <div />

                    <button
                      onClick={() => handlePTZ('Left')}
                      className="aspect-square rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] hover:bg-[rgba(245,166,35,0.06)] transition-all border border-[var(--color-border)]/60 hover:border-[var(--color-amber)]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setZoom(1);
                        toast.addToast({ type: 'info', title: 'PTZ Reset', message: `${expandedCam.id} centered to home position.` });
                      }}
                      className="aspect-square rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-slate-700/60 transition-all border border-[var(--color-border)]/60"
                      title="Reset to center"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handlePTZ('Right')}
                      className="aspect-square rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] hover:bg-[rgba(245,166,35,0.06)] transition-all border border-[var(--color-border)]/60 hover:border-[var(--color-amber)]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div />
                    <button
                      onClick={() => handlePTZ('Down')}
                      className="aspect-square rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] hover:bg-[rgba(245,166,35,0.06)] transition-all border border-[var(--color-border)]/60 hover:border-[var(--color-amber)]"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div />
                  </div>
                </div>

                {/* Zoom Controls */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(6,14,26,0.95)',
                    border: '1px solid rgba(0,210,255,0.15)'
                  }}
                >
                  <p className="text-[10px] font-bold text-[var(--color-amber)] uppercase tracking-widest mb-3 text-center">Optical Zoom</p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setZoom((z) => Math.min(z + 0.5, 5))}
                      className="w-full py-2 rounded-lg flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] hover:bg-[rgba(245,166,35,0.06)] transition-all border border-[var(--color-border)]/60 hover:border-[var(--color-amber)]"
                    >
                      <ZoomIn className="w-3.5 h-3.5" /> Zoom In
                    </button>
                    <div className="text-center text-xs font-mono text-[var(--color-text-muted)]">
                      ×{zoom.toFixed(1)}
                    </div>
                    <button
                      onClick={() => setZoom((z) => Math.max(z - 0.5, 0.5))}
                      className="w-full py-2 rounded-lg flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-slate-700/40 transition-all border border-[var(--color-border)]/60"
                    >
                      <ZoomOut className="w-3.5 h-3.5" /> Zoom Out
                    </button>
                  </div>
                </div>

                {/* Camera Info */}
                <div
                  className="rounded-xl p-4 flex-1"
                  style={{
                    background: 'rgba(6,14,26,0.95)',
                    border: '1px solid rgba(0,210,255,0.15)'
                  }}
                >
                  <p className="text-[10px] font-bold text-[var(--color-amber)] uppercase tracking-widest mb-3">Stream Info</p>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Camera</span>
                      <span className="text-[var(--color-text)] font-mono">{expandedCam.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">FPS</span>
                      <span className="text-[var(--color-amber)] font-mono">{expandedCam.fps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Res</span>
                      <span className="text-[var(--color-text-secondary)] font-mono text-[10px]">{expandedCam.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Latency</span>
                      <span className={`font-mono ${expandedCam.latency.includes('High') ? 'text-yellow-400' : 'text-emerald-400'}`}>
                        {expandedCam.latency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Vehicles</span>
                      <span className="text-[var(--color-text)] font-bold">{expandedCam.vehiclesNow}</span>
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  Close Stream
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cameras;
