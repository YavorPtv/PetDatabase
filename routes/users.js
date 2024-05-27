var express = require('express');
var router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAdmin = require('../middleware/ensureAdmin');

/* GET users listing. */
router.get('/', ensureAdmin, ensureAuthenticated, function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
