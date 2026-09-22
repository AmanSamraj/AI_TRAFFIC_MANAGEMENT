/**
 * Mock Data: Registered & Monitored Vehicles Catalog
 * Vehicle dossiers including trajectory history, owner details, and compliance state.
 */

export const vehicles = [
  {
    plate: 'HP01AB1234',
    vehicle: 'Car',
    vehicleDetail: 'White Sedan (Hyundai Verna 1.5 SX)',
    owner: 'Himachal State Transport / Private',
    registrationState: 'Himachal Pradesh (HP-01)',
    engine: '1.5L Turbo Petrol',
    fuel: 'Petrol',
    registeredDate: '14 Jan 2023',
    status: 'Active Transit',
    compliance: 'Compliant',
    firstSeen: '08:31',
    lastSeen: '10:42',
    totalDetections: 27,
    currentSpeed: '64 km/h',
    assignedCorridor: 'CAM-01 ➔ CAM-04 ➔ CAM-07 ➔ CAM-12',
    detectionHistory: [
      { camera: 'CAM-01', time: '08:31', location: 'Shimla Entry', speed: '42 km/h', confidence: '99%' },
      { camera: 'CAM-04', time: '09:12', location: 'Mall Road', speed: '28 km/h', confidence: '97%' },
      { camera: 'CAM-07', time: '09:45', location: 'ISBT Bus Terminal', speed: '36 km/h', confidence: '98%' },
      { camera: 'CAM-12', time: '10:20', location: 'South Bypass Expressway', speed: '58 km/h', confidence: '94%' },
      { camera: 'CAM-12', time: '10:42', location: 'South Bypass Expressway', speed: '64 km/h', confidence: '98%' }
    ]
  },
  {
    plate: 'DL05XY7788',
    vehicle: 'SUV',
    vehicleDetail: 'Black Mahindra Scorpio-N Z8L',
    owner: 'Northern Fleet Logistics Inc.',
    registrationState: 'Delhi NCT (DL-05)',
    engine: '2.2L mHawk Diesel',
    fuel: 'Diesel',
    registeredDate: '08 Mar 2024',
    status: 'Overspeed Warning',
    compliance: 'Pending Citation',
    firstSeen: '07:15',
    lastSeen: '10:32',
    totalDetections: 42,
    currentSpeed: '42 km/h',
    assignedCorridor: 'CAM-02 ➔ CAM-07',
    detectionHistory: [
      { camera: 'CAM-02', time: '07:15', location: 'Ridge Vista', speed: '62 km/h', confidence: '98%' },
      { camera: 'CAM-07', time: '10:32', location: 'ISBT Bus Terminal', speed: '42 km/h', confidence: '97%' }
    ]
  },
  {
    plate: 'HR26CD9911',
    vehicle: 'Car',
    vehicleDetail: 'Silver Maruti Suzuki Swift ZXi',
    owner: 'Rameshwar Chand',
    registrationState: 'Haryana (HR-26 Gurugram)',
    engine: '1.2L DualJet Petrol',
    fuel: 'Petrol',
    registeredDate: '19 Nov 2022',
    status: 'Violation Intercept Queued',
    compliance: 'Court Notice',
    firstSeen: '09:10',
    lastSeen: '11:02',
    totalDetections: 18,
    currentSpeed: '36 km/h',
    assignedCorridor: 'CAM-02 Radial Bay',
    detectionHistory: [
      { camera: 'CAM-01', time: '09:10', location: 'Shimla Entry', speed: '52 km/h', confidence: '97%' },
      { camera: 'CAM-02', time: '11:02', location: 'Ridge Vista Radial', speed: '36 km/h', confidence: '96%' }
    ]
  },
  {
    plate: 'UP16GH3456',
    vehicle: 'Car',
    vehicleDetail: 'Dark Grey Honda City ZX',
    owner: 'Sunil Mathur',
    registrationState: 'Uttar Pradesh (UP-16 Noida)',
    engine: '1.5L i-VTEC',
    fuel: 'Petrol',
    registeredDate: '02 Feb 2021',
    status: 'Active Transit',
    compliance: 'Compliant',
    firstSeen: '08:40',
    lastSeen: '09:48',
    totalDetections: 31,
    currentSpeed: '86 km/h',
    assignedCorridor: 'CAM-01 Highway Corridor',
    detectionHistory: [
      { camera: 'CAM-01', time: '09:48', location: 'Shimla Entry', speed: '86 km/h', confidence: '99%' }
    ]
  },
  {
    plate: 'HR26DQ8821',
    vehicle: 'SUV',
    vehicleDetail: 'Grey Toyota Fortuner 4x4',
    owner: 'Unknown / Stolen Vehicle FIR #2026/8912',
    registrationState: 'Haryana (HR-26 Gurugram)',
    engine: '2.8L Diesel',
    fuel: 'Diesel',
    registeredDate: '11 Jun 2020',
    status: 'Hotlist Blacklisted',
    compliance: 'Impound Warrant',
    firstSeen: '10:38',
    lastSeen: '10:38',
    totalDetections: 4,
    currentSpeed: '62 km/h',
    assignedCorridor: 'CAM-01 North Inter-State Toll',
    detectionHistory: [
      { camera: 'CAM-01', time: '10:38', location: 'Shimla Entry', speed: '62 km/h', confidence: '99%' }
    ]
  }
];

export const getVehicleByPlate = (plate) =>
  vehicles.find((v) => v.plate.toLowerCase() === plate.toLowerCase());

export default vehicles;
