import Layout from "../components/Layout";

export default function Profile() {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  return (
    <Layout>
      <h3>Your Profile</h3>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Email:</strong> {email || "Your email here"}</p>
      <p>Profile editing feature coming soon...</p>
    </Layout>
  );
}
