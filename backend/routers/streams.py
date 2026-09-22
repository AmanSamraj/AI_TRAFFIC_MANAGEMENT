from fastapi import APIRouter, Query, Body, HTTPException
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from services.windy_service import WindyWebcamService
from services.cctv_stream_manager import CCTVStreamManager
from config import CONFIGURED_CAMERAS, WINDY_API_KEY

router = APIRouter(prefix="/api/streams", tags=["Live CCTV & Windy Streams"])

class AddCameraRequest(BaseModel):
    cameraId: str
    name: str
    streamType: str  # "rtsp", "windy", "webcam", "http", "file"
    source: str      # e.g. "rtsp://admin:pass@192.168.1.100:554/live" or "windy_webcam_id"
    location: str
    speedLimit: int = 60

@router.get("/windy/list")
def get_windy_traffic_webcams(
    country: str = Query("IN", description="2-letter Country code, e.g. IN, US, GB, DE"),
    limit: int = Query(15, ge=1, le=50),
    apiKey: Optional[str] = Query(None, description="Optional custom Windy API Key")
):
    """
    Fetches real-time public traffic webcams from Windy Webcams API v3:
    https://api.windy.com/webcams/api/v3/webcams
    """
    return WindyWebcamService.fetch_traffic_webcams(
        country=country,
        limit=limit,
        category="traffic",
        api_key=apiKey
    )

@router.get("/list")
def list_configured_streams():
    """Lists all active CCTV RTSP streams, Windy webcams, and sensor nodes."""
    return list(CONFIGURED_CAMERAS.values())

@router.post("/add")
def add_custom_camera(req: AddCameraRequest):
    """
    Connects a new RTSP CCTV camera or Windy webcam into the live processing pipeline.
    Example RTSP: rtsp://admin:pass@192.168.1.64:554/Streaming/Channels/101
    """
    CONFIGURED_CAMERAS[req.cameraId] = {
        "id": req.cameraId,
        "name": req.name,
        "type": req.streamType,
        "source": req.source,
        "location": req.location,
        "speedLimit": req.speedLimit,
        "status": "online"
    }

    # Initialize stream reader
    CCTVStreamManager.get_or_create(req.cameraId, req.streamType, req.source)

    return {
        "status": "connected",
        "cameraId": req.cameraId,
        "name": req.name,
        "message": f"Successfully connected to {req.streamType.upper()} stream."
    }
