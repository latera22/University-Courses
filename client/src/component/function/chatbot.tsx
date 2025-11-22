// src/pages/Chatbot.tsx
import { useState } from "react";
import Footer from "../common/Footer";
import { sendMessage, ChatResponse } from "../../api/chatApi";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

const Chatbot = () => {
  const [chat, setChat] = useState<ChatMessage[]>([
    { role: "bot", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token") || "";

  const handleSend = async () => {
    if (!input.trim()) return;

    const newChat: ChatMessage[] = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setInput("");

    try {
      const response: ChatResponse = await sendMessage(input, token);
      setChat([...newChat, { role: "bot", content: response.message }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <header>
        <div className="flex flex-col justify-center mt-20">
          <h1 className="text-center font-extrabold text-4xl text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            ChatBot
          </h1>
          <h3 className="text-center font-bold mt-4">
            Let's talk and learn from AI
          </h3>
        </div>
      </header>

      <main className="flex flex-col gap-4 p-4 h-[500px] overflow-y-auto rounded-lg border border-gray-300 mt-8 mx-14 bg-gray-200">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`flex ${
              c.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                c.role === "user" ? "bg-blue-200" : "bg-gray-100"
              } animate-slideInLeft`}
            >
              {c.content}
            </div>
          </div>
        ))}
      </main>

      <footer className="flex items-center gap-4 p-4 border-t border-gray-300 mt-4 mx-14">
        <input
          type="text"
          placeholder="Input your question here"
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSend}
        >
          Send
        </button>
      </footer>

      <Footer />
    </>
  );
};

export default Chatbot;
