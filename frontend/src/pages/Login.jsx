import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

     try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      { email, password }
    );

      localStorage.setItem("token", res.data.token); 

      alert("Login successful!");
      navigate("/chat");
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white text-black dark:bg-gray-900 dark:text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
          className="w-full mb-6 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
