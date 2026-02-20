import OpenAI from "openai";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize OpenAI FIRST
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,  // must match .env
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

export const generateChatCompletion = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ success: false, message: "Message is required" });

    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Ensure chats array exists
    user.chats = user.chats || [];

    // Prepare chat history
    const chatHistory = user.chats.map(({ role, content }) => ({ role, content }));
    chatHistory.push({ role: "user", content: message });

    // Call OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    });

    const botMessage = chatCompletion.choices?.[0]?.message;
    if (!botMessage)
      return res.status(500).json({ success: false, message: "No response from AI" });

    user.chats.push(botMessage);
    await user.save();
    
    res.status(200).json({ success: true, message: botMessage.content });

  } catch (error) {
    console.error("Chat error:", error);

    // 429 quota
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI service quota exceeded. Please check billing.",
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred with the AI service.",
    });
  }
};
