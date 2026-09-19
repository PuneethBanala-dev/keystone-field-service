import { Link, useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">KEYSTONE</div>
        <Link
          to="/dashboard"
          className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          to="/work-orders"
          className={`sidebar-link ${isActive("/work-orders") ? "active" : ""}`}
        >
          Work Orders
        </Link>
        <div className="sidebar-footer">
          <button className="btn btn-secondary" onClick={handleLogout} style={{ width: "100%" }}>
            Logout
          </button>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}