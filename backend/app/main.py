from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routes.upload import router as upload_router

app = FastAPI(
    title="Medical Case Sheet Summarizer API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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