const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const session = require('../middleware/session')
const commentCtrl = require('../controllers/comment');


router.get('/', session.redirectLoginPage, auth, commentCtrl.getAllComments);
router.post('/', session.redirectLoginPage, auth, commentCtrl.createComment);
router.put('/:commentid', session.redirectLoginPage, auth, commentCtrl.updateComment);
router.delete('/:commentid', session.redirectLoginPage, auth, commentCtrl.deleteComment);


module.exports = router;