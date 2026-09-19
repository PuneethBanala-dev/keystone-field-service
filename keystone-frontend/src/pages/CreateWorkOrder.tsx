import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createWorkOrder } from "../api/workOrderApi";

export default function CreateWorkOrder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const newWorkOrder = await createWorkOrder({
        title,
        description,
        customerId: Number(customerId),
        priority,
      });
      navigate(`/work-orders/${newWorkOrder.id}`);
    } catch (err) {
      setError("Failed to create work order. Check the Customer ID exists.");
    }
  };

  return (
    <Layout>
      <h1>Create Work Order</h1>
      <div className="card" style={{ maxWidth: "480px", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="field">
            <label>Customer ID</label>
            <input
              type="number"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn" style={{ width: "100%" }}>
            Create Work Order
          </button>
        </form>
      </div>
    </Layout>
  );
}