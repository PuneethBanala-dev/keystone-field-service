import { Link } from "react-router-dom";

export default function Dashboard() {
  const name = localStorage.getItem("name");

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome, {name}</h1>
      <Link to="/work-orders">View Work Orders</Link>
    </div>
  );
}