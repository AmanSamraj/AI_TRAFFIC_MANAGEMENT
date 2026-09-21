import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Table,
  StatusIndicator,
  useToast
} from '../../component';
import { Video, Plus, Sliders, RefreshCw, Server, Wifi } from 'lucide-react';

export const AdminCameras = () => {
  const toast = useToast();

  const hardwareCameras = [
    {
      id: 'CAM-01',
      location: 'Highway Junction A North',
      ip: '192.168.10.101',
      rtsp: 'rtsp://admin:pass@192.168.10.101:554/live',
      firmware: 'v4.2.1-AI',
      status: 'online',
      latency: '12ms'
    },
    {
      id: 'CAM-02',
      location: 'Central Expressway Overpass',
      ip: '192.168.10.102',
      rtsp: 'rtsp://admin:pass@192.168.10.102:554/live',
      firmware: 'v4.2.1-AI',
      status: 'online',
      latency: '14ms'
    },
    {
      id: 'CAM-04',
      location: 'Ring Road Interchange',
      ip: '192.168.10.104',
      rtsp: 'rtsp://admin:pass@192.168.10.104:554/live',
      firmware: 'v4.1.8-AI',
      status: 'online',
      latency: '18ms'
    },
    {
      id: 'CAM-08',
      location: 'South Industrial Corridor',
      ip: '192.168.10.108',
      rtsp: 'rtsp://admin:pass@192.168.10.108:554/live',
      firmware: 'v3.9.0-LEGACY',
      status: 'offline',
      latency: 'Timeout'
    }
  ];

  const columns = [
    {
      key: 'id',
      label: 'Camera Node',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <StatusIndicator status={row.status} size="sm" />
          <span className="font-bold text-white font-mono">{val}</span>
        </div>
      )
    },
    { key: 'location', label: 'Physical Street Address' },
    {
      key: 'ip',
      label: 'Static IP',
      render: (val) => <span className="font-mono text-cyan-300">{val}</span>
    },
    {
      key: 'rtsp',
      label: 'RTSP Stream Endpoint',
      render: (val) => <span className="font-mono text-[11px] text-slate-400 truncate max-w-[200px] block">{val}</span>
    },
    {
      key: 'firmware',
      label: 'Firmware',
      render: (val) => <span className="font-mono text-xs text-slate-300">{val}</span>
    },
    {
      key: 'action',
      label: 'Hardware Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="xs"
            leftIcon={<Sliders className="w-3.5 h-3.5" />}
            onClick={() => {
              toast.addToast({
                type: 'info',
                title: 'Sensor Calibration',
                message: `Optical distortion calibration initiated for ${row.id}.`
              });
            }}
          >
            Calibrate
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            CCTV Optical Hardware Provisioning
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure network RTSP endpoints, edge device IPs, and firmware calibration
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => {
            toast.addToast({
              type: 'info',
              title: 'Hardware Wizard',
              message: 'Optical node provisioning wizard started.'
            });
          }}
        >
          Provision CCTV Node
        </Button>
      </div>

      <Card variant="default">
        <CardHeader>
          <CardTitle>Physical Optical Camera Sensors</CardTitle>
          <CardDescription>Direct network stream routing and edge computer vision inference pipelines</CardDescription>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={hardwareCameras} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCameras;
