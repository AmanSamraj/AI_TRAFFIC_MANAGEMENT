import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  StatusIndicator,
  useToast
} from '../component';
import {
  Video,
  ArrowLeft,
  Camera,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Cpu,
  Thermometer,
  Wifi
} from 'lucide-react';

export const CameraDetails = () => {
  const { id = 'CAM-01' } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [ptzStatus, setPtzStatus] = useState('Standby');

  const handlePtz = (direction) => {
    setPtzStatus(`Pivoting ${direction}`);
    toast.addToast({
      type: 'info',
      title: 'PTZ Motor Signal Dispatched',
      message: `${id} motor adjusted ${direction}.`
    });
    setTimeout(() => setPtzStatus('Standby'), 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cameras')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            All Cameras
          </Button>

          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
              <Video className="w-5 h-5 text-[var(--color-amber)]" />
              Camera Node Diagnostics: {id}
              <Badge variant="success" size="sm" dot={true}>
                ONLINE
              </Badge>
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Live RTSP/H.265 Stream & High-Precision PTZ Actuator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Camera className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'High-Res Frame Captured',
                message: `Snapshot from ${id} saved to evidence repository.`
              });
            }}
          >
            Capture Frame
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'info',
                title: 'Stream Reconnected',
                message: `RTSP stream re-initialized for ${id}.`
              });
            }}
          >
            Re-init Stream
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="glow">
            <CardHeader className="p-3.5">
              <div className="flex items-center gap-2">
                <StatusIndicator status="online" size="sm" />
                <span className="font-bold text-xs text-[var(--color-text)]">
                  RTSP://192.168.10.104/live/4k_stream
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--color-amber)]">FPS: 60.0 | 4K UHD</span>
            </CardHeader>

            <div className="relative aspect-video bg-[var(--color-charcoal)] flex items-center justify-center border-y border-[var(--color-border)] overflow-hidden select-none">
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#162b4c_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

              {/* Crosshair Center */}
              <div className="relative flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 border border-[var(--color-border-dark)] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-[var(--color-amber)]/70 rounded-full" />
                </div>
                <div className="absolute w-36 h-[1px] bg-[var(--color-amber)]/30" />
                <div className="absolute h-36 w-[1px] bg-[var(--color-amber)]/30" />
              </div>

              {/* Status overlays */}
              <div className="absolute top-3 left-3 bg-black/70  px-2.5 py-1 rounded text-xs font-mono text-[var(--color-amber)]">
                PTZ Zoom: {zoomLevel.toFixed(1)}x
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70  px-2.5 py-1 rounded text-xs font-mono text-[var(--color-text-secondary)]">
                Actuator: <strong className="text-[var(--color-amber)]">{ptzStatus}</strong>
              </div>
            </div>

            <CardContent className="p-4 grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Optical Bitrate:</span>
                <p className="font-mono font-semibold text-[var(--color-text)] mt-0.5">8.94 Mbps</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Network Latency:</span>
                <p className="font-mono font-semibold text-emerald-400 mt-0.5">14.2 ms</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Dropped Frames:</span>
                <p className="font-mono font-semibold text-[var(--color-text)] mt-0.5">0.02% (Healthy)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PTZ Hardware & Telemetry Sidebar */}
        <div className="space-y-4">
          {/* PTZ Pad */}
          <Card variant="default">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">PTZ Directional Control</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex flex-col items-center gap-3">
              <div className="grid grid-cols-3 gap-2 w-48">
                <div />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePtz('UP')}
                  aria-label="Tilt Up"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <div />

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePtz('LEFT')}
                  aria-label="Pan Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePtz('CENTER')}
                  aria-label="Recenter"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePtz('RIGHT')}
                  aria-label="Pan Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <div />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePtz('DOWN')}
                  aria-label="Tilt Down"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <div />
              </div>

              <div className="flex items-center gap-3 w-full pt-3 border-t border-[var(--color-border)] justify-center">
                <Button
                  variant="secondary"
                  size="xs"
                  leftIcon={<ZoomIn className="w-3.5 h-3.5" />}
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 5.0))}
                >
                  Zoom In
                </Button>
                <Button
                  variant="secondary"
                  size="xs"
                  leftIcon={<ZoomOut className="w-3.5 h-3.5" />}
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1.0))}
                >
                  Zoom Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Node Hardware Health */}
          <Card variant="default">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Hardware Node Vitals</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  Sensor Temperature:
                </span>
                <span className="font-mono text-[var(--color-text)]">44.2°C (Optimal)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                  Edge NPU Load:
                </span>
                <span className="font-mono text-[var(--color-text)]">38%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  PoE Signal Strength:
                </span>
                <span className="font-mono text-emerald-400">-52 dBm (Excellent)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CameraDetails;
