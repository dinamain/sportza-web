import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav style={{
      display: "flex",
      gap: 20,
      padding: 16,
      background: "#1a1a2e",
      color: "white"
    }}>
      <Link to="/" style={{ color: "#FFD700", textDecoration: "none" }}>Home</Link>
      <Link to="/login" style={{ color: "#FFD700", textDecoration: "none" }}>Login</Link>
      <Link to="/register" style={{ color: "#FFD700", textDecoration: "none" }}>Register</Link>
      <Link to="/groups" style={{ color: "#FFD700", textDecoration: "none" }}>Groups</Link>
      <Link to="/profile" style={{ color: "#FFD700", textDecoration: "none" }}>Profile</Link>
      <Link to="/events" style={{ color: "#FFD700", textDecoration: "none" }}>Events</Link>
    </nav>
  );
}