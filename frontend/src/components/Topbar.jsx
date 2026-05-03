export default function Topbar({ user, darkMode, setDarkMode }) {
  return (
    <div style={topbar}>
      
      {/* LEFT SIDE */}
      <div>
        <strong>{user.role.toUpperCase()}</strong>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

        {/* DARK MODE TOGGLE */}
        <button onClick={() => setDarkMode(!darkMode)} style={toggleBtn}>
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* USER */}
        <div style={{ fontSize: 14 }}>
          {user.email}
        </div>

      </div>
    </div>
  );
}

const topbar = {
  height: 60,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  background: "white",
  borderRadius: 12,
  marginBottom: 15
};

const toggleBtn = {
  fontSize: 18,
  border: "none",
  background: "transparent",
  cursor: "pointer"
};