/**
 * Mock Data: ANPR (Automated Number Plate Recognition)
 * Real-time optical plate telemetry captures with AI OCR confidence.
 */

export const anprData = [
  {
    id: 1,
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleModel: 'White Hyundai Verna 1.5',
    camera: 'CAM-12',
    cameraLocation: 'South Bypass Expressway Link',
    confidence: 98,
    time: '10:42:21',
    date: '2026-09-21',
    lane: 'Lane 1 (Expressway Fast Lane)',
    speed: '64 km/h',
    flagged: false,
    color: 'White',
    state: 'Himachal Pradesh'
  },
  {
    id: 2,
    plate: 'DL05XY7788',
    vehicle: 'SUV',
    vehicleModel: 'Black Mahindra Scorpio-N',
    camera: 'CAM-07',
    cameraLocation: 'ISBT Bus Terminal Interchange',
    confidence: 97,
    time: '10:32:15',
    date: '2026-09-21',
    lane: 'Lane 2 (Terminal Loop)',
    speed: '42 km/h',
    flagged: true,
    flagReason: 'Red Light Signal Jump',
    color: 'Black',
    state: 'Delhi NCT'
  },
  {
    id: 3,
    plate: 'HR26CD9911',
    vehicle: 'Car',
    vehicleModel: 'Silver Maruti Suzuki Swift',
    camera: 'CAM-02',
    cameraLocation: 'Ridge Vista Radial Junction',
    confidence: 96,
    time: '11:02:08',
    date: '2026-09-21',
    lane: 'Lane 1 (Radial Ramp)',
    speed: '36 km/h',
    flagged: true,
    flagReason: 'Wrong-Way Navigation',
    color: 'Silver',
    state: 'Haryana'
  },
  {
    id: 4,
    plate: 'UP16GH3456',
    vehicle: 'Car',
    vehicleModel: 'Dark Grey Honda City',
    camera: 'CAM-01',
    cameraLocation: 'Shimla Entry (North Gateway)',
    confidence: 99,
    time: '09:48:20',
    date: '2026-09-21',
    lane: 'Lane 1 (North Toll Gate)',
    speed: '86 km/h',
    flagged: true,
    flagReason: 'Speed Breach (+26 km/h)',
    color: 'Dark Grey',
    state: 'Uttar Pradesh'
  },
  {
    id: 5,
    plate: 'KA03EF9012',
    vehicle: 'Van',
    vehicleModel: 'White Commercial Carrier',
    camera: 'CAM-04',
    cameraLocation: 'Mall Road Commercial Corridor',
    confidence: 95,
    time: '09:15:33',
    date: '2026-09-21',
    lane: 'Lane 2 (Transit Lane)',
    speed: '39 km/h',
    flagged: false,
    color: 'White',
    state: 'Karnataka'
  },
  {
    id: 6,
    plate: 'MH12TR4422',
    vehicle: 'SUV',
    vehicleModel: 'Red Tata Nexon',
    camera: 'CAM-09',
    cameraLocation: 'Sanjauli Tunnel East Ramp',
    confidence: 94,
    time: '08:50:11',
    date: '2026-09-21',
    lane: 'Tunnel Lane B',
    speed: '48 km/h',
    flagged: false,
    color: 'Red',
    state: 'Maharashtra'
  },
  {
    id: 7,
    plate: 'DL01AB8899',
    vehicle: 'Car',
    vehicleModel: 'Blue Skoda Slavia',
    camera: 'CAM-12',
    cameraLocation: 'South Bypass Expressway Link',
    confidence: 98,
    time: '08:24:55',
    date: '2026-09-21',
    lane: 'Lane 2 (Southbound)',
    speed: '94 km/h',
    flagged: true,
    flagReason: 'Severe Overspeeding',
    color: 'Blue',
    state: 'Delhi NCT'
  },
  {
    id: 8,
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleModel: 'White Hyundai Verna 1.5',
    camera: 'CAM-07',
    cameraLocation: 'ISBT Bus Terminal Interchange',
    confidence: 99,
    time: '09:45:10',
    date: '2026-09-21',
    lane: 'Lane 2 (Interchange Bay)',
    speed: '36 km/h',
    flagged: false,
    color: 'White',
    state: 'Himachal Pradesh'
  },
  {
    id: 9,
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleModel: 'White Hyundai Verna 1.5',
    camera: 'CAM-04',
    cameraLocation: 'Mall Road Commercial Corridor',
    confidence: 97,
    time: '09:12:00',
    date: '2026-09-21',
    lane: 'Lane 1 (Central)',
    speed: '28 km/h',
    flagged: false,
    color: 'White',
    state: 'Himachal Pradesh'
  },
  {
    id: 10,
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleModel: 'White Hyundai Verna 1.5',
    camera: 'CAM-01',
    cameraLocation: 'Shimla Entry (North Gateway)',
    confidence: 99,
    time: '08:31:00',
    date: '2026-09-21',
    lane: 'Lane 1 (Gateway Entry)',
    speed: '42 km/h',
    flagged: false,
    color: 'White',
    state: 'Himachal Pradesh'
  }
];

export const getANPRByPlate = (plate) =>
  anprData.filter((item) => item.plate.toLowerCase() === plate.toLowerCase());

export const getANPRByCamera = (camera) =>
  anprData.filter((item) => item.camera === camera);

export default anprData;
