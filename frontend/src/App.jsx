import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const API_BASE = "https://civicfix-ch9u.onrender.com";

function getIcon(status) {
  let color = "blue";

  if (status === "Pending") color = "red";
  else if (status === "In Progress") color = "orange";
  else if (status === "Resolved") color = "green";

  return new L.Icon({
    iconUrl: `https://maps.gstatic.com/mapfiles/ms2/micons/${color}-dot.png`,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
}

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- LOGIN ----------------
  const login = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.status === "success") {
        setUser(data.user);
        await fetchComplaints(data.user);
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      alert("Backend error");
      console.log(err);
    }

    setLoading(false);
  };

  // ---------------- FETCH COMPLAINTS ----------------
  const fetchComplaints = async (userData) => {
    try {
      const res = await fetch(
        `${API_BASE}/get-complaints?role=${userData.role}&user_id=${userData.id}`
      );

      const data = await res.json();

      if (data.status === "success") {
        setComplaints(data.complaints || []);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setComplaints([]);
    }
  };

  // ---------------- LOGIN SCREEN ----------------
  if (!user) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8"
      }}>
        <div style={{
          padding: 25,
          background: "white",
          borderRadius: 10,
          width: 300,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ textAlign: "center" }}>CivicFix Login</h3>

          <input
            style={inputStyle}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={btnPrimary} onClick={login}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* SIDEBAR */}
      <div style={sidebarStyle}>
        <h3>🏛 CivicFix</h3>

        <button style={btnSide} onClick={() => setView("dashboard")}>Dashboard</button>
        <button style={btnSide} onClick={() => setView("map")}>Map</button>
        <button style={btnSide} onClick={() => setView("complaints")}>Complaints</button>

        {user.role === "admin" && (
          <button style={btnSide} onClick={() => setView("admin")}>Admin</button>
        )}

        {user.role === "officer" && (
          <button style={btnSide} onClick={() => setView("officer")}>Officer</button>
        )}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 20, background: "#f4f6f8" }}>

        <h2>Welcome {user.full_name}</h2>
        <p style={{ color: "gray" }}>Role: {user.role}</p>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <div style={card}>
            <h3>Overview</h3>
            <p>Total Complaints: {complaints.length}</p>
          </div>
        )}

        {/* MAP */}
        {view === "map" && (
          <div style={card}>
            <h3>Complaint Map</h3>

            <div style={{ height: 450 }}>
              <MapContainer center={[13.3, 77.1]} zoom={12} style={{ height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {complaints.map((c) =>
                  c.latitude && c.longitude ? (
                    <Marker
                      key={c.id}
                      position={[c.latitude, c.longitude]}
                      icon={getIcon(c.status)}
                    >
                      <Popup>
                        <b>{c.title}</b>
                        <p>{c.status}</p>
                      </Popup>
                    </Marker>
                  ) : null
                )}
              </MapContainer>
            </div>
          </div>
        )}

        {/* COMPLAINTS */}
        {view === "complaints" && (
          <div>
            <h3>Complaints</h3>

            {complaints.length === 0 && (
              <p>No complaints found</p>
            )}

            {complaints.map((c) => (
              <div key={c.id} style={card}>
                <b>{c.title}</b>
                <p>{c.description}</p>
                <span>{c.status}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const sidebarStyle = {
  width: 220,
  background: "#1e1e2f",
  color: "white",
  padding: 20
};

const btnSide = {
  width: "100%",
  margin: "8px 0",
  padding: 10,
  background: "transparent",
  color: "white",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 6,
  cursor: "pointer"
};

const btnPrimary = {
  width: "100%",
  padding: 10,
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: 6
};

const inputStyle = {
  width: "100%",
  padding: 8,
  marginBottom: 10
};

const card = {
  background: "white",
  padding: 15,
  borderRadius: 10,
  marginBottom: 10
};