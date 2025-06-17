import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

   try {
     const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      {
        name,
        email,
        phone,
        password,
      }
    );

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 text-black dark:bg-gray-900 dark:text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        <input
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          name="phone"
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm Password"
          type="password"
          required
          className="w-full mb-6 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
