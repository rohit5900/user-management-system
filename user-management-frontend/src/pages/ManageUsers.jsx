import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setLoading(false);
      setUsers([]);
    }
  };

  // ✅ Add new user
  const addUser = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post(`${API}/auth/register`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ User added successfully!");
      setForm({ name: "", email: "", password: "", role: "employee" });
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err.response?.data || err.message);
      alert("❌ Failed to add user.");
    }
  };

  // ✅ Save edited user
  const saveUser = async () => {
    try {
      await axios.put(`${API}/users/${editUser._id}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ User updated!");
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      alert("❌ Failed to update user.");
    }
  };

  // ✅ Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ User deleted.");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      alert("❌ Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">Manage Users</h2>

        {/* Add User Form */}
        <div className="card shadow-sm p-4 mb-4">
          <h5 className="mb-3">➕ Add New User</h5>
          <div className="row">
            <div className="col-md-3 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="col-md-3 mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="col-md-3 mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="col-md-2 mb-2">
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-success w-100" onClick={addUser}>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card shadow-sm p-3">
          <h5 className="mb-3">👥 Users List</h5>
          {loading ? (
            <p className="text-center">Loading users...</p>
          ) : (
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style={{ width: "180px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => setEditUser(u)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteUser(u._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Edit User Form (Appears Below Table) */}
        {editUser && (
          <div className="card shadow-sm p-4 mt-4">
            <h5 className="mb-3">✏️ Edit User</h5>
            <div className="row">
              <div className="col-md-4 mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="email"
                  className="form-control"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </div>
              <div className="col-md-3 mb-2">
                <select
                  className="form-select"
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div className="col-md-1">
                <button className="btn btn-success w-100" onClick={saveUser}>
                  Save
                </button>
              </div>
            </div>
            <button className="btn btn-secondary mt-2" onClick={() => setEditUser(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
