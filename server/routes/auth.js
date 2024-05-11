const express= require('express');
const { register, login, logout } = require('../controllers/auth.js');
const multer= require('multer')
const upload= require('../middleware/uploadMiddleWare.js')



const router = express.Router()

router.post('/register',upload.single('avatar'),register)
router.route('/login').post(login)
router.route('/logout').post(logout)


module.exports= router;
