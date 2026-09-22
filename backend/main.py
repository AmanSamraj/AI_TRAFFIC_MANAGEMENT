import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from services.websocket_manager import manager
from services.vision_engine import VisionEngine
from routers import cameras, anpr, violations, vehicles, tracking, analytics, alerts, streams

app = FastAPI(
    title="AI Traffic Management & Command Center API",
    description="Backend microservice for computer vision telemetry, Windy Webcams v3, Vahan 4.0 registry, and statutory e-challan processing.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API subrouters
app.include_router(cameras.router)
app.include_router(streams.router)
app.include_router(anpr.router)
app.include_router(violations.router)
app.include_router(vehicles.router)
app.include_router(tracking.router)
app.include_router(analytics.router)
app.include_router(alerts.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "AI Traffic Management & Command Center",
        "version": "1.0.0",
        "aiEngine": "YOLOv8 + OpenCV ANPR Active (60 FPS)",
        "windyApi": "Integrated (v3)",
        "docs": "/docs"
    }

@app.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Generate real-time CV detection frame
            telemetry_data = VisionEngine.process_frame(frame=None, camera_id="CAM-01")
            await websocket.send_json(telemetry_data)
            await asyncio.sleep(1.0)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
