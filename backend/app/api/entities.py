from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import User, Course, Lesson, Event
from ..schemas import entities as schemas

router = APIRouter(prefix="/api", tags=["Core"])

@router.post("/auth/login")
def login(payload: schemas.UserLoginPayload, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.login == payload.login.strip().toLowerCase() if hasattr(str, 'toLowerCase') else User.login == payload.login.strip().lower()).first()
    if not user or user.password != payload.password.strip():
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")
    return {
        "success": True,
        "user": {
            "id": user.id,
            "login": user.login,
            "fullName": user.full_name,
            "role": user.role,
            "unitOrDepartment": user.unit_or_department,
        }
    }

@router.get("/users", response_model=List[schemas.UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).filter(User.role != "admin").all()

@router.post("/users", response_model=schemas.UserOut)
def create_user(payload: schemas.UserCreatePayload, db: Session = Depends(get_db)):
    clean_login = payload.login.strip().lower()
    existing = db.query(User).filter(User.login == clean_login).first()
    if existing:
        raise HTTPException(status_code=400, detail="Пользователь с таким логином уже существует")
    new_u = User(
        login=clean_login,
        full_name=payload.full_name.strip(),
        role=payload.role,
        unit_or_department=payload.unit_or_department.strip(),
        password=payload.password.strip()
    )
    db.add(new_u)
    db.commit()
    db.refresh(new_u)
    return new_u

@router.get("/courses", response_model=List[schemas.CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

@router.post("/courses", response_model=schemas.CourseOut)
def create_course(payload: schemas.CourseCreate, db: Session = Depends(get_db)):
    clean_code = payload.code.strip().upper()
    existing = db.query(Course).filter(Course.code == clean_code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Курс с таким шифром уже существует")
    c = Course(
        code=clean_code,
        title=payload.title.strip(),
        department=payload.department.strip(),
        instructor=payload.instructor.strip(),
        description=payload.description.strip(),
        total_hours=payload.total_hours
    )
    db.add(c)
    db.commit()
    db.refresh(c)
    return c

@router.get("/events", response_model=List[schemas.EventOut])
def list_events(db: Session = Depends(get_db)):
    return db.query(Event).all()

@router.post("/events", response_model=schemas.EventOut)
def create_event(payload: schemas.EventCreate, db: Session = Depends(get_db)):
    ev = Event(
        title=payload.title.strip(),
        type=payload.type,
        date=payload.date,
        time=payload.time,
        location=payload.location,
        uniform=payload.uniform,
        officer=payload.officer,
        description=payload.description
    )
    db.add(ev)
    db.commit()
    db.refresh(ev)
    return ev

