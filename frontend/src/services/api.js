const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';

export const api = {
  // Cameras
  getCameras: async () => {
    const res = await fetch(`${API_BASE_URL}/api/cameras`);
    return res.json();
  },
  getCamera: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/cameras/${id}`);
    return res.json();
  },
  controlPtz: async (id, action) => {
    const res = await fetch(`${API_BASE_URL}/api/cameras/${id}/ptz?action=${action}`, { method: 'POST' });
    return res.json();
  },

  // ANPR
  getAnprMetrics: async () => {
    const res = await fetch(`${API_BASE_URL}/api/anpr/metrics`);
    return res.json();
  },
  getLiveAnpr: async (cameraId = 'CAM-01') => {
    const res = await fetch(`${API_BASE_URL}/api/anpr/live?cameraId=${cameraId}`);
    return res.json();
  },
  getAnprHistory: async (plate = '') => {
    const query = plate ? `?plate=${encodeURIComponent(plate)}` : '';
    const res = await fetch(`${API_BASE_URL}/api/anpr/history${query}`);
    return res.json();
  },

  // Violations
  getViolations: async () => {
    const res = await fetch(`${API_BASE_URL}/api/violations`);
    return res.json();
  },
  issueChallan: async (payload) => {
    const res = await fetch(`${API_BASE_URL}/api/violations/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Vehicles
  getVehicles: async () => {
    const res = await fetch(`${API_BASE_URL}/api/vehicles`);
    return res.json();
  },
  getVehicleDetails: async (plate) => {
    const res = await fetch(`${API_BASE_URL}/api/vehicles/${plate}`);
    return res.json();
  },

  // Tracking
  getCorridors: async () => {
    const res = await fetch(`${API_BASE_URL}/api/tracking/corridors`);
    return res.json();
  },
  activateGreenWave: async (corridorId, ambulanceId) => {
    const res = await fetch(`${API_BASE_URL}/api/tracking/greenwave/activate?corridor_id=${corridorId}&ambulance_id=${ambulanceId}`, { method: 'POST' });
    return res.json();
  },

  // Analytics
  getKpis: async () => {
    const res = await fetch(`${API_BASE_URL}/api/analytics/kpis`);
    return res.json();
  },
  getHourlyVolume: async () => {
    const res = await fetch(`${API_BASE_URL}/api/analytics/hourly-volume`);
    return res.json();
  },

  // Alerts
  getAlerts: async () => {
    const res = await fetch(`${API_BASE_URL}/api/alerts`);
    return res.json();
  },
  acknowledgeAlert: async (alertId) => {
    const res = await fetch(`${API_BASE_URL}/api/alerts/${alertId}/acknowledge`, { method: 'POST' });
    return res.json();
  },

  // Real-time WebSocket connection
  connectTelemetryWs: (onMessage, onError) => {
    const ws = new WebSocket(`${WS_BASE_URL}/ws/telemetry`);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch (err) {
        console.error("Failed to parse WS message", err);
      }
    };
    if (onError) ws.onerror = onError;
    return ws;
  }
};

export default api;
