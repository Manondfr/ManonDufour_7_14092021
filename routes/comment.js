const express = require('express');
const router = express.Router();
const bodyparser = express.json();
const urlencoded = express.urlencoded({extended:true});

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/', /*auth,*/ commentCtrl.getAllComments);
router.post('/', /*auth,*/ bodyparser,  commentCtrl.createComment);
//router.put('/:id',  commentCtrl.updateComment);
router.delete('/:commentid', /*auth,*/ commentCtrl.deleteComment);



module.exports = router;