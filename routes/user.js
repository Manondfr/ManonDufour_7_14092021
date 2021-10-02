const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/user-multer-config');

const userCtrl = require('../controllers/user');

router.post('/admin', userCtrl.createAdminAccount)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/user/:id', /*auth,*/ multer, userCtrl.updateUserInfos);
router.delete('/user/:id', auth, userCtrl.deleteUser);
router.get('/user/:id', auth, userCtrl.getOneUser);
router.get('/user/:id/publications', auth, userCtrl.getPublicationsByUser);


module.exports = router;