export default function EmptyState({ title, message }) {
  return (
    <div style={wrapper}>
      <h3 style={{ marginBottom: 5 }}>{title}</h3>
      <p style={{ color: "#777" }}>{message}</p>
    </div>
  );
}

const wrapper = {
  background: "white",
  padding: 30,
  borderRadius: 10,
  textAlign: "center",
  marginTop: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};