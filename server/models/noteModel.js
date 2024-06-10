const mongoose= require('mongoose');
const User = require('./userModel')


const noteSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    }
})


module.exports= mongoose.model('Notes',noteSchema)