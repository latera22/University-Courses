import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (excluding the password)
      req.user = await userModel.findById(decoded.id).select("-password");

      // Check if user still exists
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("Not authorized, token failed");
      return res.status(401).json({ success: false, message: "Not authorized, token invalid" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};