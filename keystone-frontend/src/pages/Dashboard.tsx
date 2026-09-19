import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDashboardSummary } from "../api/dashboardApi";
import type { DashboardSummary } from "../api/dashboardApi";

export default function Dashboard() {
  const name = localStorage.getItem("name");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  return (
    <Layout>
      <h1>Welcome, {name}</h1>
      <p>Here's what's happening across your field operations.</p>

      {summary && (
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-number mono">{summary.totalWorkOrders}</div>
            <div className="stat-label">Total Work Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-number mono">{summary.openCount}</div>
            <div className="stat-label">Open</div>
          </div>
          <div className="stat-card">
            <div className="stat-number mono">{summary.assignedCount}</div>
            <div className="stat-label">Assigned</div>
          </div>
          <div className="stat-card">
            <div className="stat-number mono">{summary.inProgressCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-number mono">{summary.completedCount}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className={`stat-card ${summary.slaBreachedCount > 0 ? "danger" : ""}`}>
            <div className="stat-number mono">{summary.slaBreachedCount}</div>
            <div className="stat-label">SLA Breached</div>
          </div>
          <div className="stat-card">
            <div className="stat-number mono">
              {summary.availableTechnicians}/{summary.totalTechnicians}
            </div>
            <div className="stat-label">Technicians Available</div>
          </div>
        </div>
      )}
    </Layout>
  );
}