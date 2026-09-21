import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  StatusIndicator,
  useToast
} from '../component';
import { ScanLine, Eye, Camera, ShieldAlert, Volume2, RefreshCw, Layers } from 'lucide-react';
import playAlert from '../component/alert';

export const LiveANPR = () => {
  const toast = useToast();
  const [activeCam, setActiveCam] = useState('CAM-04');

  const liveDetections = [
    {
      plate: 'DL 01 AB 1234',
      vehicle: 'White Sedan (Honda City)',
      speed: '78 km/h',
      confidence: '99.4%',
      status: 'Flagged (Overspeeding)',
      severity: 'danger',
      time: '14:48:12'
    },
    {
      plate: 'MH 12 CD 5678',
      vehicle: 'Blue Commercial Truck',
      speed: '42 km/h',
      confidence: '98.8%',
      status: 'Verified Clean',
      severity: 'success',
      time: '14:48:08'
    },
    {
      plate: 'KA 03 EF 9012',
      vehicle: 'Black Sports Bike',
      speed: '65 km/h',
      confidence: '97.6%',
      status: 'Red Signal Jump',
      severity: 'danger',
      time: '14:48:01'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-cyan-400" />
            Live Video ANPR Stream & Optical Alignment
            <Badge variant="danger" size="sm" dot={true} pulse={true}>
              60 FPS FEED
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Edge AI video ingestion with instant YOLOv8 license plate localization
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Volume2 className="w-4 h-4" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'danger',
                title: 'Live Violation Triggered',
                message: 'Alert sound played on vehicle detection.'
              });
            }}
          >
            Test Violation Alarm
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Live OCR Video Canvas Simulator */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="glow">
            <CardHeader className="p-3.5">
              <div className="flex items-center gap-2">
                <StatusIndicator status="online" size="sm" />
                <span className="font-bold text-slate-200 text-xs">
                  {activeCam} — Ring Road North 4K Optical Feed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-cyan-300">Bitrate: 8.4 Mbps</span>
                <span className="text-[11px] font-mono text-emerald-400">FPS: 59.8</span>
              </div>
            </CardHeader>

            {/* Video Viewport with AI Bounding Boxes */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center border-y border-slate-800 overflow-hidden select-none">
              {/* Camera Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#162b4c_1px,transparent_1px)] [background-size:20px_20px] opacity-35" />

              {/* Target 1 OCR Bounding Box */}
              <div className="absolute top-1/3 left-1/4 w-36 h-20 border-2 border-cyan-400 rounded-md bg-cyan-500/10 p-1 flex flex-col justify-between shadow-[0_0_15px_rgba(0,210,255,0.4)] animate-pulse">
                <div className="flex items-center justify-between text-[9px] font-mono bg-cyan-950/90 text-cyan-200 px-1 py-0.5 rounded">
                  <span>DL 01 AB 1234</span>
                  <span className="text-emerald-400 font-bold">99.4%</span>
                </div>
                <div className="text-[8px] font-mono text-slate-300 bg-black/60 px-1 rounded self-start">
                  Speed: 78 km/h [OVER]
                </div>
              </div>

              {/* Target 2 OCR Bounding Box */}
              <div className="absolute bottom-1/4 right-1/3 w-32 h-16 border-2 border-emerald-400 rounded-md bg-emerald-500/10 p-1 flex flex-col justify-between shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <div className="flex items-center justify-between text-[9px] font-mono bg-emerald-950/90 text-emerald-200 px-1 py-0.5 rounded">
                  <span>MH 12 CD 5678</span>
                  <span className="text-emerald-300">98.8%</span>
                </div>
                <div className="text-[8px] font-mono text-slate-300 bg-black/60 px-1 rounded self-start">
                  Speed: 42 km/h [PASS]
                </div>
              </div>

              {/* Live HUD Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono text-red-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                OPTICAL AI LIVE
              </div>

              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300">
                Inference Latency: <strong>11.2 ms</strong>
              </div>
            </div>

            <CardContent className="p-3.5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>Switch Camera Feed:</span>
                {['CAM-01', 'CAM-02', 'CAM-04', 'CAM-09'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCam(c)}
                    className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                      activeCam === c
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Plate Recognition Feed Sidebar */}
        <div className="space-y-4">
          <Card variant="default">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Instant Plate Detections</CardTitle>
              <Badge variant="info" size="sm">
                Stream Sync
              </Badge>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {liveDetections.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30 text-xs">
                      {item.plate}
                    </span>
                    <Badge variant={item.severity} size="sm" dot={item.severity === 'danger'}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{item.vehicle}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                    <span>Speed: {item.speed}</span>
                    <span>Confidence: {item.confidence}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveANPR;
