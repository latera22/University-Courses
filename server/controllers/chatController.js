import { response } from "express";
import { OpenAIApi } from "openai";
import {createChatCompletion} from "../models/chatModel.js";
import userModel from "../models/userModel.js";
export const generateChatCompletion = async (req, res) => {
const { messages } = req.body;
const user = await userModel.findById(req.user._id);

if(!user){
    response.status(404).json({success: false, message: "User not found"})
}
try{
//grabs chat of user
const chat= user.chats.map(({role, content})=> ({role, content}));
chat.push({role: "user", content: messages.content})
user.chats.push({role: "user", content: messages.content})
//send all chats with new one to open-ai
const config = configurationAI();
const openai = new OpenAIApi(config);
const chatResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chat,
    
});
user.chats.push(chatResponse.data.choices[0].message)
await user.save();
response.status(200).json({
    success: true,
    message: chatResponse.data.choices[0].message.content,
    chatId: user. id,
})
//get latest response 

}
catch(error){
    return res.json({success: false, message: error.message})
} 
}