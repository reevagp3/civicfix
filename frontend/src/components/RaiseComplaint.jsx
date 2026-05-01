import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ClickHandler({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    }
  });
  return null;
}

function pinIcon() {
  return new L.Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
}

export default function RaiseComplaint({ user, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Normal");

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const submit = async () => {
    if (!lat || !lng) {
      alert("Please select location on map");
      return;
    }

    await fetch("https://civicfix-backend-th6h.onrender.com/add-complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        title,
        description,
        location,
        priority,
        latitude: lat,
        longitude: lng
      })
    });

    setTitle("");
    setDescription("");
    setLocation("");
    setPriority("Normal");
    setLat(null);
    setLng(null);

    onSuccess();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Raise Complaint</h2>

      <div style={card}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input placeholder="Location Name" value={location} onChange={e => setLocation(e.target.value)} />

        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Normal</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
      </div>

      <div style={{ height: 350, borderRadius: 10, overflow: "hidden", marginBottom: 15 }}>
        <MapContainer center={[13.34, 77.1]} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler setLat={setLat} setLng={setLng} />
          {lat && lng && <Marker position={[lat, lng]} icon={pinIcon()} />}
        </MapContainer>
      </div>

      <p style={{ fontSize: 13 }}>
        Selected: {lat && lng ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : "No location selected"}
      </p>

      <button onClick={submit} style={btn}>
        Submit Complaint
      </button>
    </div>
  );
}

const card = { background: "white", padding: 15, borderRadius: 10, marginBottom: 10 };
const btn = { width: "100%", padding: 12, background: "#007bff", color: "white", border: "none", borderRadius: 8, cursor: "pointer" };