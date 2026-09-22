/**
 * Mock Data: Traffic Analytics & Metropolitan Spatial Intelligence
 * Data feeds for chart visualization, congestion curves, and throughput analytics.
 */

export const hourlyVolume = [
  { hour: '00:00', vehicles: 420, avgSpeed: 68, congestionIndex: 12 },
  { hour: '02:00', vehicles: 210, avgSpeed: 72, congestionIndex: 8 },
  { hour: '04:00', vehicles: 380, avgSpeed: 70, congestionIndex: 10 },
  { hour: '06:00', vehicles: 1240, avgSpeed: 62, congestionIndex: 22 },
  { hour: '08:00', vehicles: 4280, avgSpeed: 38, congestionIndex: 64 },
  { hour: '09:00', vehicles: 6420, avgSpeed: 18, congestionIndex: 92 },
  { hour: '10:00', vehicles: 5180, avgSpeed: 28, congestionIndex: 78 },
  { hour: '12:00', vehicles: 3950, avgSpeed: 44, congestionIndex: 48 },
  { hour: '14:00', vehicles: 3620, avgSpeed: 48, congestionIndex: 42 },
  { hour: '16:00', vehicles: 4890, avgSpeed: 34, congestionIndex: 68 },
  { hour: '18:00', vehicles: 6840, avgSpeed: 14, congestionIndex: 96 },
  { hour: '20:00', vehicles: 4920, avgSpeed: 36, congestionIndex: 62 },
  { hour: '22:00', vehicles: 2140, avgSpeed: 56, congestionIndex: 30 }
];

export const vehicleDistribution = [
  { name: 'Sedans & Hatchbacks', value: 48, count: 23150, color: '#F5A623' },
  { name: 'SUVs & MUVs', value: 24, count: 11570, color: '#292825' },
  { name: 'Two-Wheelers (Bikes)', value: 16, count: 7720, color: '#198754' },
  { name: 'Commercial Freight Trucks', value: 8, count: 3860, color: '#C77A00' },
  { name: 'Public Transit Buses', value: 4, count: 1930, color: '#5B6770' }
];

export const cameraThroughput = [
  { camera: 'CAM-01', location: 'Shimla Entry', vehicles: 8420, avgSpeed: 58, status: 'Free Flow' },
  { camera: 'CAM-02', location: 'Ridge Vista', vehicles: 5240, avgSpeed: 48, status: 'Moderate Flow' },
  { camera: 'CAM-04', location: 'Mall Road', vehicles: 12480, avgSpeed: 14, status: 'Heavy Bottleneck' },
  { camera: 'CAM-07', location: 'ISBT Terminal', vehicles: 9860, avgSpeed: 32, status: 'Moderate Delay' },
  { camera: 'CAM-08', location: 'Industrial Bypass', vehicles: 1420, avgSpeed: 0, status: 'Offline / Fault' },
  { camera: 'CAM-09', location: 'Sanjauli East', vehicles: 6120, avgSpeed: 44, status: 'Normal Flow' },
  { camera: 'CAM-12', location: 'South Expressway', vehicles: 7140, avgSpeed: 64, status: 'Free Flow' }
];

export const weeklyTrends = [
  { day: 'Mon', volume: 44200, violations: 184, recovery: 74 },
  { day: 'Tue', volume: 46800, violations: 162, recovery: 78 },
  { day: 'Wed', volume: 48900, violations: 198, recovery: 72 },
  { day: 'Thu', volume: 47200, violations: 175, recovery: 81 },
  { day: 'Fri', volume: 53400, violations: 242, recovery: 69 },
  { day: 'Sat', volume: 58900, violations: 288, recovery: 65 },
  { day: 'Sun', volume: 51200, violations: 210, recovery: 70 }
];

export const executiveMetrics = {
  totalDailyVehicles: 48240,
  averageNetworkVelocity: '46.2 km/h',
  peakDemandHours: '08:30 - 10:15 AM & 17:45 - 19:30 PM',
  activeIncidentsCount: 2,
  criticalCongestionHotspots: 2,
  anprAccuracyPercent: 99.2,
  totalFinesCollected: '₹18,40,000'
};

export default {
  hourlyVolume,
  vehicleDistribution,
  cameraThroughput,
  weeklyTrends,
  executiveMetrics
};
