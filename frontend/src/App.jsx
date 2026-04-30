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
        `http://127.0.0.1:5000/get-complaints?role=${userData.role}&user_id=${userData.id}`
      );

      const data = await res.json();

      setComplaints(data.status === "success" ? data.complaints || [] : []);
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
    <div className={darkMode ? "dark" : "light"} style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <Sidebar
        user={user}
        setView={setView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* MAIN */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        <Topbar
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {loading ? (
          <Spinner />
        ) : (
          <>
            {view === "dashboard" && <Dashboard complaints={complaints} />}

            {view === "map" && <MapView complaints={complaints} />}

            {view === "complaints" && (
              <div style={{ padding: 20 }}>
                {complaints.length === 0 ? (
                  <EmptyState
                    title="No Complaints Found"
                    message="Nothing has been reported yet."
                  />
                ) : (
                  complaints.map((c) => (
                    <ComplaintCard key={c.id} data={c} />
                  ))
                )}
              </div>
            )}

            {view === "raise" && (
              <RaiseComplaint
                user={user}
                onSuccess={() => fetchComplaints(user)}
              />
            )}

            {view === "manage" &&
              (complaints.length === 0 ? (
                <EmptyState title="No Data" message="Nothing to manage yet." />
              ) : (
                <Table complaints={complaints} />
              ))}
          </>
        )}
      </div>
    </div>
  );
}