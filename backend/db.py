from datetime import datetime, timezone

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["translit_db"]
collection = db.history

def save_to_history(translit_text: str):
    collection.insert_one({
        "text": translit_text,
        "timestamp": datetime.now(timezone.utc)
    })

def get_last_n(n: int):
    cursor = collection.find().sort("timestamp", -1).limit(n)
    return [doc["text"] for doc in cursor]
