import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import CountUp from "react-countup";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import Notifications from "../components/Notifications";

export default function Dashboard() {
  const [stats, setStats] = useState({ admins: 0, employees: 0, total: 0 });
  const [recent, setRecent] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const role = localStorage.getItem("role");
  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const COLORS = ["#0088FE", "#00C49F"];

  // Dummy login activity
  const loginData = [
    { day: "Mon", logins: 12 },
    { day: "Tue", logins: 22 },
    { day: "Wed", logins: 19 },
    { day: "Thu", logins: 30 },
    { day: "Fri", logins: 28 }
  ];

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const users = Array.isArray(res.data) ? res.data : [];
      const admins = users.filter((u) => u.role === "admin").length;
      const employees = users.filter((u) => u.role === "employee").length;
      setStats({ admins, employees, total: users.length });
      setRecent(users.slice(-5).reverse());
      // notifications can come from an API; for now create some
      setNotifications([
        "New user registered",
        "System backup completed",
        `${users.filter(u => u.role === "employee").length} employees active`
      ]);
    } catch (err) {
      console.error("Dashboard error:", err);
      setNotifications(["Failed to load some dashboard data"]);
    }
  };

  useEffect(() => {
    if (role === "admin") fetchDashboardData();
    else {
      // employee: fetch profile info from localStorage (or API)
    }
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">
          {role === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
        </h2>

        {/* Notifications */}
        <Notifications notifications={notifications} />

        {role === "admin" ? (
          <>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm p-3 text-center">
                  <h5>Total Users</h5>
                  <h2><CountUp end={stats.total} duration={1.2} /></h2>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm p-3 text-center">
                  <h5>Admins</h5>
                  <h2><CountUp end={stats.admins} duration={1.2} /></h2>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm p-3 text-center">
                  <h5>Employees</h5>
                  <h2><CountUp end={stats.employees} duration={1.2} /></h2>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <div className="card shadow-sm p-3">
                  <h5 className="text-center">Admin vs Employee Ratio</h5>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Admins", value: stats.admins },
                          { name: "Employees", value: stats.employees },
                        ]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={index} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="card shadow-sm p-3">
                  <h5 className="text-center">Weekly Login Activity</h5>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={loginData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="logins" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="card shadow-sm p-3 mb-4">
              <h5>Recent Users</h5>
              <ul className="list-group">
                {recent.length === 0 ? (
                  <li className="list-group-item text-muted">No recent users</li>
                ) : (
                  recent.map((u) => (
                    <li key={u._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{u.name}</span>
                      <span className="badge bg-primary">{u.role}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="card shadow-sm p-4">
              <h5>Quick Actions</h5>
              <button className="btn btn-primary me-2" onClick={() => window.location.href = "/manage-users"}>
                Manage Users
              </button>
              <button className="btn btn-success" onClick={() => window.location.href = "/manage-users"}>
                Add New User
              </button>
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card shadow-sm p-4 text-center">
                <h3>Welcome, {localStorage.getItem("name") || "User"} 👋</h3>
                <p>You are logged in as <strong>{role}</strong>.</p>
              </div>

              <div className="card shadow-sm p-4 mt-3">
                <h5>My Profile</h5>
                <p><strong>Name:</strong> {localStorage.getItem("name")}</p>
                <p><strong>Email:</strong> {localStorage.getItem("email")}</p>
              </div>

              <div className="card shadow-sm p-4 mt-3">
                <h5>Activity Overview</h5>
                <p>Profile Completion: <strong>60%</strong></p>
                <p>Last Login: Today</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
