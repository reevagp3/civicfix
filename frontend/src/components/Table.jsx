export default function Table({ complaints }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Complaints</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map(c => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.status}</td>
              <td>{c.priority}</td>
              <td>{c.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = {
  width: "100%",
  background: "white",
  borderRadius: 10,
  overflow: "hidden",
  borderCollapse: "collapse"
};