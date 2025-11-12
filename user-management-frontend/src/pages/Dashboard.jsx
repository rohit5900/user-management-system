import Layout from "../components/Layout";
import { FaUsers, FaUserShield, FaUser } from "react-icons/fa";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <Layout>
      <h2>Welcome, {role === "admin" ? "Admin" : "Employee"}</h2>
      <p className="text-muted">Here’s an overview of your account.</p>

      <div className="row mt-4">
        {role === "admin" && (
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center">
              <FaUsers size={30} className="text-primary mb-2" />
              <h5>Total Users</h5>
              <p>Manage all users in the system.</p>
            </div>
          </div>
        )}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 text-center">
            <FaUserShield size={30} className="text-success mb-2" />
            <h5>Your Role</h5>
            <p>{role}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 text-center">
            <FaUser size={30} className="text-info mb-2" />
            <h5>Profile</h5>
            <p>View and update your info.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
