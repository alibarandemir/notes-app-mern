const mongoose= require('mongoose');


const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
    
})
module.exports= mongoose.model('User',userSchema);