import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const saveUser = async () => {
    await axios.put(`http://localhost:5000/users/${editUser._id}`, editUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditUser(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Manage Users</h2>
        <table className="table mt-3">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => setEditUser(u)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editUser && (
          <div className="p-4 border rounded bg-light mt-4">
            <h4>Edit User</h4>
            <input className="form-control mb-2" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
            <input className="form-control mb-2" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
            <select className="form-select mb-2" value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
              <option value="admin">admin</option>
              <option value="employee">employee</option>
            </select>
            <button className="btn btn-success me-2" onClick={saveUser}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
          </div>
        )}
      </div>
    </>
  );
}
