export default function Dashboard() {
  const name = localStorage.getItem("name");

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome, {name}</h1>
      <p>Dashboard content coming soon.</p>
    </div>
  );
}