from sqlalchemy import Column, Integer, String
from app.database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone = Column(String)
    blood_group = Column(String)
    gender = Column(String)   
    email = Column(String)  