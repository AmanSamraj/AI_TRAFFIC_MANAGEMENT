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
  Table,
  useToast
} from '../component';
import { AlertTriangle, Volume2, ShieldAlert } from 'lucide-react';
import playAlert from '../component/alert';

export const Alerts = () => {
  const toast = useToast();
  const [filter, setFilter] = useState('all');

  const alertsData = [
    {
      id: 'ALT-9901',
      type: 'Red Light Signal Jump',
      plate: 'KA 03 EF 9012',
      location: 'Junction 4 (Central)',
      severity: 'danger',
      speed: '65 km/h',
      status: 'Action Required',
      time: 'Just now'
    },
    {
      id: 'ALT-9902',
      type: 'Severe Overspeeding (82 in 50)',
      plate: 'DL 01 AB 1234',
      location: 'Ring Road Interchange',
      severity: 'danger',
      speed: '82 km/h',
      status: 'Patrol Dispatched',
      time: '3m ago'
    },
    {
      id: 'ALT-9903',
      type: 'Stalled Vehicle / Lane Blockage',
      plate: 'MH 04 TR 7711',
      location: 'Expressway Overpass Bay 2',
      severity: 'warning',
      speed: '0 km/h',
      status: 'Tow Truck Enroute',
      time: '12m ago'
    },
    {
      id: 'ALT-9904',
      type: 'Wrong-Way Driving Detection',
      plate: 'UP 16 GH 3456',
      location: 'Exit Ramp 3B',
      severity: 'danger',
      speed: '38 km/h',
      status: 'Urgent Intercept',
      time: '18m ago'
    },
    {
      id: 'ALT-9905',
      type: 'Triple Riding / No Helmet',
      plate: 'DL 08 BK 2244',
      location: 'Metro Corridor South',
      severity: 'warning',
      speed: '45 km/h',
      status: 'Challan Auto-Issued',
      time: '25m ago'
    }
  ];

  const columns = [
    {
      key: 'id',
      label: 'Alert ID',
      render: (val) => <span className="font-mono text-cyan-300 font-bold">{val}</span>
    },
    {
      key: 'type',
      label: 'Incident Type',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <AlertTriangle
            className={`w-4 h-4 ${
              row.severity === 'danger' ? 'text-red-400' : 'text-amber-400'
            }`}
          />
          <span className="font-semibold text-slate-200">{val}</span>
        </div>
      )
    },
    {
      key: 'plate',
      label: 'Vehicle Plate',
      render: (val) => (
        <span className="font-mono font-bold text-slate-100 bg-slate-800 px-2 py-0.5 rounded">
          {val}
        </span>
      )
    },
    { key: 'location', label: 'Intersection Node' },
    {
      key: 'severity',
      label: 'Severity',
      render: (val) => (
        <Badge variant={val} dot={true} pulse={val === 'danger'}>
          {val.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <span className="text-slate-300 text-xs">{val}</span>
    },
    {
      key: 'actions',
      label: 'Action',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="outline"
          size="xs"
          onClick={() => {
            playAlert();
            toast.addToast({
              type: 'danger',
              title: `Alert ${row.id} Acknowledged`,
              message: `Patrol notification dispatched for ${row.plate}.`
            });
          }}
        >
          Acknowledge
        </Button>
      )
    }
  ];

  const filtered = alertsData.filter((a) => {
    if (filter === 'all') return true;
    return a.severity === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            Active Emergency & Violation Alerts
            <Badge variant="danger" size="sm" dot={true} pulse={true}>
              14 Pending
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated alerts dispatched by computer vision anomaly detection
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Volume2 className="w-4 h-4" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'danger',
                title: 'Audio Alarm Sounding',
                message: 'Broadcasting emergency siren across control consoles.'
              });
            }}
          >
            Sound Console Siren
          </Button>

          <Dropdown
            value={filter}
            onChange={(val) => setFilter(val)}
            options={[
              { label: 'All Severities', value: 'all' },
              { label: 'Critical / Danger', value: 'danger' },
              { label: 'Moderate / Warning', value: 'warning' }
            ]}
          />
        </div>
      </div>

      <Card variant="default">
        <CardHeader>
          <CardTitle>Live Incident Feed</CardTitle>
          <CardDescription>Direct telemetry feed with automated e-challan integration</CardDescription>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={filtered} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
