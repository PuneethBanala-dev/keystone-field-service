import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/dashboardApi";
import type { DashboardSummary } from "../api/dashboardApi";

export default function Dashboard() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const cardStyle = {
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "20px",
    minWidth: "150px",
    textAlign: "center" as const,
  };

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Welcome, {name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Link to="/work-orders">View Work Orders</Link>

      {summary && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2>{summary.totalWorkOrders}</h2>
            <p>Total Work Orders</p>
          </div>
          <div style={cardStyle}>
            <h2>{summary.openCount}</h2>
            <p>Open</p>
          </div>
          <div style={cardStyle}>
            <h2>{summary.assignedCount}</h2>
            <p>Assigned</p>
          </div>
          <div style={cardStyle}>
            <h2>{summary.inProgressCount}</h2>
            <p>In Progress</p>
          </div>
          <div style={cardStyle}>
            <h2>{summary.completedCount}</h2>
            <p>Completed</p>
          </div>
          <div style={{ ...cardStyle, borderColor: summary.slaBreachedCount > 0 ? "red" : "#444" }}>
            <h2 style={{ color: summary.slaBreachedCount > 0 ? "red" : "inherit" }}>
              {summary.slaBreachedCount}
            </h2>
            <p>SLA Breached</p>
          </div>
          <div style={cardStyle}>
            <h2>
              {summary.availableTechnicians}/{summary.totalTechnicians}
            </h2>
            <p>Technicians Available</p>
          </div>
        </div>
      )}
    </div>
  );
}