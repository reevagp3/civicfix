export default function Dashboard({ complaints }) {

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const progress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div style={{ padding: 20 }}>

      {/* HEADER */}
      <h2 style={{ marginBottom: 20 }}>📊 Dashboard Overview</h2>

      {/* STATS GRID */}
      <div className="grid" style={{ marginBottom: 20 }}>

        <div className="card">
          <h3>Total</h3>
          <p style={{ fontSize: 24 }}>{total}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p style={{ fontSize: 24, color: "red" }}>{pending}</p>
        </div>

        <div className="card">
          <h3>In Progress</h3>
          <p style={{ fontSize: 24, color: "orange" }}>{progress}</p>
        </div>

        <div className="card">
          <h3>Resolved</h3>
          <p style={{ fontSize: 24, color: "green" }}>{resolved}</p>
        </div>

      </div>

      {/* RECENT SECTION */}
      <h3 style={{ marginBottom: 10 }}>Recent Complaints</h3>

      {complaints.slice(0, 3).map((c) => (
        <div className="card" key={c.id}>
          <h4>{c.title || "Untitled"}</h4>
          <p>{c.description || "No description"}</p>
          <p><b>Status:</b> {c.status}</p>
        </div>
      ))}

    </div>
  );
}