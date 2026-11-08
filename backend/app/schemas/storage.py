from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class FolderCreate(BaseModel):
    name: str
    parent_id: Optional[str] = None
    space: Optional[str] = "SHARED"
    owner_id: Optional[str] = None

class FolderUpdate(BaseModel):
    name: Optional[str] = None
    parent_id: Optional[str] = None

class FolderOut(BaseModel):
    id: str
    name: str
    space: str
    owner_id: Optional[str]
    parent_id: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class FileOut(BaseModel):
    id: str
    original_name: str
    space: str
    owner_id: Optional[str]
    folder_id: Optional[str]
    mime_type: str
    extension: str
    file_size: int
    created_at: datetime

    class Config:
        from_attributes = True

class StorageContentResponse(BaseModel):
    current_folder_id: Optional[str]
    folders: List[FolderOut]
    files: List[FileOut]

