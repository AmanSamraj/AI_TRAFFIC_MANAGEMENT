import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  useToast
} from '../component';
import {
  Map as MapIcon,
  Camera,
  AlertTriangle,
  Navigation,
  Activity,
  Layers,
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  Flame,
  RefreshCw,
  Car,
  Gauge,
  ChevronRight
} from 'lucide-react';
import playAlert from '../component/alert';

// -------------------------------------------------------------
// Surveillance Node Data (matching CAM-01 \ CAM-04 \ CAM-07 \ CAM-12)
// -------------------------------------------------------------
const CAMERA_NODES = [
  {
    id: 'CAM-01',
    name: 'Shimla Entry (North Gateway)',
    lat: 31.115,
    lng: 77.155,
    status: 'online', // 🟢
    statusColor: '#10b981',
    statusLabel: 'Free Flow',
    badgeVariant: 'success',
    speed: '58 km/h',
    flow: 'Free Flow',
    density: 'Low (32%)',
    vehiclesPerMin: 34,
    latency: '12 ms',
    fps: '60 FPS',
    resolution: '4K Ultra HD',
    ip: '192.168.10.101',
    direction: 'Southbound Artery',
    description: 'Entry gateway corridor monitoring inter-state incoming vehicles.'
  },
  {
    id: 'CAM-04',
    name: 'Mall Road Commercial Corridor',
    lat: 31.1048,
    lng: 77.1734,
    status: 'critical', // 🔴
    statusColor: '#ef4444',
    statusLabel: 'Heavy Bottleneck',
    badgeVariant: 'danger',
    speed: '14 km/h',
    flow: 'Gridlock Warning',
    density: 'Critical (92%)',
    vehiclesPerMin: 142,
    latency: '18 ms',
    fps: '30 FPS',
    resolution: '1080p Full HD',
    ip: '192.168.10.104',
    direction: 'Two-Way Pedestrian & Transit',
    description: 'Severe vehicular crowding and tourist transit bottleneck.'
  },
  {
    id: 'CAM-07',
    name: 'ISBT Bus Terminal Interchange',
    lat: 31.092,
    lng: 77.16,
    status: 'warning', // 🟡
    statusColor: '#f59e0b',
    statusLabel: 'Moderate Congestion',
    badgeVariant: 'warning',
    speed: '32 km/h',
    flow: 'Moderate Slowdown',
    density: 'Elevated (68%)',
    vehiclesPerMin: 86,
    latency: '24 ms',
    fps: '45 FPS',
    resolution: '1080p Full HD',
    ip: '192.168.10.107',
    direction: 'Regional Bus Interchange',
    description: 'High-frequency commercial carrier and public transit junction.'
  },
  {
    id: 'CAM-12',
    name: 'South Bypass Expressway Link',
    lat: 31.075,
    lng: 77.185,
    status: 'online', // 🟢
    statusColor: '#10b981',
    statusLabel: 'Free Flow',
    badgeVariant: 'success',
    speed: '64 km/h',
    flow: 'Free Flow',
    density: 'Optimal (28%)',
    vehiclesPerMin: 41,
    latency: '14 ms',
    fps: '60 FPS',
    resolution: '4K Ultra HD',
    ip: '192.168.10.112',
    direction: 'Four-Lane Expressway',
    description: 'High-speed southern expressway arterial link with automated ANPR.'
  },
  {
    id: 'CAM-02',
    name: 'Ridge Vista Radial Junction',
    lat: 31.108,
    lng: 77.179,
    status: 'online',
    statusColor: '#10b981',
    statusLabel: 'Free Flow',
    badgeVariant: 'success',
    speed: '48 km/h',
    flow: 'Normal Flow',
    density: 'Low (35%)',
    vehiclesPerMin: 52,
    latency: '16 ms',
    fps: '60 FPS',
    resolution: '4K Ultra HD',
    ip: '192.168.10.102',
    direction: 'Eastbound Radial',
    description: 'Secondary collector corridor managing ridge elevation bypass.'
  },
  {
    id: 'CAM-08',
    name: 'Industrial Corridor Gate 4',
    lat: 31.082,
    lng: 77.15,
    status: 'warning',
    statusColor: '#f59e0b',
    statusLabel: 'Slow Moving',
    badgeVariant: 'warning',
    speed: '28 km/h',
    flow: 'Heavy Goods Traffic',
    density: 'Moderate (58%)',
    vehiclesPerMin: 64,
    latency: '20 ms',
    fps: '30 FPS',
    resolution: '1080p Full HD',
    ip: '192.168.10.108',
    direction: 'Heavy Freight Corridor',
    description: 'Freight logistics route with slow-moving commercial carriers.'
  }
];

// -------------------------------------------------------------
// Vehicle Trajectory Checkpoint Coordinates (CAM-01 -> CAM-04 -> CAM-07 -> CAM-12)
// -------------------------------------------------------------
const TRAJECTORY_CHECKPOINTS = [
  {
    camId: 'CAM-01',
    lat: 31.115,
    lng: 77.155,
    time: '08:31 AM',
    speed: '58 km/h',
    event: 'Corridor Entry'
  },
  {
    camId: 'INTER-1',
    lat: 31.11,
    lng: 77.164,
    time: '08:49 AM',
    speed: '45 km/h',
    event: 'Transit Sector 2'
  },
  {
    camId: 'CAM-04',
    lat: 31.1048,
    lng: 77.1734,
    time: '09:12 AM',
    speed: '14 km/h',
    event: 'Congestion Zone'
  },
  {
    camId: 'INTER-2',
    lat: 31.099,
    lng: 77.168,
    time: '09:28 AM',
    speed: '24 km/h',
    event: 'Descending Arterial'
  },
  {
    camId: 'CAM-07',
    lat: 31.092,
    lng: 77.16,
    time: '09:45 AM',
    speed: '32 km/h',
    event: 'ISBT Interchange'
  },
  {
    camId: 'INTER-3',
    lat: 31.083,
    lng: 77.172,
    time: '10:04 AM',
    speed: '50 km/h',
    event: 'South Highway Ramp'
  },
  {
    camId: 'CAM-12',
    lat: 31.075,
    lng: 77.185,
    time: '10:20 AM',
    speed: '64 km/h',
    event: 'Expressway Gateway'
  }
];

// -------------------------------------------------------------
// Accident & Incident Data
// -------------------------------------------------------------
const ACCIDENT_INCIDENTS = [
  {
    id: 'ACC-01',
    title: 'Multi-Vehicle Collision',
    lat: 31.103,
    lng: 77.171,
    severity: 'High Severity',
    status: 'Lane 2 Blocked',
    reported: '12 min ago',
    unitsDispatched: 'PCR-4 & Ambulance AMB-03',
    delayImpact: '+16 min delay',
    description: 'Rear-end collision involving 2 sedans and a light utility vehicle near Mall Road Spur.'
  },
  {
    id: 'INC-02',
    title: 'Stalled Heavy Goods Carrier',
    lat: 31.089,
    lng: 77.163,
    severity: 'Moderate Delay',
    status: 'Right Shoulder Obstructed',
    reported: '28 min ago',
    unitsDispatched: 'Heavy Recovery Crane-01',
    delayImpact: '+7 min delay',
    description: 'Commercial 10-wheeler axle failure obstructing outer turning lane.'
  }
];

// -------------------------------------------------------------
// Congestion Zones (Polygons)
// -------------------------------------------------------------
const CONGESTION_ZONES = [
  {
    id: 'ZONE-A',
    name: 'Mall Road Central Choke Zone',
    status: 'Critical Bottleneck',
    avgSpeed: '12-16 km/h',
    color: '#ef4444',
    fillColor: '#ef4444',
    delay: '+18 min',
    capacity: '94%',
    polygon: [
      [31.109, 77.168],
      [31.107, 77.178],
      [31.101, 77.176],
      [31.102, 77.167]
    ],
    recommendedAction: 'Dynamic signal extension for southbound queue discharge.'
  },
  {
    id: 'ZONE-B',
    name: 'ISBT Terminal Approach Zone',
    status: 'Moderate Density Zone',
    avgSpeed: '28-34 km/h',
    color: '#f59e0b',
    fillColor: '#f59e0b',
    delay: '+6 min',
    capacity: '68%',
    polygon: [
      [31.096, 77.155],
      [31.094, 77.166],
      [31.088, 77.164],
      [31.09, 77.153]
    ],
    recommendedAction: 'Divert inter-city buses via West Ring bypass.'
  }
];

// -------------------------------------------------------------
// Tile Providers
// -------------------------------------------------------------
const TILE_PROVIDERS = {
  osm: {
    name: 'OpenStreetMap Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  dark: {
    name: 'CartoDB Dark Tactical',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  }
};

export const TrafficMap = () => {
  const toast = useToast();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const vehicleMarkerRef = useRef(null);

  // Layer Visibility Toggles
  const [showCameras, setShowCameras] = useState(true);
  const [showTrajectories, setShowTrajectories] = useState(true);
  const [showDensity, setShowDensity] = useState(true);
  const [showAccidents, setShowAccidents] = useState(true);
  const [showZones, setShowZones] = useState(true);

  // Basemap Choice: 'osm' or 'dark'
  const [selectedTileKey, setSelectedTileKey] = useState('dark');

  // Selected Inspectable Item (Camera, Incident, Vehicle, Zone)
  const [selectedItem, setSelectedItem] = useState(CAMERA_NODES[0]);
  const [selectedType, setSelectedType] = useState('camera'); // 'camera' | 'incident' | 'vehicle' | 'zone'

  // Trajectory Simulation State
  const [isPlayingTrajectory, setIsPlayingTrajectory] = useState(false);
  const [trajectoryStep, setTrajectoryStep] = useState(0);
  const [simSpeed, setSimSpeed] = useState(1); // 1x, 2x, 4x

  // Layer group references to update layers dynamically
  const cameraGroupRef = useRef(null);
  const trajectoryGroupRef = useRef(null);
  const densityGroupRef = useRef(null);
  const accidentGroupRef = useRef(null);
  const zoneGroupRef = useRef(null);

  // -------------------------------------------------------------
  // Map Initialization
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center map around metropolitan corridor (Shimla / Delhi-NCR Grid)
      const map = L.map(mapContainerRef.current, {
        center: [31.098, 77.168],
        zoom: 13,
        zoomControl: true,
        attributionControl: true
      });

      // Layer groups for clean toggling
      const cameraGroup = L.layerGroup().addTo(map);
      const trajectoryGroup = L.layerGroup().addTo(map);
      const densityGroup = L.layerGroup().addTo(map);
      const accidentGroup = L.layerGroup().addTo(map);
      const zoneGroup = L.layerGroup().addTo(map);

      cameraGroupRef.current = cameraGroup;
      trajectoryGroupRef.current = trajectoryGroup;
      densityGroupRef.current = densityGroup;
      accidentGroupRef.current = accidentGroup;
      zoneGroupRef.current = zoneGroup;

      // Add Base Tile Layer
      const provider = TILE_PROVIDERS[selectedTileKey];
      const tileLayer = L.tileLayer(provider.url, {
        maxZoom: 19,
        attribution: provider.attribution
      }).addTo(map);
      tileLayerRef.current = tileLayer;

      mapInstanceRef.current = map;

      // Handle window resize cleanly
      const handleResize = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);

      // Trigger initial size adjustment after DOM settles
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // -------------------------------------------------------------
  // Tile Layer Switching (OpenStreetMap vs CartoDB Dark)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const provider = TILE_PROVIDERS[selectedTileKey];
    tileLayerRef.current.setUrl(provider.url);
  }, [selectedTileKey]);

  // -------------------------------------------------------------
  // Update Camera Markers Layer
  // -------------------------------------------------------------
  useEffect(() => {
    if (!cameraGroupRef.current || !mapInstanceRef.current) return;
    const group = cameraGroupRef.current;
    group.clearLayers();

    if (!showCameras) return;

    CAMERA_NODES.forEach((cam) => {
      // Determine color & pulse badge based on node status
      const isRed = cam.status === 'critical';
      const isYellow = cam.status === 'warning';

      const pulseClass = isRed
        ? 'beacon-red-pulse bg-red-500'
        : isYellow
        ? 'beacon-yellow-pulse bg-amber-400'
        : 'beacon-green-pulse bg-emerald-400';

      const dotColor = isRed ? '#ef4444' : isYellow ? '#f59e0b' : '#10b981';
      const statusEmoji = isRed ? '🔴' : isYellow ? '🟡' : '🟢';

      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group" style="width: 130px; height: 42px;">
          <!-- Radiating Beacon Ring -->
          <span class="absolute w-7 h-7 rounded-full opacity-60 ${pulseClass}"></span>

          <!-- Floating Badged Pill: 🟢 CAM-01, 🔴 CAM-04, etc. -->
          <div class="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border shadow-sm  transition-transform duration-200 group-hover:scale-110"
               style="background: rgba(10, 20, 36, 0.92); border-color: ${dotColor}; box-shadow: 0 0 12px ${dotColor}40;">
            <span class="text-xs leading-none">${statusEmoji}</span>
            <span class="font-mono font-bold text-xs text-[var(--color-text)] tracking-wider">${cam.id}</span>
            <span class="text-[10px] font-mono px-1 rounded bg-[var(--color-background)] text-[var(--color-text-secondary)] font-semibold">${cam.speed}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [130, 42],
        iconAnchor: [65, 21]
      });

      const marker = L.marker([cam.lat, cam.lng], { icon: customIcon });

      // Click behavior
      marker.on('click', () => {
        setSelectedItem(cam);
        setSelectedType('camera');
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([cam.lat, cam.lng], { animate: true, duration: 0.6 });
        }
      });

      // Interactive Popup
      marker.bindPopup(`
        <div class="p-1 space-y-1.5 min-w-[210px] text-xs">
          <div class="flex items-center justify-between pb-1 border-b border-[var(--color-border)]">
            <span class="font-bold text-sm text-[var(--color-amber)] flex items-center gap-1">
              ${statusEmoji} ${cam.id}
            </span>
            <span class="font-mono text-[11px] text-[var(--color-text-muted)] font-semibold">${cam.speed}</span>
          </div>
          <p class="font-medium text-[var(--color-text)]">${cam.name}</p>
          <div class="grid grid-cols-2 gap-1 text-[11px] pt-1">
            <div class="text-[var(--color-text-muted)]">Flow: <span class="text-[var(--color-text)] font-semibold">${cam.statusLabel}</span></div>
            <div class="text-[var(--color-text-muted)]">Volume: <span class="text-[var(--color-amber)] font-semibold">${cam.vehiclesPerMin} v/m</span></div>
            <div class="text-[var(--color-text-muted)]">Resolution: <span class="text-[var(--color-text-secondary)]">${cam.resolution}</span></div>
            <div class="text-[var(--color-text-muted)]">Latency: <span class="text-emerald-400">${cam.latency}</span></div>
          </div>
        </div>
      `);

      group.addLayer(marker);
    });
  }, [showCameras]);

  // -------------------------------------------------------------
  // Update Vehicle Trajectory Layer (CAM-01 \ CAM-04 \ CAM-07 \ CAM-12)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!trajectoryGroupRef.current || !mapInstanceRef.current) return;
    const group = trajectoryGroupRef.current;
    group.clearLayers();

    if (!showTrajectories) return;

    // Line connecting all trajectory checkpoints
    const latLngs = TRAJECTORY_CHECKPOINTS.map((pt) => [pt.lat, pt.lng]);

    // Outer Neon Glow Polyline
    const outerGlow = L.polyline(latLngs, {
      color: '#F5A623',
      weight: 8,
      opacity: 0.35,
      lineCap: 'round',
      lineJoin: 'round'
    });
    group.addLayer(outerGlow);

    // Inner Neon Core Polyline
    const innerCore = L.polyline(latLngs, {
      color: '#F5A623',
      weight: 3.5,
      opacity: 0.95,
      dashArray: '8, 6',
      lineCap: 'round'
    });
    group.addLayer(innerCore);

    // Checkpoint nodes along the trajectory
    TRAJECTORY_CHECKPOINTS.forEach((pt, idx) => {
      const isMainCam = pt.camId.startsWith('CAM');
      const pointHtml = `
        <div class="w-4 h-4 rounded-full border-2 ${
          isMainCam
            ? 'bg-[var(--color-amber)] border-white shadow-sm'
            : 'bg-[var(--color-background)] border-[var(--color-amber)]'
        } flex items-center justify-center cursor-pointer hover:scale-125 transition-transform">
        </div>
      `;

      const pointIcon = L.divIcon({
        html: pointHtml,
        className: 'custom-leaflet-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const ptMarker = L.marker([pt.lat, pt.lng], { icon: pointIcon });
      ptMarker.bindPopup(`
        <div class="text-xs p-1">
          <div class="font-bold text-[var(--color-amber)]">Checkpoint ${idx + 1}: ${pt.camId}</div>
          <div class="text-[var(--color-text-secondary)]">${pt.event}</div>
          <div class="text-[11px] text-[var(--color-text-muted)] mt-1">Recorded Time: <b class="text-[var(--color-text)]">${pt.time}</b></div>
          <div class="text-[11px] text-[var(--color-text-muted)]">Velocity: <b class="text-emerald-400">${pt.speed}</b></div>
        </div>
      `);
      group.addLayer(ptMarker);
    });

    // Active Simulated Vehicle Marker (HP01AB1234)
    const currentPt = TRAJECTORY_CHECKPOINTS[trajectoryStep] || TRAJECTORY_CHECKPOINTS[0];
    const vehicleHtml = `
      <div class="relative flex items-center justify-center cursor-pointer" style="width: 120px; height: 36px;">
        <span class="absolute w-8 h-8 rounded-full bg-[var(--color-amber)]/40 animate-ping"></span>
        <div class="relative flex items-center gap-1.5 px-2 py-1 rounded-xl bg-[var(--color-amber)] text-[var(--color-charcoal)] border-2 border-white shadow-sm font-bold text-xs">
          <span class="text-xs">🚗</span>
          <span class="font-mono tracking-wide">HP01AB1234</span>
        </div>
      </div>
    `;

    const vehicleIcon = L.divIcon({
      html: vehicleHtml,
      className: 'custom-leaflet-marker',
      iconSize: [120, 36],
      iconAnchor: [60, 18]
    });

    const vehicleMarker = L.marker([currentPt.lat, currentPt.lng], {
      icon: vehicleIcon,
      zIndexOffset: 1000
    });

    vehicleMarker.on('click', () => {
      setSelectedType('vehicle');
      setSelectedItem({
        id: 'HP01AB1234',
        make: 'White Sedan (Hyundai Verna)',
        plate: 'HP01AB1234',
        targetCam: currentPt.camId,
        speed: currentPt.speed,
        timestamp: currentPt.time,
        stepIndex: trajectoryStep + 1,
        totalSteps: TRAJECTORY_CHECKPOINTS.length,
        status: 'Active Track Vector',
        trajectoryPath: 'CAM-01 ➔ CAM-04 ➔ CAM-07 ➔ CAM-12'
      });
    });

    group.addLayer(vehicleMarker);
    vehicleMarkerRef.current = vehicleMarker;
  }, [showTrajectories, trajectoryStep]);

  // -------------------------------------------------------------
  // Trajectory Simulation Timer Loop
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isPlayingTrajectory) return;

    const interval = setInterval(() => {
      setTrajectoryStep((prev) => {
        if (prev >= TRAJECTORY_CHECKPOINTS.length - 1) {
          return 0; // loop back to CAM-01
        }
        return prev + 1;
      });
    }, 2000 / simSpeed);

    return () => clearInterval(interval);
  }, [isPlayingTrajectory, simSpeed]);

  // -------------------------------------------------------------
  // Update Traffic Density Corridors Layer
  // -------------------------------------------------------------
  useEffect(() => {
    if (!densityGroupRef.current || !mapInstanceRef.current) return;
    const group = densityGroupRef.current;
    group.clearLayers();

    if (!showDensity) return;

    // Simulated density circles & flow corridors
    // 1. High-speed free flow corridor (Green) around CAM-01 & CAM-12
    const greenCircle1 = L.circle([31.115, 77.155], {
      radius: 650,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.18,
      weight: 1.5,
      dashArray: '4, 4'
    });
    greenCircle1.bindPopup('<b>CAM-01 Gateway Arterial</b><br/>Flow: Free Flow (Avg 58 km/h)<br/>Density: 32% (Optimal)');
    group.addLayer(greenCircle1);

    const greenCircle2 = L.circle([31.075, 77.185], {
      radius: 800,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.18,
      weight: 1.5,
      dashArray: '4, 4'
    });
    greenCircle2.bindPopup('<b>CAM-12 Expressway Arterial</b><br/>Flow: High Speed Free Flow (Avg 64 km/h)<br/>Density: 28%');
    group.addLayer(greenCircle2);

    // 2. High Congestion Red Density Buffer around CAM-04
    const redCircle = L.circle([31.1048, 77.1734], {
      radius: 550,
      color: '#ef4444',
      fillColor: '#ef4444',
      fillOpacity: 0.28,
      weight: 2
    });
    redCircle.bindPopup('<b>Mall Road Central Bottleneck (CAM-04)</b><br/>Flow: Severe Congestion (&lt; 15 km/h)<br/>Density: 92% Capacity');
    group.addLayer(redCircle);

    // 3. Moderate Amber Density Buffer around CAM-07
    const amberCircle = L.circle([31.092, 77.16], {
      radius: 600,
      color: '#f59e0b',
      fillColor: '#f59e0b',
      fillOpacity: 0.22,
      weight: 1.8
    });
    amberCircle.bindPopup('<b>ISBT Terminal Arterial (CAM-07)</b><br/>Flow: Moderate Slowdown (Avg 32 km/h)<br/>Density: 68%');
    group.addLayer(amberCircle);
  }, [showDensity]);

  // -------------------------------------------------------------
  // Update Accidents & Incidents Layer
  // -------------------------------------------------------------
  useEffect(() => {
    if (!accidentGroupRef.current || !mapInstanceRef.current) return;
    const group = accidentGroupRef.current;
    group.clearLayers();

    if (!showAccidents) return;

    ACCIDENT_INCIDENTS.forEach((inc) => {
      const incidentHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group" style="width: 130px; height: 38px;">
          <!-- Flashing Radar Ping -->
          <span class="absolute w-8 h-8 rounded-full bg-red-600/70 beacon-red-pulse"></span>

          <!-- Pill Badge -->
          <div class="relative flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-950/90 text-red-200 border border-red-500 shadow-sm text-xs font-bold transition-transform group-hover:scale-110">
            <span class="text-sm">⚠️</span>
            <span class="font-mono">${inc.id}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
          </div>
        </div>
      `;

      const incidentIcon = L.divIcon({
        html: incidentHtml,
        className: 'custom-leaflet-marker',
        iconSize: [130, 38],
        iconAnchor: [65, 19]
      });

      const marker = L.marker([inc.lat, inc.lng], { icon: incidentIcon });

      marker.on('click', () => {
        setSelectedItem(inc);
        setSelectedType('incident');
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([inc.lat, inc.lng], { animate: true });
        }
      });

      marker.bindPopup(`
        <div class="text-xs p-1 space-y-1 min-w-[200px]">
          <div class="flex items-center justify-between font-bold text-red-400 border-b border-[var(--color-border)] pb-1">
            <span>⚠️ ${inc.id}: ${inc.title}</span>
          </div>
          <p class="text-[var(--color-text)]">${inc.description}</p>
          <div class="text-[11px] text-amber-300 font-semibold">Status: ${inc.status}</div>
          <div class="text-[11px] text-[var(--color-text-muted)]">Delay: <b class="text-red-400">${inc.delayImpact}</b></div>
          <div class="text-[11px] text-[var(--color-text-muted)]">Units: <b class="text-[var(--color-text)]">${inc.unitsDispatched}</b></div>
        </div>
      `);

      group.addLayer(marker);
    });
  }, [showAccidents]);

  // -------------------------------------------------------------
  // Update Congestion Zones Layer (Polygons)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!zoneGroupRef.current || !mapInstanceRef.current) return;
    const group = zoneGroupRef.current;
    group.clearLayers();

    if (!showZones) return;

    CONGESTION_ZONES.forEach((zone) => {
      const polygon = L.polygon(zone.polygon, {
        color: zone.color,
        fillColor: zone.fillColor,
        fillOpacity: 0.22,
        weight: 2,
        dashArray: '6, 6'
      });

      polygon.on('click', () => {
        setSelectedItem(zone);
        setSelectedType('zone');
      });

      polygon.bindPopup(`
        <div class="text-xs p-1 space-y-1 min-w-[190px]">
          <div class="font-bold text-sm" style="color: ${zone.color}">
            ⛯ ${zone.name}
          </div>
          <div class="text-[var(--color-text-secondary)] font-semibold">${zone.status}</div>
          <div class="text-[11px] text-[var(--color-text-muted)]">Velocity: <b class="text-[var(--color-text)]">${zone.avgSpeed}</b></div>
          <div class="text-[11px] text-[var(--color-text-muted)]">Queue Delay: <b class="text-red-400">${zone.delay}</b></div>
          <div class="text-[11px] text-[var(--color-text-muted)]">Road Capacity: <b class="text-amber-400">${zone.capacity}</b></div>
        </div>
      `);

      group.addLayer(polygon);
    });
  }, [showZones]);

  // -------------------------------------------------------------
  // Quick Center Helpers
  // -------------------------------------------------------------
  const centerOnNode = (node) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([node.lat, node.lng], 15, { duration: 1.2 });
    setSelectedItem(node);
    setSelectedType('camera');
  };

  const centerOnAccident = (inc) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([inc.lat, inc.lng], 15, { duration: 1.2 });
    setSelectedItem(inc);
    setSelectedType('incident');
  };

  return (
    <div className="space-y-5">
      {/* -------------------------------------------------------------
          Header Bar with SIH 2026 AI Telemetry Badges
      ------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <MapIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[var(--color-text)] tracking-tight">
                  Metropolitan GIS Traffic Surveillance Map
                </h1>
                <Badge variant="info" size="sm" dot={true} pulse={true}>
                  LIVE TELEMETRY
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Real-time Leaflet & OpenStreetMap spatial intelligence engine tracking camera feeds, congestion arteries, and vehicle trajectories
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Basemap Switcher */}
          <div className="flex items-center bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setSelectedTileKey('dark')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedTileKey === 'dark'
                  ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)] shadow-sm font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              Tactical Dark
            </button>
            <button
              onClick={() => setSelectedTileKey('osm')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedTileKey === 'osm'
                  ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)] shadow-sm font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              OpenStreetMap
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="w-3.5 h-3.5 text-[var(--color-amber)]" />}
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize();
                mapInstanceRef.current.flyTo([31.098, 77.168], 13);
              }
              toast.addToast({
                type: 'info',
                title: 'GIS View Reset',
                message: 'Spatial map perspective re-centered on master corridor.'
              });
            }}
          >
            Reset View
          </Button>

          <Button
            variant="danger"
            size="sm"
            leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'error',
                title: 'Broadcast Warning Deployed',
                message: 'Incident alert transmitted to active traffic signals.'
              });
            }}
          >
            Emergency Siren
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Quick Status HUD Metric Cards
      ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider block">
              Active Cameras
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-[var(--color-text)]">48</span>
              <span className="text-[10px] text-emerald-400 font-semibold">● 100% Online</span>
            </div>
          </div>
          <Camera className="w-6 h-6 text-[var(--color-amber)] opacity-70" />
        </div>

        <div className="p-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider block">
              Network Velocity
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-emerald-400">46 km/h</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">Corridor Avg</span>
            </div>
          </div>
          <Gauge className="w-6 h-6 text-emerald-400 opacity-70" />
        </div>

        <div className="p-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider block">
              Critical Hotspots
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-red-400">2 Zones</span>
              <span className="text-[10px] text-red-400 font-semibold">🔴 CAM-04 Choke</span>
            </div>
          </div>
          <Flame className="w-6 h-6 text-red-400 opacity-70" />
        </div>

        <div className="p-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider block">
              Target Trajectory
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-[var(--color-amber)]">HP01AB1234</span>
              <span className="text-[10px] text-[var(--color-amber)]">Active</span>
            </div>
          </div>
          <Navigation className="w-6 h-6 text-[var(--color-amber)] opacity-70" />
        </div>
      </div>

      {/* -------------------------------------------------------------
          Main Content: Leaflet GIS Map + Interactive Control Drawer
      ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left / Center Map Section (8 Cols on Desktop) */}
        <div className="lg:col-span-8 space-y-3">
          <Card variant="default" className="relative overflow-hidden p-0 border border-[var(--color-border)]">
            {/* Map Top Floating Subheader */}
            <div className="p-3 bg-[var(--color-charcoal)]/90 border-b border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wide">
                  Topology Corridor:
                </span>
                {/* Visual Representation of the exact ASCII path: 🟢 CAM-01 \ 🔴 CAM-04 \ 🟡 CAM-07 \ 🟢 CAM-12 */}
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold bg-[var(--color-card)] px-2.5 py-1 rounded-lg border border-[var(--color-border)]">
                  <button
                    onClick={() => centerOnNode(CAMERA_NODES[0])}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                    title="Shimla North Entry (Free Flow)"
                  >
                    🟢 CAM-01
                  </button>
                  <span className="text-[var(--color-text-muted)]">➔</span>
                  <button
                    onClick={() => centerOnNode(CAMERA_NODES[1])}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    title="Mall Road (Heavy Bottleneck)"
                  >
                    🔴 CAM-04
                  </button>
                  <span className="text-[var(--color-text-muted)]">➔</span>
                  <button
                    onClick={() => centerOnNode(CAMERA_NODES[2])}
                    className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                    title="ISBT Bus Terminal (Moderate Flow)"
                  >
                    🟡 CAM-07
                  </button>
                  <span className="text-[var(--color-text-muted)]">➔</span>
                  <button
                    onClick={() => centerOnNode(CAMERA_NODES[3])}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                    title="South Highway Expressway (Free Flow)"
                  >
                    🟢 CAM-12
                  </button>
                </div>
              </div>

              {/* Trajectory Simulation Controls */}
              <div className="flex items-center gap-1.5 bg-[var(--color-card)] px-2 py-1 rounded-lg border border-[var(--color-border)] text-xs">
                <span className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase font-bold mr-1">
                  Pursuit Sim:
                </span>
                <button
                  onClick={() => setIsPlayingTrajectory(!isPlayingTrajectory)}
                  className={`p-1 rounded-md transition-colors ${
                    isPlayingTrajectory
                      ? 'bg-amber-500/20 text-amber-400 border border-[rgba(245,166,35,0.3)]'
                      : 'bg-[var(--color-amber)]/20 text-[var(--color-amber)] border border-[var(--color-amber)] hover:bg-[var(--color-amber)]/30'
                  }`}
                  title={isPlayingTrajectory ? 'Pause Pursuit' : 'Play Pursuit Simulation'}
                >
                  {isPlayingTrajectory ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsPlayingTrajectory(false);
                    setTrajectoryStep(0);
                  }}
                  className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-background)] transition-colors"
                  title="Reset to CAM-01"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSimSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
                  className="px-1.5 py-0.5 rounded font-mono text-[10px] text-[var(--color-amber)] bg-[var(--color-background)] hover:bg-slate-700"
                  title="Speed Multiplier"
                >
                  {simSpeed}x
                </button>
              </div>
            </div>

            {/* Real Leaflet Map Container */}
            <div className="relative w-full h-[540px] sm:h-[620px] bg-[#050c18]">
              <div ref={mapContainerRef} className="w-full h-full" style={{ zIndex: 1 }} />

              {/* Floating Layer Toggles Toolbar */}
              <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1 bg-[var(--color-charcoal)]/90  p-2 rounded-xl border border-[var(--color-border)] shadow-sm text-[11px]">
                <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider px-1 pb-1 border-b border-[var(--color-border)] flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[var(--color-amber)]" />
                  GIS Layers
                </span>

                <label className="flex items-center gap-2 px-1 py-1 hover:bg-[var(--color-card)] rounded cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showCameras}
                    onChange={(e) => setShowCameras(e.target.checked)}
                    className="rounded border-[var(--color-border)] text-[var(--color-amber)] focus:ring-0 focus:ring-offset-0 bg-[var(--color-background)]"
                  />
                  <span className="text-[var(--color-text)]">Camera Nodes</span>
                  <span className="text-[10px] text-emerald-400 ml-auto font-mono">🟢 🔴 🟡</span>
                </label>

                <label className="flex items-center gap-2 px-1 py-1 hover:bg-[var(--color-card)] rounded cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showTrajectories}
                    onChange={(e) => setShowTrajectories(e.target.checked)}
                    className="rounded border-[var(--color-border)] text-[var(--color-amber)] focus:ring-0 focus:ring-offset-0 bg-[var(--color-background)]"
                  />
                  <span className="text-[var(--color-text)]">Vehicle Trajectories</span>
                  <span className="text-[10px] text-[var(--color-amber)] ml-auto font-mono">⚡ Path</span>
                </label>

                <label className="flex items-center gap-2 px-1 py-1 hover:bg-[var(--color-card)] rounded cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showDensity}
                    onChange={(e) => setShowDensity(e.target.checked)}
                    className="rounded border-[var(--color-border)] text-[var(--color-amber)] focus:ring-0 focus:ring-offset-0 bg-[var(--color-background)]"
                  />
                  <span className="text-[var(--color-text)]">Traffic Density</span>
                  <span className="text-[10px] text-amber-400 ml-auto font-mono">Radial</span>
                </label>

                <label className="flex items-center gap-2 px-1 py-1 hover:bg-[var(--color-card)] rounded cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showAccidents}
                    onChange={(e) => setShowAccidents(e.target.checked)}
                    className="rounded border-[var(--color-border)] text-[var(--color-amber)] focus:ring-0 focus:ring-offset-0 bg-[var(--color-background)]"
                  />
                  <span className="text-[var(--color-text)]">Accident Locations</span>
                  <span className="text-[10px] text-red-400 ml-auto font-mono">⚠️ 2</span>
                </label>

                <label className="flex items-center gap-2 px-1 py-1 hover:bg-[var(--color-card)] rounded cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showZones}
                    onChange={(e) => setShowZones(e.target.checked)}
                    className="rounded border-[var(--color-border)] text-[var(--color-amber)] focus:ring-0 focus:ring-offset-0 bg-[var(--color-background)]"
                  />
                  <span className="text-[var(--color-text)]">Congestion Zones</span>
                  <span className="text-[10px] text-purple-400 ml-auto font-mono">⛯ Geo</span>
                </label>
              </div>

              {/* Floating Bottom Legend */}
              <div className="absolute bottom-4 left-4 z-[400] bg-[var(--color-charcoal)]/90  border border-[var(--color-border)] px-3 py-2 rounded-xl text-[11px] text-[var(--color-text-secondary)] space-y-1.5 shadow-sm font-medium">
                <div className="font-bold text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider">
                  Velocity & Status Legend
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                  <span>🟢 Free Flow (&gt; 50 km/h) — CAM-01, CAM-12</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
                  <span>🟡 Moderate Delay (25–50 km/h) — CAM-07</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
                  <span>🔴 Heavy Congestion / Choke (&lt; 20 km/h) — CAM-04</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-[var(--color-amber)] rounded-full" />
                  <span>Active Vehicle Trajectory Vector (HP01AB1234)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Node Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[var(--color-text-muted)] text-[11px] uppercase font-bold shrink-0">Focus Camera:</span>
            {CAMERA_NODES.map((cam) => {
              const isSelected = selectedType === 'camera' && selectedItem?.id === cam.id;
              const emoji = cam.status === 'critical' ? '🔴' : cam.status === 'warning' ? '🟡' : '🟢';
              return (
                <button
                  key={cam.id}
                  onClick={() => centerOnNode(cam)}
                  className={`px-3 py-1.5 rounded-xl border font-mono font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[var(--color-amber)] text-[var(--color-charcoal)] border-white shadow-sm font-bold'
                      : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border)] hover:bg-[var(--color-background)]'
                  }`}
                >
                  <span>{emoji}</span>
                  <span>{cam.id}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-sans">({cam.speed})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Inspection & Telemetry Panel (4 Cols on Desktop) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Item Telemetry Inspector */}
          <Card variant="default">
            <CardHeader className="p-4 pb-2 border-b border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[var(--color-amber)]" />
                  {selectedType === 'camera' && 'Surveillance Node Inspector'}
                  {selectedType === 'vehicle' && 'Target Trajectory Dossier'}
                  {selectedType === 'incident' && 'Accident Incident Command'}
                  {selectedType === 'zone' && 'Congestion Zone Intelligence'}
                </CardTitle>
                <Badge
                  variant={
                    selectedItem?.badgeVariant ||
                    (selectedType === 'vehicle' ? 'info' : 'warning')
                  }
                  size="sm"
                >
                  {selectedType === 'camera' && selectedItem?.statusLabel}
                  {selectedType === 'vehicle' && 'In Transit'}
                  {selectedType === 'incident' && selectedItem?.severity}
                  {selectedType === 'zone' && selectedItem?.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-3.5 text-xs">
              {/* CAMERA DETAILS VIEW */}
              {selectedType === 'camera' && (
                <>
                  {/* Camera Header Box */}
                  <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[var(--color-amber)] font-bold text-base flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[var(--color-amber)]" />
                        {selectedItem.id}
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-xs mt-0.5 font-medium">{selectedItem.name}</p>
                    </div>
                    <div className="text-right font-mono text-[11px] text-[var(--color-text-muted)]">
                      <div>IP: {selectedItem.ip}</div>
                      <div className="text-emerald-400 font-semibold">{selectedItem.fps}</div>
                    </div>
                  </div>

                  {/* Camera Simulated AI RTSP Feed Preview */}
                  <div className="relative aspect-video rounded-xl bg-black border border-[var(--color-border)] overflow-hidden group">
                    {/* Simulated Camera Video Stream */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

                    {/* Simulated road scene with AI bounding boxes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-16 border-2 border-emerald-400/80 rounded bg-[rgba(25,135,84,0.08)] flex flex-col justify-between p-1 text-[9px] font-mono text-emerald-300 animate-pulse">
                        <span>SEDAN 99%</span>
                        <span>{selectedItem.speed}</span>
                      </div>
                      <div className="w-16 h-12 border-2 border-[var(--color-amber)] rounded bg-[rgba(245,166,35,0.06)] flex flex-col justify-between p-1 text-[9px] font-mono text-[var(--color-amber)] ml-4">
                        <span>SUV 97%</span>
                        <span>42 km/h</span>
                      </div>
                    </div>

                    {/* Overlay Badges */}
                    <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-[var(--color-text)]">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>REC {selectedItem.id}</span>
                    </div>

                    <div className="absolute bottom-2 left-2 z-20 text-[10px] font-mono text-[var(--color-text-secondary)]">
                      Edge YOLOv8 • {selectedItem.direction}
                    </div>

                    <div className="absolute bottom-2 right-2 z-20 text-[10px] font-mono text-emerald-400 font-semibold">
                      {selectedItem.latency} Latency
                    </div>
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                      <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Throughput Volume</span>
                      <span className="font-mono text-base font-bold text-[var(--color-text)] mt-0.5 block">
                        {selectedItem.vehiclesPerMin} <span className="text-xs text-[var(--color-text-muted)]">veh/min</span>
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                      <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Mean Arterial Speed</span>
                      <span
                        className={`font-mono text-base font-bold mt-0.5 block ${
                          selectedItem.status === 'critical'
                            ? 'text-red-400'
                            : selectedItem.status === 'warning'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {selectedItem.speed}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                      <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Road Density</span>
                      <span className="font-mono text-xs font-semibold text-[var(--color-text)] mt-0.5 block">
                        {selectedItem.density}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                      <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Stream Quality</span>
                      <span className="font-mono text-xs font-semibold text-[var(--color-amber)] mt-0.5 block">
                        {selectedItem.resolution}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        toast.addToast({
                          type: 'success',
                          title: 'Full Screen RTSP Feed',
                          message: `Displaying camera feed matrix for ${selectedItem.id}`
                        });
                      }}
                    >
                      Open Video Stream
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.addToast({
                          type: 'info',
                          title: 'PTZ Actuator Engaged',
                          message: `Remote camera angle aligned with target arterial.`
                        });
                      }}
                    >
                      PTZ
                    </Button>
                  </div>
                </>
              )}

              {/* TARGET VEHICLE VIEW */}
              {selectedType === 'vehicle' && (
                <>
                  <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-extrabold text-[var(--color-amber)] flex items-center gap-1.5">
                        <Car className="w-4 h-4" />
                        {selectedItem.plate}
                      </span>
                      <Badge variant="purple" size="sm">
                        ANPR MATCH
                      </Badge>
                    </div>
                    <p className="text-[var(--color-text-secondary)] text-xs">{selectedItem.make}</p>
                  </div>

                  <div className="space-y-2 p-3 rounded-xl bg-[var(--color-charcoal)]/50 border border-[var(--color-border)]">
                    <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                      Trajectory Path Progression
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--color-text-muted)]">Current Checkpoint:</span>
                      <span className="text-[var(--color-amber)] font-bold">{selectedItem.targetCam}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--color-text-muted)]">Current Speed:</span>
                      <span className="text-emerald-400 font-bold">{selectedItem.speed}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--color-text-muted)]">Detection Timestamp:</span>
                      <span className="text-[var(--color-text)] font-bold">{selectedItem.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--color-text-muted)]">Path Step:</span>
                      <span className="text-[var(--color-text)]">
                        {selectedItem.stepIndex} of {selectedItem.totalSteps}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setIsPlayingTrajectory(true);
                      toast.addToast({
                        type: 'info',
                        title: 'Pursuit Tracking Activated',
                        message: `Simulation tracking ${selectedItem.plate} along CAM corridor.`
                      });
                    }}
                  >
                    Simulate Active Pursuit
                  </Button>
                </>
              )}

              {/* ACCIDENT / INCIDENT VIEW */}
              {selectedType === 'incident' && (
                <>
                  <div className="p-3 rounded-xl bg-[rgba(220,53,69,0.06)] border border-[rgba(220,53,69,0.3)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        {selectedItem.id}
                      </span>
                      <span className="text-[10px] text-red-300 font-mono">{selectedItem.reported}</span>
                    </div>
                    <h3 className="font-bold text-[var(--color-text)] text-xs">{selectedItem.title}</h3>
                    <p className="text-[var(--color-text-secondary)] text-xs">{selectedItem.description}</p>
                  </div>

                  <div className="space-y-2 p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-xs">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Blockage:</span>
                      <span className="text-red-400 font-semibold">{selectedItem.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Traffic Delay:</span>
                      <span className="text-amber-400 font-bold">{selectedItem.delayImpact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Assigned Units:</span>
                      <span className="text-[var(--color-text)] font-semibold">{selectedItem.unitsDispatched}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast.addToast({
                          type: 'success',
                          title: 'Green Corridor Preempted',
                          message: 'Signal preemption sequence deployed for emergency ambulance AMB-03.'
                        });
                      }}
                    >
                      Preempt Emergency Green Wave
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast.addToast({
                          type: 'info',
                          title: 'Diversion Broadcasted',
                          message: 'VMS display boards updated with rerouting advisories.'
                        });
                      }}
                    >
                      Reroute Upstream Traffic
                    </Button>
                  </div>
                </>
              )}

              {/* CONGESTION ZONE VIEW */}
              {selectedType === 'zone' && (
                <>
                  <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)] space-y-1">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      {selectedItem.name}
                    </span>
                    <p className="text-[var(--color-text-secondary)] text-xs">{selectedItem.status}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/50 border border-[var(--color-border)]">
                      <span className="text-[var(--color-text-muted)] text-[10px] uppercase block">Average Velocity</span>
                      <span className="font-mono text-sm font-bold text-red-400">{selectedItem.avgSpeed}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/50 border border-[var(--color-border)]">
                      <span className="text-[var(--color-text-muted)] text-[10px] uppercase block">Cumulative Delay</span>
                      <span className="font-mono text-sm font-bold text-amber-400">{selectedItem.delay}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)]/50 border border-[var(--color-border)] text-xs">
                    <span className="text-[var(--color-text-muted)] block text-[11px] font-bold">Recommended Mitigation:</span>
                    <p className="text-[var(--color-text-secondary)] mt-1">{selectedItem.recommendedAction}</p>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      toast.addToast({
                        type: 'success',
                        title: 'Adaptive AI Cycle Applied',
                        message: `Signal timings extended by 35s on ${selectedItem.name}.`
                      });
                    }}
                  >
                    Deploy Adaptive Signal Timing
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Incident Feed & Quick Action Dispatch */}
          <Card>
            <CardHeader className="p-3.5 pb-2">
              <CardTitle className="text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  Active Road Incidents ({ACCIDENT_INCIDENTS.length})
                </span>
                <span className="text-[10px] font-mono text-[var(--color-amber)]">AUTO DISPATCH</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 pt-1 space-y-2">
              {ACCIDENT_INCIDENTS.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => centerOnAccident(inc)}
                  className="p-2.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-red-500/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-red-400 text-xs">⚠️</span>
                      <span className="font-mono text-xs font-bold text-[var(--color-text)] group-hover:text-red-300 transition-colors">
                        {inc.id}
                      </span>
                      <Badge variant="danger" size="xs">
                        {inc.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-muted)] truncate mt-0.5">{inc.title}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-amber)] transition-colors shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
