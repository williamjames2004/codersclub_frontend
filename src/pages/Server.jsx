import { useState, useRef } from "react";

const SERVER_URL = "https://codersclub-i9xo.onrender.com/";

const Server = () => {
  const [status, setStatus] = useState("idle");
  // idle | waking | started | error

  const intervalRef = useRef(null);

  const checkServer = async () => {
    try {
      const res = await fetch(SERVER_URL, { method: "GET" });
      if (res.ok) {
        setStatus("started");
        clearInterval(intervalRef.current);
      }
    } catch (err) {
      setStatus("waking");
    }
  };

  const startServer = async () => {
    if (status === "started") return;

    setStatus("waking");
    await checkServer();

    intervalRef.current = setInterval(checkServer, 10000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Coders Club</h1>
        <p style={styles.subtitle}>Backend Control Panel</p>

        {/* Status */}
        {status === "idle" && (
          <button style={styles.button} onClick={startServer}>
            🚀 Start Server
          </button>
        )}

        {status === "waking" && (
          <p style={{ ...styles.status, ...styles.waking }}>
            ⏳ Server is waking up…
          </p>
        )}

        {status === "started" && (
          <p style={{ ...styles.status, ...styles.started }}>
            ✅ Server started
          </p>
        )}

        {status === "error" && (
          <p style={{ ...styles.status, ...styles.error }}>
            ❌ Unable to start server
          </p>
        )}

        {/* Backend URL */}
        <div style={styles.linkBox}>
          <span style={styles.label}>Backend server:</span>
          <a
            href={SERVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {SERVER_URL}
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #020617 0%, #020024 50%, #030b2f 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },

  card: {
    width: "420px",
    padding: "30px",
    borderRadius: "16px",
    background: "rgba(15, 23, 42, 0.85)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },

  title: {
    fontSize: "2.4rem",
    marginBottom: "5px",
    letterSpacing: "1px",
  },

  subtitle: {
    fontSize: "14px",
    opacity: 0.7,
    marginBottom: "25px",
  },

  button: {
    padding: "14px 26px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontWeight: 600,
    transition: "transform 0.2s ease",
  },

  status: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: 600,
  },

  waking: {
    color: "#facc15",
  },

  started: {
    color: "#22c55e",
  },

  error: {
    color: "#ef4444",
  },

  linkBox: {
    marginTop: "30px",
    padding: "15px",
    background: "rgba(2, 6, 23, 0.8)",
    borderRadius: "10px",
    wordBreak: "break-all",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    opacity: 0.7,
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default Server;