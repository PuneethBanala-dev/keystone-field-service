import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import {
  getWorkOrderById,
  getLogs,
  getParts,
  updateStatus,
  getAllTechnicians,
  assignTechnician,
} from "../api/workOrderApi";
import type { WorkOrder, WorkOrderLog, PartUsed, Technician } from "../api/workOrderApi";

export default function WorkOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const workOrderId = Number(id);

  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [logs, setLogs] = useState<WorkOrderLog[]>([]);
  const [parts, setParts] = useState<PartUsed[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    Promise.all([
      getWorkOrderById(workOrderId),
      getLogs(workOrderId),
      getParts(workOrderId),
      getAllTechnicians(),
    ])
      .then(([woData, logsData, partsData, techData]) => {
        setWorkOrder(woData);
        setLogs(logsData);
        setParts(partsData);
        setTechnicians(techData);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [workOrderId]);

  const handleAssign = async (technicianId: string) => {
    if (!technicianId) return;
    await assignTechnician(workOrderId, Number(technicianId));
    loadData();
  };

  const handleStatusChange = async (newStatus: string) => {
    await updateStatus(workOrderId, newStatus);
    loadData();
  };

  if (loading)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  if (!workOrder)
    return (
      <Layout>
        <p>Work order not found</p>
      </Layout>
    );

  return (
    <Layout>
      <Link to="/work-orders">← Back to Work Orders</Link>
      <h1 style={{ marginTop: "12px" }}>{workOrder.title}</h1>
      <p>{workOrder.description}</p>

      <div className="card" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <div className="field-label" style={{ color: "var(--text-muted)", fontSize: "13px" }}>Customer</div>
            <div>{workOrder.customerName}</div>
          </div>
          <div>
            <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>Priority</div>
            <span className={`pill pill-${workOrder.priority.toLowerCase()}`}>{workOrder.priority}</span>
          </div>
          <div>
            <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>Technician</div>
            <div>{workOrder.technicianName ?? "Unassigned"}</div>
          </div>
          <div>
            <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>Status</div>
            <span className={`pill pill-${workOrder.status.toLowerCase()}`}>{workOrder.status}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "24px" }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Assign Technician</label>
            <select value={workOrder.technicianId ?? ""} onChange={(e) => handleAssign(e.target.value)}>
              <option value="">-- Select Technician --</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.status})
                </option>
              ))}
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Update Status</label>
            <select value={workOrder.status} onChange={(e) => handleStatusChange(e.target.value)}>
              <option value="OPEN">Open</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Parts Used</h3>
        {parts.length === 0 ? (
          <p>No parts logged yet.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "18px" }}>
            {parts.map((p) => (
              <li key={p.id} style={{ marginBottom: "6px" }}>
                {p.partName} — Qty: {p.quantity} {p.cost && `— $${p.cost}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Activity Log</h3>
        <ul style={{ margin: 0, paddingLeft: "18px" }}>
          {logs.map((log) => (
            <li key={log.id} className="mono" style={{ marginBottom: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
              [{new Date(log.timestamp).toLocaleString()}] <span style={{ color: "var(--text)" }}>{log.status}</span> — {log.note} (by {log.changedByName})
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}