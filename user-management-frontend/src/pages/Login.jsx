import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") navigate("/manage-users");
      else navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Login</h3>
      <input className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="form-control mb-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
    </div>
  );
}
