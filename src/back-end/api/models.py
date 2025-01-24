from pydantic import BaseModel
from typing import Optional, List, Dict

class ReportData(BaseModel):
    latitude: float
    longitude: float
    disaster_name: str
    time: int

class Categories(BaseModel):
    size: int
    data: List[Dict[str, str]]
