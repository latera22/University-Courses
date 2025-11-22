import OpenAI from "openai";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const generateChatCompletion = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ success: false, message: "Message required" });

    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Ensure chats array exists
    user.chats = user.chats || [];

    // Prepare chat history
    const chatHistory = user.chats.map(({ role, content }) => ({ role, content }));
    chatHistory.push({ role: "user", content });

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
      organization: process.env.OPENAI_ORGANIZATION_ID,
    });

    // --- MOCK RESPONSE FOR DEVELOPMENT ---
    // To use this, you can temporarily set NODE_ENV to "development_mock"
    // or simply change the condition to `if (true)` to always get a fake response.
    if (process.env.NODE_ENV === "development_mock") {
      // Simulate a delay to feel like a real API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockBotMessage = { role: "assistant", content: `This is a mocked response to your message: "${content}"` };
      user.chats.push(mockBotMessage);
      await user.save();

      return res.status(200).json({ success: true, message: mockBotMessage.content });
    }
    // --- END MOCK RESPONSE ---

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
    // Check for OpenAI API specific errors
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI service quota exceeded. Please check billing.",
      });
    }
    res.status(500).json({ success: false, message: "An error occurred with the AI service." });
  }
};
