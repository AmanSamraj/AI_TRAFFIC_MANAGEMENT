from fastapi import APIRouter, Query
from typing import List, Dict, Any, Optional
from services.vision_engine import VisionEngine

router = APIRouter(prefix="/api/anpr", tags=["ANPR"])

ANPR_HISTORY = [
    {
        "id": "ANPR-10921",
        "plate": "DL01AB1234",
        "confidence": 0.994,
        "camera": "CAM-01 (Connaught Place)",
        "timestamp": "2026-09-21 21:14:02",
        "speed": "54 km/h",
        "vehicleType": "Sedan",
        "flagged": False
    },
    {
        "id": "ANPR-10920",
        "plate": "MH02CZ9876",
        "confidence": 0.988,
        "camera": "CAM-02 (MG Road)",
        "timestamp": "2026-09-21 21:13:48",
        "speed": "82 km/h",
        "vehicleType": "Light Commercial",
        "flagged": True,
        "flagReason": "Overspeeding"
    },
    {
        "id": "ANPR-10919",
        "plate": "KA03MM4567",
        "confidence": 0.976,
        "camera": "CAM-04 (Ring Road)",
        "timestamp": "2026-09-21 21:12:30",
        "speed": "42 km/h",
        "vehicleType": "Motorcycle",
        "flagged": False
    },
    {
        "id": "ANPR-10918",
        "plate": "WB02AK7788",
        "confidence": 0.991,
        "camera": "CAM-06 (Industrial)",
        "timestamp": "2026-09-21 21:10:15",
        "speed": "39 km/h",
        "vehicleType": "Heavy Truck",
        "flagged": True,
        "flagReason": "Hotlist Match - Stolen Vehicle"
    }
]

@router.get("/metrics")
def get_anpr_metrics():
    return {
        "dailyDetections": 48920,
        "accuracyRate": "99.4%",
        "hotlistMatches": 14,
        "activeSensors": 28,
        "vahanConnection": "ONLINE (Latency 18ms)"
    }

@router.get("/live")
def get_live_detections(cameraId: Optional[str] = "CAM-01"):
    return VisionEngine.generate_live_frame_telemetry(cameraId)

@router.get("/history", response_model=List[Dict[str, Any]])
def get_anpr_history(plate: Optional[str] = None):
    if plate:
        clean = plate.upper().replace(" ", "").replace("-", "")
        return [h for h in ANPR_HISTORY if clean in h["plate"]]
    return ANPR_HISTORY
