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
  StatusIndicator,
  useToast
} from '../component';
import { Navigation, ArrowLeft, Siren, CheckCircle2, AlertTriangle, Shield, Clock } from 'lucide-react';
import playAlert from '../component/alert';

export const TrackingDetails = () => {
  const { plate = 'DL-01-AB-1234' } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const formattedPlate = plate.replace(/-/g, ' ').toUpperCase();

  const checkpointsTimeline = [
    {
      checkpoint: 'Checkpoint 1: North Toll Plaza Entry',
      timestamp: '14:10:02',
      speed: '58 km/h',
      status: 'Passed (Clear)',
      severity: 'success'
    },
    {
      checkpoint: 'Checkpoint 2: Outer Ring Road Overpass',
      timestamp: '14:21:40',
      speed: '72 km/h',
      status: 'Warning (High Speed)',
      severity: 'warning'
    },
    {
      checkpoint: 'Checkpoint 3: Central Interchange Radar',
      timestamp: '14:32:10',
      speed: '78 km/h',
      status: 'Overspeed Violation Flagged',
      severity: 'danger'
    },
    {
      checkpoint: 'Checkpoint 4: South Radial Gateway',
      timestamp: 'Projected 14:45:00',
      speed: 'Est. 65 km/h',
      status: 'Next Expected Node',
      severity: 'info'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-cyan-400" />
              Live Target Trajectory: {formattedPlate}
              <Badge variant="danger" size="sm" dot={true} pulse={true}>
                ACTIVE INTERCEPT
              </Badge>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous optical checkpoint reconstruction & GPS velocity vectoring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Siren className="w-4 h-4" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'danger',
                title: 'Patrol Intercept Unit Alerted',
                message: `Nearest PCR unit dispatched to intercept ${formattedPlate} at Checkpoint 4.`
              });
            }}
          >
            Dispatch Intercept Patrol
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Map Card */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="glow">
            <CardHeader className="p-4">
              <CardTitle>Trip Velocity & Checkpoint Progression</CardTitle>
              <span className="text-xs font-mono text-cyan-300">Estimated Speed: 74 km/h</span>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative border-l-2 border-cyan-500/40 ml-4 pl-6 space-y-6">
                {checkpointsTimeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Checkpoint Node Dot */}
                    <span
                      className={`absolute -left-[31px] top-1.5 flex h-4 w-4 rounded-full border-2 border-slate-900 ${
                        step.severity === 'danger'
                          ? 'bg-red-500 animate-ping'
                          : step.severity === 'warning'
                          ? 'bg-amber-400'
                          : step.severity === 'info'
                          ? 'bg-cyan-400'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <span
                      className={`absolute -left-[31px] top-1.5 flex h-4 w-4 rounded-full border-2 border-slate-900 ${
                        step.severity === 'danger'
                          ? 'bg-red-500'
                          : step.severity === 'warning'
                          ? 'bg-amber-400'
                          : step.severity === 'info'
                          ? 'bg-cyan-400'
                          : 'bg-emerald-400'
                      }`}
                    />

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-xs text-slate-100">{step.checkpoint}</h4>
                        <Badge variant={step.severity} size="sm">
                          {step.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {step.timestamp}
                        </span>
                        <span className="font-mono font-bold text-white">Speed: {step.speed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tactical Coordination Sidebar */}
        <div className="space-y-4">
          <Card variant="alert">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Assigned Intercept Unit</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Patrol Squad:</span>
                <span className="font-bold text-white">PCR-14 (North Sector)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Officer in Command:</span>
                <span className="text-slate-200">Sub-Inspector V. Sharma</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Estimated Intercept Time:</span>
                <span className="font-mono font-bold text-red-400">3 mins (at CP-04)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackingDetails;
