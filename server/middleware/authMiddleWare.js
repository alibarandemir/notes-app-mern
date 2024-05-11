const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config();




const auth = (req,res,next)=>{
    try{
        const token= req.header("Auth");
        if(!token){
            res.status(400).json({message:"Invalid Auth"})
        }
        jwt.verify(token,""+process.env.SECRET_KEY,(err,user)=>{
            if(err){
                res.status(400).json({message:err.message})
            }
            
            req.user= user;
            console.log(req.user);
            next()
        })
    }
    catch(err){
        res.status(400).json({message:err.message})

    }
}
module.exports= auth;