from pydantic import BaseModel
from datetime import datetime
from typing import  Optional
from enum import Enum

class StatusEnum(str, Enum):
    Scheduled = "Scheduled"
    Cancelled = "Cancelled"
    Completed = "Completed"

class AppointmentCreate(BaseModel):
    doctor_id: int
    patient_id: int
    appointment_date: datetime
    notes: Optional[str] = None 

class AppointmentResponse(BaseModel):
    id: int
    doctor_id: int
    patient_id: int
    appointment_date: datetime
    status: StatusEnum  
    notes: Optional[str]



    class Config:
        form_attributes = True