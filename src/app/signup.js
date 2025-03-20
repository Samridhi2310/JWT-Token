import React, { useState } from "react";

function Signup() {
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  return (
    <div>
      <form>
        <div className="flex flex-row gap-3">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
          ></input>
        </div>
        <div className="flex flex-row gap-3 ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          ></input>
        </div>
        <div className="flex flex-row gap-3 ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
          ></input>
        </div>
       

        <button className="">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
