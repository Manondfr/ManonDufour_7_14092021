const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationCtrl = require('../controllers/publication');

router.get('/', /*auth,*/ publicationCtrl.getAllPublications);
router.post('/', /*auth,*/  multer, publicationCtrl.createPublication);
router.put('/:id', multer, publicationCtrl.updatePublication);
router.delete('/:id', /*auth,*/ publicationCtrl.deletePublication);



module.exports = router; 