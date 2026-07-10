from fastapi import FastAPI
from app.routes.upload import router as upload_router

app = FastAPI(
    title="Medical Case Sheet Summarizer API",
    version="1.0.0"
)

app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Medical Case Sheet Summarizer API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }