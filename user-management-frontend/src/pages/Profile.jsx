import Navbar from "../components/Navbar";

export default function Profile() {
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3>Profile Page</h3>
        <p>Role: {role}</p>
        <p>Edit profile functionality coming soon...</p>
      </div>
    </>
  );
}
