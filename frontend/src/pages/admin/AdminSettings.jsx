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
import {
  Settings as SettingsIcon,
  Save,
  Database,
  Cpu,
  KeyRound
} from 'lucide-react';

export const AdminSettings = () => {
  const toast = useToast();

  const [modelWeight, setModelWeight] = useState('yolov8x-sih-traffic-v2.pt');
  const [ocrConfidenceThreshold, setOcrConfidenceThreshold] = useState('85');
  const [retentionDays, setRetentionDays] = useState('90');
  const [backupSchedule, setBackupSchedule] = useState('Daily at 02:00 UTC');
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState('30');
  const [maxFailedLogins, setMaxFailedLogins] = useState('5');

  const handleSave = () => {
    toast.addToast({
      type: 'success',
      title: 'Global Configuration Saved',
      message: 'AI model parameters, security timeouts, and data lifecycle updated.'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[rgba(245,166,35,0.06)] border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[var(--color-text)] tracking-tight">
                Global Administration & Neural Model Governance
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Low-level server configuration, AI checkpoint weights, and data lifecycle management
              </p>
            </div>
          </div>
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
        {/* AI & ANPR INFERENCE CONFIG */}
        <Card variant="default">
          <CardHeader className="p-4 border-b border-[var(--color-border)]">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[var(--color-amber)]" />
              Active AI Neural Weights & Inference
            </CardTitle>
            <CardDescription className="text-xs">
              Primary detection model loaded across tensor processing units
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4 text-xs">
            <div>
              <label className="block font-medium text-[var(--color-text-secondary)] mb-1.5">
                Model Checkpoint (.pt / ONNX TensorRT)
              </label>
              <input
                type="text"
                value={modelWeight}
                onChange={(e) => setModelWeight(e.target.value)}
                className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-amber)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-medium text-[var(--color-text-secondary)]">
                  Minimum ANPR OCR Confidence Threshold
                </label>
                <span className="font-mono text-[var(--color-amber)] font-bold">{ocrConfidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={ocrConfidenceThreshold}
                onChange={(e) => setOcrConfidenceThreshold(e.target.value)}
                className="w-full accent-[var(--color-amber)] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Plates detected with confidence below this threshold are routed to the manual operator audit queue.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-xs space-y-1">
              <span className="text-[var(--color-text-muted)]">Architecture:</span>
              <p className="font-semibold text-[var(--color-text)]">YOLOv8x + PaddleOCR Hybrid Ensemble</p>
              <span className="text-[11px] text-emerald-400 font-mono block">
                TensorRT FP16 Hardware Acceleration: Active
              </span>
            </div>
          </CardContent>
        </Card>

        {/* SECURITY & AUTHENTICATION GOVERNANCE */}
        <Card variant="default">
          <CardHeader className="p-4 border-b border-[var(--color-border)]">
            <CardTitle className="text-sm flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-purple-400" />
              Operator Security & Session Lockout
            </CardTitle>
            <CardDescription className="text-xs">
              Law enforcement console authentication safeguards
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4 text-xs">
            <div>
              <label className="block font-medium text-[var(--color-text-secondary)] mb-1.5">
                Inactivity Session Timeout (Minutes)
              </label>
              <input
                type="number"
                value={sessionTimeoutMinutes}
                onChange={(e) => setSessionTimeoutMinutes(e.target.value)}
                className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-text)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>

            <div>
              <label className="block font-medium text-[var(--color-text-secondary)] mb-1.5">
                Maximum Failed Login Attempts (Lockout)
              </label>
              <input
                type="number"
                value={maxFailedLogins}
                onChange={(e) => setMaxFailedLogins(e.target.value)}
                className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-text)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-xs space-y-1">
              <span className="text-[var(--color-text-muted)]">Multi-Factor Authentication (MFA):</span>
              <p className="font-semibold text-[var(--color-text)]">Enforced for Admin & Traffic Police roles</p>
            </div>
          </CardContent>
        </Card>

        {/* DATA STORAGE & RETENTION */}
        <Card variant="default" className="md:col-span-2">
          <CardHeader className="p-4 border-b border-[var(--color-border)]">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Data Retention, Legal Compliance & Snapshots
            </CardTitle>
            <CardDescription className="text-xs">
              Optical evidence video and ANPR telemetry lifecycle
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[var(--color-text-secondary)] mb-1.5">
                  Evidence Footage Retention Period (Days)
                </label>
                <input
                  type="number"
                  value={retentionDays}
                  onChange={(e) => setRetentionDays(e.target.value)}
                  className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-text)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
                />
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                  Non-infraction optical streams are automatically expunged after 90 days to comply with national privacy regulations.
                </p>
              </div>

              <div>
                <label className="block font-medium text-[var(--color-text-secondary)] mb-1.5">
                  Automated Database Snapshot Cron Schedule
                </label>
                <input
                  type="text"
                  value={backupSchedule}
                  onChange={(e) => setBackupSchedule(e.target.value)}
                  className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-text)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
                />
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                  Encrypted cold-storage replication on state cloud repository.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
