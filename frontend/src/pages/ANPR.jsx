import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Dropdown,
  DatePicker,
  Table,
  Modal,
  Pagination,
  useToast
} from '../component';
import {
  ScanLine,
  Search,
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  Car,
  Download,
  Volume2
} from 'lucide-react';
import playAlert from '../component/alert';

export const ANPR = () => {
  const toast = useToast();

  // Search & Filter States matching wireframe: [ Search Plate ] [ Camera ▼ ] [ Date ▼ ] [ Search ]
  const [searchPlate, setSearchPlate] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  // Active query applied on "Search" button click
  const [appliedFilters, setAppliedFilters] = useState({
    plate: '',
    camera: 'all',
    date: 'today'
  });

  // Selected row for Detection Details
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Initial plate reads matching wireframe
  const allReads = [
    {
      id: 'ANPR-2026-001',
      time: '10:42',
      timestampFull: '2026-09-21 10:42:15 AM',
      plate: 'HP01AB1234',
      vehicle: 'Car',
      vehicleModel: 'White Hyundai Verna',
      camera: 'CAM-12',
      cameraName: 'CAM-12 (North Highway Interchange)',
      location: 'NH-44 Corridor, Milestone 28',
      confidence: '98%',
      speed: '58 km/h',
      status: 'Clean'
    },
    {
      id: 'ANPR-2026-002',
      time: '10:40',
      timestampFull: '2026-09-21 10:40:48 AM',
      plate: 'DL05XY7788',
      vehicle: 'SUV',
      vehicleModel: 'Black Mahindra Scorpio-N',
      camera: 'CAM-08',
      cameraName: 'CAM-08 (Outer Ring Flyover)',
      location: 'Ring Road Overpass Bay 3',
      confidence: '96%',
      speed: '76 km/h',
      status: 'Overspeed Warning'
    },
    {
      id: 'ANPR-2026-003',
      time: '10:38',
      timestampFull: '2026-09-21 10:38:22 AM',
      plate: 'MH12CD5678',
      vehicle: 'Truck',
      vehicleModel: 'Tata Signa 4825 Heavy Freight',
      camera: 'CAM-01',
      cameraName: 'CAM-01 (Highway Junction A)',
      location: 'Freight Transit Corridor Gate 2',
      confidence: '99%',
      speed: '42 km/h',
      status: 'Clean'
    },
    {
      id: 'ANPR-2026-004',
      time: '10:35',
      timestampFull: '2026-09-21 10:35:05 AM',
      plate: 'KA03EF9012',
      vehicle: 'Motorcycle',
      vehicleModel: 'Yamaha R15 V4',
      camera: 'CAM-07',
      cameraName: 'CAM-07 (Outer Bypass)',
      location: 'Outer Bypass Toll Plaza',
      confidence: '95%',
      speed: '65 km/h',
      status: 'No Helmet Detected'
    },
    {
      id: 'ANPR-2026-005',
      time: '10:32',
      timestampFull: '2026-09-21 10:32:40 AM',
      plate: 'UP16GH3456',
      vehicle: 'Bus',
      vehicleModel: 'Ashok Leyland Electric Transit',
      camera: 'CAM-02',
      cameraName: 'CAM-02 (Central Expressway)',
      location: 'Central Secretariat Bus Lane',
      confidence: '97%',
      speed: '48 km/h',
      status: 'Clean'
    },
    {
      id: 'ANPR-2026-006',
      time: '10:28',
      timestampFull: '2026-09-21 10:28:10 AM',
      plate: 'HR26IJ7890',
      vehicle: 'Car',
      vehicleModel: 'Silver Maruti Suzuki Ciaz',
      camera: 'CAM-09',
      cameraName: 'CAM-09 (Metro Corridor)',
      location: 'Metro Line Gate 3 Intersection',
      confidence: '98%',
      speed: '52 km/h',
      status: 'Clean'
    }
  ];

  // Trigger search on button click
  const handleSearchClick = () => {
    setAppliedFilters({
      plate: searchPlate.trim(),
      camera: selectedCamera,
      date: selectedDate
    });
    toast.addToast({
      type: 'info',
      title: 'Filter Applied',
      message: `Searching records matching criteria.`
    });
  };

  // Filter dataset
  const filteredReads = allReads.filter((row) => {
    const matchesPlate = appliedFilters.plate
      ? row.plate.toLowerCase().includes(appliedFilters.plate.toLowerCase())
      : true;
    const matchesCamera =
      appliedFilters.camera === 'all' ? true : row.camera === appliedFilters.camera;
    return matchesPlate && matchesCamera;
  });

  // Table columns matching wireframe: TIME | PLATE | VEHICLE | CAMERA | CONFIDENCE
  const tableColumns = [
    {
      key: 'time',
      label: 'TIME',
      render: (val) => (
        <span className="font-mono text-[var(--color-text-secondary)] font-semibold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[var(--color-amber)]" />
          {val}
        </span>
      )
    },
    {
      key: 'plate',
      label: 'PLATE',
      render: (val) => (
        <span className="font-mono font-bold text-[var(--color-amber)] bg-[var(--color-surface)] px-2.5 py-1 rounded-md border border-[var(--color-amber)] tracking-wider inline-block">
          {val}
        </span>
      )
    },
    {
      key: 'vehicle',
      label: 'VEHICLE',
      render: (val) => (
        <span className="text-[var(--color-text)] font-medium flex items-center gap-1.5">
          <Car className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
          {val}
        </span>
      )
    },
    {
      key: 'camera',
      label: 'CAMERA',
      render: (val) => (
        <span className="font-mono font-semibold text-[var(--color-text-secondary)] bg-[var(--color-background)] px-2 py-0.5 rounded border border-[var(--color-border)]">
          {val}
        </span>
      )
    },
    {
      key: 'confidence',
      label: 'CONFIDENCE',
      align: 'right',
      render: (val) => {
        const num = parseInt(val, 10);
        return (
          <Badge
            variant={num >= 98 ? 'success' : num >= 95 ? 'info' : 'warning'}
            dot={true}
          >
            {val}
          </Badge>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* ────────────────────────────────────────────────────
          HEADER: ANPR DETECTION
      ──────────────────────────────────────────────────── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <ScanLine className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[var(--color-text)] uppercase flex items-center gap-2">
                ANPR DETECTION
                <Badge variant="danger" size="sm" dot={true} pulse={true}>
                  LIVE ENGINE
                </Badge>
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Automated Number Plate Recognition & High-Speed OCR Surveillance (SIH Core)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Volume2 className="w-4 h-4" />}
              onClick={() => {
                playAlert();
                toast.addToast({
                  type: 'danger',
                  title: 'Emergency Alarm Sounding',
                  message: 'Alarm sound broadcasted across optical nodes.'
                });
              }}
            >
              Trigger Sound Alert
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => {
                toast.addToast({
                  type: 'success',
                  title: 'Data Exported',
                  message: 'ANPR detections downloaded as CSV.'
                });
              }}
            >
              Export Reads
            </Button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          SEARCH & FILTER TOOLBAR
          [ Search Plate ] [ Camera ▼ ] [ Date ▼ ] [ Search ]
      ──────────────────────────────────────────────────── */}
      <Card variant="default" className="p-4 bg-[var(--color-card)] border-[var(--color-border)] shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* [ Search Plate ] */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchPlate}
              onChange={(e) => setSearchPlate(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              placeholder="Search Plate (e.g. HP01, DL05)..."
              className="w-full bg-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] rounded-xl pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-[var(--color-amber)] focus:ring-1 focus:ring-[var(--color-amber)] transition-all"
            />
          </div>

          {/* [ Camera ▼ ] */}
          <Dropdown
            value={selectedCamera}
            onChange={(val) => setSelectedCamera(val)}
            options={[
              { label: 'All Cameras', value: 'all', icon: <Camera className="w-3.5 h-3.5" /> },
              { divider: true },
              { label: 'CAM-12 (North Highway)', value: 'CAM-12' },
              { label: 'CAM-08 (Outer Ring)', value: 'CAM-08' },
              { label: 'CAM-01 (Highway Junction A)', value: 'CAM-01' },
              { label: 'CAM-07 (Outer Bypass)', value: 'CAM-07' },
              { label: 'CAM-02 (Central Expressway)', value: 'CAM-02' },
              { label: 'CAM-09 (Metro Corridor)', value: 'CAM-09' }
            ]}
          />

          {/* [ Date ▼ ] */}
          <DatePicker
            value={selectedDate}
            onChange={(val) => setSelectedDate(val)}
            presets={[
              { label: 'Today', value: 'today' },
              { label: 'Yesterday', value: 'yesterday' },
              { label: 'Last 24 Hours', value: '24h' },
              { label: 'Last 7 Days', value: '7d' }
            ]}
          />

          {/* [ Search ] Button */}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Search className="w-4 h-4" />}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>
      </Card>

      {/* ────────────────────────────────────────────────────
          RECENT NUMBER PLATE READS TABLE
      ──────────────────────────────────────────────────── */}
      <Card variant="default">
        <CardHeader className="p-4 flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-[var(--color-text)] flex items-center gap-2">
              Recent Number Plate Reads
            </CardTitle>
            <CardDescription>
              Click any record row to inspect optical vehicle capture & plate alignment
            </CardDescription>
          </div>

          <span className="text-xs font-mono text-[var(--color-amber)] bg-[rgba(91,103,112,0.06)] px-2.5 py-1 rounded-md border border-[var(--color-amber)]/30">
            {filteredReads.length} Vehicles Logged
          </span>
        </CardHeader>

        <CardContent className="p-0">
          <Table
            columns={tableColumns}
            data={filteredReads}
            onRowClick={(row) => setSelectedDetection(row)}
            emptyMessage="No number plate records match your filter criteria."
          />
        </CardContent>

        <div className="p-4 border-t border-[var(--color-border)]/80">
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            totalItems={filteredReads.length}
            pageSize={6}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </Card>

      {/* ────────────────────────────────────────────────────
          DETECTION DETAILS MODAL (TRIGGERED ON ROW CLICK)
          Detection Details
                ↓
          Vehicle Image
                ↓
          Number Plate Image
                ↓
          Detected Plate
                ↓
          Confidence
                ↓
          Camera
                ↓
          Timestamp
                ↓
          Location
      ──────────────────────────────────────────────────── */}
      <Modal
        isOpen={Boolean(selectedDetection)}
        onClose={() => setSelectedDetection(null)}
        title="Detection Details"
        subtitle={`Audit ID: ${selectedDetection?.id || ''}`}
        maxWidth="max-w-xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelectedDetection(null)}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                playAlert();
                toast.addToast({
                  type: 'danger',
                  title: 'Violation Challan Issued',
                  message: `Notice dispatched to registered owner of ${selectedDetection?.plate}.`
                });
                setSelectedDetection(null);
              }}
            >
              Issue E-Challan
            </Button>
          </>
        }
      >
        {selectedDetection && (
          <div className="space-y-5 text-[var(--color-text)]">
            {/* 1. Vehicle Image Frame */}
            <div>
              <label className="block text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Vehicle Image (Optical Scene Capture)
              </label>
              <div className="relative aspect-video rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center select-none shadow-inner">
                {/* Simulated CCTV Grid & Frame */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />

                {/* Road Lane Marking Simulation */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute w-2 h-full bg-yellow-500/20 left-1/3 rotate-12 pointer-events-none" />

                {/* Simulated Vehicle Bounding Box */}
                <div className="relative z-10 w-3/4 max-w-sm h-36 border-2 border-[var(--color-amber)] rounded-lg bg-[var(--color-surface)] p-2 flex flex-col justify-between shadow-sm animate-pulse">
                  <div className="flex items-center justify-between text-[10px] font-mono bg-[var(--color-charcoal)] text-[var(--color-amber-light)] px-1.5 py-0.5 rounded border border-[var(--color-amber)]">
                    <span>{selectedDetection.vehicleModel}</span>
                    <span className="text-emerald-400 font-bold">{selectedDetection.confidence}</span>
                  </div>

                  {/* Vehicle Graphic Representation */}
                  <div className="flex flex-col items-center justify-center my-auto text-[var(--color-text-secondary)]">
                    <Car className="w-12 h-12 text-[var(--color-amber)]/90 stroke-[1.5]" />
                    <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                      {selectedDetection.vehicle} (Velocity: {selectedDetection.speed})
                    </span>
                  </div>

                  {/* Number Plate Crop Indicator */}
                  <div className="self-center bg-black/80 px-2 py-0.5 rounded border border-yellow-400/80 text-[10px] font-mono text-yellow-300 font-bold">
                    {selectedDetection.plate}
                  </div>
                </div>

                {/* CCTV Watermark */}
                <div className="absolute top-2 left-2 bg-black/70  px-2 py-0.5 rounded text-[10px] font-mono text-red-400 font-bold">
                  ● {selectedDetection.camera} REC
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70  px-2 py-0.5 rounded text-[10px] font-mono text-[var(--color-text-secondary)]">
                  {selectedDetection.time}
                </div>
              </div>
            </div>

            {/* 2. Number Plate Image (Zoomed OCR Crop) */}
            <div>
              <label className="block text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Number Plate Image (Cropped OCR Alignment)
              </label>
              <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-border)] flex items-center justify-center">
                {/* Indian High Security Registration Plate Style */}
                <div className="relative px-6 py-2.5 bg-gradient-to-r bg-[var(--color-surface)] border border-[var(--color-border-dark)] rounded-md shadow-sm flex items-center gap-3">
                  {/* Blue IND stripe */}
                  <div className="flex flex-col items-center justify-center text-blue-900 pr-2 border-r border-slate-300 select-none">
                    <div className="w-2.5 h-2.5 rounded-full border border-blue-900 flex items-center justify-center text-[5px] font-bold">
                      🇮🇳
                    </div>
                    <span className="text-[8px] font-black font-sans leading-none mt-0.5">IND</span>
                  </div>

                  {/* Embossed Registration Characters */}
                  <span className="font-mono text-2xl font-black tracking-widest text-[var(--color-charcoal)] select-all">
                    {selectedDetection.plate}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Detailed Telemetry Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Detected Plate */}
              <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] font-medium block">Detected Plate:</span>
                <p className="text-base font-mono font-bold text-[var(--color-amber)] mt-0.5">
                  {selectedDetection.plate}
                </p>
              </div>

              {/* Confidence */}
              <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] font-medium block">Confidence:</span>
                <p className="text-base font-mono font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {selectedDetection.confidence}
                </p>
              </div>

              {/* Camera */}
              <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] font-medium block">Camera:</span>
                <p className="font-semibold text-[var(--color-text)] mt-0.5 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                  {selectedDetection.cameraName}
                </p>
              </div>

              {/* Timestamp */}
              <div className="p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] font-medium block">Timestamp:</span>
                <p className="font-mono font-semibold text-[var(--color-text)] mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  {selectedDetection.timestampFull}
                </p>
              </div>

              {/* Location (Full width) */}
              <div className="col-span-2 p-3 rounded-xl bg-[var(--color-charcoal)]/70 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] font-medium block">Location:</span>
                <p className="font-semibold text-[var(--color-text)] mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                  {selectedDetection.location}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ANPR;
