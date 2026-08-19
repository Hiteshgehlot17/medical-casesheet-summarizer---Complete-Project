from fastapi import APIRouter, UploadFile, File

from backend.app.services.document_service import save_uploaded_file

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    return save_uploaded_file(file)