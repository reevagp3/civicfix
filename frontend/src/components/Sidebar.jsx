export default function Sidebar({ user, setView, darkMode, setDarkMode }) {
  return (
    <div className="sidebar">

      <div className="sidebar-title">
        🏛 CivicFix
        <div style={{ fontSize: 12, opacity: 0.6 }}>
          {user.role.toUpperCase()}
        </div>
      </div>

      <button className="sidebar-btn" onClick={() => setView("dashboard")}>
        📊 Dashboard
      </button>

      <button className="sidebar-btn" onClick={() => setView("map")}>
        🗺 Map
      </button>

      <button className="sidebar-btn" onClick={() => setView("complaints")}>
        📄 Complaints
      </button>

      {user.role === "citizen" && (
        <button className="sidebar-btn" onClick={() => setView("raise")}>
          ➕ Raise Complaint
        </button>
      )}

      {(user.role === "admin" || user.role === "officer") && (
        <button className="sidebar-btn" onClick={() => setView("manage")}>
          ⚙ Manage
        </button>
      )}

      {/* THEME TOGGLE */}
      <button
        className="sidebar-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}