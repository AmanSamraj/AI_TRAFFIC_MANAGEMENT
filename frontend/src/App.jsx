import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layout/DashboardLayout';

// Standalone Pages
import { Login } from './pages/Login';

// Core Dashboard Pages
import { Dashboard } from './pages/Dashboard';
import { ANPR } from './pages/ANPR';
import { LiveANPR } from './pages/LiveANPR';
import { ANPRHistory } from './pages/ANPRHistory';
import { Cameras } from './pages/Cameras';
import { CameraDetails } from './pages/CameraDetails';
import { Vehicles } from './pages/Vehicles';
import { VehicleDetails } from './pages/VehicleDetails';
import { Tracking } from './pages/Tracking';
import { TrackingDetails } from './pages/TrackingDetails';
import { TrafficMap } from './pages/TrafficMap';
import { Analytics } from './pages/Analytics';
import { Alerts } from './pages/Alerts';
import { Violations } from './pages/Violations';
import { Reports } from './pages/Reports';

// Admin Subsystem Pages
import { Users as AdminUsers } from './pages/admin/Users';
import { AdminCameras } from './pages/admin/AdminCameras';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Authentication Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Layout Shell */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Index redirects to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* ANPR Subsystem Routes */}
          <Route path="anpr" element={<ANPR />} />
          <Route path="anpr/live" element={<LiveANPR />} />
          <Route path="anpr/history" element={<ANPRHistory />} />

          {/* Cameras & Parameterized Camera Details */}
          <Route path="cameras" element={<Cameras />} />
          <Route path="cameras/:id" element={<CameraDetails />} />

          {/* Vehicles & Parameterized Vehicle Dossier */}
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vehicles/:plate" element={<VehicleDetails />} />

          {/* Tracking & Parameterized Checkpoint Path */}
          <Route path="tracking" element={<Tracking />} />
          <Route path="tracking/:plate" element={<TrackingDetails />} />

          {/* GIS Traffic Map */}
          <Route path="traffic" element={<TrafficMap />} />

          {/* Analytics, Alerts, Violations, Reports */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="violations" element={<Violations />} />
          <Route path="reports" element={<Reports />} />

          {/* Admin Management Routes */}
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/cameras" element={<AdminCameras />} />
          <Route path="admin/settings" element={<AdminSettings />} />

          {/* Fallback wildcard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
