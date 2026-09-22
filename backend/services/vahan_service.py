from typing import Optional, Dict, Any, List

VAHAN_DATABASE: Dict[str, Dict[str, Any]] = {
    "DL01AB1234": {
        "plate": "DL01AB1234",
        "ownerName": "Rajesh Kumar Sharma",
        "vehicleClass": "Motor Car (LMV)",
        "makeModel": "Hyundai Creta SX 1.5",
        "fuelType": "Petrol",
        "emissionNorms": "BS-VI",
        "registrationDate": "2022-03-15",
        "fitnessValidUpto": "2037-03-14",
        "insuranceValidUpto": "2027-03-10",
        "insuranceCompany": "HDFC ERGO General Insurance",
        "puccValidUpto": "2026-11-20",
        "registeredRTO": "DL-01 (Mall Road, Delhi)",
        "status": "Active",
        "blacklisted": False,
        "challanCount": 2,
        "totalFinePending": 3000
    },
    "MH02CZ9876": {
        "plate": "MH02CZ9876",
        "ownerName": "Vikramaditya Rao",
        "vehicleClass": "Light Goods Vehicle",
        "makeModel": "Tata Ace Gold",
        "fuelType": "Diesel",
        "emissionNorms": "BS-VI",
        "registrationDate": "2021-08-22",
        "fitnessValidUpto": "2026-08-21",
        "insuranceValidUpto": "2026-05-18",
        "insuranceCompany": "ICICI Lombard",
        "puccValidUpto": "2026-07-15",
        "registeredRTO": "MH-02 (Andheri, Mumbai)",
        "status": "Active",
        "blacklisted": True,
        "blacklistReason": "Unpaid statutory speed violation warrants (x3)",
        "challanCount": 4,
        "totalFinePending": 8500
    },
    "KA03MM4567": {
        "plate": "KA03MM4567",
        "ownerName": "Ananya Sundaram",
        "vehicleClass": "Two Wheeler (MCWG)",
        "makeModel": "Royal Enfield Classic 350",
        "fuelType": "Petrol",
        "emissionNorms": "BS-VI",
        "registrationDate": "2023-01-10",
        "fitnessValidUpto": "2038-01-09",
        "insuranceValidUpto": "2028-01-05",
        "insuranceCompany": "Bajaj Allianz",
        "puccValidUpto": "2026-12-01",
        "registeredRTO": "KA-03 (Indiranagar, Bengaluru)",
        "status": "Active",
        "blacklisted": False,
        "challanCount": 0,
        "totalFinePending": 0
    },
    "HR26DQ5544": {
        "plate": "HR26DQ5544",
        "ownerName": "Sunil Grover",
        "vehicleClass": "Motor Car (LMV)",
        "makeModel": "Toyota Fortuner 4x4",
        "fuelType": "Diesel",
        "emissionNorms": "BS-VI",
        "registrationDate": "2020-11-05",
        "fitnessValidUpto": "2035-11-04",
        "insuranceValidUpto": "2026-10-30",
        "insuranceCompany": "Tata AIG",
        "puccValidUpto": "2026-04-10",
        "registeredRTO": "HR-26 (Gurugram, Haryana)",
        "status": "Active",
        "blacklisted": False,
        "challanCount": 1,
        "totalFinePending": 1500
    },
    "WB02AK7788": {
        "plate": "WB02AK7788",
        "ownerName": "Debashis Banerjee",
        "vehicleClass": "Heavy Goods Vehicle",
        "makeModel": "Ashok Leyland 2820",
        "fuelType": "Diesel",
        "emissionNorms": "BS-VI",
        "registrationDate": "2019-06-18",
        "fitnessValidUpto": "2026-06-17",
        "insuranceValidUpto": "2026-06-10",
        "insuranceCompany": "New India Assurance",
        "puccValidUpto": "2026-05-01",
        "registeredRTO": "WB-02 (Beltala, Kolkata)",
        "status": "Active",
        "blacklisted": True,
        "blacklistReason": "Overloading & Route Violation",
        "challanCount": 5,
        "totalFinePending": 22000
    }
}

class VahanService:
    @staticmethod
    def get_vehicle_by_plate(plate: str) -> Optional[Dict[str, Any]]:
        clean_plate = plate.upper().replace(" ", "").replace("-", "")
        for key, record in VAHAN_DATABASE.items():
            if key.replace(" ", "").replace("-", "") == clean_plate:
                return record
        
        # If not found in static, generate synthetic compliant Vahan record
        return {
            "plate": clean_plate,
            "ownerName": "Registered Citizen (State Database)",
            "vehicleClass": "Passenger Vehicle (LMV)",
            "makeModel": "Standard Registered Vehicle",
            "fuelType": "Petrol / Hybrid",
            "emissionNorms": "BS-VI",
            "registrationDate": "2021-05-10",
            "fitnessValidUpto": "2036-05-09",
            "insuranceValidUpto": "2027-05-01",
            "insuranceCompany": "National Insurance Co. Ltd.",
            "puccValidUpto": "2026-10-15",
            "registeredRTO": f"{clean_plate[:2]}-01 Transport Authority",
            "status": "Active",
            "blacklisted": False,
            "challanCount": 0,
            "totalFinePending": 0
        }

    @staticmethod
    def list_all_vehicles() -> List[Dict[str, Any]]:
        return list(VAHAN_DATABASE.values())
