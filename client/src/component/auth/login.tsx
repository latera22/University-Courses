import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// Correct import (without .tsx)
import { AppContext } from "../context/AppContext";
function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData } = useContext(AppContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_URL || "";
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Use axios to send a POST request to the server
    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        email,
        password,
      });
      console.log("Response Data:", response.data); // Debugging

      if (!response.data || !response.data.role || !response.data.token) {
        return console.log("Invalid response from server.");
      }

      const { role, token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Store role for protected routes

      console.log("User role:", role);

      // Navigate based on role
      if (role === "admin") {
        navigate("/function/adminDashboard");
      } else {
        navigate("/function/home");
      }
      setIsLoggedIn(true);
      setUserData(user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login error:", error);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Invalid Credential");
    }
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-center pt-28 text-7xl font-bold">
          <h1>Big Project</h1>
        </div>
        <div className="flex justify-center items-center pt-16">
          <div>
            <form
              onSubmit={handleLogin}
              className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border border-gray-200 "
            >
              <div className="">
                <div>
                  <div>
                    <label className="text-3xl font-semibold">Email: </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      id="email"
                      name="email"
                      type="email"
                      className="ml-4 pl-2 border-2 rounded-xl font-semibold"
                    ></input>
                  </div>
                  <div>
                    <label className="text-3xl font-semibold">Password: </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      id="password"
                      name="password"
                      type="Password"
                      className=" pl-2 border-2 rounded-xl font-semibold"
                    ></input>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-amber-950"
                  >
                    Login
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <label htmlFor="" className="font-semibold">
                    {" "}
                    Not Registered?
                  </label>
                  <a href="./signup" className="text-blue-500">
                    click here
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
