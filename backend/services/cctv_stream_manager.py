import cv2
import time
import threading
import numpy as np
import requests
from typing import Dict, Any, Optional
from services.windy_service import WindyWebcamService

class CCTVStreamManager:
    """
    Unified Ingestion Manager supporting:
    - RTSP Streams (Hikvision, Dahua, CP Plus, Axis, Hanwha)
    - HTTP / MJPEG Feeds
    - Windy Webcam API snapshots
    - Local Webcams (index 0, 1, 2)
    - Local Video files (.mp4, .avi)
    """
    _instances: Dict[str, "CCTVStreamManager"] = {}

    def __init__(self, camera_id: str, stream_type: str, source: str):
        self.camera_id = camera_id
        self.stream_type = stream_type  # "rtsp", "windy", "webcam", "file", "http"
        self.source = source
        self.cap: Optional[cv2.VideoCapture] = None
        self.latest_frame: Optional[np.ndarray] = None
        self.is_running = False
        self.lock = threading.Lock()
        self.thread: Optional[threading.Thread] = None
        self.fps = 0.0
        self.last_frame_time = time.time()

    @classmethod
    def get_or_create(cls, camera_id: str, stream_type: str = "simulation", source: str = "0") -> "CCTVStreamManager":
        if camera_id not in cls._instances:
            manager = cls(camera_id, stream_type, source)
            cls._instances[camera_id] = manager
            manager.start()
        return cls._instances[camera_id]

    def start(self):
        if not self.is_running:
            self.is_running = True
            self.thread = threading.Thread(target=self._capture_loop, daemon=True)
            self.thread.start()

    def stop(self):
        self.is_running = False
        if self.cap:
            self.cap.release()

    def get_frame(self) -> Optional[np.ndarray]:
        with self.lock:
            if self.latest_frame is not None:
                return self.latest_frame.copy()
        return None

    def _capture_loop(self):
        if self.stream_type == "windy":
            self._windy_poll_loop()
            return

        # RTSP / Local Webcam / Video File
        src = int(self.source) if self.source.isdigit() else self.source
        
        while self.is_running:
            try:
                self.cap = cv2.VideoCapture(src)
                
                # Low buffer size for zero-latency RTSP streaming
                self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

                while self.is_running and self.cap.isOpened():
                    ret, frame = self.cap.read()
                    if not ret:
                        time.sleep(0.5)
                        break

                    now = time.time()
                    dt = now - self.last_frame_time
                    if dt > 0:
                        self.fps = 1.0 / dt
                    self.last_frame_time = now

                    with self.lock:
                        self.latest_frame = frame

                    time.sleep(0.01) # Yield to prevent CPU thrashing
            except Exception as e:
                print(f"[CCTV Error] Camera {self.camera_id}: {e}")
                time.sleep(2)
            finally:
                if self.cap:
                    self.cap.release()

    def _windy_poll_loop(self):
        """Polls Windy Webcam Snapshot every 3 seconds"""
        while self.is_running:
            try:
                image_url = WindyWebcamService.get_webcam_stream_or_image(self.source)
                if not image_url:
                    # Fallback to demo traffic image
                    image_url = "https://images.unsplash.com/photo-1545178803-4056771d60a3?w=800&q=80"

                resp = requests.get(image_url, timeout=5)
                if resp.status_code == 200:
                    image_array = np.asarray(bytearray(resp.content), dtype=np.uint8)
                    frame = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
                    with self.lock:
                        self.latest_frame = frame
            except Exception as e:
                print(f"[Windy Stream Poll Error] {e}")
            time.sleep(3.0)
