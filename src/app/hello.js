"use client";
import Cookies from "js-cookie";
import { useState } from "react";

function Login() {
  const [userData, setUserData] = useState(null);
  

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1"); 
      const data = await response.json();
      setUserData(data);
      Cookies.set('hello', 'value', { expires: 365 })
      console.log(Cookies.get("jwtToken")) 
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome!</h1>

      <button
        onClick={fetchUserData}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Fetch User
      </button>

      {userData && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Website: {userData.website}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
