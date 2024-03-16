const User= require('../models/userModel.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotenv= require('dotenv');
dotenv.config();
 const register=  async(req,res)=>{
    
    try{
        console.log('selam istek')
    const {userName,email,password}= req.body;
    console.log(userName+email+password);
    const user= await User.findOne({email})
    //check existing user
     if(user){
         return res.json({message:'Böyle bir kullanıcı kayıtlı!'})
    }
    //check password 
    if(password.length<6){
        return res.status(500).json({message:'Parolanız 6 karakterden küçük olamazz'})
    }
    //check email
    // if(!(ValidateEmail(email))){
    //     return res.status(500).json({message:'Email formatı yanlış!'})
    // }
    //hashing password
    const hashPassword= await bcrypt.hash(password,12);
    console.log(hashPassword);
    console.log('hash calısmıyor')
    //add to db
    const newUser= await User.create({userName,email,password:hashPassword});
    const token= jwt.sign({id:newUser._id},`${process.env.SECRET_KEY}`,{
        expiresIn: 3 * 24 * 60 * 60,});
    res.status(201).json({
        success:true,
        status:'OK',
        message:'Kayıt olma işlemi başarılı!',
        newUser,
        token,
    })
    }
    catch(error){
        res.status(502).json({message:error.message})
    }
}
 const login = async(req,res)=>{
    const {email,password}= req.body;
    const user= await userSchema.findOne(email)
    if(!user){
        res.json({message:'Böyle bir kullanıcı bulunamadı, kayıt olunuz!'})
    }
    const passwordCompare= await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        res.json({
            message:'Şifreniz yanlış'
        })
    }
    const token= jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'});
    res.status(200).json({
        success:true,
        status:'OK',
        user,
        token,
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