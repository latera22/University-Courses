import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
function Signup() {
  const navigate = useNavigate();

  // Check if context is available (not undefined)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_URL || "";

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${apiBaseUrl}/api/auth/registration`, {
        name,
        email,
        password,
      })
      .then((result) => {
        if (result) {
          window.alert("User Registered successfully");
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status == 400) {
          window.alert("Email is registred, use different email to signup");
        } else {
          window.alert("system error");
        }
      });
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
              onSubmit={handleSignup}
              className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border border-gray-200 "
            >
              <div className="">
                <div>
                  <div>
                    <label className="text-3xl font-semibold">Name: </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      placeholder="Name"
                      name="name"
                      type="text"
                      className="border-2 rounded-xl px-3 font-semibold "
                    ></input>
                  </div>

                  <div>
                    <label className="text-3xl font-semibold">Email: </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      id="email"
                      name="email"
                      type="email"
                      className="border-2 rounded-xl px-3 font-semibold"
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
                      className="border-2 rounded-xl px-1 font-semibold"
                    ></input>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-amber-950"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="flex items-center justify-center ">
                  <label className="font-semibold">forgot your password?</label>
                  <a href="" className="text-blue-500">
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
export default Signup;
