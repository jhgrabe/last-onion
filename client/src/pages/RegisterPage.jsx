import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, passwordConfirm);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Check your details and try again.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;