/**
 * Mock Data: Statutory Traffic Violations & E-Challan Citations
 * Covers Speeding, Red Light, Wrong Way, and Restricted Zone infractions.
 */

export const violations = [
  {
    id: 'VIO-2026-001',
    plate: 'HP01AB1234',
    violation: 'Speed',
    camera: 'CAM-04',
    cameraLocation: 'Mall Road Commercial Corridor',
    time: '10:21',
    rawTime: '2026-09-21 10:21:42',
    speedRecorded: '78 km/h',
    speedLimit: '50 km/h',
    fineAmount: '₹2,000',
    status: 'Pending Dispatch',
    vehicleMake: 'White Sedan (Hyundai Verna)',
    lane: 'Lane 1 (Northbound)',
    description: 'Vehicle exceeded maximum urban corridor speed ceiling by +28 km/h captured via Doppler radar.'
  },
  {
    id: 'VIO-2026-002',
    plate: 'DL05XY7788',
    violation: 'Red Light',
    camera: 'CAM-07',
    cameraLocation: 'ISBT Bus Terminal Interchange',
    time: '10:32',
    rawTime: '2026-09-21 10:32:15',
    speedRecorded: '42 km/h',
    speedLimit: 'Stop Line (Red 3.2s)',
    fineAmount: '₹1,000',
    status: 'Notice Dispatched',
    vehicleMake: 'Dark Grey SUV (Mahindra XUV700)',
    lane: 'Lane 2 (Zebra Crossing)',
    description: 'Vehicle crossed virtual stop line 3.2 seconds after signal transitioned to solid red phase.'
  },
  {
    id: 'VIO-2026-003',
    plate: 'HR26CD9911',
    violation: 'Wrong Way',
    camera: 'CAM-02',
    cameraLocation: 'Ridge Vista Radial Junction',
    time: '11:02',
    rawTime: '2026-09-21 11:02:08',
    speedRecorded: '36 km/h',
    speedLimit: 'One-Way Flow Counter-Flow',
    fineAmount: '₹5,000',
    status: 'Urgent Intercept Queued',
    vehicleMake: 'Silver Hatchback (Maruti Swift)',
    lane: 'Counter-Flow Exit Bay',
    description: 'Vehicle detected traveling in reverse direction against mandatory one-way traffic signage.'
  },
  {
    id: 'VIO-2026-004',
    plate: 'UP16GH3456',
    violation: 'Speed',
    camera: 'CAM-01',
    cameraLocation: 'Shimla Entry (North Gateway)',
    time: '09:48',
    rawTime: '2026-09-21 09:48:20',
    speedRecorded: '86 km/h',
    speedLimit: '60 km/h',
    fineAmount: '₹2,000',
    status: 'Paid Online',
    vehicleMake: 'Black Sedan (Honda City)',
    lane: 'Lane 1 (Highway Corridor)',
    description: 'Over-speed infraction recorded at northern entry corridor.'
  },
  {
    id: 'VIO-2026-005',
    plate: 'KA03EF9012',
    violation: 'Red Light',
    camera: 'CAM-04',
    cameraLocation: 'Mall Road Commercial Corridor',
    time: '09:15',
    rawTime: '2026-09-21 09:15:33',
    speedRecorded: '39 km/h',
    speedLimit: 'Stop Line (Red 2.8s)',
    fineAmount: '₹1,000',
    status: 'Notice Dispatched',
    vehicleMake: 'White Commercial Van',
    lane: 'Lane 3 (Transit Bay)',
    description: 'Intersection stop line breach during active pedestrian crossing phase.'
  },
  {
    id: 'VIO-2026-006',
    plate: 'MH12TR4422',
    violation: 'Wrong Way',
    camera: 'CAM-09',
    cameraLocation: 'Sanjauli Tunnel Exit Ramp',
    time: '08:50',
    rawTime: '2026-09-21 08:50:11',
    speedRecorded: '31 km/h',
    speedLimit: 'One-Way Ramp',
    fineAmount: '₹5,000',
    status: 'Notice Dispatched',
    vehicleMake: 'Red Compact SUV (Tata Nexon)',
    lane: 'Ramp Lane B (Descending)',
    description: 'Entered one-way tunnel descending ramp against opposing vehicle flow.'
  },
  {
    id: 'VIO-2026-007',
    plate: 'DL01AB8899',
    violation: 'Speed',
    camera: 'CAM-12',
    cameraLocation: 'South Bypass Expressway Link',
    time: '08:24',
    rawTime: '2026-09-21 08:24:55',
    speedRecorded: '94 km/h',
    speedLimit: '70 km/h',
    fineAmount: '₹2,000',
    status: 'Pending Dispatch',
    vehicleMake: 'Blue Sedan (Skoda Slavia)',
    lane: 'Fast Lane (Southbound)',
    description: 'Automated ANPR trigger recorded sustained over-speeding.'
  }
];

export const getViolationsByPlate = (plate) =>
  violations.filter((v) => v.plate.toLowerCase() === plate.toLowerCase());

export const getViolationsByCategory = (category) =>
  category === 'All' ? violations : violations.filter((v) => v.violation === category);

export default violations;
