from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate
from app.core.security import get_current_user
from app.websockets.manager import manager

router = APIRouter(prefix="/appointments", tags=["Appointments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE APPOINTMENT
@router.post("/")
async def create_appointment(data: AppointmentCreate,
                             db: Session = Depends(get_db),
                             _ =Depends(get_current_user)):

    appointment = Appointment(
        doctor_id=data.doctor_id,
        patient_id=data.patient_id,
        appointment_date=data.appointment_date,
        status="Scheduled",
        notes=data.notes
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    # NOTIFICATION
    await manager.send_message(f"New appointment booked for doctor id {data.doctor_id}")

    return appointment

# GET ALL APPOINTMENTS
@router.get("/")
def get_appointments(skip: int = 0, limit: int = 10,
                     db: Session = Depends(get_db),
                     _ =Depends(get_current_user)):

    return db.query(Appointment).offset(skip).limit(limit).all()

# FILTER APPOINTMENTS BY DOCTOR OR PATIENT
@router.get("/filter")
def filter_appointments(doctor_id: int = None, patient_id: int = None,
                        db: Session = Depends(get_db),
                        _ =Depends(get_current_user)):

    query = db.query(Appointment)

    if doctor_id:
        query = query.filter(Appointment.doctor_id == doctor_id)

    if patient_id:
        query = query.filter(Appointment.patient_id == patient_id)

    return query.all()

# CANCEL APPOINTMENT
@router.patch("/{appointment_id}/cancel")
def cancel_appointment(appointment_id: int,
                       db: Session = Depends(get_db),
                       _ =Depends(get_current_user)):

    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    appointment.status = "Cancelled"
    db.commit()

    return {"message": "Appointment cancelled"}

# COMPLETE APPOINTMENT
@router.patch("/{appointment_id}/complete")
def complete_appointment(appointment_id: int,
                         db: Session = Depends(get_db),
                         _ =Depends(get_current_user)):

    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()

    if not appointment:
        return {"error": "Appointment not found"}

    appointment.status = "Completed"
    db.commit()

    return {"message": "Appointment completed"}