from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import ReportData


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #Adjust this to restrict origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Create a POST endpoint
@app.post("/submit-disaster/")
async def submit_disaster(data: ReportData):
    try:
        latitude = data.latitude
        longitude = data.longitude
        disaster_name = data.disaster_name
        time = data.time
        return {
            {
                "latitude": latitude,
                "longitude": longitude,
                "disaster_name": disaster_name,
                "time": time
            }
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))