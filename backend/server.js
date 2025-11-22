import react from "react"
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import ConnectDB from "./controllers/mongodb.js"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js";
import courseRouter from "./router/functionRouter.js"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import apiRouter from "./router/apiRouter.js";
import dotenv from "dotenv"


const app = express()
const port = process.env.PORT || 4000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors({
   origin:  [
        "http://localhost:5173",
    "https://university-courses-six.vercel.app"
    ],
     // Allow frontend origin
    credentials: true, // Allow cookies in cross-origin requests
  }));
  
app.use(cookieParser({credential:true}))

ConnectDB()
//API Endpoints
app.get('/', (req, res)=> res.send("API is Working"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use("/api/course", courseRouter)
app.use("/uploads", express.static("uploads"));
app.use('/upload/photos/', express.static(path.join(__dirname, 'upload/photos/')));
app. use("/api", apiRouter)


app.listen(port, "0.0.0.0",()=>
    console.log(`Server is running on the PORT: ${port}`)
)
