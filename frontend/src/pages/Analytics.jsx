import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Chart,
  DatePicker,
  useToast
} from '../component';
import { BarChart3, TrendingUp, Wind, AlertTriangle, Download } from 'lucide-react';

export const Analytics = () => {
  const toast = useToast();
  const [timeRange, setTimeRange] = useState('7d');

  const hourlyVolumeData = [
    { time: '00:00', volume: 180, congestion: 12 },
    { time: '04:00', volume: 120, congestion: 8 },
    { time: '08:00', volume: 940, congestion: 68 },
    { time: '10:00', volume: 1420, congestion: 88 },
    { time: '12:00', volume: 890, congestion: 45 },
    { time: '14:00', volume: 980, congestion: 52 },
    { time: '16:00', volume: 1560, congestion: 92 },
    { time: '18:00', volume: 1780, congestion: 98 },
    { time: '20:00', volume: 1240, congestion: 74 },
    { time: '22:00', volume: 640, congestion: 32 }
  ];

  const violationTrendData = [
    { time: 'Mon', overspeed: 124, signalJump: 42, laneViolation: 68 },
    { time: 'Tue', overspeed: 138, signalJump: 36, laneViolation: 74 },
    { time: 'Wed', overspeed: 110, signalJump: 29, laneViolation: 55 },
    { time: 'Thu', overspeed: 152, signalJump: 48, laneViolation: 82 },
    { time: 'Fri', overspeed: 189, signalJump: 64, laneViolation: 96 },
    { time: 'Sat', overspeed: 210, signalJump: 82, laneViolation: 112 },
    { time: 'Sun', overspeed: 174, signalJump: 58, laneViolation: 89 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Macro Traffic Intelligence & Predictive Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Congestion patterns, violation trends, and carbon footprint telemetry
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <DatePicker value={timeRange} onChange={(val) => setTimeRange(val)} />
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'Analytics Report Downloaded',
                message: 'Aggregated analytics exported in JSON/CSV.'
              });
            }}
          >
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="metric">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Peak Congestion Bottleneck</p>
              <h3 className="text-xl font-bold text-white mt-1">Interchange 4 (Ring Rd)</h3>
              <p className="text-[11px] text-red-400 mt-1">Avg Delay: 18.4 mins</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="metric">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Violations This Week</p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1">1,894</h3>
              <p className="text-[11px] text-amber-300 mt-1">↓ -4.2% after AI green wave</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="metric">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Estimated Idling Emissions Saved</p>
              <h3 className="text-2xl font-bold text-emerald-400 mt-1">4.2 Tons CO₂</h3>
              <p className="text-[11px] text-emerald-300 mt-1">Via Adaptive Signal Timings</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wind className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Diurnal Traffic Volume Curve</CardTitle>
            <CardDescription>Vehicles per hour across all 48 camera nodes</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="area"
              data={hourlyVolumeData}
              xAxisKey="time"
              height={260}
              series={[
                { key: 'volume', name: 'Total Volume', color: '#00d2ff', strokeWidth: 2 }
              ]}
            />
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Weekly Violation Breakdown</CardTitle>
            <CardDescription>Overspeeding vs Signal Jumping vs Lane Drift</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="bar"
              data={violationTrendData}
              xAxisKey="time"
              height={260}
              series={[
                { key: 'overspeed', name: 'Overspeeding', color: '#ef4444' },
                { key: 'signalJump', name: 'Signal Jump', color: '#f59e0b' },
                { key: 'laneViolation', name: 'Lane Violation', color: '#3b82f6' }
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
