import { useState } from "react";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ComplaintCard from "./components/ComplaintCard";
import Table from "./components/Table";
import Topbar from "./components/Topbar";
import MapView from "./components/MapView";
import RaiseComplaint from "./components/RaiseComplaint";
import EmptyState from "./components/EmptyState";
import Spinner from "./components/Spinner";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchComplaints = async (userData) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://civicfix-backend-th6h.onrender.com/get-complaints?role=${userData.role}&user_id=${userData.id}`
      );

      const data = await res.json();

      if (data.status === "success") {
        setComplaints(data.complaints || []);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.log(err);
      setComplaints([]);
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <Login
        setUser={(u) => {
          setUser(u);
          fetchComplaints(u);
        }}
      />
    );
  }

  return (
    <div
      className={darkMode ? "dark" : "light"}
      style={{
        display: "flex",
        height: "100vh"
      }}
    >
      <Sidebar user={user} setView={setView} />

      <div
        className="main"
        style={{
          flex: 1,
          padding: 20,
          background: darkMode ? "#020617" : "#f1f5f9"
        }}
      >
        <Topbar
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {loading ? (
          <Spinner />
        ) : (
          <>
            {view === "dashboard" && (
              <Dashboard complaints={complaints} />
            )}

            {view === "map" && (
              <MapView complaints={complaints} />
            )}

            {view === "complaints" && (
              complaints.length === 0 ? (
                <EmptyState
                  title="No Complaints"
                  message="Nothing reported yet"
                />
              ) : (
                complaints.map((c) => (
                  <ComplaintCard key={c.id} data={c} />
                ))
              )
            )}

            {view === "raise" && (
              <RaiseComplaint
                user={user}
                onSuccess={() => fetchComplaints(user)}
              />
            )}

            {view === "manage" && (
              complaints.length === 0 ? (
                <EmptyState
                  title="No Data"
                  message="Nothing to manage"
                />
              ) : (
                <Table complaints={complaints} />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}