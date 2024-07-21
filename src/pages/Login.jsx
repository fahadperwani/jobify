import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/reducer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("My token", localStorage.getItem("accessToken"));
    if (Cookies.get("accessToken")) navigate("/", { replace: true });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to backend here
    fetch(process.env.REACT_APP_BACKEND_URI + "/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("accessToken", data.data.accessToken);
          dispatch(login(data.data));
          navigate("/", { replace: true });
        } else setError(data.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="min-w-96 p-20 bg-white rounded-md shadow-md"
      >
        {error && <p className="text-red-400">{error}</p>}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
