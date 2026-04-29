from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorCreate
from app.core.security import get_current_user

router = APIRouter(prefix="/doctors", tags=["Doctors"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE A DOCTOR
@router.post("/")
def create_doctor(data: DoctorCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    doctor = Doctor(name=data.name, specialization=data.specialization,  email=data.email)
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return doctor

# GET ALL DOCTORS WITH PAGINATION
@router.get("/")
def get_doctors(skip: int = 0, limit: int = 10, specialization: str = None,
                db: Session = Depends(get_db), user=Depends(get_current_user)):

    query = db.query(Doctor)

    if specialization:
        query = query.filter(Doctor.specialization == specialization)

    return query.offset(skip).limit(limit).all()

# UPDATING A DOCTOR
@router.put("/{doctor_id}")
def update_doctor(doctor_id: int, data: DoctorCreate,
                  db: Session = Depends(get_db), user=Depends(get_current_user)):

    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        return {"error": "Doctor not found"}

    doctor.name = data.name
    doctor.specialization = data.specialization
    doctor.email = data.email 

    db.commit()
    return doctor

# DELETING A DOCTOR
@router.delete("/{doctor_id}")
def delete_doctor(doctor_id: int,
                  db: Session = Depends(get_db), user=Depends(get_current_user)):

    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        return {"error": "Doctor not found"}

    db.delete(doctor)
    db.commit()

    return {"message": "Doctor deleted"}

# ACTIVATE / DEACTIVATE doctor
@router.patch("/{doctor_id}/toggle")
def toggle_doctor(doctor_id: int,
                  db: Session = Depends(get_db), user=Depends(get_current_user)):

    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        return {"error": "Doctor not found"}

    doctor.is_active = not doctor.is_active
    db.commit()

    return doctor