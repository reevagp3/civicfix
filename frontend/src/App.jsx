// ONLY CHANGE THIS PART INSIDE RETURN

<div className={darkMode ? "dark" : "light"} style={{ display: "flex", height: "100vh" }}>

  <Sidebar
    user={user}
    setView={setView}
    darkMode={darkMode}
    setDarkMode={setDarkMode}
  />

  <div className="main">

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
          complaints.length === 0 ? (
            <EmptyState title="No Complaints" message="Nothing reported yet" />
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
            <EmptyState title="No Data" message="Nothing to manage" />
          ) : (
            <Table complaints={complaints} />
          )
        )}
      </>
    )}
  </div>
</div>