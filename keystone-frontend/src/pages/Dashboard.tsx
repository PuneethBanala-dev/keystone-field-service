import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Welcome, {name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Link to="/work-orders">View Work Orders</Link>
    </div>
  );
}