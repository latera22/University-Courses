import  express from "express"

import { logout, login, registration, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from "../controllers/authController.js"
import userAuth from "../middleware/userAuth.js"

const authRouter = express.Router()

authRouter.post('/registration', registration)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', userAuth,sendVerifyOtp)
authRouter.post('/verify-account', userAuth, verifyEmail)
authRouter.post('/is-auth', userAuth, isAuthenticated)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/reset-password', resetPassword)

authRouter.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    res.json({ email: user.email, id: user.id });
  });
});


export default authRouter