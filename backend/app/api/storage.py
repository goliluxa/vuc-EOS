import os
import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import StorageFolder, StorageFile
from ..schemas import storage as schemas
from ..services.storage_disk import get_storage_path, save_uploaded_file

router = APIRouter(prefix="/api/storage", tags=["Storage"])

@router.get("/content", response_model=schemas.StorageContentResponse)
def get_storage_content(
    parent_id: Optional[str] = Query(None),
    space: str = Query("SHARED"),
    owner_id: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    q_folders = db.query(StorageFolder).filter(
        StorageFolder.is_deleted == False,
        StorageFolder.parent_id == parent_id
    )
    q_files = db.query(StorageFile).filter(
        StorageFile.is_deleted == False,
        StorageFile.folder_id == parent_id
    )

    if space == "PERSONAL" and owner_id:
        q_folders = q_folders.filter(StorageFolder.owner_id == owner_id)
        q_files = q_files.filter(StorageFile.owner_id == owner_id)
    else:
        q_folders = q_folders.filter(StorageFolder.space == "SHARED")
        q_files = q_files.filter(StorageFile.space == "SHARED")

    return schemas.StorageContentResponse(
        current_folder_id=parent_id,
        folders=q_folders.order_by(StorageFolder.name.asc()).all(),
        files=q_files.order_by(StorageFile.original_name.asc()).all()
    )

@router.post("/folders", response_model=schemas.FolderOut)
def create_folder(payload: schemas.FolderCreate, db: Session = Depends(get_db)):
    folder = StorageFolder(
        name=payload.name.strip(),
        parent_id=payload.parent_id,
        space=payload.space or "SHARED",
        owner_id=payload.owner_id
    )
    db.add(folder)
    db.commit()
    db.refresh(folder)
    return folder

@router.patch("/folders/{folder_id}", response_model=schemas.FolderOut)
def update_folder(folder_id: str, payload: schemas.FolderUpdate, db: Session = Depends(get_db)):
    folder = db.query(StorageFolder).filter(StorageFolder.id == folder_id, StorageFolder.is_deleted == False).first()
    if not folder:
        raise HTTPException(status_code=404, detail="Папка не найдена")
    if payload.name:
        folder.name = payload.name.strip()
    if payload.parent_id is not None:
        folder.parent_id = payload.parent_id
    db.commit()
    db.refresh(folder)
    return folder

@router.delete("/folders/{folder_id}")
def delete_folder(folder_id: str, db: Session = Depends(get_db)):
    folder = db.query(StorageFolder).filter(StorageFolder.id == folder_id).first()
    if not folder:
        raise HTTPException(status_code=404, detail="Папка не найдена")
    folder.is_deleted = True
    db.commit()
    return {"status": "ok", "deleted_folder_id": folder_id}

@router.post("/upload", response_model=schemas.FileOut)
async def upload_file(
    file: UploadFile = File(...),
    folder_id: Optional[str] = Form(None),
    space: str = Form("SHARED"),
    owner_id: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    stored_uuid_name = f"{uuid.uuid4().hex}_{file.filename}"
    dest_path = get_storage_path(space, stored_uuid_name, owner_id)
    size, sha256_hash = await save_uploaded_file(file, dest_path)

    ext = os.path.splitext(file.filename)[1].lstrip('.').upper()
    storage_file = StorageFile(
        original_name=file.filename,
        stored_filename=stored_uuid_name,
        space=space,
        owner_id=owner_id,
        folder_id=folder_id if folder_id else None,
        mime_type=file.content_type or "application/octet-stream",
        extension=ext,
        file_size=size,
        sha256_hash=sha256_hash
    )
    db.add(storage_file)
    db.commit()
    db.refresh(storage_file)
    return storage_file

@router.get("/files/{file_id}/download")
def download_file(file_id: str, db: Session = Depends(get_db)):
    storage_file = db.query(StorageFile).filter(StorageFile.id == file_id, StorageFile.is_deleted == False).first()
    if not storage_file:
        raise HTTPException(status_code=404, detail="Файл не найден")
    path = get_storage_path(storage_file.space, storage_file.stored_filename, storage_file.owner_id)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Физический файл отсутствует на сервере")
    return FileResponse(
        path,
        media_type=storage_file.mime_type,
        filename=storage_file.original_name
    )

@router.delete("/files/{file_id}")
def delete_file(file_id: str, db: Session = Depends(get_db)):
    storage_file = db.query(StorageFile).filter(StorageFile.id == file_id).first()
    if not storage_file:
        raise HTTPException(status_code=404, detail="Файл не найден")
    storage_file.is_deleted = True
    db.commit()
    return {"status": "ok", "deleted_file_id": file_id}

