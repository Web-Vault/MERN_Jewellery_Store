import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/admin/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid credentials or unauthorized access");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f6f1]">
      <div className="bg-white border border-[#e2cfc3] shadow-lg p-10 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#b76e79]">
          Admin Login
        </h2>
        {error && (
          <p className="text-[#d9534f] text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 border border-[#decfc5] rounded-md bg-[#fefbf7] focus:outline-none focus:ring-2 focus:ring-[#d6a88f]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-[#decfc5] rounded-md bg-[#fefbf7] focus:outline-none focus:ring-2 focus:ring-[#d6a88f]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#d6a88f] to-[#b76e79] text-white p-3 rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
