import { useState } from "react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.status === "success") {
        setUser(data.user);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Backend error");
    }

    setLoading(false);
  };

  return (
    <div style={wrapper}>

      {/* LEFT BRAND PANEL */}
      <div style={leftPanel}>
        <h1 style={{ fontSize: 40, marginBottom: 10 }}>🏛 CivicFix</h1>
        <p style={{ fontSize: 14, opacity: 0.8, maxWidth: 300 }}>
          A civic complaint reporting platform for citizens, officers, and administrators.
        </p>

        <div style={{ marginTop: 30, fontSize: 13, opacity: 0.7 }}>
          ✔ Report civic issues<br />
          ✔ Track resolutions<br />
          ✔ Map-based complaint system<br />
          ✔ Government workflow automation
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div style={rightPanel}>
        <div style={glassCard}>
          <h2 style={{ marginBottom: 5 }}>Welcome Back</h2>
          <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 20 }}>
            Login to access your dashboard
          </p>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button onClick={login} style={button}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <p style={{ fontSize: 11, opacity: 0.6, textAlign: "center", marginTop: 10 }}>
            Secure government-grade access system
          </p>
        </div>
      </div>
    </div>
  );
}

/* FULL PAGE LAYOUT */
const wrapper = {
  display: "flex",
  height: "100vh",
  fontFamily: "Segoe UI, sans-serif"
};

/* LEFT SIDE */
const leftPanel = {
  flex: 1,
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "80px"
};

/* RIGHT SIDE */
const rightPanel = {
  flex: 1,
  background: "#f4f6f8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

/* GLASS CARD */
const glassCard = {
  width: 360,
  padding: 30,
  borderRadius: 18,
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
};

/* INPUT */
const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #ddd",
  outline: "none"
};

/* BUTTON */
const button = {
  width: "100%",
  padding: 12,
  border: "none",
  borderRadius: 10,
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};