import axios from "axios";

export const sendMessage = async (content, token) => {
  const response = await axios.post(
    "http://localhost:4000/api/chat",
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
