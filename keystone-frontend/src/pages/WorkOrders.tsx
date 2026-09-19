import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getAllWorkOrders } from "../api/workOrderApi";
import type { WorkOrder } from "../api/workOrderApi";

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllWorkOrders()
      .then(setWorkOrders)
      .catch(() => setError("Failed to load work orders"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Work Orders</h1>
        <Link to="/work-orders/new" className="btn">
          + New Work Order
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <table className="wo-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Customer</th>
              <th>Technician</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((wo) => (
              <tr key={wo.id}>
                <td className="mono">
                  <Link to={`/work-orders/${wo.id}`}>#{wo.id}</Link>
                </td>
                <td>
                  <Link to={`/work-orders/${wo.id}`}>{wo.title}</Link>
                </td>
                <td>{wo.customerName}</td>
                <td>{wo.technicianName ?? "Unassigned"}</td>
                <td>
                  <span className={`pill pill-${wo.status.toLowerCase()}`}>{wo.status}</span>
                </td>
                <td>
                  <span className={`pill pill-${wo.priority.toLowerCase()}`}>{wo.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}