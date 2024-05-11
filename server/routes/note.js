const express= require('express')
const auth= require('../middleware/authMiddleWare.js');
const {getNotes,createNote, updateNote, deleteNote}= require('../controllers/note.js');





const router= express.Router();
router.route('/').get(auth,getNotes);
router.route('/').post(auth,createNote)
router.route('/:id').put(auth,updateNote)
router.route('/:id').delete(auth,deleteNote)


module.exports= router;
