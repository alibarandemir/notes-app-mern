const express= require('express');

const router= express.Router();

router.route('/profile:id').get()
router.route('/profile:id').put()