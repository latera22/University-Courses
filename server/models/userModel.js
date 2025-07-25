import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required: true},
    verifyOtp: {type: String, default:""},
    verifyOtpExpireAt: {type:Number, default:0},
    isAccountIsVerified:{type:Boolean, default:"false"},
    resetOtp: {type:String, default:""},
    resetOtpExpireAt: {type: Number, default:0},
    role:{type:String, default:"user"}
})
const userModel = mongoose.model("user", userSchema)

export default userModel;