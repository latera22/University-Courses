import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  role: { type: String, required: true }, // "user" or "bot"
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountIsVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  role: { type: String, default: "user" },
  chats: [chatSchema], // <-- new chat history array
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
