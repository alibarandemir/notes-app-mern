const Notes = require('../models/noteModel.js');



const getNotes= async(req,res)=>{
    
    try{
    const user= req.user;
    
    const notes= await Notes.find({user:user.id})
    res.status(200).json({notes:notes,status:'OK',userId:user.id})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }   
}

const createNote =async (req,res)=>{
    try{
        console.log('create içinde ')
        
    const user= req.user;
    console.log(user);
    const {title,content} = req.body;
    const newNote= await Notes.create({title:title,content:content,user:user.id})

    res.status(200).json({success:true,message:'Not Başarıyla eklendi',note:newNote})
    
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


const updateNote= async(req,res)=>{
    const user=req.user;
   
    const {title,content}= req.body;
    console.log(user);
    const newNote= await Notes.findByIdAndUpdate(req.params.id,{title:title,content:content,user:user.id})
    res.status(200).json({
        success:true,
        message:'Başarıyla güncellendi',
        updatedNote:newNote
    })
}


const deleteNote= async (req,res)=>{
    try{

    
    console.log(req.body);
    const deletedNote= await Notes.findByIdAndDelete(req.body.noteId)
    res.status(200).json({success:true,message:"Başarıyla silindi"})
    }
    catch(e){
        res.status(500).json({message:e.message})
    }

}


module.exports={getNotes,createNote,updateNote,deleteNote}