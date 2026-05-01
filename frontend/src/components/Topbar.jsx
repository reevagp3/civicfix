export default function Topbar({ user, darkMode, setDarkMode }) {
  return (
    <div className="topbar">

      {/* LEFT */}
      <div>
        <h3 style={{ margin: 0 }}>
          👋 Welcome, {user.full_name}
        </h3>
        <small style={{ opacity: 0.6 }}>
          Role: {user.role}
        </small>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

        <button
          className="btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        <div
          style={{
            background: "#2563eb",
            color: "white",
            borderRadius: "50%",
            width: 35,
            height: 35,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {user.full_name?.charAt(0)}
        </div>

      </div>
    </div>
  );
}