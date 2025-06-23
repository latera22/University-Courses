import { response } from "express";
import { OpenAIApi } from "openai";
import {chatCompletionValidator} from "../controllers/authController.js";
import userModel from "../models/userModel.js";
import apiMiddleware from "../middleware/apiMiddleware.js";


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
const config = apiMiddleware();
const openai = new OpenAIApi(config);

//get latest response 
const chatResponse = await openai.chatCompletionValidator({
    model: "gpt-3.5-turbo",
    messages: chat,
    
});
user.chats.push(chatResponse.data.choices[0].message)
await user.save();
response.status(200).json({
    success: true,
    message: chatResponse.data.choices[0].message.content,
    
})
}
catch(error){
    return res.json({success: false, message: "Something went wrong"})
} 
}