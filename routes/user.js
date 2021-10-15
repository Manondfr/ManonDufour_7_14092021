const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const session = require('../middleware/session')
const multer = require('../middleware/user-multer-config');

const userCtrl = require('../controllers/user');

router.get('/', session.redirectHomePage)
router.post('/admin', userCtrl.createAdminAccount)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login)
router.post('/logout', userCtrl.logout)
router.put('/user/:id', session.redirectLoginPage, auth, multer, userCtrl.updateUserInfos);
router.delete('/user/:id', session.redirectLoginPage, auth, userCtrl.deleteUser);
router.get('/user/:id', session.redirectLoginPage, auth, userCtrl.getOneUser);
router.get('/user/:id/publications', session.redirectLoginPage, auth, userCtrl.getPublicationsByUser);



module.exports = router;