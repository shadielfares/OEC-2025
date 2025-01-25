from motor.motor_asyncio import AsyncIOMotorClient

#add to .env later
MONGO_URL = "mongodb+srv://ahmedzafar5645:OhlUIpIR92CeIPaw@cluster0.qfjtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = AsyncIOMotorClient(MONGO_URL)
db = client["AlertMe"]  # Replace with your database name