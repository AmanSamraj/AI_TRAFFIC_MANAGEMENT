import React, { useState } from 'react';
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
import { Video, Maximize2, RefreshCw, Sliders } from 'lucide-react';

export const Cameras = () => {
  const toast = useToast();
  const [filter, setFilter] = useState('all');

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            CCTV Camera Surveillance Matrix
            <Badge variant="info" size="sm">
              48 Active
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
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
                <span className="font-bold text-slate-200 text-xs">{cam.id}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{cam.ip}</span>
            </CardHeader>

            {/* Simulated Live Video Screen */}
            <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center border-y border-slate-800/80 overflow-hidden">
              {cam.status === 'offline' ? (
                <div className="text-center p-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2 text-slate-500">
                    <Video className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400">NO SIGNAL</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Stream disconnected</p>
                </div>
              ) : (
                <>
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#162b4c_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  {/* Simulated Bounding Boxes */}
                  <div className="absolute top-1/4 left-1/3 w-20 h-12 border-2 border-cyan-400/80 rounded bg-cyan-500/10 flex items-start justify-start p-0.5 animate-pulse">
                    <span className="text-[8px] font-mono bg-cyan-900/90 text-cyan-200 px-1 rounded">
                      Car 98%
                    </span>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-16 h-10 border-2 border-emerald-400/80 rounded bg-emerald-500/10 flex items-start justify-start p-0.5">
                    <span className="text-[8px] font-mono bg-emerald-900/90 text-emerald-200 px-1 rounded">
                      SUV 95%
                    </span>
                  </div>

                  {/* Live HUD Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-red-400 font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    REC
                  </div>

                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                    {cam.fps}
                  </div>

                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                    {cam.vehiclesNow} vehicles detected
                  </div>
                </>
              )}
            </div>

            <CardContent className="p-3.5 space-y-1.5">
              <p className="text-xs font-semibold text-slate-200 truncate">{cam.name}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{cam.resolution}</span>
                <span className="font-mono text-slate-300">{cam.latency}</span>
              </div>
            </CardContent>

            <CardFooter className="p-2.5 px-3.5 bg-slate-950/60">
              <Button
                variant="ghost"
                size="xs"
                leftIcon={<Maximize2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  toast.addToast({
                    type: 'info',
                    title: `Expanded ${cam.id}`,
                    message: `Full-screen PTZ view enabled for ${cam.name}`
                  });
                }}
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
    </div>
  );
};

export default Cameras;
