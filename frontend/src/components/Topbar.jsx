export default function Topbar({ user, darkMode, setDarkMode }) {
  return (
    <div style={{
      height: 60,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      background: darkMode ? "#1f1f1f" : "white",
      color: darkMode ? "white" : "black",
      borderBottom: darkMode ? "1px solid #333" : "1px solid #eee"
    }}>
      <h3 style={{ margin: 0 }}>🏛 CivicFix</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "none",
            background: darkMode ? "#333" : "#f0f0f0",
            color: darkMode ? "white" : "black",
            cursor: "pointer"
          }}
        >
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>

        <span style={{ fontSize: 14 }}>
          👤 {user.full_name}
        </span>
      </div>
    </div>
  );
}