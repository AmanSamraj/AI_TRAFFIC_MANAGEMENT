from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from services.challan_service import ChallanService

router = APIRouter(prefix="/api/violations", tags=["Violations & E-Challan"])

class IssueChallanRequest(BaseModel):
    plate: str
    violationType: str
    speed: str
    location: str
    cameraId: str
    fineAmount: int

@router.get("", response_model=List[Dict[str, Any]])
def get_violations():
    return ChallanService.get_all_challans()

@router.post("/issue")
def issue_challan(req: IssueChallanRequest):
    return ChallanService.issue_challan(
        plate=req.plate,
        violation_type=req.violationType,
        speed=req.speed,
        location=req.location,
        camera_id=req.cameraId,
        fine_amount=req.fineAmount
    )

@router.patch("/{challan_id}/status")
def update_status(challan_id: str, status: str):
    success = ChallanService.update_challan_status(challan_id, status)
    if not success:
        raise HTTPException(status_code=404, detail="Challan not found")
    return {"status": "success", "challanId": challan_id, "newStatus": status}
