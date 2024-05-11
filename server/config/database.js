const mongoose= require('mongoose');

const database= ()=>{
    mongoose.connect(`mongodb+srv://alibarandemir798:baranece121023@notesapp.0dgesbt.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log('db is connected')
    })
    .catch((error)=>{
        console.log(error.message)
})}

module.exports= database;