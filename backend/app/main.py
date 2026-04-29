from fastapi import FastAPI, WebSocket
from app.database import Base, engine
from app.routers import auth, doctor, patient, appointment
from app.websockets.manager import manager
from app.routers import file
from fastapi.responses import RedirectResponse
import app.models.user 
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return RedirectResponse(url="/docs")


# Routers
app.include_router(auth.router)
app.include_router(doctor.router)
app.include_router(patient.router)
app.include_router(appointment.router)
app.include_router(file.router)

# WebSocket 
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        manager.disconnect(websocket)


