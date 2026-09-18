import { useEffect, useState } from "react";
import { getAllWorkOrders } from "../api/workOrderApi";
import type { WorkOrder } from "../api/workOrderApi";
import { Link } from "react-router-dom";

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllWorkOrders()
      .then((data) => setWorkOrders(data))
      .catch(() => setError("Failed to load work orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "40px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Work Orders</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Customer</th>
            <th style={{ padding: "10px" }}>Technician</th>
            <th style={{ padding: "10px" }}>Status</th>
            <th style={{ padding: "10px" }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((wo) => (
            <tr key={wo.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>
  <Link to={`/work-orders/${wo.id}`}>{wo.id}</Link>
</td>
              <td style={{ padding: "10px" }}>{wo.title}</td>
              <td style={{ padding: "10px" }}>{wo.customerName}</td>
              <td style={{ padding: "10px" }}>{wo.technicianName ?? "Unassigned"}</td>
              <td style={{ padding: "10px" }}>{wo.status}</td>
              <td style={{ padding: "10px" }}>{wo.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}