import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  useToast
} from '../component';
import { Map, Camera, AlertTriangle, RefreshCw } from 'lucide-react';

export const TrafficMap = () => {
  const toast = useToast();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showCameras, setShowCameras] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);

  const mapNodes = [
    {
      id: 'CAM-01',
      name: 'Highway Junction A (North)',
      x: '25%',
      y: '22%',
      status: 'online',
      speed: '62 km/h',
      flow: 'Free Flow',
      vehicles: 42
    },
    {
      id: 'CAM-02',
      name: 'Central Expressway Flyover',
      x: '50%',
      y: '45%',
      status: 'online',
      speed: '48 km/h',
      flow: 'Moderate Flow',
      vehicles: 86
    },
    {
      id: 'CAM-04',
      name: 'Ring Road Interchange',
      x: '68%',
      y: '60%',
      status: 'warning',
      speed: '18 km/h',
      flow: 'Heavy Congestion',
      vehicles: 142
    },
    {
      id: 'CAM-07',
      name: 'Outer Bypass Toll Gateway',
      x: '82%',
      y: '30%',
      status: 'online',
      speed: '55 km/h',
      flow: 'Free Flow',
      vehicles: 38
    },
    {
      id: 'INC-01',
      name: 'Accident Reported - Lane 2 Blocked',
      x: '42%',
      y: '68%',
      isIncident: true,
      status: 'alert',
      speed: '5 km/h',
      flow: 'Bottleneck',
      vehicles: 180
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Map className="w-5 h-5 text-cyan-400" />
            GIS Traffic Topology & Congestion Heatmap
            <Badge variant="info" size="sm" dot={true}>
              LIVE SATELLITE
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Geographic information system mapping real-time road artery velocities and CCTV node vectors
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant={showCameras ? 'primary' : 'secondary'}
            size="xs"
            leftIcon={<Camera className="w-3.5 h-3.5" />}
            onClick={() => setShowCameras(!showCameras)}
          >
            CCTV Pins
          </Button>

          <Button
            variant={showIncidents ? 'danger' : 'secondary'}
            size="xs"
            leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}
            onClick={() => setShowIncidents(!showIncidents)}
          >
            Incident Alerts
          </Button>

          <Button
            variant="outline"
            size="xs"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => {
              toast.addToast({
                type: 'info',
                title: 'GIS Map Polled',
                message: 'All GPS vectors and sensor pins synchronized.'
              });
            }}
          >
            Sync
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive GIS Map Canvas */}
        <div className="lg:col-span-2">
          <Card variant="glow" className="relative">
            <CardHeader className="p-3.5">
              <span className="font-bold text-xs text-slate-200">
                Metropolitan Urban Road Network (Delhi-NCR Grid)
              </span>
              <span className="text-[11px] font-mono text-cyan-400">Layer: Heatmap + Telemetry</span>
            </CardHeader>

            {/* Simulated GIS Tactical Map */}
            <div className="relative aspect-[16/10] bg-[#050c18] border-y border-slate-800 overflow-hidden select-none">
              {/* GIS Grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-40" />

              {/* Highway Arterial Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Free Flow Arterial (Green) */}
                <path
                  d="M 10 100 Q 200 80, 450 220 T 900 300"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="8 4"
                  className="opacity-80"
                />
                {/* Congested Ring Road Arterial (Red/Amber) */}
                <path
                  d="M 80 400 Q 350 200, 650 350 T 950 500"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="5"
                  className="opacity-90"
                />
                {/* Secondary Radial (Cyan) */}
                <path
                  d="M 300 20 L 500 500"
                  fill="none"
                  stroke="#00d2ff"
                  strokeWidth="3"
                  className="opacity-70"
                />
              </svg>

              {/* Interactive Node Markers */}
              {mapNodes.map((node) => {
                if (node.isIncident && !showIncidents) return null;
                if (!node.isIncident && !showCameras) return null;

                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: node.x, top: node.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute inline-flex h-8 w-8 rounded-full opacity-60 animate-ping ${
                          node.status === 'alert'
                            ? 'bg-red-500'
                            : node.status === 'warning'
                            ? 'bg-amber-400'
                            : 'bg-cyan-400'
                        }`}
                      />
                      <div
                        className={`relative p-2 rounded-xl border shadow-xl flex items-center justify-center transition-transform group-hover:scale-125 ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40'
                            : node.status === 'alert'
                            ? 'bg-red-600 text-white border-red-400'
                            : node.status === 'warning'
                            ? 'bg-amber-500 text-slate-950 border-amber-300'
                            : 'bg-slate-900 text-cyan-300 border-cyan-500/50'
                        }`}
                      >
                        {node.isIncident ? (
                          <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Camera className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>
                    </div>

                    {/* Tooltip Label */}
                    <div className="absolute top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-950/95 border border-slate-700 px-2 py-0.5 rounded text-[10px] text-slate-200 pointer-events-none shadow-lg z-30">
                      {node.id}: {node.name}
                    </div>
                  </div>
                );
              })}

              {/* Map Legend */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[11px] text-slate-300 space-y-1 z-10 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-emerald-500 rounded" />
                  <span>Free Flow (&gt;50 km/h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-amber-500 rounded" />
                  <span>Moderate Delay (25-50 km/h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-red-500 rounded" />
                  <span>Gridlock / Congestion (&lt;20 km/h)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Selected Node Telemetry Drawer */}
        <div>
          <Card variant={selectedNode?.status === 'alert' ? 'alert' : 'default'}>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">
                {selectedNode ? selectedNode.name : 'Select a Node on Map'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {selectedNode ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-cyan-300 font-bold">{selectedNode.id}</span>
                    <Badge variant={selectedNode.status === 'alert' ? 'danger' : 'success'}>
                      {selectedNode.flow}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
                      <span className="text-slate-500">Average Velocity:</span>
                      <p className="font-bold text-white text-sm mt-0.5">{selectedNode.speed}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
                      <span className="text-slate-500">Current Volume:</span>
                      <p className="font-bold text-white text-sm mt-0.5">
                        {selectedNode.vehicles} veh/min
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast.addToast({
                          type: 'info',
                          title: 'Camera Feed Opened',
                          message: `Displaying high-definition feed for ${selectedNode.id}`
                        });
                      }}
                    >
                      Open Live Camera Feed
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Click any camera pin or incident marker on the interactive map to inspect
                  instantaneous throughput and velocities.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
