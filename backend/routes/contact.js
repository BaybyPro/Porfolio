

var express = require('express');

var ContactController = require('../controllers/contact');
const controllers = require('../controllers/contact');

var router = express.Router();

router.get('/CV',controllers.getCV);
router.post('/save',ContactController.saveContact);

module.exports = router;