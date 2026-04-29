import { useState } from "react";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointment from "./pages/Appointment";

function App() {
  const [token, setToken] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);

  if (!token) return <Login setToken={setToken} />;

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 MedCare Hospital</h1>

        <div style={styles.actions}>
          <button
            style={styles.appBtn}
            onClick={() => setShowAppointment(!showAppointment)}
          >
            📅 Appointments
          </button>

          <button style={styles.logout} onClick={() => setToken(null)}>
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {!showAppointment ? (
          <>
            <Doctors token={token} />
            <Patients token={token} />
          </>
        ) : (
          <Appointment token={token} />
        )}
      </div>
    </div>
  );
}

export default App;

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe, #e0f2fe)",
    fontFamily: "'Poppins', sans-serif",
  },

  header: {
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    padding: "25px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "600",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  appBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  content: {
    padding: "20px",
  },
};