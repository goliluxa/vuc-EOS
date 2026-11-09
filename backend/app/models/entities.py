import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    login = Column(String(64), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(32), nullable=False, default="cadet")
    unit_or_department = Column(String(128), default="Группа 141")
    password = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(32), default="active")

class Course(Base):
    __tablename__ = "courses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    code = Column(String(32), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    department = Column(String(128), default="Военная подготовка")
    instructor = Column(String(128), nullable=False)
    total_hours = Column(Integer, default=72)
    completed_hours = Column(Integer, default=0)
    description = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    lessons = relationship("Lesson", back_populates="course", cascade="all, delete-orphan")

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    hours = Column(Integer, default=4)
    instructor = Column(String(128), default="")
    status = Column(String(32), default="published")
    scheduled_date = Column(String(32), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    course = relationship("Course", back_populates="lessons")

class Event(Base):
    __tablename__ = "events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    type = Column(String(64), nullable=False)
    date = Column(String(64), nullable=False)
    time = Column(String(64), nullable=False)
    location = Column(String(255), nullable=False)
    uniform = Column(String(255), default="Повседневная форма")
    officer = Column(String(128), default="")
    description = Column(Text, default="")
    status = Column(String(32), default="Утверждено")
    created_at = Column(DateTime, default=datetime.utcnow)

class Grade(Base):
    __tablename__ = "grades"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    cadet_id = Column(String(36), nullable=False)
    subject = Column(String(255), nullable=False)
    grade_val = Column(String(32), nullable=False)
    semester = Column(Integer, default=1)
    updated_at = Column(DateTime, default=datetime.utcnow)
