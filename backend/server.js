import react from "react"
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import ConnectDB from "./controllers/mongodb.js"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js";
import courseRouter from "./router/functionRouter.js"
import chatRoutes from "./router/chatRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
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
    ],
     // Allow frontend origin
    credentials: true, // Allow cookies in cross-origin requests
  }));
  
app.options('*', cors()); // Enable pre-flight requests for all routes
app.use(cookieParser({credential:true}))

ConnectDB()
//API Endpoints
app.get('/', (req, res)=> res.send("API is Working"))
app.use("/api", chatRoutes);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)
app.use("/api/course", courseRouter)
app.use("/uploads", express.static("uploads"));
app.use('/upload/photos/', express.static(path.join(__dirname, 'upload/photos/')));

console.log("Loaded KEY:", process.env.OPENAI_KEY ? "YES" : "NO");


app.listen(port, "0.0.0.0",()=>
    console.log(`Server is running on the PORT: ${port}`)
)
