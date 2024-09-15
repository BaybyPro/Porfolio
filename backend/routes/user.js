var express = require('express');

var userController = require('../controllers/user');


var router = express.Router()


router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/get',userController.authToken, userController.getUser);

module.exports = router;