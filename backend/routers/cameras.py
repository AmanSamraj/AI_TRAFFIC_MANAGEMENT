from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

router = APIRouter(prefix="/api/cameras", tags=["Cameras"])

CAMERA_NODES = [
    {
        "id": "CAM-01",
        "name": "Connaught Place Radial 1",
        "location": "Radial Road 1 - Inner Circle",
        "status": "online",
        "fps": 60,
        "resolution": "4K (3840x2160)",
        "bitrate": "12.4 Mbps",
        "temp": "41°C",
        "ptz": {"pan": 45, "tilt": -15, "zoom": 1.5},
        "streamUrl": "rtsp://192.168.1.101:554/live/ch0"
    },
    {
        "id": "CAM-02",
        "name": "MG Road Expressway Junc",
        "location": "MG Road Corridor km 14.2",
        "status": "online",
        "fps": 60,
        "resolution": "4K (3840x2160)",
        "bitrate": "11.8 Mbps",
        "temp": "43°C",
        "ptz": {"pan": 0, "tilt": -20, "zoom": 2.0},
        "streamUrl": "rtsp://192.168.1.102:554/live/ch0"
    },
    {
        "id": "CAM-03",
        "name": "Airport Expressway Flyover",
        "location": "Airport T3 Approach Ramp",
        "status": "online",
        "fps": 58,
        "resolution": "1080p (1920x1080)",
        "bitrate": "8.5 Mbps",
        "temp": "39°C",
        "ptz": {"pan": 120, "tilt": -10, "zoom": 1.0},
        "streamUrl": "rtsp://192.168.1.103:554/live/ch0"
    },
    {
        "id": "CAM-04",
        "name": "Ring Road Underpass Exit",
        "location": "Ring Road Sector 18 Loop",
        "status": "online",
        "fps": 60,
        "resolution": "4K (3840x2160)",
        "bitrate": "13.1 Mbps",
        "temp": "45°C",
        "ptz": {"pan": -30, "tilt": -5, "zoom": 3.0},
        "streamUrl": "rtsp://192.168.1.104:554/live/ch0"
    },
    {
        "id": "CAM-05",
        "name": "Cyber Hub North Interchange",
        "location": "Cyber Hub Arterial 4",
        "status": "warning",
        "fps": 34,
        "resolution": "1080p (1920x1080)",
        "bitrate": "4.2 Mbps",
        "temp": "52°C",
        "ptz": {"pan": 90, "tilt": -30, "zoom": 1.0},
        "streamUrl": "rtsp://192.168.1.105:554/live/ch0"
    },
    {
        "id": "CAM-06",
        "name": "Industrial Area Barrier",
        "location": "Phase II Heavy Vehicle Gate",
        "status": "online",
        "fps": 60,
        "resolution": "4K (3840x2160)",
        "bitrate": "12.0 Mbps",
        "temp": "40°C",
        "ptz": {"pan": 0, "tilt": 0, "zoom": 1.0},
        "streamUrl": "rtsp://192.168.1.106:554/live/ch0"
    }
]

@router.get("", response_model=List[Dict[str, Any]])
def list_cameras():
    return CAMERA_NODES

@router.get("/{camera_id}")
def get_camera(camera_id: str):
    for cam in CAMERA_NODES:
        if cam["id"] == camera_id.upper():
            return cam
    raise HTTPException(status_code=404, detail="Camera not found")

@router.post("/{camera_id}/ptz")
def ptz_control(camera_id: str, action: str):
    for cam in CAMERA_NODES:
        if cam["id"] == camera_id.upper():
            return {
                "status": "success",
                "cameraId": camera_id,
                "commandExecuted": action,
                "currentPtz": cam["ptz"]
            }
    raise HTTPException(status_code=404, detail="Camera not found")
