const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationCtrl = require('../controllers/publication');

router.get('/', /*auth,*/ publicationCtrl.getAllPublications);
router.post('/', /*auth,*/  multer, publicationCtrl.createPublication);
router.put('/:id', /*auth,*/ multer, publicationCtrl.updatePublication);
router.delete('/:id', /*auth,*/ publicationCtrl.deletePublication);
router.post('/:id/like', /*auth,*/ publicationCtrl.defineLikeStatus);



module.exports = router; 