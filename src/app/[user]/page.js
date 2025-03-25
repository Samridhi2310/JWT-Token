"use client";
import React, { useState } from "react";
import axios from "axios";
import api from "../api";
import Cookies from "js-cookie";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch Users Function
  const fetchUsers = async () => {
    setError("");
    try {
      // Step 1: Verify the token
      const verifyResponse = await api.get("http://localhost:8000/verify-token", {
        withCredentials: true, // Ensures cookies are sent
      });

      if (verifyResponse.status === 200) {
        // Step 2: Fetch user data from JSONPlaceholder if token is valid
        const usersResponse = await api.get("/users");
        setUsers(usersResponse.data);
      }
    } catch (err) {
      setError("Unauthorized: Invalid or missing token");
    }
  };

  // Handle Logout Function
  const handleLogout = () => {
    Cookies.remove("jwtToken"); // Remove the JWT token from cookies
    window.location.href = "/login"; // Redirect user to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          User Page
        </h1>

        <button
          onClick={fetchUsers}
          className="w-full bg-teal-400 text-white py-2 rounded-md hover:bg-blue-100 transition mb-4"
        >
          Fetch Users
        </button>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-3 border rounded-md bg-gray-50 shadow-sm"
            >
              <span className="font-medium text-gray-800">{user.name}</span> -{" "}
              <span className="text-gray-600">{user.email}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;
