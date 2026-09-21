import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Table,
  useToast
} from '../component';
import {
  Car,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  CreditCard
} from 'lucide-react';
import playAlert from '../component/alert';

export const VehicleDetails = () => {
  const { plate = 'DL-01-AB-1234' } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const formattedPlate = plate.replace(/-/g, ' ').toUpperCase();

  const violationsHistory = [
    {
      id: 'CHL-8821',
      date: '2026-09-21 14:32',
      violation: 'Overspeeding (78 in 60 km/h)',
      location: 'Ring Road Interchange',
      penalty: '₹2,000',
      status: 'Unpaid'
    },
    {
      id: 'CHL-7640',
      date: '2026-08-14 18:10',
      violation: 'Red Light Jump',
      location: 'Junction 4 Central',
      penalty: '₹1,000',
      status: 'Paid'
    },
    {
      id: 'CHL-6512',
      date: '2026-06-02 11:20',
      violation: 'Unauthorized Bus Lane Entry',
      location: 'BRT Corridor North',
      penalty: '₹500',
      status: 'Paid'
    }
  ];

  const columns = [
    {
      key: 'id',
      label: 'Challan ID',
      render: (val) => <span className="font-mono text-cyan-300 font-semibold">{val}</span>
    },
    { key: 'date', label: 'Timestamp' },
    { key: 'violation', label: 'Infraction' },
    { key: 'location', label: 'Location Node' },
    {
      key: 'penalty',
      label: 'Fine Amount',
      render: (val) => <span className="font-mono font-bold text-white">{val}</span>
    },
    {
      key: 'status',
      label: 'Payment Status',
      render: (val) => (
        <Badge variant={val === 'Paid' ? 'success' : 'danger'} dot={val === 'Unpaid'}>
          {val}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/vehicles')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Vehicle Registry
          </Button>

          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-cyan-400" />
              Vehicle Dossier: {formattedPlate}
              <Badge variant="danger" size="sm" dot={true} pulse={true}>
                Repeat Offender
              </Badge>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Integrated National Vahan 4.0 Telemetry & Traffic Enforcement Profile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigate(`/tracking/${plate}`);
            }}
          >
            Track Real-Time Route
          </Button>
          <Button
            variant="danger"
            size="sm"
            leftIcon={<CreditCard className="w-4 h-4" />}
            onClick={() => {
              playAlert();
              toast.addToast({
                type: 'danger',
                title: 'Notice Dispatched',
                message: `Statutory payment notice sent to registered owner of ${formattedPlate}.`
              });
            }}
          >
            Issue Demand Notice
          </Button>
        </div>
      </div>

      {/* Vehicle Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="glow">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">License Plate</span>
            <p className="text-lg font-mono font-bold text-cyan-300">{formattedPlate}</p>
            <span className="text-[10px] text-slate-500">State: Delhi NCT (DL-01)</span>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Make & Model</span>
            <p className="text-base font-bold text-white">Honda City 1.5L i-VTEC</p>
            <span className="text-[10px] text-slate-500">Class: Light Motor Vehicle (Sedan)</span>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Registration Status</span>
            <p className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Active & Insured
            </p>
            <span className="text-[10px] text-slate-500">Fitness Valid Till: Oct 2028</span>
          </CardContent>
        </Card>

        <Card variant="alert">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-red-400 uppercase">Outstanding Dues</span>
            <p className="text-xl font-bold font-mono text-red-400">₹2,000</p>
            <span className="text-[10px] text-red-300">1 Unpaid E-Challan Pending</span>
          </CardContent>
        </Card>
      </div>

      {/* Violation History */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Historical E-Challan & Enforcement Records</CardTitle>
          <CardDescription>Automated optical citations issued across state corridors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={violationsHistory} />
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleDetails;
