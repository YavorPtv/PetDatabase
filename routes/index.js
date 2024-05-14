var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const db = require('../models/index');
//const species = require('../models/species');

//const animals = require('../models/animals');

router.get('/home', function (req, res, next) {
	res.render('home');
});

router.get('/pets/new', function (req, res, next) {
	res.render('new-pet');
});

router.get('/species/show-all', async (req, res, next) => {
	try {
		const allSpecies = await species.findAll();
		console.log('Data from species table:', allSpecies);
		res.render('display-table-species', { data: allSpecies });
	} catch (error) {
		console.error('Error interacting with the database:', error);
		res.status(500).send('Error interacting with the database');
	}
});

module.exports = router;
