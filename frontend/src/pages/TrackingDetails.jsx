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
  useToast
} from '../component';
import {
  Navigation,
  ArrowLeft,
  Siren,
  Camera,
  Clock,
  ArrowDown,
  Car,
  Compass,
  Radio,
  Layers
} from 'lucide-react';
import playAlert from '../component/alert';

const TRAJECTORY_DATA = {
  'HP01AB1234': {
    plate: 'HP01AB1234',
    vehicle: 'Car',
    speedAvg: '52 km/h',
    totalDistance: '24.6 km',
    nodes: [
      { id: 'CAM-01', time: '08:31', location: 'Shimla', speed: '42 km/h', confidence: '99%', x: 260, y: 60 },
      { id: 'CAM-04', time: '09:12', location: 'Mall Road', speed: '28 km/h', confidence: '97%', x: 310, y: 160 },
      { id: 'CAM-07', time: '09:45', location: 'ISBT', speed: '36 km/h', confidence: '98%', x: 230, y: 270 },
      { id: 'CAM-12', time: '10:20', location: 'Highway', speed: '58 km/h', confidence: '94%', x: 280, y: 380 }
    ],
    currentLocation: { location: 'Highway Mile 31 (Heading North)', time: 'Live Now', speed: '62 km/h', x: 300, y: 470 }
  }
};

export const TrackingDetails = () => {
  const { plate = 'HP01AB1234' } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const clean = plate.replace(/[\s\-_]/g, '').toUpperCase();
  const target = TRAJECTORY_DATA[clean] || {
    plate: clean || 'HP01AB1234',
    vehicle: 'Car',
    speedAvg: '52 km/h',
    totalDistance: '24.6 km',
    nodes: [
      { id: 'CAM-01', time: '08:31', location: 'Shimla', speed: '42 km/h', confidence: '99%', x: 260, y: 60 },
      { id: 'CAM-04', time: '09:12', location: 'Mall Road', speed: '28 km/h', confidence: '97%', x: 310, y: 160 },
      { id: 'CAM-07', time: '09:45', location: 'ISBT', speed: '36 km/h', confidence: '98%', x: 230, y: 270 },
      { id: 'CAM-12', time: '10:20', location: 'Highway', speed: '58 km/h', confidence: '94%', x: 280, y: 380 }
    ],
    currentLocation: { location: 'Highway Mile 31', time: 'Live Now', speed: '62 km/h', x: 300, y: 470 }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tracking')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            All Tracking Corridors
          </Button>

          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[var(--color-amber)]" />
              Target Trajectory: {target.plate}
              <Badge variant="danger" size="sm" dot={true} pulse={true}>
                ACTIVE PURSUIT
              </Badge>
            </h1>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Continuous multi-camera optical checkpoint vectoring and spatial triangulation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Car className="w-4 h-4 text-[var(--color-amber)]" />}
            onClick={() => navigate(`/vehicles/${target.plate}`)}
          >
            Vehicle Dossier
          </Button>
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Siren className="w-4 h-4" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'danger',
                title: 'PCR Intercept Unit Dispatched',
                message: `Nearest highway patrol unit dispatched to intercept ${target.plate}.`
              });
            }}
          >
            Dispatch Intercept
          </Button>
        </div>
      </div>

      {/* Grid: Vertical Wireframe Timeline (Left) + Vector Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Vertical Timeline */}
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
                    Optical handoff timeline for <span className="font-mono text-[var(--color-text)] font-bold">{target.plate}</span>
                  </CardDescription>
                </div>
                <Badge variant="info" size="sm">
                  {target.nodes.length} CAMERAS
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-5">
              <div className="relative font-mono text-sm space-y-1">
                {target.nodes.map((node) => (
                  <div key={node.id} className="relative">
                    <div className="p-3.5 rounded-xl border bg-[var(--color-card)] border-[var(--color-border)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[var(--color-amber)] text-[var(--color-charcoal)] flex items-center justify-center font-bold text-xs shadow-md">
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

                    <div className="py-2.5 px-6 flex items-center gap-3 select-none">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-[var(--color-amber)] shadow-sm" />
                        <ArrowDown className="w-4 h-4 -my-0.5 text-[var(--color-amber)]" />
                      </div>
                      <div className="text-xs px-2.5 py-1 rounded-md border bg-[rgba(245,166,35,0.06)] border-[var(--color-amber)]/30 text-[var(--color-amber)] font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                        <span>{node.time}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] font-sans">
                          ({node.location})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CURRENT LOCATION */}
                <div className="p-4 rounded-xl border-2 bg-gradient-to-r from-red-950/40 via-amber-950/20 to-red-950/40 border-red-500 shadow-sm">
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
                          {target.currentLocation.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <Badge variant="danger" size="sm" pulse={true}>
                        LIVE NOW
                      </Badge>
                      <span className="text-[10px] text-[var(--color-text-muted)] block mt-1">
                        Est: {target.currentLocation.speed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Interactive GIS Vector Map */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="glow" className="bg-[#070e1c] border-[var(--color-border)] overflow-hidden shadow-2xl">
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

            <div className="relative aspect-4/3 bg-[#040810] flex items-center justify-center overflow-hidden select-none p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#0e2238_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-40" />

              <svg viewBox="0 0 540 540" className="w-full h-full max-h-[460px] drop-shadow-sm">
                <defs>
                  <filter id="detail-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Connecting Lines */}
                {target.nodes.map((node, idx) => {
                  if (idx === target.nodes.length - 1) {
                    const curr = target.currentLocation;
                    return (
                      <line
                        key={`line-${node.id}-curr`}
                        x1={node.x}
                        y1={node.y}
                        x2={curr.x}
                        y2={curr.y}
                        stroke="#ef4444"
                        strokeWidth="3.5"
                        strokeDasharray="6 4"
                        className="animate-pulse"
                        filter="url(#detail-glow)"
                      />
                    );
                  }
                  const nextNode = target.nodes[idx + 1];
                  return (
                    <line
                      key={`line-${node.id}-${nextNode.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={nextNode.x}
                      y2={nextNode.y}
                      stroke="#F5A623"
                      strokeWidth="3.5"
                      filter="url(#detail-glow)"
                      strokeDasharray="8 4"
                    />
                  );
                })}

                {/* Nodes */}
                {target.nodes.map((node) => (
                  <g key={`map-detail-node-${node.id}`}>
                    <circle cx={node.x} cy={node.y} r="10" fill="#F5A623" stroke="#ffffff" strokeWidth="2.5" filter="url(#detail-glow)" />
                    <circle cx={node.x} cy={node.y} r="3.5" fill="#050c18" />
                    <g transform={`translate(${node.x + 16}, ${node.y - 12})`}>
                      <rect x="0" y="0" width="120" height="28" rx="6" fill="#091424" stroke="#F5A623" strokeWidth="1" opacity="0.9" />
                      <text x="8" y="13" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        {node.id}
                      </text>
                      <text x="60" y="13" fill="#F5A623" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        {node.time}
                      </text>
                      <text x="8" y="23" fill="#918B80" fontSize="8" fontFamily="sans-serif">
                        {node.location}
                      </text>
                    </g>
                  </g>
                ))}

                {/* Current Location */}
                <g transform={`translate(${target.currentLocation.x}, ${target.currentLocation.y})`}>
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                  <circle cx="0" cy="0" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2" filter="url(#detail-glow)" />
                  <g transform="translate(-85, 14)">
                    <rect x="0" y="0" width="170" height="38" rx="8" fill="#1a0b12" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="10" y="16" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="black">
                      ● CURRENT LOCATION
                    </text>
                    <text x="10" y="30" fill="#fca5a5" fontSize="9" fontFamily="monospace">
                      {target.plate} ({target.currentLocation.speed})
                    </text>
                  </g>
                </g>
              </svg>

              <div className="absolute bottom-3 right-3 bg-black/80  px-3 py-1.5 rounded-lg text-xs font-mono border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">TARGET: </span>
                <span className="text-[var(--color-amber)] font-bold">{target.plate}</span>
                <span className="text-[var(--color-text-muted)] mx-1.5">|</span>
                <span className="text-emerald-400">VECTOR LOCKED</span>
              </div>
            </div>

            <CardContent className="p-4 bg-[var(--color-card)]/60 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Radio className="w-3.5 h-3.5" />}
                onClick={() => navigate('/anpr/live')}
              >
                Switch to Live ANPR View
              </Button>
              <span className="text-[var(--color-text-muted)] font-mono text-[11px]">Corridor: NH-44 Northward Trajectory</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackingDetails;
