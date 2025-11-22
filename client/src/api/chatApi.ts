// src/api/chatApi.ts
import axios from "axios";

export interface ChatResponse {
  success: boolean;
  message: string;
}

export const sendMessage = async (
  content: string,
  token: string
): Promise<ChatResponse> => {
  const response = await axios.post(
    "http://localhost:4000/api/chat",
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
