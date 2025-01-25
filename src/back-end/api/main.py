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

#Submit a new report
@app.post("/submit")
async def submit_disaster(data: ReportData):
    try:
        latitude = data.latitude
        longitude = data.longitude
        disaster_name = data.disaster_name
        time = data.time
        #check if category exists in mongo if not, fix that
        #else, continue
        #add to mongo db
        return {
            {
               "status": "ok"
            }
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/all")
async def get_all():
    try:
        #get all documents from mongodb
        #get take out types document

        #return the results
        print("change this")

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/categories")
async def get_categories():
    try:
        #find document with specific id for the categories in mongo
        # return that document
        #size +=1 
        print("change this")

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))