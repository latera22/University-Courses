import axios from "axios";
import { useState } from "react";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/api/auth/reset-password", {
          email,
          otp,
          password,
        })
        .then((result) => {
          if (result) {
            console.log("PassWord is reset successfully");
          }
        });
    } catch (error) {
      return console.log("Operation Failed");
    }
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleResetPassword}
          className="flex items-center justify-center rounded-lg maw-w-md border w-full border-gray-500 "
        >
          <div>
            <h1 className="font-semibold"> Enter your New Password Here</h1>{" "}
          </div>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
              type="email"
              id="email"
            />
          </div>
          <div>
            <input
              onChange={(e) => setOtp(e.target.value)}
              name="otp"
              placeholder="OTP"
              type="number"
              id="otp"
            />
          </div>{" "}
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="NewPassword"
              type="password"
              id="password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-black text-white hover:bg-amber-950"
            ></button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ResetPassword;
