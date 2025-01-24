from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model for the request body
class DisasterData(BaseModel):
    latitude: float
    longitude: float
    disaster_name: str

# Create a POST endpoint
@app.post("/submit-disaster/")
async def submit_disaster(data: DisasterData):
    try:
        latitude = data.latitude
        longitude = data.longitude
        disaster_name = data.disaster_name

        print(f"Received - Latitude: {latitude}, Longitude: {longitude}, Disaster: {disaster_name}")


        return {
            "message": "Disaster data received successfully",
            "received_data": {
                "latitude": latitude,
                "longitude": longitude,
                "disaster_name": disaster_name,
            },
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))