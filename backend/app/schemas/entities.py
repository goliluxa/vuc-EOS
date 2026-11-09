from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserLoginPayload(BaseModel):
    login: str
    password: str

class UserCreatePayload(BaseModel):
    login: str
    full_name: str
    role: str
    unit_or_department: str
    password: str

class UserOut(BaseModel):
    id: str
    login: str
    full_name: str
    role: str
    unit_or_department: str
    status: str

    class Config:
        from_attributes = True

class LessonOut(BaseModel):
    id: str
    number: int
    title: str
    description: str
    hours: int
    instructor: str
    status: str
    scheduled_date: Optional[str] = None

    class Config:
        from_attributes = True

class CourseCreate(BaseModel):
    code: str
    title: str
    department: str
    instructor: str
    description: str
    total_hours: int

class CourseOut(BaseModel):
    id: str
    code: str
    title: str
    department: str
    instructor: str
    total_hours: int
    completed_hours: int
    description: str
    lessons: List[LessonOut] = []

    class Config:
        from_attributes = True

class EventCreate(BaseModel):
    title: str
    type: str
    date: str
    time: str
    location: str
    uniform: str
    officer: str
    description: str

class EventOut(BaseModel):
    id: str
    title: str
    type: str
    date: str
    time: str
    location: str
    uniform: str
    officer: str
    description: str
    status: str

    class Config:
        from_attributes = True

