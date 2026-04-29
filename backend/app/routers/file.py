from fastapi import APIRouter, UploadFile, File, Depends, BackgroundTasks
import shutil
import os
from app.core.security import get_current_user
from app.utils.logger import logger

router = APIRouter(prefix="/files", tags=["Files"])

UPLOAD_FOLDER = "uploads"

# ensure folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# background task function
def log_upload(filename: str):
    logger.info(f"File uploaded: {filename}")

# upload file
@router.post("/upload")
def upload_file(background_tasks: BackgroundTasks,
                file: UploadFile = File(...),
                user=Depends(get_current_user)):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # background logging
    background_tasks.add_task(log_upload, file.filename)

    return {"message": "File uploaded", "filename": file.filename}


# get file (view/download)
@router.get("/{filename}")
def get_file(filename: str, user=Depends(get_current_user)):

    file_path = f"{UPLOAD_FOLDER}/{filename}"

    if not os.path.exists(file_path):
        return {"error": "File not found"}

    return {"file_path": file_path}