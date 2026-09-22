import requests
from typing import Dict, Any, List, Optional
from config import WINDY_API_KEY, WINDY_API_BASE

class WindyWebcamService:
    @staticmethod
    def fetch_traffic_webcams(
        country: str = "IN",
        limit: int = 15,
        category: str = "traffic",
        api_key: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Fetches live traffic webcams from Windy Webcams API v3.
        Endpoint: https://api.windy.com/webcams/api/v3/webcams
        """
        key = api_key or WINDY_API_KEY
        
        headers = {
            "x-windy-api-key": key,
            "Accept": "application/json"
        }
        
        params = {
            "include": "images,player,location,urls,categories",
            "categories": category,
            "limit": limit
        }
        
        if country:
            params["countries"] = country

        try:
            response = requests.get(WINDY_API_BASE, headers=headers, params=params, timeout=10)
            if response.status_code == 200:
                data = response.json()
                webcams = data.get("webcams", [])
                
                # Format response for our traffic control center
                formatted = []
                for cam in webcams:
                    images = cam.get("images", {})
                    current_img = images.get("current", {})
                    player = cam.get("player", {})
                    location = cam.get("location", {})
                    
                    formatted.append({
                        "id": str(cam.get("id")),
                        "title": cam.get("title", "Traffic Camera"),
                        "status": cam.get("status", "active"),
                        "thumbnail": current_img.get("preview") or current_img.get("thumbnail"),
                        "fullImage": current_img.get("full"),
                        "livePlayerUrl": player.get("live") or player.get("day"),
                        "city": location.get("city", "Unknown City"),
                        "country": location.get("country", "India"),
                        "latitude": location.get("latitude"),
                        "longitude": location.get("longitude"),
                        "lastUpdated": cam.get("lastUpdatedOn")
                    })
                return {"status": "success", "count": len(formatted), "webcams": formatted}
            else:
                # If API key is invalid/expired or rate-limited, return fallback informative response
                return {
                    "status": "warning",
                    "code": response.status_code,
                    "message": f"Windy API returned code {response.status_code}. Using sample city cameras.",
                    "webcams": WindyWebcamService._get_fallback_webcams()
                }
        except Exception as e:
            return {
                "status": "error",
                "message": str(e),
                "webcams": WindyWebcamService._get_fallback_webcams()
            }

    @staticmethod
    def get_webcam_stream_or_image(webcam_id: str, api_key: Optional[str] = None) -> Optional[str]:
        """Fetches the latest live frame snapshot URL for a specific Windy webcam ID."""
        key = api_key or WINDY_API_KEY
        headers = {"x-windy-api-key": key}
        url = f"{WINDY_API_BASE}/{webcam_id}?include=images,player"
        
        try:
            resp = requests.get(url, headers=headers, timeout=8)
            if resp.status_code == 200:
                data = resp.json()
                images = data.get("images", {})
                return images.get("current", {}).get("full") or images.get("current", {}).get("preview")
        except Exception:
            pass
        return None

    @staticmethod
    def _get_fallback_webcams() -> List[Dict[str, Any]]:
        """Fallback realistic traffic camera feeds when testing without active API key."""
        return [
            {
                "id": "windy-traffic-01",
                "title": "Delhi-Gurugram Expressway km 18",
                "status": "active",
                "thumbnail": "https://images.unsplash.com/photo-1545178803-4056771d60a3?w=600&q=80",
                "fullImage": "https://images.unsplash.com/photo-1545178803-4056771d60a3?w=1200&q=80",
                "city": "Gurugram",
                "country": "India",
                "latitude": 28.4595,
                "longitude": 77.0266
            },
            {
                "id": "windy-traffic-02",
                "title": "Mumbai Western Express Highway",
                "status": "active",
                "thumbnail": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80",
                "fullImage": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80",
                "city": "Mumbai",
                "country": "India",
                "latitude": 19.0760,
                "longitude": 72.8777
            },
            {
                "id": "windy-traffic-03",
                "title": "Bengaluru Outer Ring Road Marathahalli",
                "status": "active",
                "thumbnail": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
                "fullImage": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
                "city": "Bengaluru",
                "country": "India",
                "latitude": 12.9592,
                "longitude": 77.6974
            }
        ]
