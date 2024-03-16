const express= require('express');
const app= express();
const database= require('./config/database.js');
const bodyParser = require('body-parser');
const cors= require('cors')
const dotenv = require('dotenv');
const authRoute= require('./routes/auth.js');
dotenv.config()

//app.use(bodyParser.json());
app.use(
    cors());
app.use(express.json());
database();
app.use('/',authRoute)
const PORT= process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server is running on '+ PORT)
})