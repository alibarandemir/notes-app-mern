const express= require('express');
const auth = require('../middleware/authMiddleWare.js');
const { getProfile, editProfile } = require('../controllers/user.js');

const router= express.Router();

router.route('/profile/:id').get(auth,getProfile)
router.route('/profile:id').put(auth,editProfile);

module.exports=router;