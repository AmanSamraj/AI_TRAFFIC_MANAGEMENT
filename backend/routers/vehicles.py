from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any, Optional
from services.vahan_service import VahanService

router = APIRouter(prefix="/api/vehicles", tags=["Vehicles & Vahan 4.0"])

@router.get("", response_model=List[Dict[str, Any]])
def list_vehicles():
    return VahanService.list_all_vehicles()

@router.get("/{plate}")
def get_vehicle_dossier(plate: str):
    record = VahanService.get_vehicle_by_plate(plate)
    if not record:
        raise HTTPException(status_code=404, detail="Vehicle record not found")
    return record
