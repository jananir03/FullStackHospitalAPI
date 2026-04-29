from pydantic import BaseModel, EmailStr
from typing import Literal

class PatientCreate(BaseModel):
    name: str
    phone: str
    blood_group: str
    gender: Literal["Male", "Female", "Others"] 
    email: EmailStr 

class PatientResponse(BaseModel):
    id: int
    name: str
    phone: str
    blood_group: str
    gender: Literal["Male", "Female", "Others"] 
    email: EmailStr 

    class Config:
        from_attributes = True