import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  useToast
} from '../component';
import { Settings as SettingsIcon, Cpu, Bell, Shield, Save, Key } from 'lucide-react';

export const Settings = () => {
  const toast = useToast();

  const [aiConfidence, setAiConfidence] = useState(85);
  const [speedTolerance, setSpeedTolerance] = useState(5);
  const [autoAlarm, setAutoAlarm] = useState(true);
  const [autoChallan, setAutoChallan] = useState(true);
  const [vahanEndpoint, setVahanEndpoint] = useState('https://vahan.parivahan.gov.in/api/v4/query');

  const handleSave = () => {
    toast.addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'AI detection parameters and enforcement thresholds updated.'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-[var(--color-amber)]" />
            System & AI Engine Configuration
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Configure computer vision parameters, enforcement rules, and national registry hooks
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: AI Model & Detection Parameters */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>
              <Cpu className="w-4 h-4 text-[var(--color-amber)]" />
              AI Vision & Neural Detection
            </CardTitle>
            <CardDescription>Configure YOLOv8 and plate OCR inference parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--color-text-secondary)] font-medium">Confidence Score Threshold</span>
                <span className="font-mono font-bold text-[var(--color-amber)]">{aiConfidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={aiConfidence}
                onChange={(e) => setAiConfidence(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Detections below this score require human officer manual verification.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--color-text-secondary)] font-medium">Radar Velocity Tolerance</span>
                <span className="font-mono font-bold text-[var(--color-amber)]">+{speedTolerance} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={speedTolerance}
                onChange={(e) => setSpeedTolerance(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Margin of error allowed before issuing statutory overspeeding citation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Notification & Audio Alarm Settings */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>
              <Bell className="w-4 h-4 text-amber-400" />
              Audio Sirens & Automatic Enforcement
            </CardTitle>
            <CardDescription>Control emergency broadcast behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text)]">Critical Alarm Sound</p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Play audible console siren on red light violations
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoAlarm}
                onChange={(e) => setAutoAlarm(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text)]">Autonomous E-Challan Issuance</p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Auto-dispatch SMS / DigiLocker notice to violators
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoChallan}
                onChange={(e) => setAutoChallan(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: External API Integration */}
        <Card variant="default" className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              <Key className="w-4 h-4 text-emerald-400" />
              National Database & Vahan 4.0 Hook
            </CardTitle>
            <CardDescription>Government transport department vehicle registry endpoint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                Vahan Vehicle Registry API Endpoint
              </label>
              <input
                type="text"
                value={vahanEndpoint}
                onChange={(e) => setVahanEndpoint(e.target.value)}
                className="w-full bg-[var(--color-charcoal)] border border-[var(--color-border)] rounded-xl px-3.5 py-2 text-xs text-[var(--color-text)] font-mono focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>TLS 1.3 Encryption Active & Verified</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
