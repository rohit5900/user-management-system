import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUsers, FaSignOutAlt, FaHome, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const { dark, toggleTheme } = useContext(ThemeContext);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-light p-3" style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="mb-4 text-center">UserMgmt</h4>
        <ul className="nav flex-column" style={{ gap: 8 }}>
          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={() => navigate("/dashboard")}>
              <FaHome className="me-2" /> Dashboard
            </button>
          </li>

          {role === "admin" && (
            <li className="nav-item mb-2">
              <button className="btn btn-dark w-100 text-start" onClick={() => navigate("/manage-users")}>
                <FaUsers className="me-2" /> Manage Users
              </button>
            </li>
          )}

          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={() => navigate("/profile")}>
              <FaUser className="me-2" /> Profile
            </button>
          </li>

          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={() => navigate("/attendance")}>
              📍 Attendance
            </button>
          </li>

          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={() => navigate("/change-password")}>
              🔐 Change Password
            </button>
          </li>

          {/* Dark mode toggle */}
          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={toggleTheme}>
              {dark ? <FaSun className="me-2" /> : <FaMoon className="me-2" />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
          </li>

          <li style={{ flex: 1 }} />

          <li className="nav-item mt-auto">
            <button className="btn btn-danger w-100" onClick={logout}>
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 bg-light p-4">
        {children}
      </div>
    </div>
  );
}
