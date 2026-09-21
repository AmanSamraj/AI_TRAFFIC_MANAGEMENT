import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  DatePicker,
  useToast
} from '../component';
import {
  BarChart3,
  Car,
  Bike,
  Bus,
  Truck,
  Camera,
  Clock,
  Download,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

// Custom Dark Tooltip for Recharts declared outside to avoid re-creation
const CustomDarkTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-xl p-3 shadow-2xl text-xs font-mono">
        <p className="font-bold text-white border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between gap-4">
          <span>Interval: {label}</span>
          <span className="text-cyan-400">ANPR Aggregated</span>
        </p>
        {payload.map((entry, index) => (
          <div key={`tooltip-item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
              {entry.name || 'Count'}:
            </span>
            <span className="font-bold text-cyan-300">
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Analytics = () => {
  const toast = useToast();
  const [timeRange, setTimeRange] = useState('Today');

  // 1. Traffic Volume (Vehicles / Hour) Data across 24 hours
  const volumeData = [
    { hour: '00:00', vehicles: 210, speed: 68 },
    { hour: '02:00', vehicles: 130, speed: 72 },
    { hour: '04:00', vehicles: 190, speed: 70 },
    { hour: '06:00', vehicles: 540, speed: 58 },
    { hour: '07:00', vehicles: 980, speed: 45 },
    { hour: '08:00', vehicles: 1420, speed: 32 },
    { hour: '09:00', vehicles: 1780, speed: 24 }, // Morning Peak
    { hour: '10:00', vehicles: 1350, speed: 38 },
    { hour: '11:00', vehicles: 890, speed: 48 },
    { hour: '12:00', vehicles: 920, speed: 46 },
    { hour: '13:00', vehicles: 880, speed: 50 },
    { hour: '14:00', vehicles: 960, speed: 47 },
    { hour: '15:00', vehicles: 1120, speed: 42 },
    { hour: '16:00', vehicles: 1390, speed: 35 },
    { hour: '17:00', vehicles: 1840, speed: 22 },
    { hour: '18:00', vehicles: 2150, speed: 18 }, // Evening Rush Peak
    { hour: '19:00', vehicles: 1680, speed: 28 },
    { hour: '20:00', vehicles: 1220, speed: 40 },
    { hour: '21:00', vehicles: 840, speed: 52 },
    { hour: '22:00', vehicles: 510, speed: 62 },
    { hour: '23:00', vehicles: 320, speed: 66 }
  ];

  // 2. Vehicle Types (Exact Modal Split from User Request)
  // Cars: 52%, Bikes: 28%, Buses: 10%, Trucks: 10%
  const vehicleTypeData = [
    { name: 'Cars', percent: 52, count: '13,240', color: '#00d2ff', icon: Car },
    { name: 'Bikes', percent: 28, count: '7,130', color: '#10b981', icon: Bike },
    { name: 'Buses', percent: 10, count: '2,550', color: '#f59e0b', icon: Bus },
    { name: 'Trucks', percent: 10, count: '2,550', color: '#f43f5e', icon: Truck }
  ];

  // 3. Traffic by Camera (Exact Wireframe Distribution)
  // CAM-01 ██████████████ (14)
  // CAM-02 █████████ (9)
  // CAM-03 █████████████████ (17)
  // CAM-04 ██████ (6)
  const cameraTrafficData = [
    { camera: 'CAM-01', ascii: '██████████████', volume: 14200, percent: 78, location: 'Shimla Entry North' },
    { camera: 'CAM-02', ascii: '█████████', volume: 9100, percent: 50, location: 'Ring Road Interchange' },
    { camera: 'CAM-03', ascii: '█████████████████', volume: 17400, percent: 95, location: 'Central Junction Radar' },
    { camera: 'CAM-04', ascii: '██████', volume: 6200, percent: 34, location: 'Mall Road Terminal' }
  ];

  // 4. Peak Hours (Exact Wireframe Intervals)
  // 08:00 → █████████ (9)
  // 09:00 → ███████████████ (15)
  // 10:00 → █████████ (9)
  // 11:00 → ██████ (6)
  // 17:00 → █████████████████ (17)
  // 18:00 → ███████████████████ (19)
  const peakHoursData = [
    { hour: '08:00', ascii: '█████████', vehicles: 1420, isPeak: false },
    { hour: '09:00', ascii: '███████████████', vehicles: 1780, isPeak: true },
    { hour: '10:00', ascii: '█████████', vehicles: 1350, isPeak: false },
    { hour: '11:00', ascii: '██████', vehicles: 890, isPeak: false },
    { hour: '17:00', ascii: '█████████████████', vehicles: 1840, isPeak: true },
    { hour: '18:00', ascii: '███████████████████', vehicles: 2150, isPeak: true }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ────────────────────────────────────────────
          PAGE HEADER: TRAFFIC ANALYTICS
      ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BarChart3 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase flex items-center gap-2">
                TRAFFIC ANALYTICS
                <Badge variant="info" size="sm" dot={true} pulse={true}>
                  RECHARTS TELEMETRY
                </Badge>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Volumetric traffic flow, vehicle modal composition, CCTV corridor load & peak temporal analysis
              </p>
            </div>
          </div>
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
                title: 'Analytics Exported',
                message: 'Traffic volume and camera sensor metrics exported as CSV.'
              });
            }}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 1: TRAFFIC VOLUME (VEHICLES / HOUR) 📈
      ──────────────────────────────────────────── */}
      <Card variant="glow" className="bg-[#070e1c] border-slate-700/80 shadow-2xl p-5">
        <CardHeader className="p-0 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <CardTitle className="text-base uppercase tracking-wider text-white">
                Traffic Volume — Vehicles / Hour
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-400 mt-0.5">
              Continuous 24-hour ANPR detection count across all highway sensors
            </CardDescription>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400 text-[10px] block">PEAK RATE</span>
              <span className="text-rose-400 font-bold">2,150 veh/hr (18:00)</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400 text-[10px] block">TOTAL 24H FLOW</span>
              <span className="text-cyan-300 font-bold">25,460 Vehicles</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5">
          {/* Recharts Area Chart */}
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanVolumeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#00d2ff" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.12)' }}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.12)' }}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                />
                <Tooltip content={<CustomDarkTooltip />} />
                <Area
                  type="monotone"
                  dataKey="vehicles"
                  name="Vehicles / Hour"
                  stroke="#00d2ff"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#cyanVolumeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ────────────────────────────────────────────
          SECTION 2: VEHICLE TYPES MODAL SPLIT
          Cars: 52%, Bikes: 28%, Buses: 10%, Trucks: 10%
      ──────────────────────────────────────────── */}
      <Card variant="glow" className="bg-[#070e1c] border-slate-700/80 shadow-2xl p-5">
        <CardHeader className="p-0 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <CardTitle className="text-base uppercase tracking-wider text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-cyan-400" />
              Vehicle Types Modal Split
            </CardTitle>
            <CardDescription className="text-xs text-slate-400 mt-0.5">
              YOLOv8 automated classification proportions across city cordon
            </CardDescription>
          </div>
          <Badge variant="info" size="sm">
            4 PRIMARY CLASSES
          </Badge>
        </CardHeader>

        <CardContent className="p-0 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Recharts Donut Pie Chart */}
            <div className="lg:col-span-5 h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomDarkTooltip />} />
                  <Pie
                    data={vehicleTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="percent"
                    nameKey="name"
                  >
                    {vehicleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#070e1c" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-2xl font-black text-white font-mono">100%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Modal Split</span>
              </div>
            </div>

            {/* Right: Telemetry Breakdown (Exact Percentages from User Request) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 font-mono">
              {vehicleTypeData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-sans">
                        <IconComponent className="w-4 h-4" style={{ color: item.color }} />
                        {item.name}
                      </span>
                      <span className="text-lg font-black" style={{ color: item.color }}>
                        {item.percent}%
                      </span>
                    </div>

                    {/* Visual Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                      />
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
                      <span>Total Classified:</span>
                      <span className="text-slate-200 font-bold">{item.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ────────────────────────────────────────────
          SECTIONS 3 & 4: 2-COLUMN GRID
          LEFT: TRAFFIC BY CAMERA (ASCII & RECHARTS)
          RIGHT: PEAK HOURS (ASCII & RECHARTS)
      ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ============================================================
            SECTION 3: TRAFFIC BY CAMERA
            CAM-01 ██████████████
            CAM-02 █████████
            CAM-03 █████████████████
            CAM-04 ██████
        ============================================================ */}
        <Card variant="default" className="bg-[#070e1c] border-slate-800 p-5 shadow-2xl space-y-4">
          <CardHeader className="p-0 pb-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <CardTitle className="text-sm uppercase tracking-wider text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                Traffic by Camera
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 mt-0.5">
                Volumetric load per surveillance gateway node
              </CardDescription>
            </div>
            <Badge variant="info" size="sm">
              4 CCTV NODES
            </Badge>
          </CardHeader>

          {/* Exact Wireframe ASCII Bars Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs space-y-2.5">
            {cameraTrafficData.map((cam) => (
              <div key={cam.camera} className="flex items-center justify-between gap-2">
                <span className="font-bold text-cyan-300 shrink-0 w-16">{cam.camera}</span>
                <span className="text-cyan-400 tracking-tight truncate select-none text-[13px]">
                  {cam.ascii}
                </span>
                <span className="text-slate-400 text-[11px] shrink-0 font-sans">
                  {cam.volume.toLocaleString()} veh
                </span>
              </div>
            ))}
          </div>

          {/* Recharts Horizontal Bar Chart */}
          <div className="w-full h-48 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cameraTrafficData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                />
                <YAxis
                  dataKey="camera"
                  type="category"
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tick={{ fill: '#00d2ff', fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }}
                />
                <Tooltip content={<CustomDarkTooltip />} />
                <Bar dataKey="volume" name="Vehicles" fill="#00d2ff" radius={[0, 4, 4, 0]}>
                  {cameraTrafficData.map((entry, index) => (
                    <Cell
                      key={`cam-cell-${index}`}
                      fill={entry.volume > 15000 ? '#00d2ff' : entry.volume > 10000 ? '#38bdf8' : '#0284c7'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* ============================================================
            SECTION 4: PEAK HOURS
            08:00 → █████████
            09:00 → ███████████████
            10:00 → █████████
            11:00 → ██████
            17:00 → █████████████████
            18:00 → ███████████████████
        ============================================================ */}
        <Card variant="default" className="bg-[#070e1c] border-slate-800 p-5 shadow-2xl space-y-4">
          <CardHeader className="p-0 pb-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <CardTitle className="text-sm uppercase tracking-wider text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                Peak Hours Rush Analysis
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 mt-0.5">
                Temporal rush hours requiring automated green corridor balancing
              </CardDescription>
            </div>
            <Badge variant="danger" size="sm" dot={true}>
              RUSH WINDOWS
            </Badge>
          </CardHeader>

          {/* Exact Wireframe ASCII Bars Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs space-y-2.5">
            {peakHoursData.map((slot) => (
              <div key={slot.hour} className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-300 shrink-0 w-20 flex items-center gap-1">
                  {slot.hour} <span className="text-slate-500">→</span>
                </span>
                <span
                  className={`tracking-tight truncate select-none text-[13px] ${
                    slot.isPeak ? 'text-rose-400' : 'text-cyan-400'
                  }`}
                >
                  {slot.ascii}
                </span>
                <span
                  className={`text-[11px] shrink-0 font-bold font-sans ${
                    slot.isPeak ? 'text-rose-400' : 'text-slate-400'
                  }`}
                >
                  {slot.vehicles} veh
                </span>
              </div>
            ))}
          </div>

          {/* Recharts Bar Chart Highlighting Peak Spikes */}
          <div className="w-full h-48 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                />
                <Tooltip content={<CustomDarkTooltip />} />
                <Bar dataKey="vehicles" name="Vehicles" radius={[4, 4, 0, 0]}>
                  {peakHoursData.map((entry, index) => (
                    <Cell
                      key={`peak-cell-${index}`}
                      fill={entry.isPeak ? '#f43f5e' : '#00d2ff'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ────────────────────────────────────────────
          INTELLIGENT SIGNAL RECOMMENDATION CALLOUT
      ──────────────────────────────────────────── */}
      <Card variant="glow" className="p-4 bg-[#070e1c] border-cyan-500/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider">AI Signal Optimization Recommendation:</span>
            <span className="text-slate-400">Extend green wave cycle by +18s at CAM-03 between 17:30 - 18:30 to dissolve peak rush backlog.</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm" dot={true}>
              Adaptive Signal Ready
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
