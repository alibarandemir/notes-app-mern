const express= require('express');
const multer= require('multer');
const app= express();
const database= require('./config/database.js');
const bodyParser = require('body-parser');
const cors= require('cors')
const dotenv = require('dotenv');
const authRoute= require('./routes/auth.js');
const noteRoute= require('./routes/note.js');
const userRoute= require('./routes/user.js');
const upload = require('./middleware/uploadMiddleWare.js');
const { uploadToCloudinary } = require('./config/cloudinary.js');

dotenv.config()


//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
database();

app.use('/',authRoute)
app.use('/',noteRoute)
app.use('/',userRoute)


const PORT= process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server is running on '+ PORT)
})