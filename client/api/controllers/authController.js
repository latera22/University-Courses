import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js"
import transporter  from "./nodemailer.js"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
////////////////////////////////////
export const registration = async (req, res)=>{
    const{name, email, password} = req.body

    if(!name||!email ||!password){
        return res.json({success:false, message:console.log("Missing Deta")})
    }
    try{
        const existingEmail = await userModel.findOne({email})
        if(existingEmail){
            return res.json({success:false , message:console.log("Email Already Exists")})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({name, email, password:hashedPassword})

        await user.save();

        const token  = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none": "strict",
            maxAge : 7*24*60*60*1000

        })
        const mailOption = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "WELL COME TO UNIVERSITY ",
            text:`Well come to University Courses, and your account is created with email ID: ${email}`
        }

        await transporter.sendMail(mailOption)
            return res.json({success: true})

        
    }

    catch(error){
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
/////////////////////////////////////////
export const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({ email }); // Rename to "user"

    if(!email || !password){
        return res.json({
            success:false, message:"Missing Details"
        })
    }
    const existingEmail = await userModel.findOne({email})

    if(!existingEmail){
        return res.json({
            success:false, message:"User Email Does not exist"
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch){
        return res.json({success:false, message: "Invalid password"})
    }
    const token  = jwt.sign({id: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none": "strict",
            maxAge : 7*24*60*60*1000
        })
           res.json({
            success:true,
            message:"Login Successfully",
            userId: user._id,
            role:user.role,
            token,
            user:{
            id: user._id,
            email: user.email,
            role:user.role
            }
        })
}

///////////////////////////////////
export const logout = async (req,res)=>{
    try{
        res.clearCookie("token" , {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none": "Lax",
        })
        return res.json({success: true, message: "Logged Out"})

    }
    catch(error){
        res.json({success: false, message: "Missing logout"})
    }
}
//////////////////////////////////
export const sendVerifyOtp = async(req,res)=>{
    try{
        const {userId} = req.body

        const user = await userModel.findById(userId)

        if(user.isAccountIsVerified){
            return res.json({success:false, message: "Account is already verified"})
        }
        const otp = String(Math.floor(100000+ Math.random()*900000))

        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + (24 * 60 * 60 * 1000)
        await user.save()

        const mailOption = {
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject: "Account Verification OTP ",
            text:`Well come to University Courses, and verify your Account using OTP: ${otp}`
        }
        await transporter.sendMail(mailOption)
        res.json({success:true, message:"OTP number is sent on your email account"})

    }catch(error){
        return res.json({success: false, message: error.message})
    }

}
////////////////////////////////////////
export const verifyEmail = async(req, res)=>{
    const{userId, otp} = req.body
    if(!userId || !otp){
        return res.json({success:false, message: "Missing details"})
    }try{
        const user = await userModel.findById(userId)
        if(!user){
            return res.json({success:false, message:"User not Found"})
        }
        if(user.verifyOtp === "" || user.verifyOtp === !otp){
            return res.json({success:false, message: "Invalid OTP"})
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP is expired"})
        }
        user.isAccountIsVerified = true
        user.verifyOtp = ""
        user.verifyOtpExpireAt = 0
        await user.save()
        return res.json({success:true, message:"Email is verified"})
    }
    catch(error){
        return res.json({success:false, message:error.message})
    }

}
export const isAuthenticated = async(req, res)=>{
    try {
        return res.json({success:true})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}
export const sendResetOtp = async(req, res)=>{
    const {email} = req.body
    if(!email){
        return res.json({success:false, message: "Missing details"})
    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
        const otp = String(Math.floor(100000+ Math.random()*900000))

        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + (15 * 60 * 1000)
        await user.save()

        const mailOption = {
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject: "Reset Password OTP ",
            text:`Your reset password OTP is: ${otp}, using this process your process to reset your password`
        }
        await transporter.sendMail(mailOption)
        res.json({success:true, message:"OTP number is sent on your email account"})  
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}
export const resetPassword = async(req, res) => {
    const {email, otp, newPassword} = req.body
    if(!email || !otp || !newPassword){
        return res.json({success:false, message: "Missing details"})
    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
        if(user.resetOtp === "" || user.resetOtp ===!otp){
            return res.json({success:false, message: "Invalid OTP"})
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP is expired"})
        }
        
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.isAccountIsVerified = true
    user.password = hashedPassword
    user.resetOtp = ""
    user.resetOtpExpireAt = 0
    user.save()

    return res.json({success:true, message:"Password has been reset successfully"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
]
