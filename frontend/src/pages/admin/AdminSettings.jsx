import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  useToast
} from '../../component';
import { Settings as SettingsIcon, Save, Database, Shield, Cpu, Key } from 'lucide-react';

export const AdminSettings = () => {
  const toast = useToast();

  const [modelWeight, setModelWeight] = useState('yolov8x-sih-traffic-v2.pt');
  const [retentionDays, setRetentionDays] = useState('90');
  const [backupSchedule, setBackupSchedule] = useState('Daily at 02:00 UTC');

  const handleSave = () => {
    toast.addToast({
      type: 'success',
      title: 'Admin Policy Updated',
      message: 'Core AI model parameters and storage retention committed.'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
            Global Administration & Neural Model Governance
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Low-level server configuration, AI checkpoint weights, and data lifecycle management
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Save Global Config
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <CardHeader>
            <CardTitle>
              <Cpu className="w-4 h-4 text-cyan-400" />
              Active AI Neural Weights
            </CardTitle>
            <CardDescription>Primary detection model loaded across tensor processing units</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Model Checkpoint (.pt / ONNX)
              </label>
              <input
                type="text"
                value={modelWeight}
                onChange={(e) => setModelWeight(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400">Model Architecture:</span>
              <p className="font-semibold text-white">YOLOv8x + PaddleOCR Hybrid Backbone</p>
              <span className="text-[11px] text-emerald-400 font-mono">
                TensorRT FP16 Optimization Enabled
              </span>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <CardTitle>
              <Database className="w-4 h-4 text-amber-400" />
              Data Retention & Lifecycle
            </CardTitle>
            <CardDescription>Telemetry and optical evidence storage lifecycle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Evidence Footage Retention (Days)
              </label>
              <input
                type="number"
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Non-violation optical streams purged after specified period to comply with privacy laws.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Automated Database Snapshot
              </label>
              <input
                type="text"
                value={backupSchedule}
                onChange={(e) => setBackupSchedule(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
