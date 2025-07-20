from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from db import save_to_history, get_last_n
from transliterate import transliterate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Input(BaseModel):
    data: str

@app.post("/api")
def translit(req: Input):
    result = transliterate(req.data)
    save_to_history(result)
    return {"status": "success", "data": result}

@app.get("/history")
def get_history(n: int = 5):
    return {"data": get_last_n(n)}
