import os
import hashlib
import aiofiles
from fastapi import UploadFile

STORAGE_BASE_DIR = os.getenv("STORAGE_BASE_DIR", os.path.abspath("./storage_data"))

def ensure_storage_dirs():
    for sub in ["shared", "personal", "tmp"]:
        path = os.path.join(STORAGE_BASE_DIR, sub)
        os.makedirs(path, exist_ok=True)

def get_storage_path(space: str, filename: str, owner_id: str = None) -> str:
    ensure_storage_dirs()
    if space == "PERSONAL" and owner_id:
        user_dir = os.path.join(STORAGE_BASE_DIR, "personal", str(owner_id))
        os.makedirs(user_dir, exist_ok=True)
        return os.path.join(user_dir, filename)
    return os.path.join(STORAGE_BASE_DIR, "shared", filename)

async def save_uploaded_file(upload: UploadFile, dest_path: str):
    sha256 = hashlib.sha256()
    size = 0
    async with aiofiles.open(dest_path, "wb") as f:
        while chunk := await upload.read(1024 * 64):
            size += len(chunk)
            sha256.update(chunk)
            await f.write(chunk)
    return size, sha256.hexdigest()
