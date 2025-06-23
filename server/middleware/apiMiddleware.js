import { GoogleGenAI } from '@google/genai';
import {Configuration} from "openai";

const apiMiddleware = async (message) => {
  const configAi = new Configuration({
    apiKey: process.env.OPENAI_API_KEY ,
    organization: process.env.OPENAI_ORGANIZATION,
  });
  return configAi;

};

export default apiMiddleware;
