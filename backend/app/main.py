from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api.storage import router as storage_router

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ИОС ВУЦ - API Хранилища и Сервисов",
    version="1.0.0",
    description="Полноценный бэкенд облачного хранилища и сервисов Военного учебного центра"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(storage_router)

@app.get("/health")
def health():
    return {"status": "ok", "service": "vuc-eos-backend"}

