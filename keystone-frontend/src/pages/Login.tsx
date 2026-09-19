import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("name", response.name);
      localStorage.setItem("role", response.role);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card card">
        <h1 style={{ marginBottom: "4px" }}>KEYSTONE</h1>
        <p style={{ marginBottom: "24px" }}>Field service management</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn" style={{ width: "100%", marginTop: "8px" }}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}