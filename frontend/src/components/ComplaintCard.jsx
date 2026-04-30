export default function ComplaintCard({ data }) {

  const getStatusClass = (status) => {
    if (status === "Pending") return "pending";
    if (status === "In Progress") return "progress";
    if (status === "Resolved") return "resolved";
    return "";
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Normal") return "#2563eb";
    if (priority === "Low") return "green";
    return "#666";
  };

  return (
    <div className="card">

      {/* TITLE ROW */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>
          {data.title || "Untitled Complaint"}
        </h3>

        <span className={`badge ${getStatusClass(data.status)}`}>
          {data.status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p style={{ marginTop: 10, opacity: 0.85 }}>
        {data.description || "No description provided"}
      </p>

      {/* META INFO */}
      <div style={{ display: "flex", gap: 15, marginTop: 10 }}>

        <div>
          <small style={{ opacity: 0.6 }}>Priority</small>
          <div style={{ color: getPriorityColor(data.priority) }}>
            {data.priority}
          </div>
        </div>

        <div>
          <small style={{ opacity: 0.6 }}>Location</small>
          <div>{data.location || "Not set"}</div>
        </div>

        <div>
          <small style={{ opacity: 0.6 }}>ID</small>
          <div>#{data.id}</div>
        </div>

      </div>

    </div>
  );
}