from pydantic import BaseModel
from typing import Optional, List, Dict
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

class ReportData(BaseModel):
    latitude: float
    longitude: float
    disaster_name: str
    time: int

class Categories(BaseModel):
    size: int
    data: List[str]
    name: str
