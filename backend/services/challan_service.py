import uuid
from datetime import datetime
from typing import Dict, Any, List

CHALLAN_STORE: List[Dict[str, Any]] = [
    {
        "id": "CH-2026-9041",
        "plate": "DL01AB1234",
        "violationType": "Overspeeding",
        "speed": "94 km/h",
        "speedLimit": "60 km/h",
        "location": "Junction 04 - Connaught Ring North",
        "cameraId": "CAM-04",
        "timestamp": "2026-09-21 18:42:10",
        "fineAmount": 2000,
        "status": "Pending",
        "evidenceSnapshot": "/evidence/CH-2026-9041.jpg"
    },
    {
        "id": "CH-2026-8812",
        "plate": "MH02CZ9876",
        "violationType": "Red Light Jump",
        "speed": "48 km/h",
        "speedLimit": "50 km/h",
        "location": "Junction 02 - MG Road South",
        "cameraId": "CAM-02",
        "timestamp": "2026-09-21 19:15:33",
        "fineAmount": 1000,
        "status": "Pending",
        "evidenceSnapshot": "/evidence/CH-2026-8812.jpg"
    },
    {
        "id": "CH-2026-7650",
        "plate": "WB02AK7788",
        "violationType": "Wrong-Way Driving",
        "speed": "36 km/h",
        "speedLimit": "40 km/h",
        "location": "Junction 06 - Airport Expressway Bypass",
        "cameraId": "CAM-06",
        "timestamp": "2026-09-21 20:05:44",
        "fineAmount": 5000,
        "status": "Verified",
        "evidenceSnapshot": "/evidence/CH-2026-7650.jpg"
    }
]

class ChallanService:
    @staticmethod
    def get_all_challans() -> List[Dict[str, Any]]:
        return CHALLAN_STORE

    @staticmethod
    def issue_challan(plate: str, violation_type: str, speed: str, location: str, camera_id: str, fine_amount: int) -> Dict[str, Any]:
        challan_id = f"CH-2026-{uuid.uuid4().hex[:4].upper()}"
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        challan = {
            "id": challan_id,
            "plate": plate.upper(),
            "violationType": violation_type,
            "speed": speed,
            "speedLimit": "60 km/h",
            "location": location,
            "cameraId": camera_id,
            "timestamp": timestamp,
            "fineAmount": fine_amount,
            "status": "Pending",
            "evidenceSnapshot": f"/evidence/{challan_id}.jpg"
        }
        CHALLAN_STORE.insert(0, challan)
        return challan

    @staticmethod
    def update_challan_status(challan_id: str, status: str) -> bool:
        for ch in CHALLAN_STORE:
            if ch["id"] == challan_id:
                ch["status"] = status
                return True
        return False
