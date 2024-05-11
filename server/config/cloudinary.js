const cloudinary= require('cloudinary');
          

    cloudinary.v2.config({ 
  cloud_name: 'dsfjmblpe', 
  api_key: '177563343677818', 
  api_secret: 'N0ZYIDoRLP1a1pvsOThkowv18wU' 
})
  

const uploadToCloudinary = async(path) => {
  try{
    
    const data= await cloudinary.v2.uploader.upload(path)
    return data
  }
  catch(e){
    console.error(e.message)
  }
  
}

const removeFromCloudinary = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
      console.log(result, error)
  })
}



module.exports= {uploadToCloudinary,removeFromCloudinary};