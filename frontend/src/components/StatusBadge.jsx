export default function StatusBadge({ status }) {
  const getColor = () => {
    if (status === "Pending") return "#ff4d4f";
    if (status === "In Progress") return "#faad14";
    if (status === "Resolved") return "#52c41a";
    return "#999";
  };

  return (
    <span style={{ ...badge, background: getColor() }}>
      {status}
    </span>
  );
}

const badge = {
  padding: "4px 10px",
  borderRadius: 20,
  color: "white",
  fontSize: 12,
  display: "inline-block"
};