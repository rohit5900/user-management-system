import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand">User Management</span>
      <div className="ms-auto">
        <button className="btn btn-outline-light me-2" onClick={() => navigate("/dashboard")}>Dashboard</button>
        {role === "admin" && (
          <button className="btn btn-outline-light me-2" onClick={() => navigate("/manage-users")}>
            Manage Users
          </button>
        )}
        <button className="btn btn-outline-light me-2" onClick={() => navigate("/profile")}>Profile</button>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
