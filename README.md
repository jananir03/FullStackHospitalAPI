# 🏥 MedCare Hospital Management System

A full-stack web application built using **FastAPI (Backend)** and **React (Frontend)** to manage Doctors, Patients, and Appointments with secure authentication.

---

##  Features

###  Authentication

* JWT-based login system
* Protected APIs (except login)
* Secure token handling

###  Doctor Management

* CRUD Operations
* Filter by specialization
* Activate/Deactivate doctor

###  Patient Management

* CRUD Operations
* Includes gender, email, phone details

###  Appointment Management

* Book appointments
* View all appointments
* Status tracking:

  * Scheduled
  * Cancelled
  * Completed
* Notes support

###  WebSockets

* Real-time notifications (optional enhancement)

###  File Upload

* Upload files (reports, documents)

###  Frontend UI

* Dashboard Layout
* Horizontal scrolling cards for doctors & patients
* Appointment panel with tab view (Book / View)

---

## 🛠️ Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* JWT Authentication
* WebSockets

### Frontend

* React.js
* Fetch API
* CSS (custom styling)

---

##  Installation & Setup

###  Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

###  Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

##  Authentication Flow

1. Login using:

```json
{
  "username": "admin",
  "password": "admin"
}
```

2. Receive JWT token

3. Token is used in headers:

```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### Auth

* POST `/login`

### Doctors

* GET `/doctors`
* POST `/doctors`
* PUT `/doctors/{id}`
* DELETE `/doctors/{id}`

### Patients

* GET `/patients`
* POST `/patients`
* PUT `/patients/{id}`
* DELETE `/patients/{id}`

### Appointments

* POST `/appointments`
* GET `/appointments`
* PATCH `/appointments/{id}/cancel`

---

##  Key Highlights

* Clean separation of backend and frontend
* Secure authentication using JWT
* Scalable project structure
* Real-world CRUD operations

---

## 📌 Notes

* Ensure backend is running before frontend
* Use Swagger for testing APIs
* If DB issues occur, delete `test.db` and restart

---
