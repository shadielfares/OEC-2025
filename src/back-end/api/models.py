from pydantic import BaseModel
from typing import Optional

class ReportData(BaseModel):
    latitude: float
    longitude: float
    disaster_name: str
    time: int