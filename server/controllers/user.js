const User= require('../models/userModel.js')
const { uploadToCloudinary } = require('../config/cloudinary.js');


const getProfile=async (req,res)=>{
    try{
    const user= req.user;
    const selectedUser=await User.findById(user.id)
    console.log( selectedUser)
    res.status(200).json({userId:selectedUser._id,userName:selectedUser.userName,email:selectedUser.email,avatar:selectedUser.avatar})
    }
    catch(e){

    }

}

const editProfile=(req,res)=>{

}



module.exports={getProfile,editProfile}