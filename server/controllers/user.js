const User= require('../models/userModel.js')
const { uploadToCloudinary } = require('../config/cloudinary.js');


const getProfile=async (req,res)=>{
    try{
    const userId= req.params['id']
    const selectedUser=await User.findById(userId)
    
    res.status(200).json({userId:selectedUser._id,userName:selectedUser.userName,email:selectedUser.email,avatar:selectedUser.avatar})
    }
    catch(e){

    }

}

const editProfile= async(req,res)=>{
    try{
    const user= req.user
    const {userName,email}= req.body
    const selectedUser= await User.findById(user.id);
    let avatarUrl = selectedUser.avatar;

    // Eğer yeni dosya yüklenmişse, dosyayı Cloudinary'ye yükle
    if (req.file) {
      const imageData = await uploadToCloudinary(req.file.path);
      avatarUrl = imageData.secure_url;
    }
    
    
    const updatedUser= await User.findByIdAndUpdate(user.id,{
        avatar:avatarUrl,userName:userName ,email:email ,password:selectedUser.password
    },{new:true});
    console.log(updatedUser);
    res.status(200).json({userInfo:updatedUser,message:'Başarıyla güncellendi'})
1
    }
    catch(e){
        res.status(400).json({message:e.message});
    }


}



module.exports={getProfile,editProfile}