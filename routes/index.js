var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const db = require('../models/index');
//const species = require('../models/species');

//const animals = require('../models/animals');

router.get('/home', function (req, res, next) {
	res.render('home');
});

module.exports = router;
