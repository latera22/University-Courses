// src/api/chatApi.ts - REAL implementation
import axios from 'axios';

export interface ChatResponse {
  message: string;
}

export const sendMessage = async (message: string, token: string): Promise<ChatResponse> => {
  try {
    // Make a POST request to your backend's chat endpoint
    const response = await axios.post(
      'http://localhost:4000/api/chat', // Your backend endpoint for chat
      { message }, // The message from the user
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the token for authentication
        }
      }
    );

    // The backend should return a response with the AI's message
    return response.data; 
  } catch (error) {
    console.error('Error sending message to API:', error);
    // Return a user-friendly error message
    return {
      message: "Sorry, I'm having trouble connecting. Please try again later."
    };
  }
};
