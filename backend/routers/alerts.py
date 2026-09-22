from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api/alerts", tags=["Alerts & Incidents"])

ALERTS_FEED = [
    {
        "id": "ALT-901",
        "severity": "CRITICAL",
        "title": "Emergency Vehicle Blockage",
        "message": "Ambulance #AMB-102 slowed below 15 km/h on Sector 14 flyover.",
        "timestamp": "2026-09-21 21:18:10",
        "location": "Sector 14 Arterial",
        "acknowledged": False
    },
    {
        "id": "ALT-902",
        "severity": "WARNING",
        "title": "Congestion Spike Warning",
        "message": "Heavy density (>85%) detected at Junction 04 approach.",
        "timestamp": "2026-09-21 21:15:40",
        "location": "Junction 04 Connaught Ring",
        "acknowledged": False
    },
    {
        "id": "ALT-903",
        "severity": "CRITICAL",
        "title": "Hotlist Stolen Vehicle Alert",
        "message": "License Plate WB02AK7788 spotted at CAM-06 Industrial Gate.",
        "timestamp": "2026-09-21 21:10:15",
        "location": "CAM-06 Phase II Gate",
        "acknowledged": True
    }
]

@router.get("", response_model=List[Dict[str, Any]])
def get_alerts():
    return ALERTS_FEED

@router.post("/{alert_id}/acknowledge")
def ack_alert(alert_id: str):
    for a in ALERTS_FEED:
        if a["id"] == alert_id:
            a["acknowledged"] = True
            return {"status": "acknowledged", "alertId": alert_id}
    return {"status": "not_found", "alertId": alert_id}
