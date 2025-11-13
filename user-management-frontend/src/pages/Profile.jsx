import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Profile() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [photo, setPhoto] = useState(null);

  // Load Profile Data
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setNewName(res.data.name);
    } catch (err) {
      console.error("Profile error:", err);
    }
  };

  // Upload Profile Picture
  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(URL.createObjectURL(file)); // preview

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await axios.post(`${API}/users/upload-photo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.user);
      localStorage.setItem("profilePic", res.data.user.profilePic);

      alert("Profile picture updated!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload");
    }
  };

  // Update Name
  const updateProfile = async () => {
    try {
      const res = await axios.put(
        `${API}/users/me`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated!");
      setUser(res.data.user);
      localStorage.setItem("name", res.data.user.name);

    } catch (err) {
      console.error("Update profile error:", err);
      alert("Failed to update");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="container col-md-6">
        <div className="card shadow-sm p-4 text-center">

          <h3 className="mb-3">My Profile</h3>

          {/* Profile Picture */}
          <div className="mb-3">
            <img
              src={
                photo ||
                (user.profilePic
                  ? `${API}${user.profilePic}`
                  : "https://i.pravatar.cc/150")
              }
              alt="Profile"
              className="rounded-circle mb-3"
              width={120}
              height={120}
              style={{ objectFit: "cover" }}
            />

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={uploadPhoto}
            />
          </div>

          {/* Name */}
          <div className="text-start mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="text-start mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={user.email} disabled />
          </div>

          {/* Role */}
          <div className="text-start mb-3">
            <label className="form-label">Role</label>
            <input className="form-control" value={user.role} disabled />
          </div>

          <button className="btn btn-primary w-100" onClick={updateProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}
