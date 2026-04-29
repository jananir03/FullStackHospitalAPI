from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.patient import Patient
from app.schemas.patient import PatientCreate
from app.core.security import get_current_user

router = APIRouter(prefix="/patients", tags=["Patients"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE A PATIENT
@router.post("/")
def create_patient(data: PatientCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    patient = Patient(name=data.name, phone=data.phone, blood_group=data.blood_group, gender=data.gender,    
    email=data.email)
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient

# GET PATIENTS WITH SEARCH
@router.get("/")
def get_patients(skip: int = 0, limit: int = 10, search: str = None,
                 db: Session = Depends(get_db), user=Depends(get_current_user)):

    query = db.query(Patient)

    if search:
        query = query.filter(
            (Patient.name.contains(search)) |
            (Patient.phone.contains(search))
        )

    return query.offset(skip).limit(limit).all()

# UPDATE A PATIENT
@router.put("/{patient_id}")
def update_patient(patient_id: int, data: PatientCreate,
                   db: Session = Depends(get_db), user=Depends(get_current_user)):

    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if not patient:
        return {"error": "Patient not found"}

    patient.name = data.name
    patient.phone = data.phone
    patient.blood_group = data.blood_group 
    patient.gender = data.gender      
    patient.email = data.email  

    db.commit()
    return patient

# DELETE A PATIENT
@router.delete("/{patient_id}")
def delete_patient(patient_id: int,
                   db: Session = Depends(get_db), user=Depends(get_current_user)):

    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if not patient:
        return {"error": "Patient not found"}

    db.delete(patient)
    db.commit()

    return {"message": "Patient got deleted"}