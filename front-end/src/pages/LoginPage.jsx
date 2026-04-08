import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login(form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-5"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <button
          className="w-full p-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-100 transition"
          type="submit"
        >
          Login
        </button>

        <p className="text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <span
            className="text-indigo-400 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
