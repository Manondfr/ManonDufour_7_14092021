const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const session = require('../middleware/session')

const multer = require('../middleware/multer-config');

const publicationCtrl = require('../controllers/publication');

router.get('/', session.redirectLoginPage, auth, publicationCtrl.getAllPublications);
router.post('/', session.redirectLoginPage, auth,  multer, publicationCtrl.createPublication);
router.put('/:id', session.redirectLoginPage, auth, multer, publicationCtrl.updatePublication);
router.delete('/:id', session.redirectLoginPage, auth, publicationCtrl.deletePublication);
router.post('/:id/like', session.redirectLoginPage, auth, publicationCtrl.defineLikeStatus);


module.exports = router; 