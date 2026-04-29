import { useEffect, useState } from "react";
import { getDoctors } from "../services/api";

function Doctors({ token }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors(token).then(setDoctors);
  }, []);

  return (
    <div>
      <h2 style={styles.heading}>👨‍⚕️ Doctors</h2>

      <div style={styles.row}>
        {doctors.map((d) => (
          <div
            key={d.id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
            }}
          >
            <b>{d.name}</b>
            <div>🩺 {d.specialization}</div>
            <div>📧 {d.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;

const styles = {
  heading: {
    fontSize: "22px",
    marginBottom: "12px",
    fontWeight: "600",
  },

  row: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "10px",
  },

  card: {
    minWidth: "240px",
    padding: "18px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #ffffff, #f1f5f9)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    fontSize: "15px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};