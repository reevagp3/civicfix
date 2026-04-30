export default function Spinner() {
  return (
    <div style={wrapper}>
      <div style={loader}></div>
      <p style={{ marginTop: 10, color: "#666" }}>Loading...</p>
    </div>
  );
}

const wrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 30
};

const loader = {
  width: 30,
  height: 30,
  border: "4px solid #eee",
  borderTop: "4px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};