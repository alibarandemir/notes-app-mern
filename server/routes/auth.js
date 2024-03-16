const express= require('express');
const { register, login, logout } = require('../controllers/auth.js');



const router = express.Router()

router.post('/register',register)
router.route('/login').post(login)
router.route('/logout').post(logout)


module.exports= router;
