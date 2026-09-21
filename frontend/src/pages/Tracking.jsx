import React from 'react';
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
import { Navigation, Siren } from 'lucide-react';

export const Tracking = () => {
  const toast = useToast();

  const checkpoints = [
    {
      id: 'CP-01',
      name: 'North Highway Toll Gateway',
      distance: '0.0 km',
      avgSpeed: '58 km/h',
      flow: 'Free Flow',
      status: 'online'
    },
    {
      id: 'CP-02',
      name: 'Outer Ring Road Flyover Entry',
      distance: '4.8 km',
      avgSpeed: '42 km/h',
      flow: 'Moderate',
      status: 'online'
    },
    {
      id: 'CP-03',
      name: 'Central Secretariat Intersection',
      distance: '9.2 km',
      avgSpeed: '22 km/h',
      flow: 'Heavy Congestion',
      status: 'warning'
    },
    {
      id: 'CP-04',
      name: 'South Industrial Radial Corridor',
      distance: '15.6 km',
      avgSpeed: '55 km/h',
      flow: 'Free Flow',
      status: 'online'
    }
  ];

  const activePursuits = [
    {
      targetPlate: 'DL 04 EM 0108',
      type: 'Ambulance (Emergency)',
      origin: 'Civil Hospital',
      destination: 'Apex Trauma Center',
      currentLocation: 'Passing CP-02 (Flyover)',
      eta: '4 mins',
      priorityStatus: 'Green Wave Active'
    },
    {
      targetPlate: 'DL 01 AB 1234',
      type: 'White Sedan (Hotlist)',
      origin: 'Ring Road North',
      destination: 'Unknown',
      currentLocation: 'Approaching CP-03',
      eta: 'Tracking',
      priorityStatus: 'Intercept Unit Dispatched'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            Corridor Trajectory & Vehicle Tracking
            <Badge variant="info" size="sm" dot={true} pulse={true}>
              REAL-TIME GPS / ANPR
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-checkpoint ANPR velocity triangulation and emergency vehicle green wave priority
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          leftIcon={<Siren className="w-4 h-4" />}
          onClick={() => {
            toast.addToast({
              type: 'info',
              title: 'Green Wave Triggered',
              message: 'Traffic signals synchronized for Emergency Ambulance DL 04 EM 0108.'
            });
          }}
        >
          Override Green Wave
        </Button>
      </div>

      {/* Emergency & Target Tracking Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activePursuits.map((item, idx) => (
          <Card
            key={idx}
            variant={item.priorityStatus.includes('Green Wave') ? 'glow' : 'alert'}
          >
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-cyan-300">
                  {item.targetPlate}
                </span>
                <span className="text-xs text-slate-300">({item.type})</span>
              </div>
              <Badge
                variant={item.priorityStatus.includes('Green Wave') ? 'success' : 'danger'}
                dot={true}
                pulse={true}
              >
                {item.priorityStatus}
              </Badge>
            </CardHeader>

            <CardContent className="p-4 pt-0 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Route:</span>
                <span>
                  {item.origin} → {item.destination}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Current Node:</span>
                <span className="text-cyan-300 font-semibold">{item.currentLocation}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Estimated Arrival (ETA):</span>
                <span className="font-bold text-emerald-400">{item.eta}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Checkpoint Nodes Timeline */}
      <Card variant="default">
        <CardHeader>
          <div>
            <CardTitle>Arterial Speed Trap & Triangulation Nodes</CardTitle>
            <CardDescription>Telemetry from consecutive optical sensors along Arterial Road 1</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {checkpoints.map((cp) => (
              <div
                key={cp.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 font-mono">{cp.id}</span>
                  <StatusIndicator status={cp.status} size="sm" />
                </div>
                <h4 className="text-xs font-semibold text-slate-200">{cp.name}</h4>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Distance: {cp.distance}</span>
                  <span className="font-semibold text-white">{cp.avgSpeed}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-slate-500">Flow:</span>
                  <Badge
                    variant={
                      cp.flow.includes('Free')
                        ? 'success'
                        : cp.flow.includes('Moderate')
                        ? 'warning'
                        : 'danger'
                    }
                    size="sm"
                  >
                    {cp.flow}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tracking;
