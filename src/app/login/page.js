"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState(""); // Store success/error messages
  const router = useRouter(); // Router instance for navigation

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials:"include",
      });

      const responseData = await response.json();

      if (response.ok && responseData.token) {
        // Store JWT in localStorage
        localStorage.setItem("jwtToken", responseData.token);
        setMessage("Login successful! Redirecting...");

        // Redirect based on role
        if (formData.role === "Admin") {
          router.replace("/admin");
        } else if (formData.role === "User") {
          router.push(`/${formData.username}`);
        }
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-row gap-3 justify-center">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <label htmlFor="role">Choose Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Choose role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Display message */}
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}

export default Login;
