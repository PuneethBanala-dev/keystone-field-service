import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getWorkOrderById,
  getLogs,
  getParts,
  updateStatus,
} from "../api/workOrderApi";
import type { WorkOrder, WorkOrderLog, PartUsed } from "../api/workOrderApi";

export default function WorkOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const workOrderId = Number(id);

  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [logs, setLogs] = useState<WorkOrderLog[]>([]);
  const [parts, setParts] = useState<PartUsed[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    Promise.all([
      getWorkOrderById(workOrderId),
      getLogs(workOrderId),
      getParts(workOrderId),
    ])
      .then(([woData, logsData, partsData]) => {
        setWorkOrder(woData);
        setLogs(logsData);
        setParts(partsData);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [workOrderId]);

  const handleStatusChange = async (newStatus: string) => {
    await updateStatus(workOrderId, newStatus);
    loadData();
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (!workOrder) return <p style={{ padding: "40px" }}>Work order not found</p>;

  return (
    <div style={{ padding: "40px" }}>
      <Link to="/work-orders">← Back to Work Orders</Link>
      <h1>{workOrder.title}</h1>
      <p>{workOrder.description}</p>

      <div style={{ marginBottom: "20px" }}>
        <strong>Customer:</strong> {workOrder.customerName} <br />
        <strong>Technician:</strong> {workOrder.technicianName ?? "Unassigned"} <br />
        <strong>Priority:</strong> {workOrder.priority} <br />
        <strong>Status:</strong> {workOrder.status}
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label>Update Status: </label>
        <select
          value={workOrder.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="OPEN">OPEN</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      <h3>Parts Used</h3>
      {parts.length === 0 ? (
        <p>No parts logged yet.</p>
      ) : (
        <ul>
          {parts.map((p) => (
            <li key={p.id}>
              {p.partName} — Qty: {p.quantity} {p.cost && `— $${p.cost}`}
            </li>
          ))}
        </ul>
      )}

      <h3>Activity Log</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            [{new Date(log.timestamp).toLocaleString()}] {log.status} —{" "}
            {log.note} (by {log.changedByName})
          </li>
        ))}
      </ul>
    </div>
  );
}