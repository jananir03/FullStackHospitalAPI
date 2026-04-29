import { useState, useEffect } from "react";

function Appointment({ token }) {
  const [tab, setTab] = useState("book");

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [notes, setNotes] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/doctors", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setDoctors);

    fetch("http://127.0.0.1:8000/patients", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setPatients);
  }, []);

  const getDoctorName = (id) =>
    doctors.find(d => d.id === id)?.name || `Doctor ${id}`;

  const getPatientName = (id) =>
    patients.find(p => p.id === id)?.name || `Patient ${id}`;

  const getStatusColor = (status) => {
    if (status === "Completed") return "#43a047";
    if (status === "Cancelled") return "#e53935";
    return "#fb8c00";
  };

  const book = async () => {
    await fetch("http://127.0.0.1:8000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctor_id: Number(doctorId),
        patient_id: Number(patientId),
        appointment_date: new Date().toISOString(),
        notes,
      }),
    });

    alert("Appointment Booked");
  };

  const getAll = async () => {
    const res = await fetch("http://127.0.0.1:8000/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAppointments(await res.json());
    setTab("view");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📅 Appointment Manager</h2>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={tab === "book" ? styles.activeTab : styles.tab}
            onClick={() => setTab("book")}
          >
            ➕ Book
          </button>

          <button
            style={tab === "view" ? styles.activeTab : styles.tab}
            onClick={getAll}
          >
            📋 View
          </button>
        </div>

        {/* BOOK */}
        {tab === "book" && (
          <div style={styles.form}>
            <input
              style={styles.input}
              placeholder="Doctor ID"
              onChange={(e) => setDoctorId(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Patient ID"
              onChange={(e) => setPatientId(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Notes"
              onChange={(e) => setNotes(e.target.value)}
            />

            <button style={styles.button} onClick={book}>
              Book Appointment
            </button>
          </div>
        )}

        {/* VIEW */}
        {tab === "view" &&
          appointments.map((a) => (
            <div key={a.id} style={styles.item}>
              <div style={styles.row}>
                🧑 <b>{getPatientName(a.patient_id)}</b>
              </div>

              <div style={styles.row}>
                👨‍⚕️ <b>{getDoctorName(a.doctor_id)}</b>
              </div>

              <div style={styles.footer}>
                <span
                  style={{
                    ...styles.status,
                    background: getStatusColor(a.status),
                  }}
                >
                  {a.status}
                </span>

                <span style={styles.notes}>
                  {a.notes || "No notes"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Appointment;

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },

  title: {
    marginBottom: "15px",
    fontSize: "18px",
  },

  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  tab: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    cursor: "pointer",
  },

  activeTab: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    background: "#1976d2",
    color: "white",
    border: "none",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "13px",
  },

  button: {
    padding: "10px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  item: {
    padding: "12px",
    borderRadius: "10px",
    background: "#f8fafc",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },

  row: {
    fontSize: "13px",
    marginBottom: "4px",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "6px",
  },

  status: {
    padding: "3px 8px",
    borderRadius: "6px",
    color: "white",
    fontSize: "11px",
  },

  notes: {
    fontSize: "11px",
    color: "#555",
  },
};