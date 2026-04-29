from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import Login
from app.core.security import create_access_token

router = APIRouter()

# DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# REGISTER
@router.post("/register")
def register(data: Login, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == data.username).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(username=data.username, password=data.password)
    db.add(user)
    db.commit()

    return {"message": "User created successfully"}


# LOGIN
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()

    if not user or user.password != form_data.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}