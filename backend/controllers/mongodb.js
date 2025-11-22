import mongoose from "mongoose"

const ConnectDB = async () =>{
    mongoose.connection.on("connected", ()=>{
        console.log("Database connected")
    })
    mongoose.connection.on("error", (err)=> {
        console.log("Database connection error:", err.message)
    })
    await mongoose.connect(`${process.env.MONGODB_URL}`);}

export default ConnectDB