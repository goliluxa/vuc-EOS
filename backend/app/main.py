from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .api.storage import router as storage_router
from .api.entities import router as entities_router
from .seed import seed_initial_data

# Create DB tables
Base.metadata.create_all(bind=engine)

# Seed initial data
try:
    db = SessionLocal()
    seed_initial_data(db)
    db.close()
except Exception as e:
    print("Seed error:", e)

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
app.include_router(entities_router)

@app.get("/health")
def health():
    return {"status": "ok", "service": "vuc-eos-backend"}

