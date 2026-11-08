import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, BigInteger
from sqlalchemy.orm import relationship
from ..database import Base

class StorageFolder(Base):
    __tablename__ = "storage_folders"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    space = Column(String(32), nullable=False, default="SHARED")  # SHARED, PERSONAL, DEPARTMENT
    owner_id = Column(String(64), nullable=True)
    parent_id = Column(String(36), ForeignKey("storage_folders.id", ondelete="CASCADE"), nullable=True)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    parent = relationship("StorageFolder", remote_side=[id], backref="subfolders")
    files = relationship("StorageFile", back_populates="folder", cascade="all, delete-orphan")

class StorageFile(Base):
    __tablename__ = "storage_files"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    original_name = Column(String(255), nullable=False)
    stored_filename = Column(String(255), nullable=False)
    space = Column(String(32), nullable=False, default="SHARED")
    owner_id = Column(String(64), nullable=True)
    folder_id = Column(String(36), ForeignKey("storage_folders.id", ondelete="SET NULL"), nullable=True)
    mime_type = Column(String(128), default="application/octet-stream")
    extension = Column(String(32), default="")
    file_size = Column(BigInteger, default=0)
    sha256_hash = Column(String(64), nullable=True)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    folder = relationship("StorageFolder", back_populates="files")

