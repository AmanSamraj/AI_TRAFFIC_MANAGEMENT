import os

# ─── CCTV & WINDY WEBCAM CONFIGURATION ──────────────────────────
# Windy API Key: Get your free API key at https://api.windy.com/
WINDY_API_KEY = os.getenv("WINDY_API_KEY", "YOUR_WINDY_API_KEY_HERE")
WINDY_API_BASE = "https://api.windy.com/webcams/api/v3/webcams"

# ─── REAL CCTV RTSP / HTTP CAMERAS ──────────────────────────────
# Standard RTSP Stream formats for popular CCTV manufacturers:
# Hikvision: rtsp://admin:password@192.168.1.64:554/Streaming/Channels/101
# Dahua:     rtsp://admin:password@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0
# CP Plus:   rtsp://admin:password@192.168.1.250:554/cam/realmonitor?channel=1&subtype=0
# Generic:   rtsp://username:password@camera_ip:554/live/ch0

CONFIGURED_CAMERAS = {
    "CAM-01": {
        "name": "Connaught Place Radial 1",
        "type": "simulation", # Options: "rtsp", "windy", "webcam", "file", "simulation"
        "source": "0",         # RTSP URL, Windy ID, or webcam index
        "location": "Radial Road 1 - Inner Circle",
        "speedLimit": 60
    },
    "CAM-02": {
        "name": "MG Road Expressway Junc",
        "type": "simulation",
        "source": "0",
        "location": "MG Road Corridor km 14.2",
        "speedLimit": 70
    },
    "CAM-03": {
        "name": "Windy Traffic Live Cam",
        "type": "windy",
        "source": "1354371420", # Example Windy Webcam ID
        "location": "Highway Arterial Stream",
        "speedLimit": 80
    }
}

# ─── OCR & COMPUTER VISION SETTINGS ─────────────────────────────
INDIAN_PLATE_REGEX = r'^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$'
CONFIDENCE_THRESHOLD = 0.45
OCR_MIN_CONFIDENCE = 0.40
