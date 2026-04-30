import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const getIcon = (status) => {
  let color = "blue";

  if (status === "Pending") color = "red";
  else if (status === "In Progress") color = "orange";
  else if (status === "Resolved") color = "green";

  return new L.Icon({
    iconUrl: `https://maps.gstatic.com/mapfiles/ms2/micons/${color}-dot.png`,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
  });
};

export default function MapView({ complaints }) {

  const validComplaints = complaints.filter(
    (c) => c.latitude && c.longitude
  );

  return (
    <div style={{ padding: 20 }}>

      <h2>🗺 Complaint Map</h2>

      <div style={{
        height: "500px",
        borderRadius: "12px",
        overflow: "hidden",
        marginTop: 10
      }}>

        <MapContainer
          center={[13.34, 77.1]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {validComplaints.map((c) => (
            <Marker
              key={c.id}
              position={[c.latitude, c.longitude]}
              icon={getIcon(c.status)}
            >
              <Popup>
                <div>
                  <b>{c.title}</b>
                  <p>{c.description}</p>
                  <small>Status: {c.status}</small>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>

      </div>
    </div>
  );
}