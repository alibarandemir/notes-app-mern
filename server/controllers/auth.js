const User= require('../models/userModel.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotenv= require('dotenv');
const fs= require('fs')
const { uploadToCloudinary } = require('../config/cloudinary.js');
const cloudinary= require('cloudinary').v2
dotenv.config();
 const register=  async(req,res)=>{
    
    try{
    console.log('selam istek')
    const {userName,email,password}= req.body;
    
    const user= await User.findOne({email})
    //check existing user
     if(user){
         return res.json({message:'Böyle bir kullanıcı kayıtlı!'})
    }
    //check password 
    if(password.length<6){
        return res.status(500).json({message:'Parolanız 6 karakterden küçük olamaz'})
    }
    //check email
    // if(!(ValidateEmail(email))){
    //     return res.status(500).json({message:'Email formatı yanlış!'})
    // }

    // upload avatar to cloudinary
    console.log(req.file)
    const imageData= await uploadToCloudinary(req.file.path)
    console.log(imageData)
    console.log(imageData.url)

    //hashing password

    const hashPassword= await bcrypt.hash(password,12);
    //add to db
    const newUser= await User.create({avatar:imageData.secure_url,userName,email,password:hashPassword});
    fs.unlinkSync(req.file.path)

    const token= jwt.sign({id:newUser._id},`${process.env.SECRET_KEY}`,{
        expiresIn: 3 * 24 * 60 * 60,});
    res.status(201).json({
        success:true,
        status:'OK',
        message:'Kayıt olma işlemi başarılı!',
        user:newUser,
        token:token,
    })
    }
    catch(error){
        res.status(502).json({message:error.message})
    }
}
 const login = async(req,res)=>{
    const {email,password}= req.body;
    const user= await User.findOne({email:email})
    if(!user){
         return res.json({message:'Böyle bir kullanıcı bulunamadı, kayıt olunuz!'})
    }
    const passwordCompare= await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.json({
            message:'Şifreniz yanlış'
        })
    }
    const token= await jwt.sign({id:user._id},`${process.env.SECRET_KEY}`,{expiresIn:'1h'});
    console.log(token);
    res.status(200).json({
        success:true,
        status:'OK',
        message:'Giriş işlemi başarılı',
        user,
        token:token,
    })
    }


 const logout=(req,res)=>{

}


function ValidateEmail(email){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(mailformat))
    {
    return true;
    }
    else
    {
    return false;
    }
}

module.exports= {register,login,logout};