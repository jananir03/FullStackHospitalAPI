import { useState } from "react";
import { login } from "../services/api";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(username, password);

      if (res.access_token) {
        setToken(res.access_token);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Backend not running or network error");
    }
  };

  return (
    <div style={styles.page}>
      
      {/* Background */}
      <div style={styles.overlay}></div>

      {/* Card */}
      <div style={styles.card}>
        
        <h1 style={styles.title}>🏥 MedCare Hospital</h1>
        <p style={styles.subtitle}>Patient Management System</p>

        <h2 style={styles.loginTitle}>🔐 Login</h2>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #3498db, #6dd5fa)",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.1)",
  },

  card: {
    position: "relative",
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },

  title: {
    color: "#3498db",
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "12px",
    color: "gray",
    marginBottom: "20px",
  },

  loginTitle: {
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};