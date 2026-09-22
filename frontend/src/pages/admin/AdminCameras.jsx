import React, { useState } from 'react';
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
  StatusIndicator,
  useToast
} from '../../component';
import { Video, Plus, Sliders } from 'lucide-react';

export const AdminCameras = () => {
  const toast = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCamId, setNewCamId] = useState('');
  const [newCamLocation, setNewCamLocation] = useState('');
  const [newCamIp, setNewCamIp] = useState('');

  const [hardwareCameras, setHardwareCameras] = useState([
    {
      id: 'CAM-01',
      location: 'Shimla Entry (North Gateway)',
      ip: '192.168.10.101',
      rtsp: 'rtsp://edge-ai:auth@192.168.10.101:554/ch01_main',
      firmware: 'v4.2.1-AI',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      status: 'online',
      latency: '12ms'
    },
    {
      id: 'CAM-02',
      location: 'Ridge Vista Radial Junction',
      ip: '192.168.10.102',
      rtsp: 'rtsp://edge-ai:auth@192.168.10.102:554/ch02_main',
      firmware: 'v4.2.1-AI',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      status: 'online',
      latency: '14ms'
    },
    {
      id: 'CAM-04',
      location: 'Mall Road Commercial Corridor',
      ip: '192.168.10.104',
      rtsp: 'rtsp://edge-ai:auth@192.168.10.104:554/ch04_main',
      firmware: 'v4.1.8-AI',
      resolution: '1080p Full HD',
      fps: '30 FPS',
      status: 'online',
      latency: '18ms'
    },
    {
      id: 'CAM-07',
      location: 'ISBT Bus Terminal Interchange',
      ip: '192.168.10.107',
      rtsp: 'rtsp://edge-ai:auth@192.168.10.107:554/ch07_main',
      firmware: 'v4.2.0-AI',
      resolution: '1080p Full HD',
      fps: '45 FPS',
      status: 'online',
      latency: '24ms'
    },
    {
      id: 'CAM-08',
      location: 'Industrial Corridor Gate 4',
      ip: '192.168.10.108',
      rtsp: 'rtsp://edge-ai:auth@192.168.10.108:554/ch08_main',
      firmware: 'v3.9.0-LEGACY',
      resolution: '1080p Full HD',
      fps: '0 FPS',
      status: 'offline',
      latency: 'Timeout'
    },
    {
      id: 'CAM-09',
      location: 'Sanjauli East Tunnel Ramp',
      ip: '192.168.10.109',
      rtsp: 'rtsp://edge-ai:auth@192.168.10.109:554/ch09_main',
      firmware: 'v4.2.1-AI',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      status: 'online',
      latency: '15ms'
    },
    {
      id: 'CAM-12',
      location: 'South Bypass Expressway Link',
      ip: '192.168.10.112',
      rtsp: 'rtsp://edge-ai:auth@192.168.10.112:554/ch12_main',
      firmware: 'v4.2.1-AI',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      status: 'online',
      latency: '14ms'
    }
  ]);

  const handleAddCamera = (e) => {
    e.preventDefault();
    if (!newCamId.trim() || !newCamLocation.trim() || !newCamIp.trim()) {
      toast.addToast({
        type: 'error',
        title: 'Input Required',
        message: 'Camera ID, physical address, and IP are required.'
      });
      return;
    }

    const newCam = {
      id: newCamId.toUpperCase(),
      location: newCamLocation,
      ip: newCamIp,
      rtsp: `rtsp://edge-ai:auth@${newCamIp}:554/live`,
      firmware: 'v4.2.1-AI',
      resolution: '4K Ultra HD',
      fps: '60 FPS',
      status: 'online',
      latency: '16ms'
    };

    setHardwareCameras([...hardwareCameras, newCam]);
    setIsAddModalOpen(false);
    setNewCamId('');
    setNewCamLocation('');
    setNewCamIp('');

    toast.addToast({
      type: 'success',
      title: 'CCTV Node Provisioned',
      message: `${newCam.id} successfully attached to the edge AI inference cluster.`
    });
  };

  const columns = [
    {
      key: 'id',
      label: 'Camera Node',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <StatusIndicator status={row.status} size="sm" />
          <span className="font-bold text-[var(--color-text)] font-mono">{val}</span>
        </div>
      )
    },
    { key: 'location', label: 'Physical Corridor Address' },
    {
      key: 'ip',
      label: 'Static IP',
      render: (val) => <span className="font-mono text-[var(--color-amber)] font-semibold">{val}</span>
    },
    {
      key: 'rtsp',
      label: 'RTSP Stream Endpoint',
      render: (val) => (
        <span className="font-mono text-[11px] text-[var(--color-text-muted)] truncate max-w-[200px] block">
          {val}
        </span>
      )
    },
    {
      key: 'fps',
      label: 'FPS / Latency',
      render: (_, row) => (
        <div className="text-xs font-mono">
          <span className={row.status === 'online' ? 'text-emerald-400 font-bold' : 'text-[var(--color-text-muted)]'}>
            {row.fps}
          </span>
          <span className="text-[var(--color-text-muted)] text-[10px] block">({row.latency})</span>
        </div>
      )
    },
    {
      key: 'firmware',
      label: 'Firmware',
      render: (val) => <span className="font-mono text-xs text-[var(--color-text-secondary)]">{val}</span>
    },
    {
      key: 'action',
      label: 'Hardware Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="xs"
            leftIcon={<Sliders className="w-3.5 h-3.5 text-[var(--color-amber)]" />}
            onClick={() => {
              toast.addToast({
                type: 'info',
                title: 'Sensor Calibration Initiated',
                message: `Optical distortion calibration running for ${row.id}.`
              });
            }}
          >
            Calibrate
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[var(--color-text)] tracking-tight">
                CCTV Optical Hardware Provisioning
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Configure network RTSP endpoints, edge device static IPs, and PTZ sensor calibration
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Provision CCTV Node
          </Button>
        </div>
      </div>

      <Card variant="default">
        <CardHeader className="p-4 border-b border-[var(--color-border)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sm">Physical Optical Camera Sensors ({hardwareCameras.length})</CardTitle>
            <CardDescription className="text-xs">
              Direct network stream routing and edge computer vision inference pipelines
            </CardDescription>
          </div>
          <Badge variant="success" size="sm">
            {hardwareCameras.filter((c) => c.status === 'online').length} of {hardwareCameras.length} Online
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <Table columns={columns} data={hardwareCameras} />
        </CardContent>
      </Card>

      {/* Provision CCTV Node Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision New CCTV Surveillance Camera"
        size="md"
      >
        <form onSubmit={handleAddCamera} className="space-y-4 text-xs">
          <div>
            <label className="block text-[var(--color-text-secondary)] font-bold mb-1">
              Camera Identifier (ID)
            </label>
            <input
              type="text"
              required
              value={newCamId}
              onChange={(e) => setNewCamId(e.target.value)}
              placeholder="e.g. CAM-15"
              className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-amber)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
            />
          </div>

          <div>
            <label className="block text-[var(--color-text-secondary)] font-bold mb-1">
              Corridor Physical Location
            </label>
            <input
              type="text"
              required
              value={newCamLocation}
              onChange={(e) => setNewCamLocation(e.target.value)}
              placeholder="e.g. West Ring Road Arterial Flyover"
              className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-amber)]"
            />
          </div>

          <div>
            <label className="block text-[var(--color-text-secondary)] font-bold mb-1">
              Static Network IP Address
            </label>
            <input
              type="text"
              required
              value={newCamIp}
              onChange={(e) => setNewCamIp(e.target.value)}
              placeholder="e.g. 192.168.10.115"
              className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-amber)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
            />
          </div>

          <div className="p-3 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)] text-[11px] text-[var(--color-text-muted)] space-y-1">
            <span className="font-bold text-[var(--color-text-secondary)] block">Automated Provisioning Pipeline:</span>
            <p>RTSP port 554 will be polled for H.264/H.265 transport streams. YOLOv8 inference weights will be dynamically linked.</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Commit Hardware Node
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCameras;
