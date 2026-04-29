from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from app.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    patient_id = Column(Integer, ForeignKey("patients.id"))
    appointment_date = Column(DateTime)
    status = Column(String, default="Scheduled")
    notes = Column(String)        