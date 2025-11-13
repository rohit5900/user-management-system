import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function ChangePassword() {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const handleChange = async () => {
    if (!oldPassword || !newPassword) return alert("Fill both fields");
    try {
      const res = await axios.post(`${API}/auth/change-password`, {
        oldPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message || "Password updated");
      setOld("");
      setNew("");
    } catch (err) {
      console.error("Change password error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <Layout>
      <div className="container col-md-6">
        <div className="card shadow-sm p-4">
          <h4>Change Password</h4>
          <input className="form-control mb-3"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOld(e.target.value)} />
          <input className="form-control mb-3"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNew(e.target.value)} />
          <button className="btn btn-primary w-100" onClick={handleChange}>Update Password</button>
        </div>
      </div>
    </Layout>
  );
}
