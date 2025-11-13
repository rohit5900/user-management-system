import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Attendance() {
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_BASE_URL;

  const markAttendance = async () => {
    try {
      const res = await axios.post(`${API}/attendance/mark`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus(res.data.message || "Attendance marked");
      fetchHistory();
    } catch (err) {
      console.error("Attendance error:", err.response?.data || err.message);
      setStatus("Error marking attendance");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/attendance/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch attendance history error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Layout>
      <div className="container col-md-8">
        <div className="card shadow-sm p-4 text-center">
          <h4>Mark Attendance</h4>
          <button className="btn btn-success w-100 mt-3" onClick={markAttendance}>Mark Present</button>
          {status && <p className="mt-3">{status}</p>}
        </div>

        <div className="card shadow-sm p-3 mt-4">
          <h5>Your Attendance History</h5>
          <ul className="list-group">
            {history.length === 0 ? <li className="list-group-item text-muted">No history</li> :
              history.map(h => (
                <li key={h._id} className="list-group-item d-flex justify-content-between">
                  <span>{new Date(h.date).toLocaleString()}</span>
                  <span className="badge bg-success">{h.status}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  );
}
