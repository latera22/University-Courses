
import userModel from '../models/userModel.js';

export const userGetData = async (req, res)=>{
    const {userId} = req.body
    if(!userId){
        return res.json({success:false, message:"Missing Details"})
    }
    try {
        const user = await userModel.findById(userId)
    if(!user){
        return res.json({success:false, message:"User not found"})
    }
    res.json({
        success:true,
        userData: {
            name:user.name,
            isAuthenticated:user.isAuthenticated
        }
    })
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}