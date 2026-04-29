import { useEffect, useState } from "react";
import { getPatients } from "../services/api";

function Patients({ token }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients(token).then(setPatients);
  }, []);

  return (
    <div style={{ marginTop: "25px" }}>
      <h2 style={styles.heading}>🧑 Patients</h2>

      <div style={styles.row}>
        {patients.map((p) => (
          <div
            key={p.id}
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
            <b>{p.name}</b>
            <div>📞 {p.phone}</div>
            <div>⚧ {p.gender}</div>
            <div>📧 {p.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patients;

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
  },

  card: {
    minWidth: "240px",
    padding: "18px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #ffffff, #ecfdf5)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    fontSize: "15px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};