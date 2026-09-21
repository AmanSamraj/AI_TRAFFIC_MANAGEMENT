import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  SearchBar,
  Table,
  Pagination,
  useToast
} from '../component';
import { Car, Truck, Bus, ShieldAlert, Download } from 'lucide-react';

export const Vehicles = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');

  const vehiclesData = [
    {
      id: 'V-101',
      plate: 'DL 01 AB 1234',
      type: 'Sedan (Honda City)',
      color: 'Pearl White',
      avgSpeed: '64 km/h',
      tripsToday: 4,
      challans: 2,
      ownerType: 'Private Commercial',
      status: 'High Violation Risk'
    },
    {
      id: 'V-102',
      plate: 'MH 12 CD 5678',
      type: 'Heavy 10-Wheeler Truck',
      color: 'Blue',
      avgSpeed: '38 km/h',
      tripsToday: 1,
      challans: 0,
      ownerType: 'Logistics Fleet',
      status: 'Compliant'
    },
    {
      id: 'V-103',
      plate: 'KA 03 EF 9012',
      type: 'Two-Wheeler (Yamaha R15)',
      color: 'Matte Black',
      avgSpeed: '72 km/h',
      tripsToday: 6,
      challans: 4,
      ownerType: 'Individual',
      status: 'Repeat Offender'
    },
    {
      id: 'V-104',
      plate: 'UP 16 GH 3456',
      type: 'City Transit Bus',
      color: 'Green (CNG)',
      avgSpeed: '42 km/h',
      tripsToday: 8,
      challans: 1,
      ownerType: 'Municipal Transport',
      status: 'Compliant'
    },
    {
      id: 'V-105',
      plate: 'DL 04 EM 0108',
      type: 'Advanced Life Support Ambulance',
      color: 'White/Red',
      avgSpeed: '76 km/h',
      tripsToday: 5,
      challans: 0,
      ownerType: 'Emergency Health Services',
      status: 'Priority Green Corridor'
    }
  ];

  const columns = [
    {
      key: 'plate',
      label: 'License Plate',
      render: (val) => (
        <span className="font-mono font-bold text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
          {val}
        </span>
      )
    },
    { key: 'type', label: 'Vehicle Model & Class' },
    { key: 'color', label: 'Color' },
    { key: 'ownerType', label: 'Registration Category' },
    { key: 'avgSpeed', label: 'Avg Speed' },
    {
      key: 'challans',
      label: 'Total Challans',
      align: 'center',
      render: (val) => (
        <span
          className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
            val > 2
              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
              : val > 0
              ? 'bg-amber-500/20 text-amber-300'
              : 'text-slate-400'
          }`}
        >
          {val}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Compliance Status',
      render: (val) => {
        let variant = 'neutral';
        if (val.includes('Compliant')) variant = 'success';
        if (val.includes('Priority')) variant = 'info';
        if (val.includes('Risk') || val.includes('Offender')) variant = 'danger';
        return <Badge variant={variant}>{val}</Badge>;
      }
    }
  ];

  const filtered = vehiclesData.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase()) ||
      v.ownerType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-cyan-400" />
            Vehicle Intelligence Registry
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated profiling, frequency analysis, and e-challan violation histories
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => {
              toast.addToast({
                type: 'success',
                title: 'Export Generated',
                message: 'Vehicle registry log exported to CSV.'
              });
            }}
          >
            Export Registry
          </Button>
        </div>
      </div>

      {/* Class Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card variant="default">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Cars & SUVs</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">12,840</h3>
            </div>
            <Car className="w-6 h-6 text-cyan-400" />
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Commercial Heavy Trucks</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">3,120</h3>
            </div>
            <Truck className="w-6 h-6 text-amber-400" />
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Public Buses</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">850</h3>
            </div>
            <Bus className="w-6 h-6 text-blue-400" />
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Flagged Stolen Vehicles</p>
              <h3 className="text-2xl font-bold text-red-400 mt-0.5">3 Active</h3>
            </div>
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </CardContent>
        </Card>
      </div>

      {/* Registry Table */}
      <Card variant="default">
        <CardHeader>
          <div>
            <CardTitle>Registered Fleet & Transit Vehicles</CardTitle>
            <CardDescription>Filtered by real-time camera node detections</CardDescription>
          </div>
          <SearchBar
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="Search by plate, vehicle type, or owner..."
            className="max-w-xs"
            size="sm"
          />
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={filtered} />
          <Pagination currentPage={1} totalPages={4} totalItems={20} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Vehicles;
