from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from .database import db
from .models import ReportData, Categories


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #Adjust this to restrict origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Submit a new report
@app.post("/submit")
async def submit_disaster(data: ReportData):
    try:
        print("Parsed data:", data)
        latitude = data.latitude
        longitude = data.longitude
        disaster_name = data.disaster_name
        time = data.time

        categoryDoc = db.categories.find_one({"name" : "only"})
        print("help", categoryDoc)
        if (disaster_name not in categoryDoc.data):
            pass
        else:
            arr = categoryDoc.data
            arr.append("disaster_name")
            newSize = categoryDoc.size
            newSize += 1
            db.categories.update_one({"name": "only"},
                                     {"data": arr,
                                      "size": newSize})
        
        report = {
            "latitude": latitude,
            "longitude": longitude,
            "disaster_name": disaster_name,
            "time": time
        }
        print("Data to insert:", report)
        await db.reports.insert_one(report)

        return {"status": "ok"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/all")
async def get_all():
    try:
        reports = db.reports.find()
        results = await reports.to_list(length=None)
        return results

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/categories")
async def get_categories():
    try:
        categories = db.categories.find()
        results = await categories.to_list(length=None)
        return results

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    