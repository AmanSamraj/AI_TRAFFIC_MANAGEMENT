import random
import time
from typing import Dict, Any, List

SAMPLE_PLATES = [
    "DL01AB1234", "MH02CZ9876", "KA03MM4567", "HR26DQ5544", 
    "WB02AK7788", "UP16XY9021", "TN09BK3321", "GJ01LM8876"
]

VEHICLE_TYPES = ["Car", "SUV", "Commercial Truck", "Motorcycle", "Bus", "Ambulance"]

VIOLATION_TYPES = [
    ("Overspeeding", 2000),
    ("Red Light Jump", 1000),
    ("Wrong-Way Driving", 5000),
    ("No Helmet / Triple Riding", 1000),
    ("Illegal Lane Change", 500)
]

class VisionEngine:
    @staticmethod
    def generate_live_frame_telemetry(camera_id: str = "CAM-01") -> Dict[str, Any]:
        """Generates real-time CV bounding box detections and telemetry metrics."""
        plate = random.choice(SAMPLE_PLATES)
        v_type = random.choice(VEHICLE_TYPES)
        speed = random.randint(35, 115)
        is_violation = speed > 70 or random.random() < 0.15
        
        violation_info = None
        if is_violation:
            v_name, fine = random.choice(VIOLATION_TYPES)
            if speed > 70:
                v_name = "Overspeeding"
                fine = 2000
            violation_info = {
                "type": v_name,
                "fine": fine,
                "severity": "CRITICAL" if v_name in ["Wrong-Way Driving", "Overspeeding"] else "WARNING"
            }

        return {
            "cameraId": camera_id,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "fps": round(random.uniform(58.5, 61.2), 1),
            "latencyMs": random.randint(11, 16),
            "detections": [
                {
                    "id": f"det_{random.randint(100, 999)}",
                    "type": v_type,
                    "confidence": round(random.uniform(0.92, 0.99), 2),
                    "bbox": [
                        random.randint(50, 200),
                        random.randint(80, 250),
                        random.randint(180, 300),
                        random.randint(120, 220)
                    ],
                    "plate": plate,
                    "plateConfidence": round(random.uniform(0.94, 0.99), 2),
                    "speed": f"{speed} km/h",
                    "violation": violation_info
                }
            ]
        }
