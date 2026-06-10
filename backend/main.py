from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.minicpm_chat import router as minicpm_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(minicpm_router)


@app.get("/")
async def root():
    return {
        "status": "Murzik backend running"
    }