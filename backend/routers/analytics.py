from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter(prefix="/api/analytics", tags=["Analytics & KPIs"])

@router.get("/kpis")
def get_kpis():
    return {
        "monitoredVehicles": 128450,
        "activeViolations": 142,
        "onlineCameras": "28 / 30",
        "congestionIndex": "64% (Moderate)",
        "co2SavingsKg": 1840,
        "averageCitySpeedKmH": 42.6
    }

@router.get("/hourly-volume")
def get_hourly_volume():
    return [
        {"time": "00:00", "volume": 1200, "violations": 4},
        {"time": "04:00", "volume": 800, "violations": 2},
        {"time": "08:00", "volume": 8400, "violations": 28},
        {"time": "12:00", "volume": 6200, "violations": 19},
        {"time": "16:00", "volume": 7900, "violations": 24},
        {"time": "20:00", "volume": 9100, "violations": 35},
        {"time": "23:00", "volume": 3100, "violations": 12}
    ]
