from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api/tracking", tags=["Vehicle Tracking & Corridors"])

CORRIDORS = [
    {
        "id": "COR-01",
        "name": "Central Arterial Spine (CP to Airport)",
        "checkpoints": ["CP-01", "CP-02", "CP-03", "CP-04"],
        "distanceKm": 14.5,
        "avgTransitTimeMin": 22,
        "activeVehicles": 312,
        "greenWaveActive": False
    },
    {
        "id": "COR-02",
        "name": "Outer Ring Ringway Expressway",
        "checkpoints": ["OR-01", "OR-02", "OR-03"],
        "distanceKm": 28.0,
        "avgTransitTimeMin": 34,
        "activeVehicles": 580,
        "greenWaveActive": False
    }
]

@router.get("/corridors")
def get_corridors():
    return CORRIDORS

@router.post("/greenwave/activate")
def activate_green_wave(corridor_id: str, ambulance_id: str):
    return {
        "status": "activated",
        "corridorId": corridor_id,
        "ambulanceId": ambulance_id,
        "signalPreemption": "ALL_GREEN_CASCADE",
        "estimatedClearanceTimeSec": 180
    }
